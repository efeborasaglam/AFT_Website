import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    speciality: {type: [String], required: true},
    degree: {type: String, required: true},
    experience: {type: String, required: true},
    about: {type: String, required: true},
    available: {type: Boolean, default: true},
    fees: {type: Number, required: true},
    address: {type: Object, required: true},
    date: {type: Number, required: true},
    slots_booked: {type: Object, default: {}},
    availability: {
        type: [
            {
                speciality: { type: String, required: true },
                date: { type: String, required: true },       // "YYYY-MM-DD", z.B. "2026-08-25"
                startTime: { type: String, required: true },   // "09:00"
                endTime: { type: String, required: true },     // "17:00"
            },
        ],
        default: [],
    },
}, {minimize: false})

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)

export default doctorModel