import React, { useEffect, useState } from "react";
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
} from "reactstrap";
import { isEmpty } from "validator";
import Axios from "axios";
import { ParkingContext } from "../context/ParkingContext";

function ViewGarage({ history }) {
  let parkingData = JSON.parse(localStorage.getItem("parkingData"));
  let [parkingInfo, setParkingInfo] = useState([]);

  console.log(parkingData.id);

  useEffect(() => {
    Axios.post("http://localhost:8000/api/providers/searchparkinglot", {
      id: parkingData.id,
    }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      parkingInfo = data;
      setParkingInfo(parkingInfo);
      console.log();
      console.log("success");
      console.log(parkingInfo);
    });
    console.log("what");
    console.log(parkingInfo);
  }, []);

  let garagePicture = parkingInfo.parkingLotPicture;
  console.log(parkingData);
  console.log(garagePicture);

  const searchParking = (e) => {
    e.preventDefault();
    console.log();
  };

  const handleToPark = (e) => {
    e.preventDefault();
    if (
      parkingInfo.totalSlots == parkingInfo.reservedSlots ||
      parkingInfo.parkingLotStatus == "notavailable"
    ) {
      history.push("/search-parking-lot");
    } else {
      history.push("/parking-request");
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <CardBody>
              <div className="row login-form">
                <div className="col-md-12 signUpTitle">
                  <div className="mb-2">
                    <h5 style={{ fontWeight: "bold" }}></h5>
                  </div>
                  <Form>
                    <FormGroup></FormGroup>
                    <FormGroup></FormGroup>
                    <FormGroup>
                      <div className="text-center">
                        <Label for="parkingPhoto">
                          <h5>{parkingInfo.parkingLotName}</h5>
                        </Label>
                        <CardSubtitle>
                          <img
                            src={garagePicture ? garagePicture : noimageicon}
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>

                        <Label for="parkingPhoto">
                          <h5 for="parkingPhoto">
                            {parkingInfo.parkingLotLocation}
                          </h5>{" "}
                          Rate : Php
                          {parkingInfo.parkingPrice}/Hour
                        </Label>
                        <h5>Vehicle Type: {parkingInfo.vehicleType}</h5>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
                <h5 for="parkingPhoto">Call: {parkingInfo.mobileNumber}</h5>
                <div className="col-md-12 registerBtn">
                  <div class=""></div>
                </div>
              </div>
              <div className="col-md-12 registerBtn">
                <form>
                  <div class="">
                    <button
                      type="submit"
                      class="btnSign font-weight-bold"
                      onClick={handleToPark}
                    >
                      {parkingInfo.totalSlots == parkingInfo.reservedSlots ||
                      parkingInfo.parkingLotStatus == "notavailable"
                        ? "Not Available"
                        : "Park Here"}
                    </button>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewGarage;
