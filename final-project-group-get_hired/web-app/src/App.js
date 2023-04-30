import "./App.scss";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUpStudent from "./components/Login/SignUpStudent";
import RecruiterSignUp from "./components/Login/RecruiterSignUp";
import RecruiterDashboard from "./pages/dashboards/RecruiterDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import JobsPage from "./pages/jobs/JobsPage";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import OrgDetailsPage from "./pages/organisation/OrgDetailsPage";
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";
import CreateEventsPage from "./pages/events/CreateEventsPage";
import CreateOrgPage from "./pages/organisation/CreateOrgPage";
import { fetchStudentApplications } from "./store/applications_slice";
import ApplicationPage from "./pages/applications/ApplicationPage";
import CreateJobsPage from "./pages/jobs/CreateJobsPage";
import { fetchStudentRegistrations } from "./store/registrations_slice";
import NewEducationForm from "./pages/StudentProfile/StudentProfileForms/NewEducationForm";
import NewProjectForm from "./pages/StudentProfile/StudentProfileForms/NewProjectForm";
import NewWorkExForm from "./pages/StudentProfile/StudentProfileForms/NewWorkExForm";
import RecruiterProfile from "./pages/RecruiterProfile/RecruiterProfile";
import { useState, useEffect } from "react";
import RecruiterApplicationPage from "./pages/applications/RecruterApplicationPage";
import AuthService from './utilities/AuthService';
import {authActions} from './store/auth_slice';
import StudentProfile from './pages/StudentProfile/StudentProfile';



function App() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const applications = useSelector((state) => state.applications.applications);
  const registrations = useSelector(
    (state) => state.registrations.registrations
  );
  const dispatch = useDispatch();
  console.log(isAuth, "isAuth");

  let user = useSelector((state) => state.auth.user);


  const checkUser = () => {
    //if user not in store
    if (!user) {
      user = AuthService.getCurrUser();
      
      //if user not in persistent local store
      if(!user)
      {
        return;
      }
      //add user to store
       dispatch(authActions.login(user));
    }


  };

  useEffect(() => {
    checkUser();
  }, []);

  //fetching applications from DB for dev purposes.
  //TODO - This shold be called only if logged in as STUDENT. and Id of Student should be passed.
  
  
  useEffect(() => {
    if(user && user.student){
    dispatch(fetchStudentApplications(user.student._id));
    dispatch(fetchStudentRegistrations(user.student._id));
    }
  }, [user]);


  return (
    <div className="prbg">
      <Router>
        <div className="app-state">
           {/* routes for login */}
          <Routes>
            <Route
              path="/"
              element={!isAuth ? <Login /> : ( user.student ? <Navigate to={`/dashboard-student/${user.student._id}`} /> : <Navigate to={`/dashboard-recruiter/${user.recruiter._id}`} />  )}
            ></Route>
            <Route path="/student/:id" element={<StudentProfile />}></Route>
            <Route path="/signup-student" element={<SignUpStudent />}></Route>
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/jobs/:job_id" element={<JobDetailPage />} />

            {/* Path for Organizations*/}
            <Route path="/organizations" element={<OrgDetailsPage />} />
            <Route path="/organizations/:org_id" element={<OrgDetailsPage />} />
            <Route
              path="/organizations/create-org"
              element={<CreateOrgPage />}
            />

            {/* Path for Events */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:event_id" element={<EventDetailsPage />} />
            <Route path="/events/create-event" element={<CreateEventsPage />} />
            {/* route for recruiter sign up page */}
            <Route
              path="/signup-recruiter"
              element={<RecruiterSignUp />}
            ></Route>
            {/* route for studentdashboard */}
            <Route
              path="/dashboard-student/:id"
              element={<StudentDashboard />}
            ></Route>
            {/* route for recruiter dashboard */}
            <Route
              path="/dashboard-recruiter/:id"
              element={<RecruiterDashboard />}
            ></Route>

            {/*Application routes*/}
            <Route path="/student-applications" element={<ApplicationPage />} />

            {/* Path for Recruiter Post Job */}
            <Route path="/jobs/create-job" element={<CreateJobsPage />} />

            {/* Path for student profile */}
            <Route
              path="/profiles/studentEducation/:student_id"
              element={<NewEducationForm />}
            />
            <Route
              path="/profiles/studentWorkEx/:student_id"
              element={<NewWorkExForm />}
            />
            <Route
              path="/profiles/studentProject/:student_id"
              element={<NewProjectForm />}
            />
            <Route
              path="/studentProfile/:student_id"
              element={<StudentProfile />}
            />
            <Route
              path="/recruiterProfile/:recruiter_id"
              element={<RecruiterProfile />}
            />
            {/* Path for Recruiter Post Job */} 
            <Route path="/jobs/create-job" element={<CreateJobsPage />} />    

            {/* Path for Recruiter View Applications */} 
            <Route path="/applications/:job_id" element={<RecruiterApplicationPage />} />  

            {/* Path for student view applications */}
            <Route path="student-applications" element={<ApplicationPage />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}


export default App;
