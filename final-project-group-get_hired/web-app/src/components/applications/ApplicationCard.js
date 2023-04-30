import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from './ApplicationCard.module.scss';
import axios from "axios";
import {Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
//import useStyles from "../../utilities/styles";

const useStyles =  makeStyles({
    root: {
      backgroundColor: "#d90429",
      color: "#ffffff",
      height: "2rem",
      lineHeight: 1,
      "&:hover": {
        backgroundColor: "transparent",
        border: "1px solid #d90429",
        color: "#d90429",
        padding: 0,
      },
    },
  });
/**
 * A functional component to render the application card
 * @param {object} props 
 * @returns 
 */
function ApplicationCard(props) {

    const [job, setJob] = useState({});
    const [org, setOrg] = useState({});

    const sClasses = useStyles();
    //fetch job details for the application
    useEffect(() => {

        const fetchJob = async () => {
            const response = await axios.get(`http://localhost:9000/jobs/${props.application.job_id}`);
            setJob(response.data);
        };
        fetchJob();
    }, [])

    //fetch organization details for the application
    useEffect(() => {
        if (job) {
            const fetchOrganization = async () => {
                const response = await axios.get(`http://localhost:9000/organizations/${job.organization_id}`);
                setOrg(response.data);
            };
            fetchOrganization();
        }
    }, [job]);


    const navigate = useNavigate();

    //navigate user to job details page
    const handleJobDetailsClick=(event)=>{
        navigate(`/jobs/${job._id}`);
    }

    //navigate user to org details page
    const handleOrgDetailsClick=(event)=>{
        navigate(`/organizations/${org._id}`);
    }

    return (<CardComponent
        className={` ${classes.applicationCard}`}
    >
        <div className={classes.applicationCardWrapper}>
            <div className={classes.orgSection}>
                {/* <img
                    className={classes.orgImg}
                    src={require("../../assets/Barney.jpeg")}
                /> */}
                <CorporateFareIcon style={{fontSize: "50px"}}/>
            </div>
            <div className={classes.applicationCardContent}>
                <div className={classes.jobTitle}>{job.job_title}</div>
                <div className={classes.jobDetail}>{org.organizationName}</div>
                <div className={classes.jobDetail}>{job.job_type}</div>
                <div className={classes.jobDetail}>{job.job_salary}</div>
                <div className={job.job_status==='ACTIVE' ? classes.open : classes.closed}>{job.job_status==='ACTIVE' ? "Open" : "Closed"}</div>
            </div>
            <div className={classes.btn_grp}>
                <Button className={sClasses.root} onClick={handleJobDetailsClick}>View Job Details</Button>
                <Button className={sClasses.root} onClick={handleOrgDetailsClick}>View Organization Details</Button>
            </div>
        </div>
    </CardComponent>
    )
}

export default ApplicationCard;