// Importing the mongoose library for creating MongoDB schemas and models
import mongoose from "mongoose";

// Defining the organization schema for MongoDB
const orgSchema = new mongoose.Schema({
  // Defining the organizationLogo property as a string data type
  organizationLogo: {
    type: String,
  },
  // Defining the organizationName property as a string data type that is required
  organizationName: {
    type: String,
    required: "Organization name is required.",
  },
  // Defining the aboutUs property as a string data type
  aboutUs: {
    type: String,
  },
  // Defining the sponsorship property as a boolean data type that is required
  sponsorship: {
    type: Boolean,
    required: "Please specify if the organization provides sponsorship",
  },
});

// Creating an organization model using the organization schema
const orgModel = mongoose.model("organization", orgSchema);

// Exporting the organization model as the default module
export default orgModel;
