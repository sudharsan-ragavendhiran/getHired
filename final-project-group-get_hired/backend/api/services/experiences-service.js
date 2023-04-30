import Experience from "../models/experience.js";

// Method to add Experience to db
export const addExperience = (newExperience) => {
    const experience = new Experience(newExperience);
    return experience.save();
  };
  
  // Method to get all Experiences at once from db
  export const getExperiences = () => {
    const experiences = Experience.find({}).exec();
    return experiences; // returns a promise
  };
 
  export const filter = (query) => {
    const params = { ...query };
    const experiences = Experience.find(params).exec();
    return experiences;
  };

  // Method to get a specific Experience by id from db
  export const getExperienceById = (id) => {
    const experience = Experience.findById(id).exec();
    return experience; // returns a promise
  };
  
  // Method to update a specific Experience by id in db
  export const updateExperience = (updatedExperience) => {
    const experience = Experience.findByIdAndUpdate(updatedExperience.id, updatedExperience, {new:true}).exec();
    return experience; // returns a promise
  };
  
  // Method to delete a specific Experience by id from db
  export const removeExperience = (id) => {
    const experience = Experience.findByIdAndDelete(id).exec();
    return experience; // returns a promise
  };