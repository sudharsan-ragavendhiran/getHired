import Job from "../models/job.js";

/**
 * Adds a job to the database
 * @param {Object} newJob - The job object to add to the database
 * @returns {Promise} - A promise that resolves to the newly created job object
 * @author sudharsan
 */
export const addJob = (newJob) => {
  const job = new Job(newJob);
  return job.save();
};

/**
 * Filters jobs from the database based on query parameters
 * @param {Object} query - The query parameters to filter jobs by
 * @returns {Promise} - A promise that resolves to the array of filtered jobs
 * @author sudharsan
 */
export const filter = (query) => {
  const params = { ...query };
  const jobs = Job.find(params).exec();
  return jobs;
};

/**
 * Gets all jobs from the database
 * @returns {Promise} - A promise that resolves to the array of all jobs
 * @author sudharsan
 */
export const getJobs = () => {
  const jobs = Job.find({}).exec();
  return jobs;
};

/**
 * Gets a specific job by ID from the database
 * @param {string} id - The ID of the job to retrieve
 * @returns {Promise} - A promise that resolves to the retrieved job object
 * @author sudharsan
 */
export const getJobById = (id) => {
  const job = Job.findById(id).exec();
  return job;
};

/**
 * Updates a specific job by ID in the database
 * @param {Object} updatedJob - The updated job object to replace the old job object
 * @returns {Promise} - A promise that resolves to the updated job object
 * @author sudharsan
 */
export const updateJob = (updatedJob) => {
  updatedJob.modifiedDate = new Date();
  const job = Job.findByIdAndUpdate(updatedJob.id, updatedJob, {
    new: true,
  }).exec();
  return job;
};

/**
 * Deletes a specific job by ID from the database
 * @param {string} id - The ID of the job to delete
 * @returns {Promise} - A promise that resolves to the deleted job object
 * @author sudharsan
 */
export const removeJob = (id) => {
  const job = Job.findByIdAndDelete(id).exec();
  return job;
};
