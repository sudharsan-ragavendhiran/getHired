import Education from "../models/education.js";

// Method to add Education to db
export const addEducation = (newEducation) => {
    const education = new Education(newEducation);
    return education.save();
  };

export const filter = (query) => {
    const params = { ...query };
    const educations = Education.find(params).exec();
    return educations;
  };
  
  // Method to get all Educations at once from db
  export const getEducations = () => {
    const educations = Education.find({}).exec();
    return educations; // returns a promise
  };
  
  // Method to get a specific Education by id from db
  export const getEducationById = (id) => {
    const education = Education.findById(id).exec();
    return education; // returns a promise
  };
  
  // Method to update a specific Education by id in db
  export const updateEducation = (updatedEducation) => {
    const education = Education.findByIdAndUpdate(updatedEducation.id, updatedEducation, {new:true}).exec();
    return education; // returns a promise
  };
  
  // Method to delete a specific Education by id from db
  export const removeEducation = (id) => {
    const education = Education.findByIdAndDelete(id).exec();
    return education; // returns a promise
  };