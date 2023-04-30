import React from "react";
import "./RightSideBar.scss";
import RightSidebarCard from "./right_sidebar_card/RightSidebarCard";
function RightSideBar() {
  return (
    <div className="rightSideBar">
      <h2>Workers Review</h2>
      <RightSidebarCard />
      <RightSidebarCard />
      <RightSidebarCard />
      <RightSidebarCard />
    </div>
  );
}

export default RightSideBar;
