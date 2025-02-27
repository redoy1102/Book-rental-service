import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    userName:{
        type: String,
        required: [true, "User name is required"],
        trim: true,
        minLength: [2, "User name must be at least 2 characters long"],
        maxLength: [50, "User name must be at most 50 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        minLength: [5, "Email must be at least 5 characters long"],
        maxLength: [50, "Email must be at most 50 characters long"]
    },
    message: {
        type: String,
        required: [true, "Message is required"],
        trim: true,
        minLength: [5, "Message must be at least 5 characters long"],
        maxLength: [500, "Message must be at most 500 characters long"]
    }
})

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;