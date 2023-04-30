import CardComponent from "../genericComponent/genericCard/CardComponent";
import { useNavigate } from "react-router-dom";
import classes from "./JobCard.module.scss";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../utilities/AuthService.js";
import { authActions } from "../../store/auth_slice";
import React, { useEffect } from "react";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

/**
 * A reusable functional component to render the job card in various other components
 * @param {object} props 
 * @returns 
 */
function JobCard(props) {

  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/jobs/${props.job._id}`);
  };
  console.log("--------podaa------ "+props.isApplied);

  //apply button onclick
  const handleApplyButtonOnClick = (event) => {
    event.stopPropagation();
    props.handleApplyButtonOnClick(props.job);
  };

  let user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

  const checkUser = () => {
    //if user not in store
    if (!user) {
      console.log('user not found!!');
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

  return (
    <CardComponent
      className={`wt-30-percent ${classes.jobCard}`}
      onClick={handleCardOnClick}
    >
      <div>
        <div className={classes.orgSection}>
          {/* <img
            className={classes.orgImg}
            src={require("../../assets/Barney.jpeg")}
          /> */}
          <CorporateFareIcon style={{fontSize: "50px"}}/>
          <span>{props.job.organizationName}</span>
        </div>
        <div
          className={classes.jobDesc}
        >{`${props.job.organizationName} is looking for a ${props.job.job_title}`}</div>
        <div className={classes.jobDetails}>
          {" "}
          <LocationOnIcon style={{ fontSize: "1rem" }} />{" "}
          {`${props.job.job_location} | ${props.job.job_type} | Pay ${props.job.job_salary}`}{" "}
        </div>
        <div className={classes.jobDeadline}>{`Apply By: ${new Date(
          props.job.job_deadline
        ).toLocaleDateString()}`}</div>

        {!props.isRecruiter && <div className={classes.divider}></div>}

        {!props.isRecruiter &&
          (!props.isApplied && (
            <div className={classes.apply} data-tip="" data-for="cardTooltip">
              <button
                className={classes.btn_apply}
                onClick={handleApplyButtonOnClick}
              >
                Apply
              </button>
              {/* <ReactTooltip id="cardTooltip" type="info">
                <span>Click to apply for job</span>
              </ReactTooltip> */}
            </div>
          ))
          }
        {props.isApplied && props.isRecruiter && <p className={classes.apply}>Applied</p>}
      </div>
    </CardComponent>
  );
}

export default JobCard;
