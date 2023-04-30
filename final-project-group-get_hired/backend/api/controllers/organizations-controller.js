import * as organizationsService from "./../services/organizations-service.js";

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
 * Post a org
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
 */
export const postOrganization = async (req, res) => {
  try {
    const payload = req.body;
    const organization = await organizationsService.addOrganization(payload);
    setResponse(organization, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * Get all orgs
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
 */
export const getAllOrganizations = async (req, res) => {
  try {
    const organization = await organizationsService.getOrganizations();
    setResponse(organization, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * Get a org by id
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const getOrganizationById = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await organizationsService.getOrganizationById(id);
    setResponse(organization, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * Update a org
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const updateOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    const updated = { ...req.body };
    updated.id = id;
    // We pass the updated object to the service
    const organization = await organizationsService.updateOrganization(updated);
    setResponse(organization, res);
  } catch (err) {
    setError(err, res);
  }
};

/**
 * delete a org
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const removeOrganization = async (req, res) => {
  try {
    const id = req.params.id;
    const organization = await organizationsService.removeOrganization(id);
    // As delete doesn't return anything we create a custom object to return
    setResponse(
      { message: `The organization with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setError(err, res);
  }
};
