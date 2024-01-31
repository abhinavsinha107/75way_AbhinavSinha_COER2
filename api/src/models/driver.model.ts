import mongoose from "mongoose";

// Name, gender, Age, Mobile number, email, password, profile picture and Address, Role

const driverSchema = new mongoose.Schema({
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
    vehicleType: {
        type: String,
        enum: ["Two", "Four"],
        required: true
    },
})

const Driver = mongoose.model("driver", driverSchema);

export default Driver;