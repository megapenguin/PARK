import React, { useState, useEffect } from "react";
import noimageicon from "./assets/noimageicon.jpg";
import "./styles.css";

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
  Label
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";

function ProvideParkingSpace({ history }) {
  let providerData = JSON.parse(localStorage.getItem("providerData"));
  let userData = JSON.parse(localStorage.getItem("userData"));
  let [providerInfo, setProviderInfo] = useState([]);

  console.log("what?");
  console.log(userData);

  const handleToProfile = e => {
    e.preventDefault();
    history.push("/profile");
  };

  useEffect(() => {
    Axios.post("http://localhost:8000/api/providers/searchprovider", {
      userId: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName
    }).then(_res => {
      console.log(_res);
      let data = _res.data;
      providerInfo = data;
      setProviderInfo(providerInfo);
      console.log();
      console.log("success");
      console.log(providerInfo);
    });
    console.log("what");
    console.log(providerInfo);
  }, []);

  let garagePicture = providerInfo.parkingLotPicture;
  console.log(providerData);
  console.log(garagePicture);

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
                          <h5>{providerInfo.parkingLotName}</h5>
                        </Label>
                        <CardSubtitle>
                          <img
                            src={garagePicture ? garagePicture : noimageicon}
                            style={{
                              width: "100%",
                              border: "1px solid #ced4da",
                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>

                        <Label for="parkingPhoto">
                          <h5 for="parkingPhoto">
                            {providerInfo.parkingLotLocation}
                          </h5>{" "}
                          Rate : Php
                          {providerInfo.parkingPrice}/Hour
                        </Label>
                        <h5>Vehicle Type: {providerInfo.vehicleType}</h5>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
                <h5 for="parkingPhoto">Call: {providerInfo.mobileNumber}</h5>
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
                      onClick={handleToProfile}
                    >
                      Back To Profile
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

export default ProvideParkingSpace;
