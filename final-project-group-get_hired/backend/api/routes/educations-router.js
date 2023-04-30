import express from "express";
// Imported controller methods to route urls to methods
import * as EducationController from "../controllers/educations-controller.js";


const router = express.Router();

router
  .route("/educations") // Entry Route
  .post(EducationController.postEducation) // Post Route
  .get(EducationController.getAllEducation); // Get Route

router
  .route("/educations/:id") // Entry Route
  .get(EducationController.getEducationById) // Get by id Route
  .put(EducationController.updateEducation) // Update by id Route
  .delete(EducationController.removeEducation); // Delete by id Route

export default router;
