import * as StudentService from "./../services/students-services.js";
import jwt from "jsonwebtoken";
import * as RecruiterService from "./../services/recruiters-services.js";

// Setting Error Response for any errors
const setErrorResponse = (error, response) => {
  response.status(500);
  response.json(error);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

let refreshTokens = [];

//Generating Access Token 
const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id }, "mySecretKey", { expiresIn: "15m" }); //expiry time is 15 mins
};

//Generating Refresh Token 
const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, "myRefreshSecretKey", {
    expiresIn: "15m",   //expiry time is 15 mins
  });
};

//login method to login as student or recruiter. 
export const login = async (request, response) => {
  try {
    const { username, password, loginAs } = request.body;
    if (loginAs === "Student") {
      const students = await StudentService.getStudents();
      const student = students.find((s) => {
        return s.username === username && s.password === password;
      });
      loginStudent(student, response);
    } else if (loginAs === "Recruiter") {
      const recruiters = await RecruiterService.getRecruiters();
      const recruiter = recruiters.find((r) => {
        return r.username === username && r.password === password;
      });

      loginRecruiter(recruiter, response);
    }
  } catch (error) {
    setErrorResponse(error, response);
  }
};

//Using JWT to authentcate student
const loginStudent = async (student, response) => {
  if (student) {
    console.log(student, "found");
    //generate an access token
    const accessToken = generateAccessToken(student);
    const refreshToken = generateRefreshToken(student);
    console.log(accessToken, "  ", refreshToken);
    refreshTokens.push(refreshToken);
    response.status(200).json({
      _id: student._id,
      userName: student.username,
      emailId: student.email,
      token: accessToken,
      refreshToken: refreshToken,
      isAdmin: false,
      isStudent: true,
      student: student,
    });
    // setSuccessResponse(login, response);
  } else {
    response.status(401).json({ message: "Invalid Username or Password" });
  }
};

//Using JWT to authentcate student
const loginRecruiter = async (recruiter, response) => {
  if (recruiter) {
    console.log(recruiter, " recruiter found");
    //generate an access token
    const accessToken = generateAccessToken(recruiter);
    const refreshToken = generateRefreshToken(recruiter);
    console.log(accessToken, "  ", refreshToken);
    refreshTokens.push(refreshToken);
    response.status(200).json({
      _id: recruiter._id,
      userName: recruiter.username,
      emailId: recruiter.email,
      organizationId: recruiter.organization_id,
      token: accessToken,
      refreshToken: refreshToken,
      isAdmin: false,
      isStudent: false,
      recruiter: recruiter,
    });
    // setSuccessResponse(login, response);
  } else {
    response.status(401).json({ message: "Invalid Username or Password" });
  }
};

//verifying the access token
export const refresh = async (request, response) => {
  //take the refresh token from user
  const refreshToken = request.body.token;

  //send error if it is invalid or no token
  if (!refreshToken)
    return response.status(401).json("You are not authenticated");
  //otherwise create new access token, refresh token and send to user
  if (!refreshTokens.includes(refreshToken))
    return response.status(403).json("Refresh Token is not valid");
  jwt.verify(refreshToken, "myRefreshSecretKey", (error, student) => {
    if (error) {
      console.log(error);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    const newAccessToken = generateAccessToken(student);
    const newRefreshToken = generateRefreshToken(student);
    refreshTokens.push(newRefreshToken);
    response.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

//logout handler
export const logout = async (request, response) => {
  const refreshToken = request.body.token;
  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  response.status(200).json("You are logged out successfully");
};
