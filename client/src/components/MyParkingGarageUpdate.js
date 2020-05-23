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
import { isEmpty } from "validator";

function MyParkingGarageUpdate({ history }) {
  let providerData = JSON.parse(localStorage.getItem("providerData"));
  let userData = JSON.parse(localStorage.getItem("userData"));
  let parkingData = JSON.parse(localStorage.getItem("parkingData"));
  let [providerInfo, setProviderInfo] = useState([]);
  const [parkingPictureFile, setParkingPictureFile] = useState("");
  const [parkingPictureFilename, setParkingPictureFilename] = useState(
    "Choose File"
  );
  const [uploadedFileParkingPicture, setUploadedFileParkingPicture] = useState(
    ""
  );

  const handleToProfile = (e) => {
    e.preventDefault();
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
  let [parkingLotName, setParkingLotName] = useState("");
  let [mobileNumber, setMobileNumber] = useState("");

  const onChange = (e) => {
    setParkingPictureFile(e.target.files[0]);
    setParkingPictureFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const parkingPictureData = new FormData();
    parkingPictureData.append("parkingPictureFile", parkingPictureFile);
    try {
      const res = await Axios.post(
        `http://localhost:8000/api/providers/uploadParkingPict/${userData.id}`,
        parkingPictureData,
        {
          headers: {
            "Content-Type": "mulifrom/form-data",
          },
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFileParkingPicture({ fileName, filePath });
      console.log(filePath);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
    console.log(parkingLotName);
    console.log(parkingLotName);
  };

  const handleToChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "parkingLotName") {
      setParkingLotName(e.currentTarget.value);
      console.log(parkingLotName);
    }
    if (e.currentTarget.name === "mobileNumber") {
      setMobileNumber(e.currentTarget.value);
      console.log(mobileNumber);
    }
  };

  const onUpdate = (e) => {
    e.preventDefault();
    let check = 0;
    if (!parkingLotName) {
      check++;
    }
    if (!mobileNumber) {
      check++;
    }
    if (!uploadedFileParkingPicture) {
      check++;
    }
    console.log(check);
    if (check === 0) {
      Axios.post("http://localhost:8000/api/providers/userupdateprovider", {
        id: providerInfo.id,
        parkingLotName,
        mobileNumber,
        parkingLotPicture: uploadedFileParkingPicture.filePath,
      }).then((_res) => {
        console.log(_res);
      });
      history.push("/home");
    } else {
      e.preventDefault();
      console.log("error");
    }
  };
  const handleToBack = (e) => {
    history.push("/my-parking-space");
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

                    <FormGroup>
                      <div className="text-center">
                        <Label>
                          <h5>{providerInfo.parkingLotName}</h5>
                        </Label>
                        <FormGroup>
                          <CardSubtitle>
                            <img
                              src={
                                uploadedFileParkingPicture
                                  ? uploadedFileParkingPicture.filePath
                                  : garagePicture
                              }
                              style={{
                                width: "100%",
                                border: "1px solid #ced4da",
                                marginBottom: 10,
                              }}
                            />
                          </CardSubtitle>
                          <Input
                            type="file"
                            name="parkingPhoto"
                            id="parkingPhoto"
                            onChange={onChange}
                          />
                          <div class="">
                            <Button color="primary" onClick={onSubmit}>
                              Upload
                            </Button>
                          </div>
                        </FormGroup>

                        <FormGroup>
                          <Input
                            type="text"
                            name="parkingLotName"
                            id="parkingLotName"
                            onChange={handleToChange}
                            style={{ textAlign: "center", borderRadius: 10 }}
                            placeholder={
                              providerInfo.parkingLotName
                                ? providerInfo.parkingLotName
                                : "Parking Lot Name"
                            }
                          ></Input>
                          <Label>Parking Lot Name</Label>
                        </FormGroup>

                        <FormGroup>
                          <Input
                            type="text"
                            name="mobileNumber"
                            id="mobileNumber"
                            onChange={handleToChange}
                            style={{ textAlign: "center", borderRadius: 10 }}
                            placeholder={
                              providerInfo.mobileNumber
                                ? providerInfo.mobileNumber
                                : "Contact Number"
                            }
                          ></Input>
                          <Label>Contact Number</Label>
                        </FormGroup>

                        <Label>
                          <h6>Address{providerInfo.parkingLotLocation}</h6>
                          <h6>
                            Rate : Php
                            {providerInfo.parkingPrice}/Hour
                          </h6>

                          <h6>Vehicle Type: {providerInfo.vehicleType}</h6>
                          <h6>
                            Parking lot status: {providerInfo.parkingLotStatus}
                          </h6>
                        </Label>
                      </div>
                    </FormGroup>
                  </Form>
                </div>

                <div className="col-md-12 registerBtn">
                  <div class=""></div>
                </div>
              </div>
              <div>
                <form>
                  <div class="">
                    <Button color="success" className="mt-3" onClick={onUpdate}>
                      Update Garage
                    </Button>
                  </div>
                </form>
              </div>
              <div>
                <form>
                  <div class="">
                    <Button
                      color="secondary"
                      className="mt-3"
                      onClick={handleToBack}
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

export default MyParkingGarageUpdate;
