import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
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
    slots_booked: {type: Object, default: {}}, // wird für neue Buchungslogik nicht mehr gebraucht, kann bleiben
    availability: {
        type: [
            {
                speciality: {type: String, required: true},
                date: {type: String, required: true},       // "YYYY-MM-DD"
                startTime: {type: String, required: true},   // "09:00"
                endTime: {type: String, required: true},     // "17:00"
                maxParticipants: {type: Number, required: true, default: 1, min: 1},
                ageGroup: {type: String, default: ""},       // z.B. "Kinder 6-10", "Erwachsene"
                bookedCount: {type: Number, default: 0, min: 0},
            },
        ],
        default: [],
    },
}, {minimize: false})

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema)
export default doctorModel