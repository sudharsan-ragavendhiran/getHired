import * as eventsService from "./../services/events-service.js";

/**
 *
 *  @param {*} err error to be sent back
 *  @param {*} response the response object
 *  @param {*} code the status code to be sent back
 * @author sudharsan
*/
const setError = (error, response) => {
  response.status(500);
  response.json(error);
};

/**
 *
 * @param {*} obj the body to be sent back as response
 * @param {*} response the response object
 * @param {*} code  the status code to be sent back
 * @author sudharsan
*/
const setResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};


/**
 * Post a event
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
 */
export const createEvent = async (request, response) => {
  try {
    const payload = request.body;
    const event = await eventsService.addEvent(payload);
    setResponse(event, response);
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Get all events
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
 */
export const getAllEvents = async (request, response) => {
  try {
    const recruiterId = request.query.recruiter_id;
    const event_type = request.query.event_type
      ? request.query.event_type.split(";")
      : undefined;
    const search = request.query.searchText;
    const query = {};
    if (recruiterId) {
      query.recruiter_id = recruiterId;
    }
    if (event_type) {
      query.event_type = event_type;
    }
    if (search) {
      query.event_title = { $regex: search, $options: "i" };
    }
    
    if (query) {
      const events = await eventsService.filter(query);
      setResponse(events, response);
    }
   
    else {
      const events = await eventsService.getEvents();
      setResponse(events, response);
    }
  } catch (error) {
    setError(error, response);
  }
};

/**
 * Get a event by id
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const get = async (request, response) => {
  try {
    const id = request.params.id;
    const event = await eventsService.get(id);
    setResponse(event, response);
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setError(error, response);
  }
};

/**
 * Update a event
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const update = async (request, response) => {
  try {
    const id = request.params.id;
    const updated = { ...request.body }; // fetching the fields to be updated from the request body
    updated.id = id;
    const event = await eventsService.update(updated, { new: true });
    setResponse(event, response);
  } catch (error) {
    error.message = "Something went wrong. Check the request body";
    error.status = 500;
    setError(error, response);
  }
};

/**
 * delete a event
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const remove = async (request, response) => {
  try {
    const id = request.params.id;
    const event = await eventsService.remove(id);
    setResponse(
      { message: `Successfully Removed Event ${id}` },
      response
    );
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setError(error, response);
  }
};

/**
 * Get a event by id (student)
 * @param {*} req request object
 * @param {*} res response object
 * @author sudharsan
*/
export const getEventsByStudentId = async (request, response) => {
  try {
    const id = request.params.id; // student_id

    const eventsAll = await eventsService.getEvents();

    console.log(eventsAll);
    const eventsByStudentId = eventsAll.filter(
      (event) => event.student_id === id
    );
    const eventIds = eventsByStudentId.map((event) => event._id);
  
    const promises = eventIds.map((eventId) => {
      return getEventById(eventId);
    });
    console.log(promises, "promises");

    let events = await Promise.all(promises);
    setResponse(events, response);
  } catch (error) {
    error.message = "Invalid Event ID requested";
    error.status = 400;
    setError(error, response);
  }
};

const getEventById = async (eventId) => {
  const event = await eventsService.get(eventId);
  return event;
};
