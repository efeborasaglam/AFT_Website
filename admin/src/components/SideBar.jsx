import React, { useContext } from "react";
import adminContext, { AdminContext } from "../context/AdminContext.jsx";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { DoctorContext } from "../context/DoctorContext.jsx";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return (
    <div className={"min-h-screen bg-white border-r"}>
      {aToken && (
        <ul className={"text-[#515151] mt-5"}>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"admin-dashboard"}
          >
            <img src={assets.home_icon} alt={"home"} />
            <p className={"hidden md:block"}>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt={"appointments"} />
            <p className={"hidden md:block"}>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/add-trainer"}
          >
            <img src={assets.add_icon} alt={"add trainer"} />
            <p className={"hidden md:block"}>Add Trainer</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/trainer-list"}
          >
            <img src={assets.people_icon} alt={"doctor list"} />
            <p className={"hidden md:block"}>Trainers List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className={"text-[#515151] mt-5"}>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"doctor-dashboard"}
          >
            <img src={assets.home_icon} alt={"home"} />
            <p className={"hidden md:block"}>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt={"appointments"} />
            <p className={"hidden md:block"}>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""}`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt={"doctor list"} />
            <p className={"hidden md:block"}>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};
export default SideBar;
