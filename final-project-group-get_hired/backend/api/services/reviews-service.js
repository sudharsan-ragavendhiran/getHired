import Review from "../models/review.js";

export const filter = (query) => {
  const params = { ...query };
  const reviews = Review.find(params).exec();
  return reviews;
};

// Method to add Review to db
export const addReview = (newReview) => {
  const review = new Review(newReview);
  return review.save();
};

// Method to get all Reviews at once from db
export const getReviews = () => {
  const reviews = Review.find({}).exec();
  return reviews; // returns a promise
};

// Method to get a specific Review by id from db
export const getReviewById = (id) => {
  const review = Review.findById(id).exec();
  return review; // returns a promise
};

// Method to update a specific Review by id in db
export const updateReview = (updatedReview) => {
  const review = Review.findByIdAndUpdate(updatedReview.id, updatedReview, {
    new: true,
  }).exec();
  return review; // returns a promise
};

// Method to delete a specific Review by id from db
export const removeReview = (id) => {
  const review = Review.findByIdAndDelete(id).exec();
  return review; // returns a promise
};
