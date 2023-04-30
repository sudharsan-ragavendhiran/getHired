import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  student_id:{
        type: String,
        required: true,
  },
  title: {
    type: String,
    default: "Designation is required.",
  },
  employer_name: {
    type: String,
    required: "Employer name is required.",
  },
  start_date: {
    type: Date,
    required: "Start date is required.",
  },
  end_date: {
    type: Date,
    required: "End date is required.",
  },
  location: {
    type: String,
    required: "Location is required.",
  },
  description: {
    type: String,
    required: "Description is required.",
  },
});

// Creating model from the schema using mongoose
const experienceModel = mongoose.model("experience", experienceSchema);
// Exporting the model
export default experienceModel;