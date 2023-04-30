import express from "express";
import * as LoginController from "../controllers/login-controller.js";

const router = express.Router();

router
  .route("/login") 
  .post(LoginController.login); 

router
  .route("/refresh") 
  .post(LoginController.refresh); 

router
  .route("/logout") 
  .post(LoginController.logout); 
 
  export default router;