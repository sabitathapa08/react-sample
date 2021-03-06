import React from "react";
import { Fade } from "react-reveal";
import ReactLoader from "react-loader-spinner";

export default props => (
  <Fade>
    <div className="fieldsight-popup open">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          zIndex: 99999
        }}
      >
        <ReactLoader
          type="BallTriangle"
          color="#00628E"
          height={50}
          width={50}
        />

        <h6 style={{ color: "#00628E", marginTop: "20px" }}>
          Loading... Please wait!
          {/* Loading... Please wait! {props.loaded && `${props.loaded} %`} */}
        </h6>
      </div>
    </div>
  </Fade>
);
