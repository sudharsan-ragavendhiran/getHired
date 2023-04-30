// Importing mongoose library for MongoDB connection and schema creation
import mongoose from "mongoose";

// Creating a schema for the application model
const applicationSchema = new mongoose.Schema({
// Defining properties of the schema and their required fields
document_id: {
type: String,
required: "Document id is required.",
},
status: {
type: String,
enum: ["APPLIED", "INTERVIEWING", "ACCEPTED", "REJECTED"],
required: "Status is required.",
},
job_id: {
type: String,
required: "Job Id is required.",
},
student_id: {
type: String,
required: "Student Id is required.",
},
student_name: {
type: String
},
student_major: {
type: String
},
student_gpa: {
type: mongoose.Schema.Types.Decimal128,
},
application_date: {
type: Date,
default: Date.now(),
},
last_modified_date: {
type: Date,
default: Date.now(),
},
});

// Creating a model from the schema using mongoose
const applicationModel = mongoose.model("applications", applicationSchema);

// Exporting the model to be used in other parts of the application
export default applicationModel;
