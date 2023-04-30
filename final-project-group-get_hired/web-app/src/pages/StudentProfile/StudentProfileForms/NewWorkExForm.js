import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import Navbar from "../../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import classes from "./StudentProfileForm.module.scss";

const NewWorkExForm = () => {
  let { state } = useLocation();
  const [title, setTitle] = useState(state.workEx ? state.workEx.title : "");
  const [employerName, setEmployerName] = useState(
    state.workEx ? state.workEx.employer_name : ""
  );
  const [startDate, setStartDate] = useState(
    state.workEx ? dateFormat(state.workEx.start_date, "yyyy-mm-dd") : ""
  );
  const [endDate, setEndDate] = useState(
    state.workEx ? dateFormat(state.workEx.end_date, "yyyy-mm-dd") : ""
  );
  const [location, setLocation] = useState(
    state.workEx ? state.workEx.location : ""
  );
  const [description, setDescription] = useState(
    state.workEx ? state.workEx.description : ""
  );
  const nav = useNavigate();
  let user = useSelector((state) => state.auth.user);

  const handleFormSubmit = async () => {
    let workEx = {
      student_id: `${user._id}`,
      title: title,
      employer_name: employerName,
      start_date: startDate,
      end_date: endDate,
      location: location,
      description: description,
    };

    const addWorkEx = async (workEx) => {
      return await axios({
        method: "POST",
        url: `http://localhost:9000/experiences`,
        data: workEx,
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
    addWorkEx(workEx);
    handleWorkExDiagClose();
  };

  const handleWorkExDiagClose = () => {
    nav(`/StudentProfile/${user._id}`);
  };

  const handleFormUpdate = async () => {
    let workEx = {
      student_id: `${user._id}`,
      title: title,
      employer_name: employerName,
      start_date: startDate,
      end_date: endDate,
      location: location,
      description: description,
    };

    const updateWorkEx = async (workEx) => {
      return await axios({
        method: "PUT",
        url: `http://localhost:9000/experiences/${state.workEx._id}`,
        data: workEx,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
          authorization: `bearer ${user._id}`,
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.response.data));
    };
    updateWorkEx(workEx);
    handleWorkExDiagClose();
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
          placeholder="Enter Title"
          className={classes.formInputs}
          label="Title"
          margin="dense"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          placeholder="Enter Employer"
          className={classes.formInputs}
          label="Employer"
          margin="dense"
          variant="outlined"
          value={employerName}
          onChange={(e) => setEmployerName(e.target.value)}
        />

        <TextField
          className={classes.formInputs}
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true, required: true }}
          margin="dense"
          variant="outlined"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          className={classes.formInputs}
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true, required: true }}
          margin="dense"
          variant="outlined"
          value={endDate}
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

        <TextField
          placeholder="Enter Description"
          className={classes.formInputs}
          label="Description"
          margin="dense"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <Button onClick={state.workEx ? handleFormUpdate : handleFormSubmit}>
          {state.workEx ? "Update" : "Submit"}
        </Button>
      </form>
      <div>
        <Button onClick={handleWorkExDiagClose}>Close</Button>
      </div>
    </div>
        </div>
      </div>
    </div>
    
  );
};

export default NewWorkExForm;
