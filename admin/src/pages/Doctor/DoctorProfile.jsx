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

// fragt den Doctor nach Start-/Endzeit (für Monatsansicht, wo keine Uhrzeit gezogen wird)
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

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState("");
  const calendarRef = useRef(null);

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

  // availability-Einträge -> feste, einmalige Kalender-Events (KEIN wöchentliches Wiederholen)
  const calendarEvents = useMemo(() => {
    return availability.map((a, index) => {
      const [y, m, d] = a.date.split("-").map(Number);
      const [startH, startM] = a.startTime.split(":").map(Number);
      const [endH, endM] = a.endTime.split(":").map(Number);

      const start = new Date(y, m - 1, d, startH, startM);
      const end = new Date(y, m - 1, d, endH, endM);

      return {
        id: String(index),
        title: a.speciality,
        start,
        end,
        backgroundColor: specialityColorMap[a.speciality] || "#94a3b8",
        borderColor: specialityColorMap[a.speciality] || "#94a3b8",
        extendedProps: { speciality: a.speciality },
      };
    });
  }, [availability, specialityColorMap]);

  // neuer Block wird ausgewählt: Woche = exakte Zeit per Drag, Monat = Tag anklicken + Uhrzeit-Prompt
  const handleSelect = (selectInfo) => {
    if (!activeSpeciality) {
      toast.warn("Bitte zuerst eine Speciality auswählen");
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
      { speciality: activeSpeciality, date: dateStr, startTime, endTime },
    ]);
  };

  const handleEventClick = (clickInfo) => {
    const index = Number(clickInfo.event.id);
    if (window.confirm(`"${clickInfo.event.title}" Block entfernen?`)) {
      setAvailability((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleEventDrop = (dropInfo) => {
    const index = Number(dropInfo.event.id);
    const date = toDateStr(dropInfo.event.start);
    const startTime = toTimeStr(dropInfo.event.start);
    const endTime = toTimeStr(dropInfo.event.end);

    setAvailability((prev) =>
      prev.map((a, i) =>
        i === index ? { ...a, date, startTime, endTime } : a,
      ),
    );
  };

  const handleEventResize = (resizeInfo) => {
    const index = Number(resizeInfo.event.id);
    const date = toDateStr(resizeInfo.event.start);
    const startTime = toTimeStr(resizeInfo.event.start);
    const endTime = toTimeStr(resizeInfo.event.end);

    setAvailability((prev) =>
      prev.map((a, i) =>
        i === index ? { ...a, date, startTime, endTime } : a,
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

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        updateData,
        { headers: { dToken } },
      );
      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
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
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className={"flex flex-col gap-4 m-5"}>
        <div>
          <div>
            <img
              className={"bg-primary/80 w-full sm:max-w-64 rounded-lg"}
              src={profileData.image}
              alt={"doc image"}
            />
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
              {profileData.name}
            </p>
            <div className={"flex items-center gap-2 mt-1 text-gray-600"}>
              <p>
                {profileData.degree} - {profileData.speciality.join(", ")}
              </p>
              <button className={"py-0.5 px-2 border text-xs rounded-full"}>
                {profileData.experience}
              </button>
            </div>
            <div>
              <p
                className={
                  "flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3"
                }
              >
                About:{" "}
              </p>
              <p className={"text-sm text-gray-600 max-w-[700px] mt-1"}>
                {profileData.about}
              </p>
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
                  className={`text-xs px-3 py-1 rounded-full border transition-all ${
                    activeSpeciality === s
                      ? "text-white"
                      : "text-gray-600 bg-white"
                  }`}
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

            <p className={"text-xs text-gray-400 mb-2"}>
              Wochenansicht: Zeitfenster aufziehen. Monatsansicht: Tag anklicken
              und Uhrzeit eingeben. Jeder Termin gilt nur für den exakt
              gewählten Tag. Block anklicken = entfernen, ziehen/resizen =
              anpassen.
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
