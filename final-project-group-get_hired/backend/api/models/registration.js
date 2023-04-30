/**

This file defines the Mongoose schema and model for a registration document
that represents the registration of a student for an event.
*/
import mongoose from "mongoose";

// Define the schema for a registration document
const registrationSchema = new mongoose.Schema({
  event_id: {
    type: String,
    required: "Event Id is required.",
  },
  student_id: {
    type: String,
    required: "Student Id is required.",
  },
  registration_date: {
    type: Date,
    default: Date.now(),
  },
  last_modified_date: {
    type: Date,
    default: Date.now(),
  },
});

// Create a model from the registration schema using mongoose
const RegistrationModel = mongoose.model("registrations", registrationSchema);

// Export the RegistrationModel for use in other modules
export default RegistrationModel;
