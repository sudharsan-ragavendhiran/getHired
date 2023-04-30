import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./StudentProfile.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import dateFormat from "dateformat";
import AuthService from "../../utilities/AuthService";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// import { uploadFile as awsUploadFile}  from "../../utilities/awsS3";

function StudentProfile(props) {
  let user = useSelector((state) => state.auth.user);
  console.log(user, "user");

  //const isAuth = useSelector(state => state.auth.isAuthenticated);
  //console.log(isAuth, "isAuth");

  const [student, setStudentProfile] = useState({});
  const [education, setEducation] = useState([]);
  const [project, setProject] = useState([]);
  const [workEx, setWorkEx] = useState([]);
  const nav = useNavigate();
  const dispatch = useDispatch();

  // const S3_BUCKET = "";
  // const REGION = "us-east-1";
  // const ACCESS_KEY = "";
  // const SECRET_ACCESS_KEY = "";

  // const config = {
  //   bucketName: S3_BUCKET,
  //   region: REGION,
  //   accessKeyId: ACCESS_KEY,
  //   secretAccessKey: SECRET_ACCESS_KEY,
  // };

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

  //load initial student details
  useEffect(() => {
    const fetchStudentDetails = async () => {
      // const response = await axios.get(`http://localhost:9000/students/${user._id}`);
      // setStudentProfile(response.data);
      return await axios({
        method: "GET",
        url: `http://localhost:9000/students/${user._id}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then((res) => setStudentProfile(res.data))
        .catch((err) => console.log(err.data));
    };
    fetchStudentDetails();
  }, []);

  //load initial education details for the particular student
  useEffect(() => {
    const fetchEducation = async () => {
      const res = await axios.get(
        `http://localhost:9000/educations?student_id=${user._id}`
      );
      setEducation(res.data);
    };
    fetchEducation();
  }, []);

  //load initial project details for the particular student
  useEffect(() => {
    const fetchProject = async () => {
      const res = await axios.get(
        `http://localhost:9000/projects?student_id=${user._id}`
      );
      setProject(res.data);
    };
    fetchProject();
  }, []);

  //load initial project details for the particular student
  useEffect(() => {
    const fetchWorkEx = async () => {
      const res = await axios.get(
        `http://localhost:9000/experiences/?student_id=${user._id}`
      );

      setWorkEx(res.data);
    };
    fetchWorkEx();
  }, []);

  const handleAddEdu = () => {
    nav(`/profiles/studentEducation/${user._id}`, {
      state: { education: null },
    });
  };

  const handleEduEdit = (edu) => {
    // console.log("Edu Edit Triggered!");
    nav(`/profiles/studentEducation/${user._id}`, {
      state: { education: edu },
    });
  };

  const handleAddProject = () => {
    nav(`/profiles/studentProject/${user._id}`, { state: { project: null } });
  };

  const handleProjectEdit = (proj) => {
    //console.log("Project Edit Btn Pressed!");
    nav(`/profiles/studentProject/${user._id}`, { state: { project: proj } });
  };

  const handleAddWorkEx = () => {
    nav(`/profiles/studentWorkEx/${user._id}`, { state: { workEx: null } });
  };

  const handleWorkExEdit = (work) => {
    // console.log("WorkEx Edit Btn Pressed!");
    nav(`/profiles/studentWorkEx/${user._id}`, { state: { workEx: work } });
  };

  const handleDivClick = (idx) => {
    // console.log("Expanded", idx);
    let element = document.getElementsByClassName(classes.divClick);
    console.log("Element", element[idx]);
    element[idx].classList.toggle(classes.divClickExpanded);
  };

  //Cards with existing education details
  const eduCards = education.map((edu, idx) => {
    return (
      <div>
        <CardComponent
          key={edu._id}
          className={classes.divClick}
          onClick={() => handleDivClick(idx)}
        >
          <div className="eduDetails">
            <div className={classes.divTitle}>
              <div className={classes.divTitleText}>
                <h3>{edu.university}</h3>
              </div>
              <div className={classes.divTitleBtn}>
                <EditIcon
                  onClick={() => handleEduEdit(edu)}
                  style={{ fontSize: "2rem" }}
                />
              </div>
            </div>
            <div className={classes.divTextDetails}>
              <h3>{edu.major}</h3>
              <div className="eduDates">
                <p>
                  {dateFormat(edu.start_date, "yyyy/mm")} -{" "}
                  {dateFormat(edu.end_date, "yyyy/mm")}
                </p>
              </div>
            </div>
          </div>
        </CardComponent>
        <br />
      </div>
    );
  });

  //Cards with existing project details
  const projectCards = project.map((project, idx) => {
    return (
      <div>
        <CardComponent
          key={project._id}
          className={classes.divClick}
          onClick={() => handleDivClick(idx)}
        >
          <div className="projectDetails">
            <div className={classes.divTitle}>
              <div className={classes.divTitleText}>
                <h3>{project.project_title}</h3>
              </div>
              <div className={classes.divTitleBtn}>
                <EditIcon
                  onClick={() => handleProjectEdit(project)}
                  style={{ fontSize: "2rem" }}
                />
              </div>
            </div>
            <div className={classes.divTextDetails}>
              <div className="projectDates">
                <p>
                  {dateFormat(project.start_date, "yyyy/mm")} -{" "}
                  {dateFormat(project.end_date, "yyyy/mm")}
                </p>
              </div>
            </div>
          </div>
        </CardComponent>
        <br />
      </div>
    );
  });

  //Cards with existing work-ex details
  const workExCards = workEx.map((workEx, idx) => {
    return (
      <div>
        <CardComponent
          key={workEx._id}
          className={classes.divClick}
          onClick={() => handleDivClick(idx)}
        >
          <div className="workExDetails">
            <div className={classes.divTitle}>
              <div className={classes.divTitleText}>
                <h3>{workEx.title}</h3>
              </div>
              <div className={classes.divTitleBtn}>
                <EditIcon
                  onClick={() => handleWorkExEdit(workEx)}
                  style={{ fontSize: "2rem" }}
                />
              </div>
            </div>
            <div className={classes.divTextDetails}>
              <h3>{workEx.employer_name}</h3>
              <div className="projectDates">
                {/* trim dates to just show month n year */}
                <p>
                  {dateFormat(workEx.start_date, "yyyy/mm")} -{" "}
                  {dateFormat(workEx.end_date, "yyyy/mm")}
                </p>
              </div>
            </div>
          </div>
        </CardComponent>
        <br />
      </div>
    );
  });

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("Input file handle");
  };

  const handleFileSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("myfile", selectedFile);
    data.append("studentId", user.student._id);

    const pushResume = async () => {
      const response = await axios({
        method: "POST",
        url: "http://localhost:9000/students/resume",
        data: data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        validateStatus: (status) => {
          return true;
        },
      });
    };
    pushResume();
  };

  const StudentProfileCard = (props) => {
    return (
      <CardComponent className={classes.divCardsContainer}>
        <div className={classes.studentHeader}>
          {/* <div className={classes.studentProfileImg} /> */}
           <AccountCircleIcon  style={{fontSize: "120px"}}/>
          <div className={classes.studentDetails}>
            <h4>
              {student.firstname} {student.lastname}
            </h4>
            <h5>{student.major}</h5>
            <h4>Email: {student.email}</h4>
            <h4>NUID: {student.nuid}</h4>
          </div>
        </div>
        <br /> <hr />
        <div>
          <div className={classes.divTitleText}>Upload Resume</div>
          <CardComponent>
            <div className={classes.fileUpload}>
              <p>Files Supported: PDF, TEXT, DOC , DOCX</p>
              <form
                onSubmit={handleFileSubmit}
                method="POST"
                encType="multipart/form-data"
              >
                <label for="myfile">Select a file:</label>
                <br />
                <input
                  type="file"
                  id="myfile"
                  name="myfile"
                  accept=".doc,.docx,.pdf"
                  title=" "
                  onChange={handleFileInput}
                />
                <button type="submit">Upload File</button>
              </form>
            </div>
          </CardComponent>
        </div>
        <br /> <hr />
        <div>
          <div className={classes.divTitle}>
            <div className={classes.divTitleText}>Education Details</div>
            <div className={classes.divTitleBtn}>
              <button onClick={handleAddEdu}> + Add </button>
            </div>
          </div>
          {eduCards}
        </div>
        <div>
          <div className={classes.divTitle}>
            <div className={classes.divTitleText}> Work Experience</div>
            <div className={classes.divTitleBtn}>
              <button onClick={handleAddWorkEx}> + Add </button>
            </div>
          </div>
          {workExCards}
        </div>
        <div>
          <div className={classes.divTitle}>
            <div className={classes.divTitleText}> Academic Projects</div>
            <div className={classes.divTitleBtn}>
              <button onClick={handleAddProject}> + Add </button>
            </div>
          </div>
          {projectCards}
        </div>
      </CardComponent>
    );
  };

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-vertical">
        <div className="ly-1-4-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              <StudentProfileCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
