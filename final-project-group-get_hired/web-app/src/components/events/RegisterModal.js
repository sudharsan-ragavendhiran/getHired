import ReactDOM from "react-dom";
import classes from "./RegisterModal.module.scss";
import CardComponent from "../genericComponent/genericCard/CardComponent";

const Backdrop = (props) => {
  return <div className={classes.backdrop} />;
};

const Modal = (props) => {
  const handleOnRegisterConfirm = () => {
    props.onRegisterConfirm(props.event);
  };

  return (
    <CardComponent className={classes.modal}>
      <header className={classes.header}>
        <h2>Register for Event</h2>
      </header>
      <div className={classes.content}>
        <p>{`Are you sure you want to register for this event ${props.event.event_title} at  ${props.event.event_organizer}?`}</p>
      </div>
      <footer className={classes.btn_grp}>
        <button onClick={props.onRegisterReject}>No</button>
        <button onClick={handleOnRegisterConfirm}>Yes</button>
      </footer>
    </CardComponent>
  );
};

function RegisterModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Modal
          event={props.event}
          onRegisterConfirm={props.onRegisterConfirm}
          onRegisterReject={props.onRegisterReject}
        />,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default RegisterModal;
