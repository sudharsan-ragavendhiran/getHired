import React, { useEffect, useRef, useState } from "react";
import CardComponent from "../genericComponent/genericCard/CardComponent";
import "./EventDetailsCard.scss";
import Maps from "./Maps";
import { ClipLoader } from "react-spinners";
import dateFormat from "dateformat";

function EventDetailsCard(props) {
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  useEffect(() => {
    const timer = setTimeout(() => {
      setEvent(props.event);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  });
  return (
    <CardComponent className="event-container">
      {loading === false ? (
        <div>
          <h2>{event.event_title}</h2>
          <p>Organized by: {event.event_organizer}</p>
          <p>
            <strong>Description:</strong> <br />
            {event.event_description}
          </p>
          <p>Available Seats: {event.no_of_seats}</p>
          <p>Event Date: {dateFormat(event.event_date, "yyyy-mm-dd")}</p>
          <Maps
            lat={props.event.event_location.latitude}
            lng={props.event.event_location.longitude}
          />
        </div>
      ) : (
        <ClipLoader size={120} />
      )}
    </CardComponent>
  );
}

export default EventDetailsCard;
