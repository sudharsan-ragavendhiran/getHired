import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import classes from "../jobs/JobsPage.module.scss";
import JobCard from "../../components/jobs/JobCard";
import { useSelector, useDispatch } from "react-redux";
import AuthService from "../../utilities/AuthService";
import { authActions } from "../../store/auth_slice";
import EventCard from "../../components/events/EventCard";
import "./StudentDashboard.scss";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import Chart1 from "../../pages/dashboards/Chart1";

//Coomponent Recruiter dashboard to display recruiter specific information such as jobs and events posted by the recruiter.
function RecruiterDashboard() {
 
  let recruiter = useSelector((state) => state.auth.user);
  console.log(recruiter, "recruiter");
  // console.log(recruiter.organizationId, "org");

  const [jobs, setJobs] = useState([]);
  const [jobsPosted, setJobsPosted] = useState([]);
  const [orgPosting, setOrgPosting] = useState([]);
  const [eventsPosted, setEventsPosted] = useState([]);
  const dispatch = useDispatch();

  //checking if recruiter is logged in 
  const checkUser = () => {
    if (!recruiter) {
      recruiter = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  checkUser();

  //fetching jobs posted by the recruiter
  useEffect(() => {
    const fetchJobsPosted = async () => {
      const response = await axios.get("http://localhost:9000/jobs");
      setJobs(response.data);
      let jobs = response.data;
      const jobsPostedByrecruiter = response.data.filter(
        (job) => job.recruiterId === recruiter._id
      );
      setJobsPosted(jobsPostedByrecruiter);
      console.log(" jobs posted", jobsPosted);

      //fetching jobs posted by the recruiter including all jobs posted of that organization
      const organizationPosting = jobs.filter(
        (job) => job.organization_id === recruiter.organizationId
      );
      setOrgPosting(organizationPosting);
      console.log("Org jobs: ", orgPosting);
    };
    fetchJobsPosted();
  }, []);

  //fetching events posted by the recruiter
  useEffect(() => {
    const fetchEventsPosted = async () => {
      const response = await axios.get("http://localhost:9000/events");
      console.log(response.data, "check events");
      // setEvents(response.data);
      console.log(recruiter._id, "recruiter Id");

      const eventsPostedByrecruiter = response.data.filter(
        (event) => event.recruiter_id === recruiter._id
      );
      setEventsPosted(eventsPostedByrecruiter);
      console.log(" events posted", eventsPostedByrecruiter);
    };
    fetchEventsPosted();
  }, []);

  //displaying job cards
  const jobsPostedCards = jobsPosted.map((job) => {
    return (
      <JobCard key={job._id} job={job} job_id={job._id} isRecruiter={true} />
    );
  });

  //displaying job cards 
  const orgPostingCards = orgPosting.map((job) => {
    return (
      <JobCard
        key={job._id}
        job={job}
        job_id={job._id}
        isRecruiter={true}
        // job_title={job.job_title}
        // job_type={job.job_type}
        // job_deadline={new Date(job.job_deadline).toLocaleDateString()}
        // org
      />
    );
  });

  //displaying event cards 
  const eventsPostedByRecruiter = eventsPosted.map((event) => {
    return <EventCard key={event._id} event={event} />;
  });

  console.log(eventsPostedByRecruiter.length);

  return (
      <div className="prbg ht-full-viewport py-1">
      <div className="flex-vertical">
        <div className="ly-1-4-bd-sec-left">
          <Navbar />
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/* APPS */}
              <CardComponent className="card-margin">
              <p className="heading">Dashboard</p>

                  <div className="bar-chart">
                    <Chart1 />
                  </div>
              <div className="applications-section-header">
                <p className="heading">Jobs Posted</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div className={classes.jobsContainer}>{jobsPostedCards}</div>
              <div className="view-more">
                {/* <button onClick={viewMoreApplications}>View More</button> */}
              </div>
              {/* <div className={classes.jobsContainer}>{jobCards}</div> */}

              {/* EVENTS */}
              <div className="applications-section-header">
                <p className="heading">Organiztion Jobs</p>
              </div>
              {/* <div class="h_line"></div> */}

              <div className={classes.jobsContainer}>{orgPostingCards}</div>
              <div className="view-more">
                {/* <button onClick={viewMoreEvents}>View More</button> */}
              </div>
              {/* RECOS */}

              <div className="applications-section-header">
                <p className="heading">Events Posted</p>
              </div>

              
              {/* <div class="h_line"></div> */}

              <div>
              <div className={classes.jobsContainer}>{eventsPostedByRecruiter}</div>
                <div className="view-more">
                  {/* <button onClick={viewMoreJobs}>View More</button> */}
                </div>
              </div>
              </CardComponent>
            </div>
          </div>
        </div>
      </div>
    </div>

    
  );
}

export default RecruiterDashboard;
