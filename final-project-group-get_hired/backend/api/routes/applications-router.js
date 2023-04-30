import express from "express";
// Imported controller methods to route urls to methods
import * as ApplicationsController from "./../controllers/applications-controller.js";

const router = express.Router();


router
  .route("/applications") // Entry Route
  .post(ApplicationsController.createApplication) // Get Route
  .get(ApplicationsController.getAllApplications); // Post Route


//Entry route for applications by id
router
  .route("/applications/:id") // Entry Route
  .get(ApplicationsController.getApplication) // Get Route
  .put(ApplicationsController.update) // Put Route
  .delete(ApplicationsController.remove); // Delete Route

//Entry route for student applications by student id
router
  .route("/student/applications/:id")
  .get(ApplicationsController.getApplicationsByStudentId) // Get Route


 
export default router;
