import React, { useState } from "react";
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
} from "reactstrap";
import { isEmpty } from "validator";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function ProvideRegister({ history, Auth }) {
  //let Auth.state.userData = JSON.parse(localStorage.getItem("Auth.state.userData"));
  const [parkingPictureFile, setParkingPictureFile] = useState("");
  const [parkingPictureFilename, setParkingPictureFilename] = useState(
    "Choose File"
  );
  const [uploadedFileParkingPicture, setUploadedFileParkingPicture] = useState(
    ""
  );

  const [parkingLotLocation, setParkingLotLocation] = useState("");
  const [personalAddress, setPersonalAddress] = useState("");
  const [parkingLotName, setParkingLotName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [parkingPrice, setparkingPrice] = useState("");
  const [totalSlots, setTotalSlots] = useState("");
  const [reservedSlots, setReservedSlots] = useState("");
  const [providerStatus, setProviderStatus] = useState("");
  const [parkingLotStatus, setParkingLotStatus] = useState("");

  // console.log(file, filename);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "personalAddress") {
      setPersonalAddress(e.currentTarget.value);
      setParkingLotName("");
      setParkingLotStatus("notavailable");
      setProviderStatus("unverified");
      setVehicleType("");
      setMobileNumber("");
      setTotalSlots("0");
      setReservedSlots("0");
      setparkingPrice("");
      console.log(personalAddress);
    }
    if (e.currentTarget.name === "parkingLotLocation") {
      setParkingLotLocation(e.currentTarget.value);
      console.log(parkingLotLocation);
    }
  };

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
        `http://localhost:8000/api/providers/uploadParkingPict/${Auth.state.userData.id}`,
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
        history.push("/profile");
        console.log(err.response.data.msg);
      }
    }
  };
  const onRegister = (e) => {
    e.preventDefault();
    let check = 0;
    if (isEmpty(parkingLotLocation)) {
      check++;
    }
    if (isEmpty(personalAddress)) {
      check++;
    }
    if (!uploadedFileParkingPicture) {
      check++;
    }
    console.log(check);
    if (check === 0) {
      Axios.post("http://localhost:8000/api/providers/insertprovider", {
        userId: Auth.state.userData.id,
        firstName: Auth.state.userData.firstName,
        lastName: Auth.state.userData.lastName,
        personalAddress,
        parkingLotName,
        parkingLotLocation,
        vehicleType,
        mobileNumber,
        parkingPrice,
        totalSlots,
        reservedSlots,
        providerStatus,
        parkingLotPicture: uploadedFileParkingPicture.filePath,
        parkingLotStatus,
      }).then((_res) => {
        console.log(_res);
        let data = _res.data;
        console.log(data);
      });
      history.push("/welcome");
    } else {
      e.preventDefault();
      console.log("error");
    }
  };
  const handleToBack = (e) => {
    history.push("/home");
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
                    <FormGroup>
                      <Input
                        type="text"
                        name="personalAddress"
                        id="personalAddress"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        onChange={handleChange}
                        placeholder="Personal Address"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        type="text"
                        name="parkingLotLocation"
                        id="parkingLotLocation"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        onChange={handleChange}
                        placeholder="Location of your parking lot"
                      />
                    </FormGroup>
                    <FormGroup>
                      <div className="text-center">
                        <Label for="parkingPhoto">Photo</Label>
                        <CardSubtitle>
                          <img
                            src={
                              uploadedFileParkingPicture
                                ? uploadedFileParkingPicture.filePath
                                : noimageicon
                            }
                            style={{
                              width: "50%",
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
                      </div>
                    </FormGroup>
                  </Form>
                </div>

                <div className="col-md-12 registerBtn">
                  <div class="">
                    <button
                      type="button"
                      class="btnSub font-weight-bold"
                      onClick={onSubmit}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 registerBtn">
                <form>
                  <div class="">
                    <button
                      type="submit"
                      class="btnSign font-weight-bold"
                      onClick={onRegister}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-md-12 registerBtn">
                <form>
                  <div class="">
                    <button
                      type="submit"
                      class="btnSign font-weight-bold"
                      onClick={handleToBack}
                    >
                      Back
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

export default withRouter(ProvideRegister);
