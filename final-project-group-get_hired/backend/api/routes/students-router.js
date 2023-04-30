import express from "express";
// Imported controller methods to route urls to methods
import * as StudentsController from "../controllers/students-controller.js";
import * as LoginController from "../controllers/Login-controller.js";
import { verify } from "../services/auth-service.js";


const router = express.Router();

router
  .route("/students") // Entry Route
  .post(StudentsController.postStudent) // Post Route
  .get(StudentsController.getAllStudents); // Get Route

router
  .route("/students/:id") // Entry Route
  .get(verify, StudentsController.getStudentById) // Get by id Route
  .put(StudentsController.updateStudent) // Update by id Route
  .delete(StudentsController.removeStudent); // Delete by id Route

 //new endpoint for posting resume 
router.route("/students/resume").post(StudentsController.postResume);

export default router;
