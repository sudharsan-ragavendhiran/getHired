import {
  Button,
  TextField,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./CreateJobsPage.module.scss";
import axios from "axios";
import { JOB_CATEGORIES } from '../../utilities/constants';
import { JOB_LOCATIONS } from '../../utilities/constants';
import { JOB_TYPES } from '../../utilities/constants';
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";
import AuthService from "../../utilities/AuthService";
import Navbar from "../../components/navbar/Navbar"


function CreateJobsPage() {

  let user = useSelector((state) => state.auth.user);
  const [org, setOrg] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const checkUser = () => {
    //if user not in store
    if (!user) {
      user = AuthService.getCurrUser();

      //if user not in persistent local store
      if (!user) {
        navigate('/');
        return;
      }
      //add user to store
      dispatch(authActions.login(user));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  //fetching the recruiter organization
  useEffect(() => {
    if (user && user.recruiter) {
      const fetchOrg = async () => {
        const response = await axios.get(`http://localhost:9000/organizations/${user.recruiter.organization_id}`);
        setOrg(response.data);
      };

      fetchOrg();
    }

  }, [user])



  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [location, setLocation] = useState("");
  const [deadlineDate, setDeadlineDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState(0);


  /**
   * Function that gets called when the recruiter clicks submit
   */
  const handleSubmit = () => {
    const job = {
      job_title: title,
      job_description: desc,
      job_responsibilities: responsibilities,
      job_type: type,
      job_location: location,
      job_deadline: deadlineDate,
      job_status: "ACTIVE",
      job_salary: salary,
      recruiterId: user.recruiter._id,
      organization_id: user.recruiter.organization_id,
      organizationName: org.organizationName,
      job_post_date: new Date().toISOString().split('T')[0],
      job_category: category
    };

    const addJob = async (job) => {
      return await axios({
        method: "POST",
        url: "http://localhost:9000/jobs",
        data: job,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.data));
    };
    window.location.reload();
    addJob(job);

    setTitle("");
    setDesc("");
    setResponsibilities("");
    setLocation("");
    setCategory("");
    setDeadlineDate(new Date().toISOString().split('T')[0]);
    setType("");
    setSalary(0);
    navigate(`/dashboard-recruiter/${user.recruiter._id}`, { replace: true });
  };

  //displaying the category options for the recruiter
  const menuJobCatItems = JOB_CATEGORIES.map((category) => {
    return (
      <MenuItem key={category} value={category}>{category}</MenuItem>
    )
  })

  //displaying the location options for the recruiter
  const menuJobLocItems = JOB_LOCATIONS.map((location) => {
    return (
      <MenuItem key={location} value={location}>{location}</MenuItem>
    )
  })

  //displaying the job type options for the recruiter
  const menuJobTypeItems = JOB_TYPES.map((type) => {
    return (
      <MenuItem key={type} value={type}>{type}</MenuItem>
    )
  })

  const handleDeadlineDateChange = (ev) => {
    const duedate = ev.target.value;
    const year = duedate.split('-')[0];
    const month = duedate.split('-')[1];
    const day = duedate.split('-')[2];
    setDeadlineDate(`${year}-${month}-${day}`);
  }

  const handleClose = (ev) => {
    navigate(`/dashboard-recruiter/${user.recruiter._id}`, { replace: true });
  }

  return(
    <>
    { (user && user.recruiter) ?
      <div className="prbg ht-full-viewport py-1">
        <div className="flex-vertical">
          <div className="ly-1-4-bd-sec-left">
            <Navbar />
          </div>
          <div className="ly-1-4-bd-sec-right">
            <div className="ly-1-4-bd-sec-right-container flex-horizontal">
              <div className="ly-1-4-bd-sec-right-main">
                <CardComponent className={`ht-full-percent ${classes.createJobCard}`}>
                  <CloseIcon style={{ position: 'absolute', right: '5px', top: '5px', fontSize: '3rem' }} onClick={handleClose} />
                  <div className={classes.formContainer}>
                    <h3>Create an Job</h3>
                    <TextField
                      placeholder="Enter Job Title"
                      className={classes.formInputs}
                      label="Title"
                      margin="dense"
                      variant="outlined"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                      placeholder="Enter Job Description"
                      className={classes.formInputs}
                      variant="outlined"
                      margin="dense"
                      value={desc}
                      label="Job Description"
                      multiline
                      onChange={(e) => setDesc(e.target.value)}
                    />
                    <TextField
                      placeholder="Enter Job Responsibilities"
                      className={classes.formInputs}
                      multiline
                      variant="outlined"
                      margin="dense"
                      value={responsibilities}
                      label="Job Responsibilities"
                      onChange={(e) => setResponsibilities(e.target.value)}
                    />
                    <TextField
                      placeholder="Enter Job Salary"
                      className={classes.formInputs}
                      variant="outlined"
                      margin="dense"
                      label="Salary"
                      value={salary}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(e) => setSalary(e.target.value)}
                    />
                    <div className={classes.selectSection}>
                      <FormControl className={classes.selectInput} >
                        <InputLabel id="lbl-job-category">Job Category</InputLabel>
                        <Select
                          labelId="job-category"
                          id="job-category"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          label="Job Category"
                        >
                          {menuJobCatItems}

                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.selectSection}>
                      <FormControl className={classes.selectInput}>
                        <InputLabel id="lbl-job-location">Job Location</InputLabel>
                        <Select
                          labelId="job-loc"
                          id="job-loc"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          label="Job Location"
                        >
                          {menuJobLocItems}
                        </Select>
                      </FormControl>
                    </div>
                    <div className={classes.selectSection}>
                      <FormControl className={classes.selectInput}>
                        <InputLabel id="lbl-job-type">Job Type</InputLabel>
                        <Select
                          labelId="job-type"
                          id="job-type"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          label="Job Type"
                        >
                          {menuJobTypeItems}
                        </Select>
                      </FormControl>
                    </div>
                    <TextField
                      type="date"
                      className={classes.formInputs}
                      variant="outlined"
                      InputLabelProps={{ shrink: true, required: true }}
                      value={deadlineDate}
                      margin="dense"
                      onChange={handleDeadlineDateChange}
                      label="Application Deadline"

                    />
                    <Button
                      className={classes.formBtn}
                      margin="dense"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </div>
                </CardComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
       : <></>}
    </>);
}

export default CreateJobsPage;
