//Importing the required modules:
import express from "express";
// Imported controller methods to route urls to methods
import * as ProjectController from "../controllers/projects-controller.js";

const router = express.Router();

router
  .route("/projects") // Entry Route
  .post(ProjectController.postProject) // Post Route
  .get(ProjectController.getAllProjects); // Get Route

router
  .route("/projects/:id") // Entry Route
  .get(ProjectController.getProjectById) // Get by id Route
  .put(ProjectController.updateProject) // Update by id Route
  .delete(ProjectController.removeProject); // Delete by id Route

export default router;
