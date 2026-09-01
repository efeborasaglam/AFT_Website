import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext.jsx";
import { AppContext } from "../../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const colorPalette = [
  "#6366f1",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#06b6d4",
  "#ef4444",
  "#8b5cf6",
];

const TIME_RE = /^([01]\d|2[0-3]):([0-5]\d)$/;

const toDateStr = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const toTimeStr = (date) => date.toTimeString().slice(0, 5);

const promptTimeRange = () => {
  let start = window.prompt("Startzeit (HH:MM)", "09:00");
  if (start === null) return null;
  start = start.trim();
  if (!TIME_RE.test(start)) {
    toast.warn("Ungültige Startzeit");
    return null;
  }

  let end = window.prompt("Endzeit (HH:MM)", "17:00");
  if (end === null) return null;
  end = end.trim();
  if (!TIME_RE.test(end) || end <= start) {
    toast.warn("Ungültige Endzeit");
    return null;
  }

  return { startTime: start, endTime: end };
};

// stabiler Key: echte _id (aus DB) oder temporäre Client-ID für neue, ungespeicherte Blöcke
const getEntryKey = (a) => a._id || a._tmpId;
const makeTmpId = () =>
  `tmp_${Date.now()}_${Math.random().toString(36).slice(2)}`;

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState("");
  const [newMaxParticipants, setNewMaxParticipants] = useState(1);
  const [newAgeGroup, setNewAgeGroup] = useState("");
  const calendarRef = useRef(null);

  // NEU: Bild-Upload
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const specialityColorMap = useMemo(() => {
    const map = {};
    (profileData?.speciality || []).forEach((s, i) => {
      map[s] = colorPalette[i % colorPalette.length];
    });
    return map;
  }, [profileData]);

  useEffect(() => {
    if (profileData?.availability) {
      setAvailability(profileData.availability);
    }
    if (profileData?.speciality?.length && !activeSpeciality) {
      setActiveSpeciality(profileData.speciality[0]);
    }
  }, [profileData]);

  const calendarEvents = useMemo(() => {
    return availability.map((a) => {
      const [y, m, d] = a.date.split("-").map(Number);
      const [startH, startM] = a.startTime.split(":").map(Number);
      const [endH, endM] = a.endTime.split(":").map(Number);

      const start = new Date(y, m - 1, d, startH, startM);
      const end = new Date(y, m - 1, d, endH, endM);
      const booked = a.bookedCount || 0;
      const max = a.maxParticipants || 1;

      return {
        id: getEntryKey(a),
        title: `${a.speciality} (${booked}/${max})${a.ageGroup ? " · " + a.ageGroup : ""}`,
        start,
        end,
        backgroundColor: specialityColorMap[a.speciality] || "#94a3b8",
        borderColor: specialityColorMap[a.speciality] || "#94a3b8",
        extendedProps: { speciality: a.speciality },
      };
    });
  }, [availability, specialityColorMap]);

  const handleSelect = (selectInfo) => {
    if (!activeSpeciality) {
      toast.warn("Bitte zuerst eine Speciality auswählen");
      selectInfo.view.calendar.unselect();
      return;
    }
    if (!newMaxParticipants || newMaxParticipants < 1) {
      toast.warn("Bitte eine gültige maximale Teilnehmerzahl angeben");
      selectInfo.view.calendar.unselect();
      return;
    }

    const isMonthView = selectInfo.view.type === "dayGridMonth";
    const dateStr = toDateStr(selectInfo.start);

    let startTime, endTime;

    if (isMonthView) {
      const times = promptTimeRange();
      selectInfo.view.calendar.unselect();
      if (!times) return;
      startTime = times.startTime;
      endTime = times.endTime;
    } else {
      startTime = toTimeStr(selectInfo.start);
      endTime = toTimeStr(selectInfo.end);
      selectInfo.view.calendar.unselect();
      if (startTime >= endTime) return;
    }

    setAvailability((prev) => [
      ...prev,
      {
        _tmpId: makeTmpId(),
        speciality: activeSpeciality,
        date: dateStr,
        startTime,
        endTime,
        maxParticipants: Number(newMaxParticipants),
        ageGroup: newAgeGroup.trim(),
        bookedCount: 0,
      },
    ]);
  };

  const handleEventClick = (clickInfo) => {
    const key = clickInfo.event.id;
    const entry = availability.find((a) => getEntryKey(a) === key);
    if (!entry) return;

    const action = window.prompt(
      `"${entry.speciality}" – ${entry.bookedCount || 0}/${entry.maxParticipants} Teilnehmer, Altersgruppe: ${entry.ageGroup || "keine Angabe"}\n\n"bearbeiten" oder "löschen" eingeben:`,
      "bearbeiten",
    );
    if (action === null) return;

    if (action.trim().toLowerCase().startsWith("l")) {
      if (
        entry.bookedCount > 0 &&
        !window.confirm(
          "Es sind bereits Teilnehmer angemeldet. Trotzdem löschen?",
        )
      ) {
        return;
      }
      setAvailability((prev) => prev.filter((a) => getEntryKey(a) !== key));
      return;
    }

    let newMax = window.prompt(
      "Maximale Teilnehmerzahl",
      String(entry.maxParticipants ?? 1),
    );
    if (newMax === null) return;
    newMax = parseInt(newMax, 10);
    if (isNaN(newMax) || newMax < 1) {
      toast.warn("Ungültige Teilnehmerzahl");
      return;
    }
    if (entry.bookedCount && newMax < entry.bookedCount) {
      toast.warn(
        `Es sind bereits ${entry.bookedCount} Teilnehmer gebucht – das geht nicht darunter`,
      );
      return;
    }

    const newAge = window.prompt(
      "Altersgruppe (z.B. Kinder 6-10, Erwachsene)",
      entry.ageGroup || "",
    );
    if (newAge === null) return;

    setAvailability((prev) =>
      prev.map((a) =>
        getEntryKey(a) === key
          ? { ...a, maxParticipants: newMax, ageGroup: newAge.trim() }
          : a,
      ),
    );
  };

  const handleEventDrop = (dropInfo) => {
    const key = dropInfo.event.id;
    const date = toDateStr(dropInfo.event.start);
    const startTime = toTimeStr(dropInfo.event.start);
    const endTime = toTimeStr(dropInfo.event.end);

    setAvailability((prev) =>
      prev.map((a) =>
        getEntryKey(a) === key ? { ...a, date, startTime, endTime } : a,
      ),
    );
  };

  const handleEventResize = (resizeInfo) => {
    const key = resizeInfo.event.id;
    const date = toDateStr(resizeInfo.event.start);
    const startTime = toTimeStr(resizeInfo.event.start);
    const endTime = toTimeStr(resizeInfo.event.end);

    setAvailability((prev) =>
      prev.map((a) =>
        getEntryKey(a) === key ? { ...a, date, startTime, endTime } : a,
      ),
    );
  };

  const saveAvailability = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-availability",
        { availability },
        { headers: { dToken } },
      );
      if (data.success) {
        toast.success(data.message);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

  // NEU: Datei-Auswahl fürs Profilbild (nur lokale Vorschau, Upload erst bei "Save")
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.warn("Bitte eine Bilddatei auswählen");
      return;
    }
    setImageFile(file);
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append("name", profileData.name);
      formData.append("experience", profileData.experience);
      formData.append("about", profileData.about);
      formData.append("fees", profileData.fees);
      formData.append("available", profileData.available);
      formData.append("address", JSON.stringify(profileData.address));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        formData,
        { headers: { dToken, "Content-Type": "multipart/form-data" } },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setImageFile(null);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

  useEffect(() => {
    if (dToken) getProfileData();
  }, [dToken]);

  return (
    profileData && (
      <div className={"flex flex-col gap-4 m-5"}>
        <div>
          <div className={"relative w-full sm:max-w-64"}>
            <img
              className={"bg-primary/80 w-full rounded-lg"}
              src={
                imageFile ? URL.createObjectURL(imageFile) : profileData.image
              }
              alt={"doc image"}
            />
            {isEdit && (
              <>
                <button
                  type={"button"}
                  onClick={() => fileInputRef.current?.click()}
                  className={
                    "absolute bottom-2 right-2 bg-primary text-white text-xs px-3 py-1 rounded-full shadow hover:bg-primary/80 transition-all"
                  }
                >
                  Bild ändern
                </button>
                <input
                  ref={fileInputRef}
                  type={"file"}
                  accept={"image/*"}
                  onChange={handleImageChange}
                  className={"hidden"}
                />
              </>
            )}
          </div>
          <div
            className={
              "flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white"
            }
          >
            <p
              className={
                "flex items-center gap-2 text-3xl font-medium text-gray-700"
              }
            >
              {isEdit ? (
                <input
                  type={"text"}
                  value={profileData.name}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className={"border rounded px-2 py-1 text-2xl w-full"}
                />
              ) : (
                profileData.name
              )}
            </p>
            <div className={"flex items-center gap-2 mt-1 text-gray-600"}>
              <p>
                {profileData.degree} - {profileData.speciality.join(", ")}
              </p>
              {isEdit ? (
                <input
                  type={"text"}
                  value={profileData.experience}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      experience: e.target.value,
                    }))
                  }
                  className={"py-0.5 px-2 border text-xs rounded-full w-24"}
                />
              ) : (
                <button className={"py-0.5 px-2 border text-xs rounded-full"}>
                  {profileData.experience}
                </button>
              )}
            </div>
            <div>
              <p
                className={
                  "flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3"
                }
              >
                About:{" "}
              </p>
              {isEdit ? (
                <textarea
                  value={profileData.about}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      about: e.target.value,
                    }))
                  }
                  rows={4}
                  className={
                    "text-sm text-gray-600 max-w-[700px] mt-1 border rounded px-2 py-1 w-full"
                  }
                />
              ) : (
                <p className={"text-sm text-gray-600 max-w-[700px] mt-1"}>
                  {profileData.about}
                </p>
              )}
            </div>
            <p className={"text-gray-600 font-medium mt-4"}>
              Appointment fee:{" "}
              <span className={"text-gray-800"}>
                {currency}{" "}
                {isEdit ? (
                  <input
                    value={profileData.fees}
                    type={"number"}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>
            <div className={"flex gap-2 py-2"}>
              <p>Address: </p>
              <p className={"text-sm"}>
                {isEdit ? (
                  <input
                    type={"text"}
                    value={profileData.address.line1}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line1: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData.address.line1
                )}
                <br />{" "}
                {isEdit ? (
                  <input
                    type={"text"}
                    value={profileData.address.line2}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, line2: e.target.value },
                      }))
                    }
                  />
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>
            <div className={"flex gap-1 pt-2"}>
              <input
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
                type={"checkbox"}
              />
              <label htmlFor={""}>Available</label>
            </div>
            {isEdit ? (
              <button
                onClick={updateProfile}
                className={
                  "px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                }
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className={
                  "px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all"
                }
              >
                Edit
              </button>
            )}
          </div>

          <div className={"mt-6 border-t pt-4"}>
            <p className={"text-gray-700 font-medium mb-2"}>
              Verfügbarkeit pro Speciality
            </p>

            <div className={"flex flex-wrap items-center gap-2 mb-3"}>
              <span className={"text-sm text-gray-600"}>Aktiv bearbeiten:</span>
              {profileData.speciality.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveSpeciality(s)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${activeSpeciality === s ? "text-white" : "text-gray-600 bg-white"}`}
                  style={{
                    backgroundColor:
                      activeSpeciality === s
                        ? specialityColorMap[s]
                        : undefined,
                    borderColor: specialityColorMap[s],
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className={"flex flex-wrap items-end gap-4 mb-3"}>
              <div>
                <label className={"block text-xs text-gray-500 mb-1"}>
                  Max. Teilnehmer (nächster Block)
                </label>
                <input
                  type={"number"}
                  min={1}
                  value={newMaxParticipants}
                  onChange={(e) => setNewMaxParticipants(e.target.value)}
                  className={"border rounded px-2 py-1 text-sm w-24"}
                />
              </div>
              <div>
                <label className={"block text-xs text-gray-500 mb-1"}>
                  Altersgruppe (nächster Block)
                </label>
                <input
                  type={"text"}
                  placeholder={"z.B. Kinder 6-10"}
                  value={newAgeGroup}
                  onChange={(e) => setNewAgeGroup(e.target.value)}
                  className={"border rounded px-2 py-1 text-sm w-48"}
                />
              </div>
            </div>

            <p className={"text-xs text-gray-400 mb-2"}>
              Wochenansicht: Zeitfenster aufziehen. Monatsansicht: Tag anklicken
              und Uhrzeit eingeben. Max. Teilnehmer & Altersgruppe oben gelten
              für den nächsten neu angelegten Block. Block anklicken =
              bearbeiten oder löschen, ziehen/resizen = Zeit anpassen.
            </p>

            <div className={"border rounded-lg overflow-hidden"}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"timeGridWeek"}
                headerToolbar={{
                  left: "prev,next today",
                  center: "title",
                  right: "dayGridMonth,timeGridWeek",
                }}
                dayHeaderFormat={{ weekday: "long", day: "numeric" }}
                allDaySlot={false}
                slotMinTime={"07:00:00"}
                slotMaxTime={"21:00:00"}
                height={"auto"}
                selectable={true}
                selectMirror={true}
                unselectAuto={true}
                editable={true}
                eventResizableFromStart={true}
                events={calendarEvents}
                select={handleSelect}
                eventClick={handleEventClick}
                eventDrop={handleEventDrop}
                eventResize={handleEventResize}
              />
            </div>

            <button
              onClick={saveAvailability}
              className={
                "px-4 py-1 border border-primary text-sm rounded-full mt-4 hover:bg-primary hover:text-white transition-all"
              }
            >
              Availability speichern
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default DoctorProfile;
