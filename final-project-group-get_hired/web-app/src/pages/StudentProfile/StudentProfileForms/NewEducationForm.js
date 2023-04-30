import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import Navbar from "../../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import classes from "./StudentProfileForm.module.scss";
import { PROGRAMS } from "../../../utilities/constants";

// Add css file here

const NewEducationForm = (props) => {
  // const user = useSelector(state => state.auth.user);
  let { state } = useLocation();
  const [uni, setUni] = useState(
    state.education ? state.education.university : ""
  );
  const [major, setMajor] = useState(
    state.education ? state.education.major : ""
  );
  const [gpa, setGpa] = useState(state.education ? state.education.gpa : "");
  const [startDate, setStartDate] = useState(
    state.education ? dateFormat(state.education.start_date, "yyyy-mm-dd") : ""
  );
  const [endDate, setEndDate] = useState(
    state.education ? dateFormat(state.education.end_date, "yyyy-mm-dd") : ""
  );
  const [location, setLocation] = useState(
    state.education ? state.education.location : ""
  );
  let user = useSelector((state) => state.auth.user);
  const nav = useNavigate();

  const menuMajors = PROGRAMS.map((programs) => {
    return (
      <MenuItem key={programs} value={programs}>
        {programs}
      </MenuItem>
    );
  });

  const handleFormSubmit = async () => {
    let education = {
      student_id: `${user._id}`,
      university: uni,
      start_date: startDate,
      end_date: endDate,
      location: location,
      major: major,
      gpa: gpa,
    };

    const addEducation = async (edu) => {
      return await axios({
        method: "POST",
        url: "http://localhost:9000/educations",
        data: edu,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
          authorization: `bearer ${user.token}`,
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.response.data));
    };

    addEducation(education);
    handleEduDiagClose();
  };

  const handleFormUpdate = () => {
    let education = {
      student_id: `${user._id}`,
      university: uni,
      start_date: startDate,
      end_date: endDate,
      location: location,
      major: major,
      gpa: gpa,
    };

    const updateEducation = async (edu) => {
      return await axios({
        method: "PUT",
        url: `http://localhost:9000/educations/${state.education._id}`,
        data: edu,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `bearer ${user.token}`,
          accept: "*/*",
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.response.data));
    };

    updateEducation(education);
    handleEduDiagClose();
  };

  const handleEduDiagClose = () => {
    nav(`/StudentProfile/${user._id}`);
  };

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-vertical">
        <div className="ly-1-4-bd-sec-left">
          <Navbar />
        </div>
        <div className="ly-1-4-bd-sec-right">
        <div className={classes.formContainer}>
      <form>
        <h3>Add Experience Here</h3>

        <TextField
          placeholder="Enter University"
          className={classes.formInputs}
          label="University"
          margin="dense"
          variant="outlined"
          value={uni}
          onChange={(e) => setUni(e.target.value)}
        />

        <div className={classes.selectSection}>
          <FormControl className={classes.selectInput}>
            <InputLabel id="lbl-major">Major</InputLabel>
            <Select
              labelId="major"
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              label="Major"
              margin="dense"
              variant="outlined"
              placeholder="Enter major"
            >
              {menuMajors}
            </Select>
          </FormControl>
        </div>

        <TextField
          placeholder="Enter GPA"
          className={classes.formInputs}
          label="GPA"
          type="number"
          margin="dense"
          variant="outlined"
          value={gpa}
          step={0.01}
          onChange={(e) => setGpa(e.target.value)}
        />

        <TextField
          className={classes.formInputs}
          label="Start Date"
          type="date"
          margin="dense"
          variant="outlined"
          InputLabelProps={{ shrink: true, required: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          className={classes.formInputs}
          label="End Date"
          type="date"
          margin="dense"
          variant="outlined"
          value={endDate}
          InputLabelProps={{ shrink: true, required: true }}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <TextField
          placeholder="Enter Location"
          className={classes.formInputs}
          label="Location"
          margin="dense"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <Button onClick={state.education ? handleFormUpdate : handleFormSubmit}>
          {state.education ? "Update" : "Submit"}
        </Button>
      </form>
      <div>
        <Button onClick={handleEduDiagClose}>Close</Button>
      </div>
    </div>
        </div>
      </div>
    </div>
    
  );
};

export default NewEducationForm;
