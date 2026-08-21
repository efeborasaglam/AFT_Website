import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { AdminContext } from "../../context/AdminContext.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const specialityOptions = [
    "Athletik-Einzeltrainings",
    "Athletik-Gruppentraining",
    "Online-Coaching",
    "Digitale-Programme",
  ];

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState([specialityOptions[0]]);
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const toggleSpeciality = (value) => {
    setSpeciality((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
    );
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload Trainer image");
      }

      const formData = new FormData();

      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", JSON.stringify(speciality));
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      //   console.log formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-trainer",
        formData,
        {
          headers: { aToken },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setPassword("");
        setEmail("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error("AYRIII" + data.message);
      }
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className={"m-5 w-full"}>
      <p className={"mb-3 text-lg font-medium"}>Add Trainer</p>
      <div
        className={
          "bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll"
        }
      >
        <div className={"flex items-center gap-4 mb-8 text-gray-500"}>
          <label htmlFor={"doc-img"}>
            <img
              className={"w-16 bg-gray-100 rounded-full cursor-pointer"}
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt={"img"}
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type={"file"}
            id={"doc-img"}
            hidden
          />
          <p>
            Upload Trainer <br /> Picture
          </p>
        </div>
        <div
          className={
            "flex flex-col lg:flex-row items-start gap-10 text-gray-600"
          }
        >
          <div className={"w-full lg:flex-1 flex-col gap-4"}>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Trainer Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className={"border rounded px-3 py-2"}
                type={"text"}
                placeholder={"Name"}
                required
              />
            </div>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Trainer Email</p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={"border rounded px-3 py-2"}
                type={"email"}
                placeholder={"Email"}
                required
              />
            </div>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Trainer Password</p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={"border rounded px-3 py-2"}
                type={"password"}
                placeholder={"Password"}
                required
              />
            </div>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Trainer Experience</p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                className={"border rounded px-3 py-2"}
                name={""}
                id={""}
              >
                <option value={"1 Year"}>1 Year</option>
                <option value={"2 Year"}>2 Year</option>
                <option value={"3 Year"}>3 Year</option>
                <option value={"4 Year"}>4 Year</option>
                <option value={"5 Year"}>5 Year</option>
                <option value={"6 Year"}>6 Year</option>
                <option value={"7 Year"}>7 Year</option>
                <option value={"8 Year"}>8 Year</option>
                <option value={"9 Year"}>9 Year</option>
                <option value={"10 Year"}>+10 Year</option>
              </select>
            </div>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Trainer Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                className={"border rounded px-3 py-2"}
                type={"number"}
                placeholder={"Fees"}
                required
              />
            </div>
          </div>
          <div className={"w-full lg:flex-1 flex flex-col gap-4"}>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Speciality</p>
              <div className="flex flex-col gap-1 border rounded px-3 py-2">
                {specialityOptions.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={speciality.includes(option)}
                      onChange={() => toggleSpeciality(option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Trainer Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type={"text"}
                placeholder={"Education"}
                required
              />
            </div>
            <div className={"flex-1 flex flex-col gap-1"}>
              <p>Adress</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className={"border rounded px-3 py-2"}
                type={"text"}
                placeholder={"adress 1"}
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className={"border rounded px-3 py-2"}
                type={"text"}
                placeholder={"adress 2"}
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className={"mt-4 mb-2"}>About Trainer</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className={"w-full px-4 pt-2 border rounded"}
            placeholder={"write about Trainer"}
            rows={5}
            required
          />
        </div>
        <button
          type={"submit"}
          className={
            "bg-primary text-white text-cs px-10 py-2 mt-4 rounded-full"
          }
        >
          Add Trainer
        </button>
      </div>
    </form>
  );
};
export default AddDoctor;
