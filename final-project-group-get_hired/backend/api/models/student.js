// Import the Mongoose library for database interaction
import mongoose from "mongoose";

// Define the student schema, which includes several fields with different data types and validation requirements
const studentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  interests: {
    type: String
  },
  nuid: {
    type: String,
    required: true,
    trim: true,
  },
  gpa: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
  resumeKey: {
    type: String,
  },
});

// Define the student model using the schema, with the name "student" for the collection in the database
const studentModel = mongoose.model("student", studentSchema);

// Export the student model for use in other parts of the application
export default studentModel;
