// Import the Mongoose library for database interaction
import mongoose from "mongoose";

// Define the recruiter schema, which includes several fields with different data types and validation requirements
const recruiterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
  organization_id: {
    type: String,
    required: "Organization id is required.",
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  },
});

// Define the recruiter model using the schema, with the name "student" for the collection in the database
const recruiterModel = mongoose.model("recruiter", recruiterSchema);

// Export the student model for use in other parts of the application
export default recruiterModel;
