// Importing the Mongoose library
import mongoose from "mongoose";

// Defining the event schema
const eventSchema = new mongoose.Schema({
  event_title: {
    type: String,
    default: "Event title is required", // Default value for event title field
  },
  event_organizer: {
    type: String,
    required: "Event organizer is required.", // Error message if event organizer field is not present
  },
  event_organizerId: {
    type: String,
    required: "Event organizer Id is required.", // Error message if event organizer Id field is not present
  },
  event_type: {
    type: String,
    enum: ["NETWORKING", "CAREER FAIR", "WORKSHOP"], // Possible values for event type field
    required: "Event type is required.", // Error message if event type field is not present
  },
  event_location: {
    latitude: {
      type: Number,
      required: "Latitude is required.", // Error message if latitude field is not present
    },
    longitude: {
      type: Number,
      required: "Longitude is required.", // Error message if longitude field is not present
    },
  },
  event_description: {
    type: String,
    required: "Event description is required.", // Error message if event description field is not present
  },
  no_of_seats: {
    type: Number,
    required: "No of seats is required.", // Error message if no of seats field is not present
  },
  event_date: {
    type: Date,
    required: "Date of the Event is required.", // Error message if event date field is not present
  },
  recruiter_id: {
    type: String,
    required: "Student Id is required.", // Error message if recruiter id field is not present
  },
  event_post_date: {
    type: Date,
    default: Date.now(), // Default value for event post date field
  },
});

// Creating model from the schema using mongoose
const eventModel = mongoose.model("event", eventSchema);

// Exporting the model
export default eventModel;
