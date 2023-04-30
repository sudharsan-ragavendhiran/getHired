import Organization from "../models/organization.js";

/**
 * Adds a org to the database
 * @param {Object} newOrganization - The org object to add to the database
 * @returns {Promise} - A promise that resolves to the newly created org object
 * @author sudharsan
 */
export const addOrganization = (newOrganization) => {
    const organization = new Organization(newOrganization);
    return organization.save();
  };
  
/**
 * Gets all orgs from the database
 * @returns {Promise} - A promise that resolves to the array of all orgs
 * @author sudharsan
 */
  export const getOrganizations = () => {
    const organizations = Organization.find({}).exec();
    return organizations; // returns a promise
  };
  
/**
 * Gets a specific org by ID from the database
 * @param {string} id - The ID of the org to retrieve
 * @returns {Promise} - A promise that resolves to the retrieved org object
 * @author sudharsan
 */
  export const getOrganizationById = (id) => {
    const organization = Organization.findById(id).exec();
    return organization; // returns a promise
  };
  
 /**
 * Updates a specific org by ID in the database
 * @param {Object} updatedOrganization - The updated org object to replace the old org object
 * @returns {Promise} - A promise that resolves to the updated org object
 * @author sudharsan
 */
  export const updateOrganization = (updatedOrganization) => {
    const organization = Organization.findByIdAndUpdate(updatedOrganization.id, updatedOrganization, {new:true}).exec();
    return organization; // returns a promise
  };
  
/**
 * Deletes a specific org by ID from the database
 * @param {string} id - The ID of the org to delete
 * @returns {Promise} - A promise that resolves to the deleted org object
 * @author sudharsan
 */
  export const removeOrganization = (id) => {
    const organization = Organization.findByIdAndDelete(id).exec();
    return organization; // returns a promise
  };