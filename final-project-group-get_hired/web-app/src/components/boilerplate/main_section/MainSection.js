import React from "react";
import "./MainSection.scss";
import SkillChip from '../../genericComponent/genericChip/SkillChip'
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function MainSection() {
  return (
    <div className="mainSection">
      <div className="mainSection-title">
        <h2>Lead Game Designer</h2>
      </div>
      <div className="mainSection-comName">
        <h5>Ubisoft, France</h5>
      </div>
      <div className="mainSection-jobDetails">
        <div className="jobDetailsItem">
          <div className="jobIcon">
            <PeopleIcon />
          </div>
          <div className="jobDetailsTxt">2 Vacancy</div>
        </div>
        <div className="jobDetailsItem">
          <div className="jobIcon">
            <WorkIcon />
          </div>
          <div className="jobDetailsTxt">Full-Time</div>
        </div>
        <div className="jobDetailsItem">
          <div className="jobIcon">
            <AttachMoneyIcon />
          </div>
          <div className="jobDetailsTxt">$250k-300k</div>
        </div>
      </div>
      <div className="mainSection-jobDesc">
        <h3>Job Description:</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quae
          hic vel? Fugiat laudantium fuga neque error saepe doloribus, dolorem
          ullam reprehenderit nostrum molestiae deserunt nisi dignissimos maxime
          eveniet ducimus corrupti harum quam, sequi laboriosam. Cumque quam id
          magnam incidunt vel tempore voluptatem dolor atque delectus alias
          autem, beatae odit!
        </p>
      </div>
      <div className="mainSection-responsibility">
        <h3>Game Designer Responsibilities:</h3>
        <ul>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
          <li>Lorem ipsum dolor sit amet.</li>
        </ul>
      </div>
      <div className="mainSection-skills">
        <h3>Required Skills:</h3>
        <div className="mainSection-skills-chips">
          <SkillChip />
          <SkillChip />
          <SkillChip />
          <SkillChip />
          <SkillChip />
          <SkillChip />
          <SkillChip />
          <SkillChip />
        </div>
      </div>
    </div>
  );
}

export default MainSection;
