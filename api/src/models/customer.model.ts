import mongoose from "mongoose";

// Name, email, password, rides

const cutsomerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        default: ""
    },
    currentStatus: {
        type: String,
        enum: ["Idle", "Waiting", "Rejected", "Approved", "Started", "Finished"],
        default: "Idle"
    },
    rides: {
        type: Array,
        default: [],
    }
})

const Cutsomer = mongoose.model("cutsomer", cutsomerSchema);

export default Cutsomer;