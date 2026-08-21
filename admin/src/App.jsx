import React, { useContext } from "react";
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./context/AdminContext.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AllApointments from "./pages/Admin/AllApointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorProfile from "./pages/Doctor/DoctorProfile.jsx";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className={"bg-[#F8F9FD]"}>
      <ToastContainer />
      <NavBar />
      <div className={"flex items-start"}>
        <SideBar />
        <Routes>
          {/* Admin Route */}
          <Route path={"/"} element={<></>} />
          <Route path={"/admin-dashboard"} element={<Dashboard />} />
          <Route path={"/all-appointments"} element={<AllApointments />} />
          <Route path={"/add-trainer"} element={<AddDoctor />} />
          <Route path={"/trainer-list"} element={<DoctorsList />} />
          {/* Doc Route */}
          <Route path={"/doctor-dashboard"} element={<DoctorDashboard />} />
          <Route
            path={"/doctor-appointments"}
            element={<DoctorAppointment />}
          />
          <Route path={"/doctor-profile"} element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};
export default App;
