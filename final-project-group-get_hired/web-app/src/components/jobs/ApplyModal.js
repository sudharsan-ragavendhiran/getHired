import ReactDOM from 'react-dom';
import classes from './ApplyModal.module.scss';
import CardComponent from "../genericComponent/genericCard/CardComponent";

const Backdrop = (props) => {
    return <div className={classes.backdrop}  />;
};
/**
 * A modal that gets displayed on the screen
 * @param {object} props 
 * @returns 
 */
const Modal = (props) => {
    
  const handleOnApplyConfirm = ()=>{
        props.onApplyConfirm(props.job);
    }

    return (
        <CardComponent className={classes.modal}>
            <header className={classes.header}>
                <h2>Applying for Job</h2>
            </header>
            <div className={classes.content}>
                <p>{`Are you sure you want to apply for the role ${props.job.job_title} at  ${props.job.organizationName}?`}</p>
            </div>
            <footer className={classes.btn_grp}>
                <button onClick={props.onApplyReject}>No</button>
                <button onClick={handleOnApplyConfirm}>Yes</button>
            </footer>
        </CardComponent>
    );
};

/**
 * A functional component to display the confirmation dialog to the student when applying for a job
 * @param {object} props 
 * @returns 
 */
function ApplyModal(props) {
    return (<>
        {ReactDOM.createPortal(
            <Backdrop />,
            document.getElementById('backdrop-root')
        )}
        {ReactDOM.createPortal(
            <Modal
                job={props.job}
                onApplyConfirm={props.onApplyConfirm}
                onApplyReject={props.onApplyReject}
            />,
            document.getElementById('modal-root')
        )}
    </>)
}

export default ApplyModal;

