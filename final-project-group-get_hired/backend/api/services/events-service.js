import Event from "../models/event.js";

/**
 * Adds a event to the database
 * @param {Object} newEvent - The event object to add to the database
 * @returns {Promise} - A promise that resolves to the newly created event object
 * @author sudharsan
 */
export const addEvent = (newEvent) => {
  const event = new Event(newEvent);
  return event.save();
};

/**
 * Gets all events from the database
 * @returns {Promise} - A promise that resolves to the array of all events
 * @author sudharsan
 */
export const getEvents = () => {
  const events = Event.find({}).exec();
  return events;
};

/**
 * Filters events from the database based on query parameters
 * @param {Object} query - The query parameters to filter events by
 * @returns {Promise} - A promise that resolves to the array of filtered events
 * @author sudharsan
 */
export const filter = (query) => {
  const params = { ...query };
  const events = Event.find(params).exec();
  return events;
};

/**
 * Gets a specific event by ID from the database
 * @param {string} id - The ID of the event to retrieve
 * @returns {Promise} - A promise that resolves to the retrieved event object
 * @author sudharsan
 */
export const get = (id) => {
  const event = Event.findById(id).exec();
  return event;
};

/**
 * Updates a specific event by ID in the database
 * @param {Object} updatedEvent - The updated event object to replace the old event object
 * @returns {Promise} - A promise that resolves to the updated event object
 * @author sudharsan
 */
export const update = (updatedEvent) => {
  // updatedEvent.lastModifiedDate = new Date();
  const event = Event.findByIdAndUpdate(updatedEvent.id, updatedEvent, {
    new: true,
  }).exec();
  return event;
};

/**
 * Deletes a specific event by ID from the database
 * @param {string} id - The ID of the event to delete
 * @returns {Promise} - A promise that resolves to the deleted event object
 * @author sudharsan
 */
export const remove = (id) => {
  const event = Event.findByIdAndDelete(id).exec();
  return event;
};
