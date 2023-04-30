import axios from "axios";
import React, { useEffect, useState } from "react";
import EventsSection from "../events/EventsSection";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import JobsSection from "../jobs/JobsSection";
import classes from "./OrgDetailsCard.module.scss";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';


function OrgDetailsCard(props) {
  const [orgJobs, setOrgJobs] = useState([]);
  const [orgEvents, setOrgEvents] = useState([]);
  const itemsPerPage = 3;
  console.log(props.organization._id);

  useEffect(() => {
    const fetchOrgJobs = async () => {
      const res = await axios.get(
        `http://localhost:9000/jobs/?org_id=${props.organization._id}`
      );
      setOrgJobs(res.data);
    };

    fetchOrgJobs();
  }, []);

  useEffect(() => {
    const fetchOrgEvents = async () => {
      const res = await axios({
        method: "GET",
        url: `http://localhost:9000/events/?org_id=${props.organization._id}`,
      });
      setOrgEvents(res.data);
    };

    fetchOrgEvents();
  }, []);

  const indexOfLastItem = 1 * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = orgJobs.slice(indexOfFirstItem, indexOfLastItem);
  const currentEvents = orgEvents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <CardComponent className={classes.mainContainer}>
      <div>
        <div className={classes.orgHeader}>
          {/* <img
            src={props.organization.organizationLogo}
            className={classes.orgLogo}
          /> */}
          <CorporateFareIcon style={{fontSize: "80px", marginRight: "1rem"}} />
          <h3 className={classes.orgName}>
            {props.organization.organizationName}
          </h3>
        </div>
        <h2 className={classes.orgAboutus}>About Us:</h2>
        <p className={classes.orgAboutus}>{props.organization.aboutUs}</p>
        <h3>{props.organization.sponsorship}</h3>
      </div>
      <div className={classes.moreTitle}>
        {`More Jobs at ${props.organization.organizationName}`}
      </div>
      <div className={classes.jobsContainer}>
        <JobsSection jobs={currentJobs} isRecruiter={true} />
      </div>
      <div className={classes.moreTitle}>
        {`More Events at ${props.organization.organizationName}`}
      </div>
      <div className={classes.jobsContainer}>
        <EventsSection events={currentEvents} isRecruiter={true} />
      </div>
    </CardComponent>
  );
}

export default OrgDetailsCard;
