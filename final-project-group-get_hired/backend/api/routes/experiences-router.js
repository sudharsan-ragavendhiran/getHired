import express from "express";
// Imported controller methods to route urls to methods
import * as ExperiencesController from "../controllers/experiences-controller.js";

const router = express.Router();

router
  .route("/experiences") // Entry Route
  .post(ExperiencesController.postExperience) // Post Route
  .get(ExperiencesController.getAllExperiences); // Get Route

router
  .route("/experiences/:id") // Entry Route
  .get(ExperiencesController.getExperienceById) // Get by id Route
  .put(ExperiencesController.updateExperience) // Update by id Route
  .delete(ExperiencesController.removeExperience); // Delete by id Route

export default router;
