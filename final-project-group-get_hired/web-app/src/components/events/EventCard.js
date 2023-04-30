import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from "./EventCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../utilities/AuthService.js";
import { authActions } from "../../store/auth_slice";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';

function EventCard(props) {
  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate(`/events/${props.event._id}`);
  };

  const handleApplyButtonOnClick = (event) => {
    event.stopPropagation();
    props.handleApplyButtonOnClick(props.event);
  };

  let user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();

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

  return (
    <CardComponent
      className={`wt-30-percent ${classes.eventCard}`}
      onClick={handleCardOnClick}
    >
      <div className={classes.orgSection}>
        {/* <img
          className={classes.orgImg}
          src={require("../../assets/Barney.jpeg")}
        /> */}
        <CorporateFareIcon style={{fontSize: "50px"}}/>
        <span className={classes.orgName}>{props.event.event_organizer}</span>
      </div>
      <div
        className={classes.eventDesc}
      >{`${props.event.event_organizer} organized a ${props.event.event_title} event`}</div>
      <div className={classes.eventDetails}>
        {`${props.event.event_type} | Seats ${props.event.no_of_seats}`}
      </div>
      <div className={classes.eventDate}>{`Apply By: ${new Date(
        props.event.event_date
      ).toLocaleDateString()}`}</div>

      {user.isStudent && <div className={classes.divider}></div>}

      {!props.isRegistered && user.isStudent && (
        <div className={classes.apply} data-tip="" data-for="cardTooltip">
          <button
            className={classes.btn_apply}
            onClick={handleApplyButtonOnClick}
          >
            Register
          </button>
          {/* <ReactTooltip id="cardTooltip" type="info">
            <span>Click to register for this event</span>
          </ReactTooltip> */}
        </div>
      )}

      {props.isRegistered && <p className={classes.apply}>Registered</p>}
    </CardComponent>
  );
}

export default EventCard;
