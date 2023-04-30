import Recruiter from "../models/recruiter.js";

// Method to add Recruiter to db
export const addRecruiter = (newRecruiter) => {
    const recruiter = new Recruiter(newRecruiter);
    return recruiter.save();
  };
  
  // Method to get all Recruiters at once from db
  export const getRecruiters = () => {
    const recruiters = Recruiter.find({}).exec();
    return recruiters; // returns a promise
  };
  
  // Method to get a specific Recruiter by id from db
  export const getRecruiterById = (id) => {
    const recruiter = Recruiter.findById(id).exec();
    return recruiter; // returns a promise
  };
  
  // Method to update a specific Recruiter by id in db
  export const updateRecruiter = (updatedRecruiter) => {
    const recruiter = Recruiter.findByIdAndUpdate(updatedRecruiter.id, updatedRecruiter, {new:true}).exec();
    return recruiter; // returns a promise
  };
  
  // Method to delete a specific Recruiter by id from db
  export const removeRecruiter = (id) => {
    const recruiter = Recruiter.findByIdAndDelete(id).exec();
    return recruiter; // returns a promise
  };