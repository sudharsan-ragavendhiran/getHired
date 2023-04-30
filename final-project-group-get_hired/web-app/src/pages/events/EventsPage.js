import axios from "axios";
import React, { useEffect, useState } from "react";
import EventCard from "../../components/events/EventCard.js";
import FilterSectionComponent from "../../components/genericComponent/FIlterSectionComponent.js";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent.js";
import Navbar from "../../components/navbar/Navbar.js";
import classes from "./EventsPage.module.scss";
import SearchBar from "../../components/genericComponent/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import AuthService from "../../utilities/AuthService.js";
import { authActions } from "../../store/auth_slice.js";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import RegisterModal from "../../components/events/RegisterModal";
import { postRegistration } from "../../store/registrations_slice";
import { makeStyles } from "@mui/styles";

const EVENT_TYPE_FILTERS = ["NETWORKING", "CAREER FAIR", "WORKSHOP"];
let isInitial = true;

const useStyles = makeStyles({
  root: {
    backgroundColor: "#D41A2B",
    color: "#ffffff",
    height: "3rem",
    lineHeight: 1,
    "&:hover": {
      backgroundColor: "transparent",
      border: "1px solid #D41A2B",
      color: "#d90429",
      height: "3rem",
      padding: 0,
    },
  },
});
function EventsPage() {
  const [appliedEventTypeFilters, setEventTypeFilters] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [events, setEvents] = useState([]);
  let user = useSelector((state) => state.auth.user);
  const nav = useNavigate();
  const sClasses = useStyles();

  const dispatch = useDispatch();
  const checkUser = () => {
    // console.log(AuthService.getCurrUser(), "AuthService.getCurrUser()");
    if (!user) {
      user = AuthService.getCurrUser();
      if (!user) {
        nav("/");
        return;
      }
      dispatch(authActions.login(AuthService.getCurrUser() || {}));
    }
  };

  useEffect(() => {
    checkUser();
    let element = document.getElementsByClassName(sClasses.root);
    console.log("Element: ", element);
    if (user.isStudent === false) {
      element[0].style.display = "block";
    } else {
      element[0].style.display = "none";
    }
  }, []);

  //getting all events when the component is rendered for the first Time
  useEffect(() => {
    if (isInitial) {
      const fetchEvents = async () => {
        const res = await axios({
          method: "GET",
          url: "http://localhost:9000/events",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            accept: "*/*",
            Authorization: `bearer ${user.token}`,
          },
        });
        setEvents(res.data);
      };

      fetchEvents();
    } else {
      isInitial = false;
    }
  }, []);

  const fetchEvents = async (url) => {
    const res = await axios({
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        accept: "*/*",
        Authorization: `bearer ${user.token}`,
      },
    });
    setEvents(res.data);
  };

  //filtering events when the filters are changed
  useEffect(() => {
    let url = "http://localhost:9000/events";
    let params = [];
    let eventTypeQueryParam = "";

    //checking if event type filters are selected
    if (appliedEventTypeFilters.length > 0) {
      appliedEventTypeFilters.forEach((eventTypeValue) => {
        eventTypeQueryParam += `${eventTypeValue};`;
      });
    }

    if (eventTypeQueryParam.length > 0) {
      params.push({
        paramName: "event_type",
        paramValue: eventTypeQueryParam.slice(
          0,
          eventTypeQueryParam.length - 1
        ),
      });
    }

    if (searchText.length > 0) {
      params.push({ paramName: "searchText", paramValue: searchText });
      // url+=`&searchText=${searchText}`
    }

    if (params.length > 0) {
      params.forEach((param, index) => {
        if (index === 0) {
          url += `?${param.paramName}=${param.paramValue}`;
        } else {
          url += `&${param.paramName}=${param.paramValue}`;
        }
      });
    }

    fetchEvents(url);
  }, [appliedEventTypeFilters, searchText]);

  const [isRegistered, setIsRegistered] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();

  const registrations = useSelector(
    (state) => state.registrations.registrations
  );

  const handleApplyButtonOnClick = (event) => {
    setSelectedEvent(event);
    setIsRegistered(true);
  };

  const eventCards = events.map((event) => {
    const registrationExist = registrations.filter(
      (registration) => registration.event_id === event._id
    );

    return (
      <EventCard
        key={event._id}
        event={event}
        handleApplyButtonOnClick={handleApplyButtonOnClick}
        isRegistered={registrationExist.length > 0}
      />
    );
  });

  const isEventTypeSelected = (eventTypeValue) =>
    appliedEventTypeFilters.includes(eventTypeValue);

  const handleEventTypeCheckboxChange = (eventTypeValue) => {
    let updatedEventTypeFilters;

    //the filter was selected, remove it from appliedFilters
    if (isEventTypeSelected(eventTypeValue)) {
      updatedEventTypeFilters = appliedEventTypeFilters.filter(
        (ETV) => ETV !== eventTypeValue
      );
    }
    //the filter was not selected, add it to appliedFilters\
    else {
      updatedEventTypeFilters = [...appliedEventTypeFilters, eventTypeValue];
    }
    setEventTypeFilters(updatedEventTypeFilters);
  };

  const handleSearchInputChange = (searchInput) => {
    setSearchText(searchInput);
  };

  const showCreateEventBtn = () => {
    nav("/events/create-event");
  };

  const onRegisterConfirm = (event) => {
    //TODO - REMOVE HARDCODED DOCUMENT_ID and STUDENT_ID

    const registration = {
      event_id: event._id,
      student_id: user._id,
    };

    dispatch(postRegistration(registration));
    setSelectedEvent(null);
    setIsRegistered(false);
  };

  const onRegisterReject = () => {
    setSelectedEvent(null);
    setIsRegistered(false);
  };

  return (
    <div className="prbg ht-full-viewport py-1">
      {isRegistered && (
        <RegisterModal
          onRegisterConfirm={onRegisterConfirm}
          onRegisterReject={onRegisterReject}
          event={selectedEvent}
        />
      )}

      <div className="flex-horizontal">
        <Navbar />
      </div>
      <div className="ly-1-3-1-bd-sec-right">
        <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
          <div className="ly-1-3-1-bd-sec-right-main">
            {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
            <div>
              <SearchBar
                id="search-jobs"
                placeholder="Search for an Event"
                label="Search for an Event"
                onSearchInputChange={handleSearchInputChange}/>
            </div>
            <div className={classes.btnContainer}>
              <Button onClick={showCreateEventBtn} className={sClasses.root}>
                Create Event
              </Button>
            </div>
            <div className={classes.jobContainerWrapper}>
              <div className={classes.eventsContainer}>{eventCards}</div>
            </div>
          </div>
          <div className="ly-1-3-1-bd-sec-right-sidebar">
            <div className={`${classes.filterWrapper} ${classes.filterTypeWrapper}`}>
              {/*HERE IS WHERE YOUR RIGHT CONTENT SHOULD GO*/}
              <FilterSectionComponent
                heading={"EVENT TYPE"}
                values={EVENT_TYPE_FILTERS}
                isChecked={isEventTypeSelected}
                handleCheckboxChange={handleEventTypeCheckboxChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventsPage;
