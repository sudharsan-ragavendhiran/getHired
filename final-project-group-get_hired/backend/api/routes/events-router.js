// Importing the Express framework
import express from "express";
// Importing controller methods to route URLs to corresponding methods
import * as EventsController from "./../controllers/events-controller.js";

// Creating a new router instance
const router = express.Router();


// Setting up routes for /events URL
router
  .route("/events") // Entry Route
  .post(EventsController.createEvent) // Route for creating a new event
  .get(EventsController.getAllEvents); // Route for retrieving all events

// Setting up routes for /events/:id URL
router
  .route("/events/:id") // Entry Route
  .get(EventsController.get) // Route for retrieving a event by its ID
  .put(EventsController.update) // Route for updating a event by its ID
  .delete(EventsController.remove) // Route for deleting a event by its ID

// Setting up routes for student/events/:id URL
router
  .route("/student/events/:id")
  .get(EventsController.getEventsByStudentId) // Route for retrieving a event by its ID

// Exporting the router instance to be used by the application  
export default router;
