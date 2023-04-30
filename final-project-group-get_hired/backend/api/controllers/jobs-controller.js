import * as jobsService from "./../services/jobs-service.js";

/**
 *
 *  @param {*} err error to be sent back
 *  @param {*} response the response object
 *  @param {*} code the status code to be sent back
 * @author sudharsan
*/
const setError = (err, res) => {
  res.status(500);
  res.json(err);
};

/**
 *
 * @param {*} obj the body to be sent back as response
 * @param {*} response the response object
 * @param {*} code  the status code to be sent back
 * @author sudharsan
*/
const setResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

/**
 * Get all jobs
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
 */
 export const getAllJobs = async (req, res) => {
    const job_location = req.query.job_locations ? req.query.job_locations.split(';') : undefined;
    const job_type =req.query.job_types ? req.query.job_types.split(';') : undefined;
    const job_category = req.query.job_categories ? req.query.job_categories.split(';') : undefined;
    const search = req.query.searchText;
    const org_id=req.query.org_id;
    
    const query={};
  
    if (job_location) {
      query.job_location = job_location;
    }
    if (job_type) {
      query.job_type = job_type;
    }
    if (job_category) {
      query.job_category = job_category;
    }
    if (search) {
      query.job_title = { "$regex": search, "$options": "i" };
    }
    if (org_id) {
      query.organization_id = org_id;
    }
  
    if (query) {
      try {
        const job = await jobsService.filter(query);
        setResponse(job, res);
      } catch (err) {
        setError(err, res);
      }
    } else {
      try {
        const job = await jobsService.getJobs();
        setResponse(job, res);
      } catch (err) {
        setError(err, res);
      }
    }
  };


/**
 * Post a Job
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
 */
export const postJob = async (req, res) => {
  try {
    const payload = req.body;
    const job = await jobsService.addJob(payload);
    setResponse(job, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * Get a job by id
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobsService.getJobById(id);
    setResponse(job, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * Update a job
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = { ...req.body };
    updated.id = id;
    // We pass the updated object to the service
    const job = await jobsService.updateJob(updated);
    setResponse(job, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * delete a job
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const removeJob = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobsService.removeJob(id);
    // As delete doesn't return anything we create a custom object to return
    setResponse(
      { message: `The job with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setError(err, res);
  }
};