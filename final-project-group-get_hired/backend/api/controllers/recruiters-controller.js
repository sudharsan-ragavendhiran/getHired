import * as recruiterService from "./../services/recruiters-services.js";

// Setting Error Response for any errors
const setErrorResponse = (err, res) => {
  res.status(500);
  res.json(err);
};

// Setting Error Response for any errors
const setNotFoundResponse = (err, res) => {
    res.status(404);
    res.json(err);
  };

// Setting Success Response for successful execution
const setSuccessResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

// Method to post Recruiter using the post service
export const postRecruiter = async (req, res) => {
  try {
    const payload = req.body;
    const recruiter = await recruiterService.addRecruiter(payload);
    setSuccessResponse(recruiter, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Recruiters using the get service
export const getAllRecruiters = async (req, res) => {
  try {
    const recruiters = await recruiterService.getRecruiters();
    setSuccessResponse(recruiters, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Recruiter by id using the getById service
export const getRecruiterById = async (req, res) => {
  try {
    const id = req.params.id;
    const recruiter = await recruiterService.getRecruiterById(id);
    setSuccessResponse(recruiter, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update Recruiter using the update service
export const updateRecruiter = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    update.id = id;
    // We pass the updated object to the service
    let recruiter = await recruiterService.updateRecruiter(update);
    setSuccessResponse(recruiter, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove Recruiter using the remove service
export const removeRecruiter = async (req, res) => {
  try {
    const id = req.params.id;
    const recruiter = await recruiterService.removeRecruiter(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Recruiter with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
