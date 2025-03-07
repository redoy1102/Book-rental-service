import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  userName: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    minLength: [2, "User name must be at least 2 characters long"],
    maxLength: [50, "User name must be at most 50 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    minLength: [5, "Email must be at least 5 characters long"],
    maxLength: [50, "Email must be at most 50 characters long"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minLength: [5, "Message must be at least 5 characters long"],
    maxLength: [500, "Message must be at most 500 characters long"],
  },
  primaryPhoneNumber: {
    type: String,
    required: [true, "Primary phone is required"],
    trim: true,
    minLength: [10, "Primary phone must be at least 10 characters long"],
  },
  secondaryPhoneNumber: {
    type: String,
    required: [true, "Secondary phone is required"],
    trim: true,
    minLength: [10, "Secondary phone must be at least 10 characters long"],
  },
  additionalPhoneNumbers: [
    {
      number: { type: String, required: true, minLength: 5 },
      email: { type: String, required: true, minLength: 5 },
      price: {type: Number, required: true, min: 0},
    },
  ],
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;
