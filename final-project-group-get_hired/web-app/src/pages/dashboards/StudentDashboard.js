import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import classes from "../jobs/JobsPage.module.scss";
import JobCard from "../../components/jobs/JobCard";
import EventCard from "../../components/events/EventCard";
import "./StudentDashboard.scss";
import { authActions } from "../../store/auth_slice";
import AuthService from "../../utilities/AuthService";
import { useNavigate } from "react-router-dom";
import ApplicationStatusChart from "../../pages/dashboards/ApplicationStatusChart";

//Component student dashboard displays student specifc information such as applied jobs, registered events and job recommendations
function StudentDashboard(props) {
  const [jobs, setJobs] = useState([]);
  const [events, setEvents] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [error, setError] = useState("");
  // const [user, setUser] = useState("");
  let user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appJobsIds = jobs.job_id;
  console.log("----I----"+appJobsIds);

  // const [recommendations, setRecommendations] = useState([]);
  
 

  //check if student is logged in
  const checkUser = () => {
    //if user not in store
    if (!user) {
      console.log('user not found!!');
      console.log(JSON.parse(localStorage.getItem("user")));
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
  checkUser();
  console.log(user, "user");

  //fetch all applications of the student
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      await axios
        .get(`http://localhost:9000/student/applications/${user._id}`)
        .then(async (res) => {
          setJobs(res.data);
        });
    };
    fetchAppliedJobs();
  }, []);

  //fetch all registered events of the student

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      await axios
        .get(`http://localhost:9000/student/registrations/${user._id}`)
        .then(async (res) => {
          setEvents(res.data);
          console.log("fetch events", res.data);
        });
    };
    fetchRegisteredEvents();
  }, []);

  //fetch job recommendations based on the student's interests
  useEffect(() => {
    const fetchJobRecommendations = async () => {
      await axios.get(`http://localhost:9000/jobs/`).then(async (res) => {
        setAllJobs(res.data);
      });
    };
    fetchJobRecommendations();
  }, []);

  //On clicking the view more button, it navigates to the student-applications page
  const viewMoreApplications = async (e) => {
    e.preventDefault();
    try {
      navigate(`/student-applications`);
    } catch (error) {
      setError(error);
    }
  };

 //On clicking the view more button, it navigates to the jobs page
  const viewMoreJobs = async (e) => {
    e.preventDefault();
    try {
      navigate(`/jobs`);
    } catch (error) {
      setError(error);
    }
  };

  //On clicking the view more button, it navigates to the events page
  const viewMoreEvents = async (e) => {
    e.preventDefault();
    try {
      navigate(`/events`);
    } catch (error) {
      setError(error);
    }
  };

  console.log("All Jobs", allJobs);

  //slicing the list to show only 3 job cards
  const currjobs = jobs.length > 3 ? jobs.slice(0, 3) : jobs;

  const jobCards = currjobs.map((job) => {
    return <JobCard key={job._id} job={job} isApplied={true} />;
  });

  //slicing the list to show only 3 job cards
  const currEvents = events.length > 3 ? events.slice(0, 3) : events;

  const eventCards = currEvents.map((event) => {
    if (event) {
      return <EventCard key={event._id} event={event} isRegistered={true} />;
    }
  });

  //filtering on the basis of student's interests
  console.log("Interest: ", user.student.interest);
  const recommendations = allJobs.filter(
    (j) => j.job_category === user.student.interests && !jobs.includes(j.job_id)
  );

  //shuffling the list to display differnt cards on each refresh
  const shuffledArray = recommendations.sort((a, b) => 0.5 - Math.random());
  const currRecos =
    shuffledArray.length > 3 ? shuffledArray.slice(0, 3) : shuffledArray;

  const recommendationCards = currRecos.map((job) => {
    return (
      <JobCard
        key={job._id}
        job={job}
        job_id={job._id}
        job_title={job.job_title}
        job_type={job.job_type}
        job_deadline={new Date(job.job_deadline).toLocaleDateString()}
        org
        isApplied={job.isApplied}
      />
    );
  });

  console.log(recommendations, "Current Recommendation");

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
                  <ApplicationStatusChart />
                </div>
                <div className="applications-section-header">
                  <p className="heading">My Applications</p>
                  <div className="view-more">
                    <button onClick={viewMoreApplications}>View More</button>
                  </div>
                </div>
                {/* <div class="h_line"></div> */}

                <div className={classes.jobsContainer}>{jobCards}</div>

                {/* <div className={classes.jobsContainer}>{jobCards}</div> */}

                {/* EVENTS */}
                <div className="applications-section-header">
                  <p className="heading">My Events</p>
                  <div className="view-more">
                    <button onClick={viewMoreEvents}>View More</button>
                  </div>
                </div>
                {/* <div class="h_line"></div> */}

                <div className={classes.jobsContainer}>{eventCards}</div>

                {/* RECOS */}

                <div className="applications-section-header">
                  <div className="heading">
                    <p className="heading">My Recommendations</p>
                  </div>
                  <div className="view-more">
                    <button onClick={viewMoreJobs}>View More</button>
                  </div>
                </div>
                {/* <div class="h_line"></div> */}

                <div>
                  <div className={classes.jobsContainer}>
                    {recommendationCards}
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

export default StudentDashboard;
