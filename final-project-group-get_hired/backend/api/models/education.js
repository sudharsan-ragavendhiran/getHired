import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
  student_id:{
        type: String,
        required: "Id is required.",
  },
  university: {
    type: String,
    required: "University name is required.",
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
  major: {
    type: String,
    required: "major is required.",
  },
  gpa :{
    type: Number,
    required : "gpa is required."
},
});

// Creating model from the schema using mongoose
const educationModel = mongoose.model("education", educationSchema);
// Exporting the model
export default educationModel;