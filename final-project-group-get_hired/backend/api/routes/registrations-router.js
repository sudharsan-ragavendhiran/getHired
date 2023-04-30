import express from "express";
// Imported controller methods to route urls to methods
import * as RegistrationsController from "./../controllers/registrations-controller.js";

const router = express.Router();

router
  .route("/registrations") // Entry Route
  .post(RegistrationsController.createRegistration)
  .get(RegistrationsController.getAllRegistrations); // Post Route

router
  .route("/registrations/:id") // Entry Route
  .get(RegistrationsController.getRegistration)
  .put(RegistrationsController.update)
  .delete(RegistrationsController.remove);

router
  .route("/student/registrations/:id")
  .get(RegistrationsController.getRegistrationsByStudentId); // Entry Route

export default router;
