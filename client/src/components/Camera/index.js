import React, { useState } from "react";
import {withRouter} from 'react-router-dom'
import WebCam from "./Webcam";
import { Button, Typography } from "antd";

const HEIGHT = 720;
const seedData = ["USER_1", "USER_2", "USER_3"];
const { Title } = Typography;
const Camera = ({location, history}) => {
  const [riders, setRiders] = useState(seedData);
  const {state} = location;
  const {position, driver, plateNumber} = state;
  
  const onMatchFace = (name) => {
    if(position === "enter"){
      // send to server to increase count
      if (!riders.includes(name)){
        setRiders((state) => [...state, name]);
        console.log(`${name} has boarded the bus, ${plateNumber}, driven by ${driver}`);
      } else if (position === "exit") {
        // send to server to decrease count
        if (!riders.includes(name)){
          setRiders((state) => [...state, name]);
          console.log(`${name} has exited the bus, ${plateNumber}, driven by ${driver}`);
        }  
      }    
    }
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
      <Title level={3}>{position === "enter" ? "Welcome On Board!" : "Goodbye, have a nice day!"}</Title>

      <div
        style={{
          width: "80%",
          height: HEIGHT,
        }}
      >
        <WebCam count={riders.length} onMatchFace={onMatchFace} {...state} />
      </div>
      <Button onClick={()=>{history.push("/")}}size="large" shape="round" style={{ marginTop: 20 }} type="danger">
        Stop Recording
      </Button>
    </div>
  );
};

export default withRouter(Camera);
