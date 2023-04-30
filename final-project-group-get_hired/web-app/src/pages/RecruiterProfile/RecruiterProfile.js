import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AuthService from "../../utilities/AuthService";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth_slice";
import Navbar from "../../components/navbar/Navbar";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import classes from "./RecruiterProfile.module.scss";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  requirePropFactory,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const useStyles = makeStyles({
  root: {
    backgroundColor: "#D41A2B",
    color: "#ffffff",
    height: "3rem",
    lineHeight: 1,
    "&:hover": {
      backgroundColor: "transparent",
      border: "1px solid #D41A2B",
      color: "#D41A2B",
      height: "3rem",
      padding: 0,
    },
  },
});



function RecruiterProfile(props) {
  let user = useSelector((state) => state.auth.user);
  console.log(user, "user");

  //const [recruiter, setRecruiterProfile] = useState({});
  const [recruiterOrg, setOrganization] = useState({});
  const dispatch = useDispatch();
  const [firstname, setFirstName] = useState(`${user.recruiter.firstname}`);
  const [lastname, setLastname] = useState(`${user.recruiter.lastname}`);
  const [email, setEmail] = useState(`${user.recruiter.email}`);
  const [expand, setExpand] = useState(false);
  const sClasses = useStyles();
  const toggleAccordion = () => {
    console.log("Accordian");
    setExpand(!expand);
  };

  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (user.length == 0) {
      user = AuthService.getCurrUser();
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  //load recruiter organization details
  useEffect(() => {
    const fetchOrganizations = async () => {
      await axios
        .get(
          `http://localhost:9000/organizations/${user.recruiter.organization_id}`
        )
        .then(async (res) => {
          // setOrgs(res.data);
          console.log("fetch organization details", res.data);
          setOrganization(res.data);
        })
        .catch((err) => console.log(err.data));
    };
    fetchOrganizations();
  }, []);

  const handleFormSubmit = async () => {
    let recruiter = {
      firstname: firstname,
      lastname: lastname,
      recruiterOrg: recruiterOrg,
      email: email,
    };

    const updateRecruiter = async (recruiter) => {
      return await axios({
        method: "PUT",
        url: `http://localhost:9000/recruiters/${user._id}`,
        data: recruiter,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: `bearer ${user.token}`,
          accept: "*/*",
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.response.data));
    };

    updateRecruiter(recruiter);
  };

  const handleRecruiterEdit = () => {
    console.log("Edit recruiter details");
    const handleFormSubmit = async () => {
      let recruiter = {
        firstname: firstname,
        lastname: lastname,
        recruiterOrg: recruiterOrg,
        email: email,
      };

      const updateRecruiter = async (recruiter) => {
        return await axios({
          method: "PUT",
          url: `http://localhost:9000/recruiters/${user._id}`,
          data: recruiter,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            authorization: `bearer ${user.token}`,
            accept: "*/*",
          },
          validateStatus: (status) => {
            return true;
          },
        }).catch((err) => console.log(err.response.data));
      };

      updateRecruiter(recruiter);
    };

    return (
      <div className={classes.formContainer}>
        <form>
          <TextField
            key={10}
            placeholder="Enter Firstname"
            className={classes.formInputs}
            label="Firstname"
            margin="dense"
            variant="outlined"
            // disableAutoFocus="true"
            autoFocus="autofocus"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            key={11}
            placeholder="Enter Lastname"
            className={classes.formInputs}
            label="Last Name"
            margin="dense"
            // disableAutoFocus="true"
            autoFocus="autofocus"
            variant="outlined"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />

          <TextField
            key={12}
            className={classes.formInputs}
            margin="dense"
            autoFocus="autofocus"
            // disableAutoFocus="true"
            variant="outlined"
            label="Organization"
            defaultValue={recruiterOrg.organizationName}
            inputProps={{ readOnly: true }}
          />

          <TextField
            key={13}
            placeholder="Enter Email"
            className={classes.formInputs}
            label="Email Id"
            margin="dense"
            // disableAutoFocus="true"
            autoFocus="autofocus"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Button className={sClasses.root} onClick={handleFormSubmit}>
            {"Update"}
          </Button>
        </form>
        {/* <div>
          <Button onClick={handleRecDiagClose}>Close</Button>
        </div> */}
      </div>
    );
  };

  const RecruiterProfileCard = () => {
    return (
      <CardComponent className={classes.divCardsContainer}>
        <div className={classes.recruiterHeader}>
          {/* <div className={classes.recruiterProfileImg} /> */}
          {/* <img
            src={require("../../assets/ProfileAvatar.png")}
            width="50px"
            height={"50px"}
          /> */}
           <AccountCircleIcon  style={{fontSize: "120px"}}/>
          <div className={classes.recruiterDetails}>
            <h3>
              {user.recruiter.firstname}&ensp;
              {user.recruiter.lastname}
            </h3>
            <h4>Recruiting for {recruiterOrg.organizationName}</h4>
          </div>
        </div>
        <br /> <hr />
        <div>
          <Accordion expanded={expand}>
            <AccordionSummary
              expandIcon={<EditIcon style={{ fontSize: "large" }} />}
              // aria-controls="panel1a-content"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <h3>My Profile Details</h3>
            </AccordionSummary>

            <AccordionDetails>{handleRecruiterEdit()}</AccordionDetails>
          </Accordion>
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
              <RecruiterProfileCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecruiterProfile;
