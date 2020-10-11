import React from "react";
import Webcam from "react-webcam";
import {
  loadModels,
  getFullFaceDescription,
  createMatcher,
} from "../../scripts/face";

// Import face profile
// This might not be necessary so I think can just take away

//const JSON_PROFILE = require("../descriptors/bnk48.json");

const HEIGHT = 720;
const inputSize = 160;

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: HEIGHT,
      }}
    >
      <h2>Loading...</h2>
    </div>
  );
};
class WebCam extends React.Component {
  constructor(props) {
    super();
    this.webcam = React.createRef();
    this.state = {
      fullDesc: null,
      detections: null,
      descriptors: null,
      faceMatcher: null,
      match: null,
      facingMode: null,
      mode: props.mode,
    };
  }

  componentWillMount = async () => {
    await loadModels();
    this.setState({ faceMatcher: await createMatcher() });
    this.setInputDevice();
  };

  setInputDevice = () => {
    navigator.mediaDevices.enumerateDevices().then(async (devices) => {
      let inputDevice = await devices.filter(
        (device) => device.kind === "videoinput"
      );
      if (inputDevice.length < 2) {
        await this.setState({
          facingMode: "user",
        });
      } else {
        await this.setState({
          facingMode: { exact: "environment" },
        });
      }
      this.startCapture();
    });
  };

  startCapture = () => {
    this.interval = setInterval(() => {
      this.capture();
    }, 1500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onMatchFace(match) {
    if (match.length > 0) {
      for (let m of match) {
        if (m._label != "unknown") {
          // send to backend
          this.props.onMatchFace(m._label);
        }
      }
    }

    this.setState({ match });
  }
  capture = async () => {
    if (!!this.webcam.current) {
      await getFullFaceDescription(
        this.webcam.current.getScreenshot(),
        inputSize
      ).then((fullDesc) => {
        if (!!fullDesc) {
          this.setState({
            detections: fullDesc.map((fd) => fd.detection),
            descriptors: fullDesc.map((fd) => fd.descriptor),
          });
        }
      });

      if (!!this.state.descriptors && !!this.state.faceMatcher) {
        let match = await this.state.descriptors.map((descriptor) =>
          this.state.faceMatcher.findBestMatch(descriptor)
        );
        this.onMatchFace(match);
      }
    }
  };

  render() {
    const { detections, match, facingMode } = this.state;
    let videoConstraints = null;
    if (!!facingMode) {
      videoConstraints = {
        width: "100%",
        height: HEIGHT,
        facingMode: facingMode,
      };
    }

    let drawBox = null;
    if (!!detections) {
      drawBox = detections.map((detection, i) => {
        let _H = detection.box.height;
        let _W = detection.box.width;
        let _X = detection.box._x;
        let _Y = detection.box._y;
        return (
          <div key={i}>
            <div
              style={{
                position: "absolute",
                border: "solid",
                borderColor: "blue",
                height: _H,
                width: _W,
                transform: `translate(${_X}px,${_Y}px)`,
              }}
            >
              {!!match && !!match[i] ? (
                <p
                  style={{
                    backgroundColor: "blue",
                    border: "solid",
                    borderColor: "blue",
                    width: _W,
                    marginTop: 0,
                    color: "#fff",
                    transform: `translate(-2px,${_H}px)`,
                  }}
                >
                  {match[i]._label}
                </p>
              ) : null}
            </div>
          </div>
        );
      });
    }

    return (
      <div style={{ position: "relative", width: "100%" }}>
        {!!videoConstraints ? (
          <div style={{ position: "absolute" }}>
            <Webcam
              audio={false}
              width={"100%"}
              height={HEIGHT}
              ref={this.webcam}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
        ) : (
          <Loading />
        )}
        {!!drawBox ? drawBox : null}
      </div>
    );
  }
}

export default WebCam;
