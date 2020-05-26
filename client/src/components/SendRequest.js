import React, { useState, useEffect } from "react";
import "./styles.css";
import noimageicon from "./assets/noimageicon.jpg";
import axios from "axios";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  InputGroupAddon,
  InputGroup,
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";
import { isEmpty } from "validator";
import { ProviderContext } from "../context/ProviderContext";
import { withRouter } from "react-router-dom";

function SendRequest({ history, Auth }) {
  let parkingData = JSON.parse(localStorage.getItem("parkingData"));
  //let Auth.state.userData = JSON.parse(localStorage.getItem("Auth.state.userData"));
  let [parkingInfo, setParkingInfo] = useState([]);
  let [vehiclePlatenumber, setVehiclePlatenumber] = useState("");
  let [slots, setSlots] = useState("");
  let parkingStart = "00:00:00";
  let parkingEnd = "00:00:00";
  let newDate = new Date();
  let requestHour = newDate.getHours();
  let requestMins = newDate.getMinutes();
  let requestSecs = newDate.getSeconds();

  console.log(`${requestHour}:${requestMins}:${requestSecs}`);
  let requestTime = `${requestHour}:${requestMins}:${requestSecs}`;
  console.log(requestTime);

  useEffect(() => {
    Axios.post("http://localhost:8000/api/providers/searchparkinglot", {
      id: parkingData.id,
    }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      parkingInfo = data;
      setParkingInfo(parkingInfo);
      console.log("success");
      console.log(parkingInfo);
    });
    console.log("what");
    setSlots(parkingInfo.reservedSlots++);
    console.log(parkingInfo);
  }, []);

  let garagePicture = parkingInfo.parkingLotPicture;
  console.log(parkingData);
  console.log(garagePicture);

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "vehiclePlatenumer");
    {
      setVehiclePlatenumber(e.currentTarget.value);
    }
  };

  const SendRequest = (e) => {
    e.preventDefault();
    console.log(slots);
    let check = 0;
    if (isEmpty(vehiclePlatenumber)) {
      check++;
    }
    if (check === 0) {
      Axios.post("http://localhost:8000/api/providers/reservedslot", {
        id: parkingInfo.id,
        userId: parkingInfo.userId,
        reservedSlots: parkingInfo.reservedSlots + 1,

        // requestedAt: requestTime
      }).then((_res) => {
        console.log(_res);
        let data = _res.data;
      });

      Axios.post("http://localhost:8000/api/transactions/inserttransaction", {
        providerId: parkingData.id,
        userId: Auth.state.userData.id,
        vehiclePlatenumber,
        parkingStart: parkingStart,
        parkingEnd: parkingEnd,
        // requestedAt: requestTime
      })
        .then((_res) => {
          console.log(_res);
          let data = _res.data;
          history.push("/home");
        })

        .catch((error) => console.log(error));
    } else {
      console.log("error");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <CardBody>
              <CardTitle>
                <img
                  src={garagePicture}
                  style={{
                    width: "100%",
                    border: "1px solid #ced4da",
                    marginBottom: 10,
                  }}
                />
              </CardTitle>
              <CardSubtitle>
                <div className="mt-5">
                  <h5 style={{ fontWeight: "bold" }}>Plate Number</h5>
                </div>
              </CardSubtitle>
              <Form>
                <InputGroup>
                  <Input
                    name="vehiclePlatenumber"
                    id="vehiclePlatenumber"
                    style={{
                      borderRadius: 50,
                      textAlign: "center",
                    }}
                    onChange={handleOnChange}
                    placeholder="Enter the plate number of the vehicle"
                  />
                </InputGroup>
              </Form>
              <div className="row login-form">
                <div className="col-md-12 loginTitle"></div>
                <div className="col-md-12 registerBtn">
                  <form>
                    <button
                      type="submit"
                      class="btnReg font-weight-bold"
                      onClick={SendRequest}
                    >
                      Send Request
                    </button>
                  </form>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(SendRequest);
