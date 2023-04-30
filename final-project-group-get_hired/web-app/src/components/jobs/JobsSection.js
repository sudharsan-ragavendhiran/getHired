import { useEffect, useState } from "react";
import JobCard from "./JobCard";
/**
 * A reusuable component that can be used to display a list of job cards.
 * @param {object} props 
 * @returns 
 */
function JobsSection(props) {
  const [jobs, setJobs] = useState(props.jobs);

  useEffect(() => {
    setJobs(props.jobs);
  }, [props]);

  const jobCards = jobs.map((job) => {
    return <JobCard key={job._id} job={job} isRecruiter={props.isRecruiter} />;
  });

  return <>{jobCards}</>;
}

export default JobsSection;
