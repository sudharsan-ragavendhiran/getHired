// Import Mongoose to connect to MongoDB
import mongoose from "mongoose";
// Create a review schema using Mongoose
const reviewSchema = new mongoose.Schema({
  // Define the name field as a required string
  name: {
    type: String,
    required: "Name is required.",
  },
  // Define the organization ID field as a required string
  organizationId: {
    type: String,
    required: "OrganizationId is required.",
  },
  // Define the review field as a required string
  review: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model for the review schema
const reviewModel = mongoose.model("review", reviewSchema);
// Export the Mongoose model as the default module
export default reviewModel;
