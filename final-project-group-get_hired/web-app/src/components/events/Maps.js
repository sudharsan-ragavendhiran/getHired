import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import classes from "./Map.module.scss";

class Maps extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Map
        className={classes.map}
        google={this.props.google}
        style={{ width: "80%", height: "70%" }}
        zoom={5}
        initialCenter={{
          lat: this.props.lat,
          lng: this.props.lng,
        }}
      >
        <Marker
          position={{
            lat: this.props.lat,
            lng: this.props.lng,
          }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({ apiKey: process.env.REACT_APP_GOOGLE_KEY })(
  Maps
);
