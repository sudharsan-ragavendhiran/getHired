// Importing the Mongoose library for interacting with MongoDB
import mongoose from "mongoose";

// Defining the schema for the project data
const projectSchema = new mongoose.Schema({
  // The ID of the student who created the project
  student_id: {
    type: String,
    required: [true, "Student ID is required."],
  },
  // The title of the project
  project_title: {
    type: String,
    required: [true, "Project title is required."],
  },
  // The location of the project
  location: {
    type: String,
  },
  // The date the project started
  start_date: {
    type: Date,
    required: [true, "Start date is required."],
  },
  // The date the project ended
  end_date: {
    type: Date,
    required: [true, "End date is required."],
  },
  // A description of the project
  project_description: {
    type: String,
    required: [true, "Project description is required."],
  },
});

// Creating a model from the schema using Mongoose
const Project = mongoose.model("Project", projectSchema);

// Exporting the model so it can be used by other parts of the application
export default Project;
