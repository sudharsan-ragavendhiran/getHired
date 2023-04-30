// Importing Registration and Event Services
import * as RegistrationsService from "./../services/registrations-service.js";
import * as EventsService from "./../services/events-service.js";

/**

Set error response for any errors
@param {Error} error - The error that occurred
@param {Object} response - The HTTP response object
*/
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};
//Create a new registration
export const createRegistration = async (request, response) => {
  try {
    const payload = request.body;
    const registration = await RegistrationsService.addRegistration(payload);

    setSuccessResponse(registration, response);
  } catch (error) {
    setErrorResponse(error, response);
  }
};
//Get all registrations
export const getAllRegistrations = async (request, response) => {
  try {
    const status = request.query.status;
    const studentId = request.query.studentId;
    const query = {};
    if (status) {
      query.status = status;
    }
    if (studentId) {
      query.student_id = studentId;
    }
    //when searched by query parameters, returns the Registrations requested
    if (query) {
      const registrations = await RegistrationsService.filter(query);
      setSuccessResponse(registrations, response);
    }
    //returns all existing Registrations when no query parameters are requested
    else {
      const registrations = await RegistrationsService.getRegistrations();
      setSuccessResponse(registrations, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//Get method to fetch existing Registration from the DB based on id
export const getRegistration = async (request, response) => {
  try {
    const id = request.params.id;
    const registration = await RegistrationsService.get(id);
    setSuccessResponse(registration, response);
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setErrorResponse(error, response);
  }
};

//PUT method to update existing Registration in the Db
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updated = { ...request.body }; // fetching the fields to be updated from the request body
    updated.id = id;
    const registration = await RegistrationsService.update(updated, {
      new: true,
    });
    setSuccessResponse(registration, response);
  } catch (error) {
    error.message = "Something went wrong. Check the request body";
    error.status = 500;
    setErrorResponse(error, response);
  }
};

//Delete method to remove existing event from the DB
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const registration = await RegistrationsService.remove(id);
    setSuccessResponse(
      { message: `Successfully Removed Registration ${id}` },
      response
    );
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setErrorResponse(error, response);
  }
};
//Get a registration by ID
export const getRegistrationsByStudentId = async (request, response) => {
  try {
    const id = request.params.id; // student_id
    //getall Registrations
    const registrations = await RegistrationsService.getRegistrations();
    // filter by id
    console.log(registrations);
    const registrationsByStudentId = registrations.filter(
      (registration) => registration.student_id === id
    );
    const eventIds = registrationsByStudentId.map(
      (registration) => registration.event_id
    );
    // // call Events now
    const promises = eventIds.map((eventId) => {
      return getEventById(eventId);
    });
    console.log(promises, "promises");

    let Events = await Promise.all(promises);
    setSuccessResponse(Events, response);
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setErrorResponse(error, response);
  }
};
//Get a event by ID
const getEventById = async (eventId) => {
  const event = await EventsService.get(eventId);
  return event;
};
