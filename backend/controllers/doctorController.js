import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try{

        const {docId} = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: "Availability changed"})

    }catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])

        res.json({success:true, doctors})
    }catch (e){
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

// API for doc login
const loginDoctor = async (req, res) => {
    try {

        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if (!doctor){
            return res.json({success: false, message: "Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch){

            const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        }else {
            res.json({success: false, message: "Invalid credentials"})
        }

    }catch (e){
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

const appointmentsDoctor = async (req, res) => {
    try{

        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})

        res.json({success: true, appointments})

    }catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: 'Appointment Completed'})
        } else {
            return res.json({success: false, message: 'Appointment could not be completed'})
        }
    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

const appointmentCancelDoc = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancel: true})
            return res.json({success: true, message: 'Appointment cancelled'})
        } else {
            return res.json({success: false, message: 'Appointment could not be cancelled'})
        }
    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

// DAshboard
const doctorDashboard = async (req, res) => {
    try {

        const {docId} = req.body

        const appointments = await appointmentModel.find({docId})

        let earnings = 0
        appointments.map((item) => {
            if (item.isCompleted || item.payment){
                earnings += item.amount
            }
        })
        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }

        res.json({success: true, dashData})

    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

const doctorProfile = async (req, res) => {
    try{

        const {docId} = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success: true, profileData})

    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

const updateDoctorProfile = async (req, res) => {
    try{

        const {docId, fees, address, available} = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available})

        res.json({success: true, message: 'Profile updated successfully'})

    } catch (e) {
        console.log(e)
        res.json({success: false, message: e.message + "Something went wrong"})
    }
}

// API for doctor to set their own speciality-based availability
const updateAvailability = async (req, res) => {
    try {
        const { docId, availability } = req.body

        if (!Array.isArray(availability)) {
            return res.json({ success: false, message: "Invalid availability data" })
        }

        const doctorData = await doctorModel.findById(docId)

        // nur Specialities zulassen, die der Doctor tatsächlich hat
        const invalidEntry = availability.find(
            (a) => !doctorData.speciality.includes(a.speciality)
        )
        if (invalidEntry) {
            return res.json({ success: false, message: `Speciality "${invalidEntry.speciality}" gehört nicht zu deinem Profil` })
        }

        await doctorModel.findByIdAndUpdate(docId, { availability })

        res.json({ success: true, message: "Availability updated" })

    } catch (e) {
        console.log(e)
        res.json({ success: false, message: e.message + "Something went wrong" })
    }
}

export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancelDoc, doctorDashboard, doctorProfile, updateDoctorProfile, updateAvailability}