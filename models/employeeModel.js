const mongoose = require("mongoose")

const EmployeeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        maxLength: 15,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    role: {
        type: String,
        trim: true,
        maxLength: 20,
        required: true,
    }
}, {
    timestamps: true,
})

const EmployeeModel = mongoose.model("Employee", EmployeeSchema)

module.exports = EmployeeModel