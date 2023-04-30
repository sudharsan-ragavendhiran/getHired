import * as educationService from "../services/educations-service.js";

// Setting Error Response for any errors
const setErrorResponse = (err, res) => {
  res.status(500);
  res.json(err);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

// Method to post Education using the post service
export const postEducation = async (req, res) => {
  try {
    const payload = req.body;
    const education = await educationService.addEducation(payload);
    setSuccessResponse(education, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Educations using the get service
export const getAllEducation = async (req, res) => {
  try {
    const studentId = req.query.student_id;
    const query = {}

    if (studentId) {
      query.student_id = studentId;
    }
    if(query) {
        const educations = await educationService.filter(query);
        setSuccessResponse(educations, res);
    } else {
      const educations = await educationService.getEducations();
      setSuccessResponse(educations, res);
    }
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Education by id using the getById service
export const getEducationById = async (req, res) => {
  try {
    const id = req.params.id;
    const education = await educationService.getEducationById(id);
    setSuccessResponse(education, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update Education using the update service
export const updateEducation = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    update.id = id;
    // We pass the updated object to the service
    let education = await educationService.updateEducation(update);
    setSuccessResponse(education, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove Education using the remove service
export const removeEducation = async (req, res) => {
  try {
    const id = req.params.id;
    const education = await educationService.removeEducation(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Education with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
