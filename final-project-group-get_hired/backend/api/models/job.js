import mongoose from "mongoose"; // Importing the Mongoose library

// Defining the job schema
const jobSchema = new mongoose.Schema({
  job_status: { // Status of the job
    type: String,
    enum: ["ACTIVE", "CLOSED"], // Only two values allowed, ACTIVE or CLOSED
    default: "ACTIVE", // Default value is ACTIVE
  },
  job_title: { // Title of the job
    type: String,
    required: "Job title is required.", // Error message displayed if title is not provided
  },
  job_description: { // Description of the job
    type: String,
    required: "Job description is required.", // Error message displayed if description is not provided
  },
  job_responsibilities: { // Responsibilities associated with the job
    type: String,
    required: "Job responsibilities are required.", // Error message displayed if responsibilities are not provided
  },
  job_type: { // Type of job
    type: String,
    enum: ["FULL-TIME", "PART-TIME", "INTERNSHIP"], // Only three values allowed, FULL-TIME, PART-TIME, or INTERNSHIP
    default: "INTERNSHIP", // Default value is INTERNSHIP
  },
  job_location: { // Location of the job
    type: String,
    required: "Job location is required", // Error message displayed if location is not provided
  },
  job_salary: { // Salary of the job
    type: Number,
    required: "Salary is required.", // Error message displayed if salary is not provided
  },
  job_category: { // Category of the job
    type: String,
  },
  job_deadline: { // Deadline of the job posting
    type: Date,
    required: "Job deadline is required.", // Error message displayed if deadline is not provided
  },
  recruiterId: { // ID of the recruiter associated with the job posting
    type: String,
    required: "Recruiter id is required.", // Error message displayed if recruiter ID is not provided
  },
  organization_id: { // ID of the organization associated with the job posting
    type: String,
    required: "Organization id is required.", // Error message displayed if organization ID is not provided
  },
  organizationName: { // Name of the organization associated with the job posting
    type: String,
    required: "Organization Name is required.", // Error message displayed if organization name is not provided
  },
  job_post_date: { // Date when the job posting was created
    type: Date,
    default: Date.now(), // Default value is the current date and time
  },
});

// Creating a model using the job schema
const jobModel = mongoose.model("job", jobSchema);

// Exporting the job model
export default jobModel;
