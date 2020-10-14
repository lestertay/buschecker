import React, { useState, useEffect } from "react";
import moment from 'moment';
import {withRouter} from 'react-router-dom'
import WebCam from "./Webcam";
import socketIOClient from "socket.io-client";
import { Button, Typography } from "antd";

const HEIGHT = 720;
const { Title } = Typography;
const Camera = ({location, history}) => {
  const [socket, setSocket] = useState(null);
  const [riders, setRiders] = useState([]);
  const {state} = location;
  const {position, driver, plateNumber} = state;
  useEffect(() => {
    const socket = socketIOClient('http://192.168.1.5:8000');
    socket.on("COMMUTER_COUNT_UPDATE", (data) => {
      console.log('number of commuters:', data.data.length)
      setRiders(data.data)
    })
    setSocket(socket);
    return () => socket.disconnect()
  },[])
  useEffect(() => {
    console.log('page changeses')
  },[location, history])
  const onMatchFace = (name) => {
    if(position === "enter"){
      // send to server to increase count
      if (!riders.includes(name)){
        console.log(`${name} has boarded the bus, ${plateNumber}, driven by ${driver}`);
        const configData = {
          commuterName: name,
          busDriver: driver,
          busPlate: plateNumber,
          startTime: moment(new Date()).toString(),
          startLoc: 'Hall 12'
        }
        console.log('sending over', configData)
        if(socket) socket.emit('NEW_COMMUTER', {data: configData});
        
      }    
    } else if (position === "exit") {
      // send to server to decrease count
      console.log(`${name} has exited the bus, ${plateNumber}, driven by ${driver}`);
      if (riders.includes(name)){
        const configData = {
          commuterName: name,
          busDriver: driver,
          busPlate: plateNumber,
          stopTime: moment().toString(),
          stopLoc: 'North Hill'
        }
        if(socket) socket.emit('EXIT_COMMUTER', {data: configData});
        
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
