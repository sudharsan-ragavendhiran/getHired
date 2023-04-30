import React from "react";
import classes from "./ReviewCard.module.scss";
function ReviewCard(props) {
  return (
    <div className={classes.reviewCard}>
      <div className={classes.cardProfileData}>
        <div className={classes.profileImg}>
          <img
            src={require("../../assets/Barney.jpeg")}
            className={classes.profileImg}
          />
        </div>
        <div className={classes.profileText}>
          <div className={classes.profileName}>{props.review.name}</div>
          <div className={classes.profileRole}>Student</div>
        </div>
      </div>
      <div className={classes.cardReview}>
        <p>{props.review.review}</p>
      </div>
    </div>
  );
}

export default ReviewCard;
