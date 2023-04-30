import { Button, TextField, Checkbox, FormControlLabel } from "@mui/material";
import React, { useState } from "react";
import CardComponent from "../../components/genericComponent/genericCard/CardComponent";
import axios from "axios";
import classes from "./CreateOrgPage.module.scss";

function CreateOrgPage() {
  const [logo, setLogo] = useState("");
  const [orgName, setOrgName] = useState("");
  const [aboutUs, setAboutUs] = useState("");
  const [sponsorship, setSponsorship] = useState(false);

  const handleCheck = (event) => {
    setSponsorship(event.target.checked);
  };

  const handleOrgSubmit = () => {
    const org = {
      organizationLogo: logo,
      organizationName: orgName,
      aboutUs: aboutUs,
      sponsorship: sponsorship,
    };

    const addOrg = async (event) => {
      return await axios({
        method: "POST",
        url: "http://localhost:9000/organizations",
        data: org,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          accept: "*/*",
        },
        validateStatus: (status) => {
          return true;
        },
      }).catch((err) => console.log(err.data));
    };

    addOrg(org);
    setLogo("");
    setOrgName("");
    setAboutUs("");
  };

  return (
    <CardComponent className={`ht-full-percent ${classes.createEventCard}`}>
      <div className={classes.formContainer}>
        <h3>Create an Organization</h3>
        <TextField
          placeholder="Enter Organization Name"
          className={classes.formInputs}
          label="Organization Name"
          margin="dense"
          variant="outlined"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <TextField
          placeholder="Enter Organizer Logo URL"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          value={logo}
          label="Organization Logo URL"
          onChange={(e) => setLogo(e.target.value)}
        />
        <TextField
          placeholder="Enter About Us"
          className={classes.formInputs}
          variant="outlined"
          margin="dense"
          value={aboutUs}
          label="About Us"
          onChange={(e) => setAboutUs(e.target.value)}
        />
        <FormControlLabel
          control={<Checkbox checked={sponsorship} onChange={handleCheck} />}
          label="Sponsorship"
        />
        <Button
          className={classes.formBtn}
          margin="dense"
          onClick={handleOrgSubmit}
        >
          Submit
        </Button>
      </div>
    </CardComponent>
  );
}

export default CreateOrgPage;
