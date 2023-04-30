import Student from "../models/student.js";


// Method to add Student to db
export const addStudent = (newStudent) => {
    const student = new Student(newStudent);
    return student.save();
  };

  //Method to filter students
  export const filter = (query) => {
    const params = { ...query };
    const students = Student.find(params).exec();
    return students;
  };
  
  // Method to get all Students at once from db
  export const getStudents = () => {
    const students = Student.find({}).exec();
    return students; // returns a promise
  };
  
  // Method to get a specific Student by id from db
  export const getStudentById = (id) => {
    const student = Student.findById(id).exec();
    return student; // returns a promise
  };
  
  // Method to update a specific Student by id in db
  export const updateStudent = (updatedStudent) => {
    const student = Student.findByIdAndUpdate(updatedStudent.id, updatedStudent, {new:true}).exec();
    return student; // returns a promise
  };
  
  // Method to delete a specific Student by id from db
  export const removeStudent = (id) => {
    const student = Student.findByIdAndDelete(id).exec();
    return student; // returns a promise
  };