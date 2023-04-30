import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import FilterSectionComponent from "../../components/genericComponent/FIlterSectionComponent";
import JobCard from "../../components/jobs/JobCard";
import SearchBar from "../../components/genericComponent/SearchBar";
import classes from "./JobsPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";
import AuthService from "../../utilities/AuthService";
import { JOB_CATEGORIES } from "../../utilities/constants";
import { JOB_LOCATIONS } from "../../utilities/constants";
import ApplyModal from "../../components/jobs/ApplyModal";
import { postApplication } from "../../store/applications_slice";

const JOB_TYPE_FILTERS = ["FULL-TIME", "PART-TIME", "INTERNSHIP"];
const JOB_CATEGORY_FILTERS = [...JOB_CATEGORIES];
const JOB_LOCATION_FILTERS = [...JOB_LOCATIONS];

let isInitial = true;

/**
 * This is a functional component that renders the Jobs Page for a student
 * @param {object} props 
 * @returns 
 */
function JobsPage(props) {
  const [appliedJobTypeFilters, setJobTypeFilters] = useState([]);
  const [appliedJobCategoryFilters, setJobCategoryFilters] = useState([]);
  const [appliedJobLocationFilters, setJobLocationFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  let user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const [isApply, setIsApply] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  const applications = useSelector((state) => state.applications.applications);

  //getting all jobs when the component is rendered for the first Time
  useEffect(() => {
    if (isInitial) {
      const fetchJobs = async () => {
        const response = await axios.get("http://localhost:9000/jobs");
        setJobs(response.data);
      };
      //   const data = await response.json();
      fetchJobs();
    } else {
      isInitial = false;
    }
  }, []);

  /**
   * Function to fetch jobs
   * @param {string} url
   */
  const fetchJobs = async (url) => {
    const response = await axios.get(url);
    setJobs(response.data);
  };

  //filtering jobs when the filters are changed or search text is entered
  useEffect(() => {
    let url = "http://localhost:9000/jobs";
    let params = [];
    let jobTypeQueryParam = "";
    let jobCategoryQueryParam = "";
    let jobLocationQueryParam = "";

    //checking if job type filters are selected
    if (appliedJobTypeFilters.length > 0) {
      appliedJobTypeFilters.forEach((jobTypeValue) => {
        jobTypeQueryParam += `${jobTypeValue};`;
      });
    }
    if (jobTypeQueryParam.length > 0) {
      params.push({
        paramName: "job_types",
        paramValue: jobTypeQueryParam.slice(0, jobTypeQueryParam.length - 1),
      });
    }

    //checking if job category filters are selected
    if (appliedJobCategoryFilters.length > 0) {
      appliedJobCategoryFilters.forEach((jobCategoryValue) => {
        jobCategoryQueryParam += `${jobCategoryValue};`;
      });
    }
    if (jobCategoryQueryParam.length > 0) {
      params.push({
        paramName: "job_categories",
        paramValue: jobCategoryQueryParam.slice(
          0,
          jobCategoryQueryParam.length - 1
        ),
      });
    }

    //checking if job location filters are selected
    if (appliedJobLocationFilters.length > 0) {
      appliedJobLocationFilters.forEach((jobLocationValue) => {
        jobLocationQueryParam += `${jobLocationValue};`;
      });
    }
    if (jobLocationQueryParam.length > 0) {
      params.push({
        paramName: "job_locations",
        paramValue: jobLocationQueryParam.slice(
          0,
          jobLocationQueryParam.length - 1
        ),
      });
    }

    //checking if anything is entered in searchbar
    if (searchText.length > 0) {
      params.push({ paramName: "searchText", paramValue: searchText });
      // url+=`&searchText=${searchText}`
    }

    //constructing url
    if (params.length > 0) {
      params.forEach((param, index) => {
        if (index === 0) {
          url += `?${param.paramName}=${param.paramValue}`;
        } else {
          url += `&${param.paramName}=${param.paramValue}`;
        }
      });
    }

    fetchJobs(url);
  }, [
    appliedJobTypeFilters,
    appliedJobCategoryFilters,
    appliedJobLocationFilters,
    searchText,
  ]);

  /**
   * This function is used to open the confirmation dialog box
   * @param {object} job 
   */
  const handleApplyButtonOnClick = (job) => {
    setSelectedJob(job);
    setIsApply(true);
  };

  /**
   * Renders the job cards
   */
  const jobCards = jobs.map((job) => {
    const applicationExist = applications.filter(
      (application) => application.job_id === job._id
    );

    return (
      <JobCard
        key={job._id}
        job={job}
        handleApplyButtonOnClick={handleApplyButtonOnClick}
        isApplied={applicationExist.length > 0}
      />
    );
  });

  const isJobTypeSelected = (jobTypeValue) =>
    appliedJobTypeFilters.includes(jobTypeValue);

  const isJobCategorySelected = (jobCategoryValue) =>
    appliedJobCategoryFilters.includes(jobCategoryValue);

  const isJobLocationSelected = (jobLocationValue) =>
    appliedJobLocationFilters.includes(jobLocationValue);

  /**
   * Handles the change in selection the job type filter
   * @param {string} jobTypeValue 
   */
  const handleJobTypeCheckboxChange = (jobTypeValue) => {
    let updatedJobTypeFilters;

    //the filter was selected, remove it from appliedFilters
    if (isJobTypeSelected(jobTypeValue)) {
      updatedJobTypeFilters = appliedJobTypeFilters.filter(
        (JTV) => JTV !== jobTypeValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedJobTypeFilters = [...appliedJobTypeFilters, jobTypeValue];
    }
    setJobTypeFilters(updatedJobTypeFilters);
  };
  /**
   * Handles the change in selection the category filter
   * @param {string} jobCategoryValue 
   */
  const handleJobCategoryCheckboxChange = (jobCategoryValue) => {
    let updatedJobCategoryFilters;

    //the filter was selected, remove it from appliedFilters
    if (isJobCategorySelected(jobCategoryValue)) {
      updatedJobCategoryFilters = appliedJobCategoryFilters.filter(
        (JTC) => JTC !== jobCategoryValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedJobCategoryFilters = [
        ...appliedJobCategoryFilters,
        jobCategoryValue,
      ];
    }
    setJobCategoryFilters(updatedJobCategoryFilters);
  };

  /**
 * Handles the change in selection the location filter
 * @param {string} jobLocationValue 
 */
  const handleJobLocationCheckboxChange = (jobLocationValue) => {
    let updatedJobLocationFilters;

    //the filter was selected, remove it from appliedFilters
    if (isJobLocationSelected(jobLocationValue)) {
      updatedJobLocationFilters = appliedJobLocationFilters.filter(
        (JTL) => JTL !== jobLocationValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedJobLocationFilters = [
        ...appliedJobLocationFilters,
        jobLocationValue,
      ];
    }
    setJobLocationFilters(updatedJobLocationFilters);
  };

  /**
   *  handles change in the search bar
   * @param {string} searchInput 
   */
  const handleSearchInputChange = (searchInput) => {
    setSearchText(searchInput);
  };

  /**
   * Function to create an application and post it to the backend
   * @param {object} job 
   */
  const onApplyConfirm = (job) => {

    const application = {
      document_id: "1",
      status: "APPLIED",
      job_id: job._id,
      student_id: user.student._id,
      student_gpa: user.student.gpa.$numberDecimal,
      student_name: `${user.student.firstname} ${user.student.lastname}`,
      student_major: user.student.major
    };

    dispatch(postApplication(application));
    setSelectedJob(null);
    setIsApply(false);
  };
  /**
   * Function to close the dialog box
   */
  const onApplyReject = () => {
    setSelectedJob(null);
    setIsApply(false);
  };

  return (
    <>
      <div className="prbg ht-full-viewport py-1">
        {isApply && (
          <ApplyModal
            onApplyConfirm={onApplyConfirm}
            onApplyReject={onApplyReject}
            job={selectedJob}
          />
        )}
        <div className="flex-vertical">
        <Navbar />
          </div>
          {/* <div className="ly-1-3-1-bd-sec-left "> */}
            {/* <Navbar /> */}
          {/* </div> */}
          <div className="ly-1-3-1-bd-sec-right ">
            {/* <Navbar /> */}
            <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
              <div className="ly-1-3-1-bd-sec-right-main">
                <div>
                  <SearchBar
                    id="search-jobs"
                    placeholder="Search for Job"
                    label="Search for Job or Organization"
                    onSearchInputChange={handleSearchInputChange}
                  />
                </div>
                {jobs.length === 0 && (
                  <div className={classes.infoMessage}>No Jobs Were Found</div>
                )}
                {jobs.length > 0 && (
                  <>
                  <div className={classes.jobContainerWrapper}>
                  <div className={classes.jobsContainer}>{jobCards}</div>
                  </div>
                  </>
                )}
              </div>
              <div className="ly-1-3-1-bd-sec-right-sidebar">
                <div className={`${classes.filterWrapper} ${classes.filterTypeWrapper}`}>
                  <FilterSectionComponent
                    heading={"JOB TYPE"}
                    values={JOB_TYPE_FILTERS}
                    isChecked={isJobTypeSelected}
                    handleCheckboxChange={handleJobTypeCheckboxChange}
                  />
                </div>
                <div className={`${classes.filterWrapper} ${classes.filterCategoryWrapper}`}>
                  <FilterSectionComponent
                    heading={"JOB CATEGORY"}
                    values={JOB_CATEGORY_FILTERS}
                    handleCheckboxChange={handleJobCategoryCheckboxChange}
                  />
                </div>
                <div className={`${classes.filterWrapper} ${classes.filterCategoryWrapper}`}>
                  <FilterSectionComponent
                    heading={"JOB LOCATION"}
                    values={JOB_LOCATION_FILTERS}
                    handleCheckboxChange={handleJobLocationCheckboxChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
}

export default JobsPage;
