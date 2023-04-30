// Importing the Express framework
import express from "express";

// Importing the controller methods to handle the routes
import * as OrganizationsController from "./../controllers/organizations-controller.js";

// Creating a new router instance
const router = express.Router();

// Defining a route for "/organizations" path and setting up the HTTP methods
router
  .route("/organizations")
  .post(OrganizationsController.postOrganization) // POST request
  .get(OrganizationsController.getAllOrganizations); // GET request

// Defining a route for "/organizations/:id" path and setting up the HTTP methods
router
  .route("/organizations/:id")
  .get(OrganizationsController.getOrganizationById) // GET request
  .put(OrganizationsController.updateOrganization) // PUT request
  .delete(OrganizationsController.removeOrganization); // DELETE request

// Exporting the router object as the default module
export default router;
