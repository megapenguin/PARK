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
  Label,
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";

function ProvideParkingSpace({ history }) {
  let providerData = JSON.parse(localStorage.getItem("providerData"));
  let userData = JSON.parse(localStorage.getItem("userData"));
  let parkingData = JSON.parse(localStorage.getItem("parkingData"));
  let [providerInfo, setProviderInfo] = useState([]);

  console.log("what?");
  console.log(userData);

  const handleToProfile = (e) => {
    e.preventDefault();
    history.push("/my-parking-lots");
  };

  const handleToEdit = (e) => {
    e.preventDefault();
    history.push("/my-parking-space-update");
  };

  useEffect(() => {
    Axios.post("http://localhost:8000/api/providers/providerparkinglot", {
      id: parkingData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
    }).then((_res) => {
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
                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>

                        <Label for="parkingPhoto">
                          <h6 for="parkingPhoto">
                            {providerInfo.parkingLotLocation}
                          </h6>
                          <h6>
                            Rate : Php
                            {providerInfo.parkingPrice}/Hour
                          </h6>
                          <h6>Vehicle Type: {providerInfo.vehicleType}</h6>
                        </Label>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
                <h6 for="parkingPhoto" className="mt-3">
                  Contact Number: {providerInfo.mobileNumber}
                </h6>
                <h6>Parking lot status: {providerInfo.parkingLotStatus}</h6>
                <div className="col-md-12 registerBtn">
                  <div class=""></div>
                </div>
              </div>
              <div className="col-md-12 registerBtn">
                <form>
                  <div class="">
                    <Button
                      color="primary"
                      className="mt-3"
                      onClick={handleToEdit}
                    >
                      Edit Garage
                    </Button>
                  </div>
                </form>
                <form>
                  <div class="">
                    <Button
                      color="secondary"
                      className="mt-3"
                      onClick={handleToProfile}
                    >
                      Back
                    </Button>
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
