import { Routes, Route } from "react-router-dom";
import App from "./App";
import JobsPage from "./pages/jobs/JobsPage";
import JobDetailPage from "./pages/jobs/JobDetailPage";
import Layout_1_4 from "./components/boilerplate/layouts/Layout_1_4";
import Layout_1_3_1 from "./components/boilerplate/layouts/Layout_1_3_1";
import OrgDetailsPage from "./pages/organisation/OrgDetailsPage";
import StudentProfile from "./pages/StudentProfile/StudentProfile";
import EventsPage from "./pages/events/EventsPage";
import EventDetailsPage from "./pages/events/EventDetailsPage";

function MainApp(props) {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:job_id" element={<JobDetailPage />} />

      {/* Path for Organizations*/}
      <Route path="/organizations" element={<OrgDetailsPage />} />
      <Route path="/organizations/:org_id" element={<OrgDetailsPage />} />

      {/* Path for student profile */}
      <Route path="/profiles/:student_id" element={<StudentProfile />} />

      {/* Path for Events */}
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:event_id" element={<EventDetailsPage />} />

      {/* DUMMY PATHS TO CHECK LAYOUTS */}
      <Route path="/layout_1_3_1" element={<Layout_1_3_1 />} />
      <Route path="/layout_1_4" element={<Layout_1_4 />} />
    </Routes>
  );
}

export default MainApp;
