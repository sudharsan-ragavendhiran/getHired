import Project from "../models/project.js";

// Method to add Project to db
export const addProject = (newProject) => {
    const project = new Project(newProject);
    return project.save();
  };
  
export const filter = (query) => {
    const params = { ...query };
    const project = Project.find(params).exec();
    return project;
  };

  // Method to get all Projects at once from db
  export const getProjects = () => {
    const projects = Project.find({}).exec();
    return projects; // returns a promise
  };
  
  // Method to get a specific Project by id from db
  export const getProjectById = (id) => {
    const project = Project.findById(id).exec();
    return project; // returns a promise
  };
  
  // Method to update a specific Project by id in db
  export const updateProject = (updatedProject) => {
    const project = Project.findByIdAndUpdate(updatedProject.id, updatedProject, {new:true}).exec();
    return project; // returns a promise
  };
  
  // Method to delete a specific Project by id from db
  export const removeProject = (id) => {
    const project = Project.findByIdAndDelete(id).exec();
    return project; // returns a promise
  };