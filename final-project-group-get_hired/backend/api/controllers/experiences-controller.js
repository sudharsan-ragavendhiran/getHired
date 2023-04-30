import * as experienceService from "./../services/experiences-service.js";

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

// Method to post Experience using the post service
export const postExperience = async (req, res) => {
  try {
    const payload = req.body;
    const experience = await experienceService.addExperience(payload);
    setSuccessResponse(experience, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Experiences using the get service
export const getAllExperiences = async (req, res) => {
  try {
    const studentId = req.query.student_id;
    const query = {}

    if (studentId) {
      query.student_id = studentId;
    }
    if(query) {
        const experiences = await experienceService.filter(query);
        setSuccessResponse(experiences, res);
    } else {
      const experiences = await experienceService.getExperiences();
      setSuccessResponse(experiences, res);
    }  
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Experience by id using the getById service
export const getExperienceById = async (req, res) => {
  try {
    const id = req.params.id;
    const experience = await experienceService.getExperienceById(id);
    setSuccessResponse(experience, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update Experience using the update service
export const updateExperience = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    update.id = id;
    // We pass the updated object to the service
    let experience = await experienceService.updateExperience(update);
    setSuccessResponse(experience, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove Experience using the remove service
export const removeExperience = async (req, res) => {
  try {
    const id = req.params.id;
    const experience = await experienceService.removeExperience(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Experience with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
