import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventDetailsCard from "../../components/events/EventDetailsCard";
import Navbar from "../../components/navbar/Navbar";
import APIHelper from "../../utilities/APIHelper";

function EventDetailsPage() {
  const [event, setEvent] = useState({});
  const params = useParams();
  const event_id = params.event_id;

  useEffect(() => {
    APIHelper.getItemById("events", event_id).then((res) => setEvent(res.data));
  }, []);

  return (
    <div className="prbg ht-full-viewport py-1">
        <Navbar />
      <div className="flex-horizontal">
    
        <div className="ly-1-4-bd-sec-left">
          {/*HERE IS WHERE YOUR NAVBAR/LEFTSIDEBAR SHOULD GO*/}
          
        </div>
        <div className="ly-1-4-bd-sec-right">
          <div className="ly-1-4-bd-sec-right-container flex-horizontal">
            <div className="ly-1-4-bd-sec-right-main">
              {/*HERE IS WHERE YOUR CENTRAL CONTENT SHOULD GO*/}
              {event && <EventDetailsCard key={event_id} event={event} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsPage;
