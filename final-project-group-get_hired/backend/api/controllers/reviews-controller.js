// Importing the reviews service module
import * as reviewService from "./../services/reviews-service.js";

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

// Method to post Review using the post service
export const postReview = async (req, res) => {
  try {
    const payload = req.body;
    const review = await reviewService.addReview(payload);
    setSuccessResponse(review, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Reviews using the get service
export const getAllReviews = async (req, res) => {
  const organizationId = req.query.organizationId;
  const query = {};
  if (organizationId) {
    query.organizationId = organizationId;
  }
  if (query) {
    try {
      const reviews = await reviewService.filter(query);
      setSuccessResponse(reviews, res);
    } catch (err) {
      setErrorResponse(err, res);
    }
  } else {
    try {
      const reviews = await reviewService.getReviews();
      setSuccessResponse(reviews, res);
    } catch (err) {
      setErrorResponse(err, res);
    }
  }
};

// Method to get Review by id using the getById service
export const getReviewById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewService.getReviewById(id);
    setSuccessResponse(review, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update Review using the update service
export const updateReview = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    update.id = id;
    // We pass the updated object to the service
    let review = await reviewService.updateReview(update);
    setSuccessResponse(review, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove Review using the remove service
export const removeReview = async (req, res) => {
  try {
    const id = req.params.id; // getting review id from request parameter
    const review = await reviewService.removeReview(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Review with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
