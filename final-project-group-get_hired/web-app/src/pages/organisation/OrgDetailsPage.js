import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventsSection from "../../components/events/EventsSection";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import JobsSection from "../../components/jobs/JobsSection";
import Navbar from "../../components/navbar/Navbar";
import OrgDetailsCard from "../../components/orgs/OrgDetailsCard";
import ReviewContainer from "../../components/orgs/ReviewContainer";

function OrgDetailsPage() {
  const [org, setOrg] = useState({});
  const params = useParams();
  const org_id = params.org_id;

  useEffect(() => {
    const fetchOrg = async () => {
      const res = await axios.get(
        `http://localhost:9000/organizations/${org_id}`
      );
      setOrg(res.data);
    };

    fetchOrg();
  }, []);

  return (
    <div className="prbg ht-full-viewport py-1">
      <div className="flex-vertical">
        <div className="ly-1-3-1-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          <Navbar />
        </div>
        <div className="ly-1-3-1-bd-sec-right">
          <div className="ly-1-3-1-bd-sec-right-container flex-vertical">
            <div className="ly-1-3-1-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              {org && <OrgDetailsCard key={org._id} organization={org} />}
            </div>
            {/* <div className="ly-1-3-1-bd-sec-right-sidebar"> */}
              {/*HERE IS WHERE YOUR RIGHT CONTENT SHOULD GO*/}
              {/* <ReviewContainer key={org_id} organizationId={org_id} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrgDetailsPage;
