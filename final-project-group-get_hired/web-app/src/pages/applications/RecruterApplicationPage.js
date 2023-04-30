import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RecruiterApplicationCard from '../../components/applications/RecruiterApplicationCard';
import AuthService from "../../utilities/AuthService";
import { authActions } from "../../store/auth_slice";
import axios from "axios";
import classes from "./RecruiterApplicationPage.module.scss";
import SearchBar from "../../components/genericComponent/SearchBar";
import FilterSectionComponent from "../../components/genericComponent/FIlterSectionComponent";
import { PROGRAMS } from '../../utilities/constants';
import Slider from '@mui/material/Slider';
import CardComponent from '../../components/genericComponent/genericCard/CardComponent';
import Navbar from '../../components/navbar/Navbar';


/**
 * A functional component to render the applications page for the recruiter
 * @param {object} props 
 * @returns 
 */
function RecruiterApplicationPage(props) {

    let user = useSelector((state) => state.auth.user);

    const [applications, setApplications] = useState([]);
    const [job, setJob] = useState({});
    const [searchText, setSearchText] = useState("");
    const [sliderValue, setSliderValue] = useState(0.0);
    const [appliedProgramFilters, setProgramFilters] = useState([]);


    const navigate = useNavigate();
    const dispatch = useDispatch();


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

    /**
 * Function to fetch jobs
 * @param {string} url
 */
    const fetchApplications = async (url) => {
        const response = await axios.get(encodeURI(url));
        setApplications(response.data);
    };


    const params = useParams();
    const job_id = params.job_id;

    //fetch job details for the application
    useEffect(() => {
        if (user.recruiter) {
            const fetchJob = async () => {
                const response = await axios.get(`http://localhost:9000/jobs/${job_id}`);
                setJob(response.data);
            };
            fetchJob();
        }
    }, [user]);

    //fetching the applications when the user is the recruiter 
    useEffect(() => {
        if (user.recruiter) {
            const fetchApplications = async () => {
                const response = await axios.get(`http://localhost:9000/applications/?job_id=${job_id}`);
                setApplications(response.data);
            }
            fetchApplications();
        }
    }, [user]);

    //to filter the applications based on filter selection and search input
    useEffect(() => {
        let url = `http://localhost:9000/applications?job_id=${job_id}`;
        let params = [];
        let programQueryParam = "";


        //checking if job type filters are selected
        if (appliedProgramFilters.length > 0) {
            appliedProgramFilters.forEach((programValue) => {
                programQueryParam += `${programValue};`;
            });
        }
        if (programQueryParam.length > 0) {
            params.push({
                paramName: "programs",
                paramValue: programQueryParam.slice(0, programQueryParam.length - 1),
            });
        }

        //checking if anything is entered in searchbar
        if (searchText.length > 0) {
            params.push({ paramName: "searchText", paramValue: searchText });
        }

        //applying slider value
        params.push({paramName: "gpa", paramValue: sliderValue});

        //constructing url
        if (params.length > 0) {
            params.forEach((param, index) => {

                url += `&${param.paramName}=${param.paramValue}`;
            });
        }

        fetchApplications(url);

    }, [appliedProgramFilters, searchText, sliderValue])

    const isProgramSelected = (programValue) =>
        appliedProgramFilters.includes(programValue);

     //renders the application cards   
    const applicationCards = applications.map((application) => {
        return (
            <RecruiterApplicationCard key={application._id} application={application} />
        )
    })

    const handleSearchInputChange = (searchInput) => {
        setSearchText(searchInput);
    };

    const handleProgramCheckboxChange = (ProgramValue) => {
        let updatedProgramFilters;

        //the filter was selected, remove it from appliedFilters
        if (isProgramSelected(ProgramValue)) {
            updatedProgramFilters = appliedProgramFilters.filter(
                (P) => P !== ProgramValue
            );
        }
        //the filter was not selected, add it to appliedFilters\
        else {
            updatedProgramFilters = [...appliedProgramFilters, ProgramValue];
        }
        setProgramFilters(updatedProgramFilters);
    };

    const handleSliderChange =(event) =>{
        setSliderValue(event.target.value);
    }

    const valuetext = (value)=> {
        return value;
      }


    return (
        <div className="prbg ht-full-viewport py-1">
            <div className="flex-vertical">
                <div className="ly-1-3-1-bd-sec-left">
                    <Navbar />
                </div>
                <div className="ly-1-3-1-bd-sec-right">
                    <div className="ly-1-3-1-bd-sec-right-container flex-horizontal">
                        <div className="ly-1-3-1-bd-sec-right-main">
                            <div>
                                <SearchBar
                                    id="search-jobs"
                                    placeholder="Search for Student"
                                    label="Search for Student"
                                    onSearchInputChange={handleSearchInputChange}
                                />
                            </div>
                            {applications.length === 0 && (
                                <div className={classes.infoMessage}>No Applications Were Found</div>
                            )}
                            {applications.length > 0 && (
                                <div className={classes.applicationsContainer}>{applicationCards}</div>
                            )}
                        </div>
                        <div className="ly-1-3-1-bd-sec-right-sidebar">
                            <div className={classes.filterWrapper}>
                                <FilterSectionComponent
                                    heading={"PROGRAM"}
                                    values={PROGRAMS}
                                    handleCheckboxChange={handleProgramCheckboxChange}
                                />
                            </div>
                            <div>
                                <CardComponent className={classes.sliderCard} > 
                                <div className={classes.sliderCardHeader}>Above GPA</div>
                                <Slider
                                    aria-label="GPA"
                                    defaultValue={0}
                                    getAriaValueText={valuetext}
                                    valueLabelDisplay="auto"
                                    step={0.5}
                                    marks
                                    min={0}
                                    max={4}
                                    onChange={handleSliderChange}
                                />
                                </CardComponent>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecruiterApplicationPage;