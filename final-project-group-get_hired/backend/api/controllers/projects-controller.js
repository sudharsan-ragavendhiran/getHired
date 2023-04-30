/**

This module handles HTTP requests related to projects, utilizing the services in the projects-service module.
*/
import * as projectService from "./../services/projects-service.js";

/**

Sets an error response with a 500 status code and the provided error object as the response body.
*/

// Setting Error Response for any errors
const setErrorResponse = (err, res) => {
  res.status(500);
  res.json(err);
};

// Sets a success response with a 200 status code and the provided object as the response body.
const setSuccessResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

// Creates a new project using the provided payload, and sends a success response with the created project as the response body
export const postProject = async (req, res) => {
  try {
    const payload = req.body;
    const project = await projectService.addProject(payload);
    setSuccessResponse(project, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Retrieves all projects, or only those belonging to a specified student if a student_id query parameter is provided, and sends a success response with the retrieved projects as the response body
export const getAllProjects = async (req, res) => {
  try {
    const studentId = req.query.student_id;
    const query = {}

    if (studentId) {
      query.student_id = studentId;
    }
    if(query) {
        const projects = await projectService.filter(query);
        setSuccessResponse(projects, res);
    } else {
      const projects = await projectService.getEducations();
      setSuccessResponse(projects, res);
    }
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Retrieves the project with the specified ID and sends a success response with the retrieved project as the response body
export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectService.getProjectById(id);
    setSuccessResponse(project, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Updates the project with the specified ID using the provided update object, and sends a success response with the updated project as the response body
export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    update.id = id;
    // We pass the updated object to the service
    let project = await projectService.updateProject(update);
    setSuccessResponse(project, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Deletes the project with the specified ID, and sends a success response with a custom message as the response body
export const removeProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectService.removeProject(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Project with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
