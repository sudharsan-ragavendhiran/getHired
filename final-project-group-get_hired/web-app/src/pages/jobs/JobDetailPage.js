import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./JobDetailPage.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import JobsSection from "../../components/jobs/JobsSection";
import ReviewContainer from "../../components/orgs/ReviewContainer";
import { authActions } from "../../store/auth_slice";
import AuthService from "../../utilities/AuthService";
import { makeStyles } from "@mui/styles";
import { Button } from "@mui/material";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

// Added style to the view all applications button button
const useStyles = makeStyles({
  root: {
    backgroundColor: "#D41A2B",
    color: "#ffffff",
    width: "20rem",
    height: "5rem",
    lineHeight: 1,
    fontSize: "12px",
    "&:hover": {
      backgroundColor: "transparent",
      border: "1px solid #D41A2B",
      color: "#d90429",
      width: "20rem",
      height: "5rem",
      padding: 0,
    },
  },
});

function JobDetailPage(props) {
  const [job, setJob] = useState(null);
  const [orgJobs, setOrgJobs] = useState([]);
  const [org_id, setOrgId] = useState(0);
  const nav = useNavigate();
  const sClasses = useStyles();

  const params = useParams();
  const job_id = params.job_id;

  const dispatch = useDispatch();

  let user = useSelector((state) => state.auth.user);
  const checkUser = () => {
    //if user not in store
    if (!user) {
      user = AuthService.getCurrUser();
      //if user not in persistent local store
      if (!user) {
        return;
      }
      //add user to store
      dispatch(authActions.login(user));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  console.log(user, "user");

  useEffect(() => {
    const fetchJob = async () => {
      const response = await axios.get(`http://localhost:9000/jobs/${job_id}`);
      setJob(response.data);
    };
    //   const data = await response.json();
    fetchJob();
  }, []);

  useEffect(() => {
    if (job) {
      const fetchOrgJobs = async () => {
        const response = await axios.get(
          `http://localhost:9000/jobs/?org_id=${job.organization_id}`
        );
        setOrgJobs(response.data);
      };
      //   const data = await response.json();
      fetchOrgJobs();
      setOrgId(job.organization_id);
    }
  }, [job]);

  /**
   * Navigating the user to organizaion details page
   */
  const handleOrgClick = () => {
    nav(`/organizations/${job.organization_id}`);
  };

  /**
   * Navigating recruiter to all applications page
   */
  const handleViewApplications = () => {
    nav(`/applications/${job._id}`);
  }

  /**
   * Functional component to render the job details
   * @param {*} props 
   * @returns 
   */
  const JobDetailCard = (props) => {
    return (
      <CardComponent className={classes.jobDetailCard}>
        <div>
          <div className={classes.orgSection}>
            {/* <img
              className={classes.orgImg}
              src={require("../../assets/Barney.jpeg")}
            /> */}
            <CorporateFareIcon style={{fontSize: "50px"}}/>
            <span onClick={handleOrgClick} style={{ cursor: "pointer" }}>
              {job.organizationName}
            </span>
          </div>
          <div className={classes.jobTitle}>{job.job_title}</div>
          <div className={classes.jobDetails}>
            {" "}
            <LocationOnIcon style={{ fontSize: "0.8rem" }} />{" "}
            {`${job.job_location} | ${job.job_type} | Pay ${job.job_salary}`}{" "}
          </div>
          <div className={classes.jobDeadline}>{`Apply By: ${new Date(
            job.job_deadline
          ).toLocaleDateString()}`}</div>
          <div className={classes.divider}></div>
          <div className={classes.jobDesc}>
            <section className={classes.sectionTitle}>Job Description</section>
            <section>{job.job_description}</section>
          </div>
          <div className={classes.jobResp}>
            <section className={classes.sectionTitle}>
              Job Responsibilities
            </section>
            <section>{job.job_responsibilities}</section>
          </div>
        </div>
      </CardComponent>
    );
  };
  const ab = false;
  return (
    <>
      <div className="prbg">
        <div className="flex-vertical">
          <div className="ly-1-3-1-bd-sec-left">
            <Navbar />
          </div>
          <div className="ly-1-3-1-bd-sec-right">
            <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
              <div className="ly-1-3-1-bd-sec-right-main">
                <div className={classes.mainContainer}>
                  {job && <JobDetailCard />}
                  <div className={classes.moreJobsTitle}>
                    More Jobs At this Organization
                  </div>
                  <div className={classes.jobsContainer}>
                    
                  {user.isStudent? (<JobsSection jobs={orgJobs} isRecruiter={false} />):(<JobsSection jobs={orgJobs} isRecruiter={true} />)}
                    
                  </div>
                </div>
              </div>
              {/* displaying review section in student login and view all button in recruiter login */}
              <div className="ly-1-3-1-aa-sec-right-sidebar">
                {/* {!user.isStudent ? <Button className={sClasses.root} onClick={handleViewApplications}>View All Applications</Button> : <ReviewContainer key={org_id} organizationId={org_id} />} */}
                {!user.isStudent ? <Button className={sClasses.root} onClick={handleViewApplications}>View All Applications</Button>: <p></p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
///applications/:job_id

export default JobDetailPage;
