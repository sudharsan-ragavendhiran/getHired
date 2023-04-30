import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import classes from "./EventSection.module.scss";
function EventsSection(props) {
  const [events, setEvent] = useState(props.events);

  useEffect(() => {
    setEvent(props.events);
  }, [props]);

  const eventCards = events.map((event) => {
    return <EventCard key={event._id} event={event} isRecruiter={props.isRecruiter} />;
  });

  return <div className={classes.eventSection}>{eventCards}</div>;
}

export default EventsSection;
