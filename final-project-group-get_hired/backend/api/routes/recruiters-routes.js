import express from "express";
// Imported controller methods to route urls to methods
import * as RecruitersController from "../controllers/recruiters-controller.js";

const router = express.Router();

router
  .route("/recruiters") // Entry Route
  .post(RecruitersController.postRecruiter) // Post Route
  .get(RecruitersController.getAllRecruiters); // Get Route

router
  .route("/recruiters/:id") // Entry Route
  .get(RecruitersController.getRecruiterById) // Get by id Route
  .put(RecruitersController.updateRecruiter) // Update by id Route
  .delete(RecruitersController.removeRecruiter); // Delete by id Route

export default router;
