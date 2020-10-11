import React from "react";
import WebCam from "./Webcam";

// Import face profile
// This might not be necessary so I think can just take away

//const JSON_PROFILE = require("../descriptors/bnk48.json");

const HEIGHT = 720;

const Camera = () => {
  const onMatchFace = (name) => {
    console.log(`${name} has boarded the bus`);
  };
  return (
    <div
      className="Camera"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <p>Welcome On Board</p>
      <div
        style={{
          width: "80%",
          height: HEIGHT,
        }}
      >
        <WebCam onMatchFace={onMatchFace} mode="ENTER" />
      </div>
    </div>
  );
};

export default Camera;
