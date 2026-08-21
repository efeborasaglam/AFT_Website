import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext.jsx";

const NavBar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken");
    aToken && localStorage.removeItem("aToken");
  };

  return (
    <div
      className={
        "flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white"
      }
    >
      <div className={"flex items-center gap-2 text-xs"}>
        <img
          className={"w-3 sm:w-40 cursor-pointer"}
          src={assets.logo}
          alt={"logo"}
        />
        <p
          className={
            "border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600"
          }
        >
          {aToken ? "Admin" : "Trainer"}
        </p>
      </div>
      <button
        onClick={logout}
        className={"bg-primary text-white text-cs px-10 py-2 rounded-full"}
      >
        Logout
      </button>
    </div>
  );
};
export default NavBar;
