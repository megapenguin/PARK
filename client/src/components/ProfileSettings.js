import React from "react";
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

function ProfileSettings({ history }) {
  let userData = JSON.parse(localStorage.getItem("userData"));

  let currentProfile = userData.profilePicture;
  let frontId = userData.idFront;
  let backId = userData.idBack;
  let idWithSelfie = userData.idWithSelfie;

  console.log(frontId);
  console.log(currentProfile);

  const handleToHome = e => {
    e.preventDefault();
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
                    <h5 style={{ fontWeight: "bold", color: "#2acfe0" }}>
                      Profile Info
                    </h5>
                  </div>
                  <Form>
                    <FormGroup>
                      <div className="text-center">
                        <h1 style={{ fontWeight: "bold" }}>
                          {userData.firstName} {userData.lastName}
                        </h1>
                        <CardSubtitle>
                          <img
                            id="profilepicture"
                            src={currentProfile ? currentProfile : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",
                              borderRadius: "50%",
                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>

                        <Label>
                          <p style={{ fontWeight: "bold" }}>
                            {userData.id} : {userData.userName}
                          </p>
                          <p className="mt-3">
                            {" "}
                            <input
                              style={{
                                fontWeight: "bold",
                                border: "hidden"
                              }}
                              placeholder={userData.firstName}
                            ></input>{" "}
                            <input
                              style={{
                                fontWeight: "bold",
                                border: "hidden"
                              }}
                              placeholder={userData.lastName}
                            ></input>{" "}
                            <input
                              style={{
                                fontWeight: "bold",
                                border: "hidden"
                              }}
                              placeholder={userData.contactNumber}
                            ></input>
                          </p>
                        </Label>
                        <CardSubtitle>
                          <h5 style={{ fontWeight: "bold" }}>ID Pictures</h5>
                          <img
                            src={frontId ? frontId : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",

                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>
                        <CardSubtitle>
                          <img
                            src={backId ? backId : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",

                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>
                        <CardSubtitle>
                          <img
                            src={idWithSelfie ? idWithSelfie : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",

                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>
                        <button
                          style={{ fontWeight: "bold" }}
                          onClick={handleToHome}
                        >
                          Home
                        </button>
                      </div>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileSettings;
