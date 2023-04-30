import Registration from "../models/registration.js";

// Method to add Registration
export const addRegistration = (newRegistration) => {
  const registration = new Registration(newRegistration);
  return registration.save();
};

export const getRegistrations = () => {
  const registrations = Registration.find({}).exec();
  return registrations;
};

export const filter = (query) => {
  const params = { ...query };
  const registrations = Registration.find(params).exec();
  return registrations;
};

//fetch a Registration based on id
export const get = (id) => {
  const registration = Registration.findById(id).exec();
  return registration;
};

//update a Registration
export const update = (updatedRegistration) => {
  // updatedRegistration.lastModifiedDate = new Date();
  const registration = Registration.findByIdAndUpdate(
    updatedRegistration.id,
    updatedRegistration,
    {
      new: true,
    }
  ).exec();
  return registration;
};

//delete a Registration
export const remove = (id) => {
  const registration = Registration.findByIdAndDelete(id).exec();
  return registration;
};
