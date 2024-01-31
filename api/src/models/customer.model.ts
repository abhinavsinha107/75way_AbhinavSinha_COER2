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
    rides: {
        type: Array,
        default: [],
    }
})

const Cutsomer = mongoose.model("cutsomer", cutsomerSchema);

export default Cutsomer;