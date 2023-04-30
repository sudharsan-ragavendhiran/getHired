import { useState, useEffect } from "react";
import axios from "axios";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import classes from './RecruiterApplicationCard.module.scss';

/**
 * A functional component to display the application to the recruiter.
 * The open resume button is only visible if a resume exists
 * @param {object} props 
 * @returns 
 */
function RecruiterApplicationCard(props) {

    const [student, setStudent] = useState({});

    //fetching the student information from the application 
    useEffect(() => {
        const fetchStudent = async () => {
            const response = await axios.get(`http://localhost:9000/students/?student_id=${props.application.student_id}`);
            setStudent(response.data[0]);
        };
        fetchStudent();
    }, []);

    //to download the resume from S3 bucket
    const handleOpenClick = (event)=>{
       event.stopPropagation();
        window.open(`https://.s3.amazonaws.com/${student.resumeKey}`, "_blank");
    }

    return (
        <>
            {student &&
                <CardComponent className={`${classes.applicationCard}`}>
                    <div className={classes.cardContent}>
                        <div className={classes.labels}>
                            <div>{`Name :`}</div>
                            <div>{`Major :`}</div>
                            <div>{`GPA :`}</div>
                            <div>{`Email : `}</div>
                            <div>{`Applied On : `}</div>
                        </div>
                        <div>
                            <div>{`${student.firstname} ${student.lastname}`}</div>
                            <div>{student.major}</div>
                            <div>{student.gpa ? student.gpa.$numberDecimal : ''}</div>
                            <div>{student.email}</div>
                            <div>{props.application.application_date.split("T")[0]}</div>
                        </div>
                    </div>
                    <div className={classes.divider}> </div>
                    <div>
                       {student.resumeKey ? <button className={classes.btn_resume} onClick={handleOpenClick}>Open Resume</button> : <div>No resume exists</div>}
                    </div>
                </CardComponent>
            }
        </>

    )

}

export default RecruiterApplicationCard;