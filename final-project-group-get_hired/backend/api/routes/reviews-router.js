import express from "express";
// Imported controller methods to route urls to methods
import * as ReviewsController from "../controllers/reviews-controller.js";

const router = express.Router();

router
  .route("/reviews") // Entry Route
  .post(ReviewsController.postReview) // Post Route
  .get(ReviewsController.getAllReviews); // Get Route

router
  .route("/reviews/:id") // Entry Route
  .get(ReviewsController.getReviewById) // Get by id Route
  .put(ReviewsController.updateReview) // Update by id Route
  .delete(ReviewsController.removeReview); // Delete by id Route

export default router;
