import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import Navbar from "../../../components/navbar/Navbar";
import classes from "./StudentProfileForm.module.scss";
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
// Add css file here

const NewProjectForm = (props) => {
  // const user = useSelector(state => state.auth.user);
  //const [eduBool, setEduBool] = useState(false);
  let { state } = useLocation();
  const [project_title, setTitle] = useState(
    state.project ? state.project.project_title : ""
  );
  const [startDate, setStartDate] = useState(
    state.project ? dateFormat(state.project.start_date, "yyyy-mm-dd") : ""
  );
  const [endDate, setEndDate] = useState(
    state.project ? dateFormat(state.project.end_date, "yyyy-mm-dd") : ""
  );
  const [location, setLocation] = useState(
    state.project ? state.project.location : ""
  );
  const [project_description, setDescription] = useState(
    state.project ? state.project.project_description : ""
  );
  const nav = useNavigate();
  let user = useSelector((state) => state.auth.user);

  const handleFormSubmit = async () => {
    let project = {
      student_id: `${user._id}`,
      project_title: project_title,
      start_date: startDate,
      end_date: endDate,
      location: location,
      project_description: project_description,
    };

    const addProject = async (project) => {
      return await axios({
        method: "POST",
        url: `http://localhost:9000/projects`,
        data: project,
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
    addProject(project);
    handleProjDiagClose();
  };

  const handleProjDiagClose = () => {
    nav(`/StudentProfile/${user._id}`);
  };

  const handleFormUpdate = async () => {
    let project = {
      student_id: `${user._id}`,
      project_title: project_title,
      start_date: startDate,
      end_date: endDate,
      location: location,
      project_description: project_description,
    };

    const updateProject = async (project) => {
      return await axios({
        method: "PUT",
        url: `http://localhost:9000/projects/${state.project._id}`,
        data: project,
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
    updateProject(project);
    handleProjDiagClose();
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
        <div className="new-project__controls">
          <h3>Add Project Details Here</h3>

          <TextField
            placeholder="Enter Title"
            className={classes.formInputs}
            label="Title"
            margin="dense"
            variant="outlined"
            value={project_title}
            onChange={(e) => setTitle(e.target.value)}
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
            placeholder="Enter Project Description"
            className={classes.formInputs}
            label="Project Description"
            margin="dense"
            variant="outlined"
            value={project_description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button onClick={state.project ? handleFormUpdate : handleFormSubmit}>
          {state.project ? "Update" : "Submit"}
        </Button>
      </form>
      <div>
        <Button onClick={handleProjDiagClose}>Close</Button>
      </div>
    </div>
        </div>
        </div>
        </div>
    
  );
};

export default NewProjectForm;
