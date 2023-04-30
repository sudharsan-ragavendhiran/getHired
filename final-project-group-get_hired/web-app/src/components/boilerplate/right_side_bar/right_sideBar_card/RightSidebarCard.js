import React from "react";
import "./RightSidebarCard.scss";
function RightSidebarCard(props) {
  return (
    <div className="rightSidebarCard">
      <div className="card-profileData">
        <div className="profileImg">
          <img
            src={require("../../../../assets/Barney.jpeg")}
            className="profileImg"
          />
        </div>
        <div className="profileText">
          <div className="profileName">Barney Stinson</div>
          <div className="profileRole">Senior Game Designer</div>
        </div>
      </div>
      <div className="card-review">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis atque id
          nobis itaque consequuntur eos consectetur quidem labore exercitationem
          nemo.
        </p>
      </div>
    </div>
  );
}

export default RightSidebarCard;
