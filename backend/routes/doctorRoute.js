import express from "express";
import {
    appointmentCancelDoc,
    appointmentComplete,
    appointmentsDoctor, doctorDashboard,
    doctorList, doctorProfile,
    loginDoctor, updateDoctorProfile, updateAvailability
} from "../controllers/doctorController.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancelDoc)
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
doctorRouter.get('/profile', authDoctor, doctorProfile)
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)
doctorRouter.post('/update-availability', authDoctor, updateAvailability)
export default doctorRouter;