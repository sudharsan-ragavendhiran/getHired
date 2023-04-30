// Importing the Express framework
import express from "express";

// Importing controller methods to route URLs to corresponding methods
import * as JobsController from "./../controllers/jobs-controller.js";

// Creating a new router instance
const router = express.Router();

// Setting up routes for /jobs URL
router.route("/jobs")
  .post(JobsController.postJob) // Route for creating a new job
  .get(JobsController.getAllJobs); // Route for retrieving all jobs

// Setting up routes for /jobs/:id URL
router.route("/jobs/:id")
  .get(JobsController.getJobById) // Route for retrieving a job by its ID
  .put(JobsController.updateJob) // Route for updating a job by its ID
  .delete(JobsController.removeJob); // Route for deleting a job by its ID

// Exporting the router instance to be used by the application
export default router;
