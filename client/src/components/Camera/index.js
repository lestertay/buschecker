import React, { useState } from "react";
import WebCam from "./Webcam";
import { Button, Typography } from "antd";

const HEIGHT = 720;
const seedData = ["USER_1", "USER_2", "USER_3"];
const { Title } = Typography;
const Camera = () => {
  const [riders, setRiders] = useState(seedData);
  const onMatchFace = (name) => {
    console.log(`${name} has boarded the bus`);
    if (!riders.includes(name)) setRiders((state) => [...state, name]);
  };
  return (
    <div
      className="Camera"
      style={{
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Title level={3}>Welcome On Board</Title>

      <div
        style={{
          width: "80%",
          height: HEIGHT,
        }}
      >
        <WebCam count={riders.length} onMatchFace={onMatchFace} mode="ENTER" />
      </div>
      <Button size="large" shape="round" style={{ marginTop: 20 }} type="danger">
        Stop Recording
      </Button>
    </div>
  );
};

export default Camera;
