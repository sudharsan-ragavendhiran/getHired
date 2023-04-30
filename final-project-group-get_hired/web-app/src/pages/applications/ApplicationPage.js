import Navbar from "../../components/navbar/Navbar";
import { useSelector } from "react-redux";
import ApplicationCard from '../../components/applications/ApplicationCard';
import classes from './ApplicationPage.module.scss';

/**
 * A functional component to view your applications
 * @param {object} props 
 * @returns 
 */
function ApplicationPage(props){
   
    const applications = useSelector((state=>state.applications.applications));
    //renders the application cards
    const applicationCards = applications.map((application)=>  <ApplicationCard key={application._id} application={application}/>)


    return (
        <div className="prbg ht-full-viewport py-1">
          <div className="flex-vertical">
            <div className="ly-1-4-bd-sec-left">
             <Navbar />
            </div>
            <div className="ly-1-4-bd-sec-right">
              <div className="ly-1-4-bd-sec-right-container flex-vertical">
                <div className="ly-1-4-bd-sec-right-main">
                    <div className={classes.applicationCardsWrapper}>
                        {applicationCards}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
      );


}

export default ApplicationPage;