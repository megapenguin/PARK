import React, { useState, useEffect } from "react";
import noimageicon from "./assets/noimageicon.jpg";
import UpdateRequest from "./layouts/UpdateRequest";
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

function ProfileSettings({ history }) {
  let userData = JSON.parse(localStorage.getItem("userData"));

  let currentProfile = userData.profilePicture;
  let frontId = userData.idFront;
  let backId = userData.idBack;
  let idWithSelfie = userData.idWithSelfie;
  let [update, setUpdate] = useState("");
  let [refresh, setRefresh] = useState(false);

  useEffect(() => {
    console.log(refresh);
    Axios.post("http://localhost:8000/api/updates/find", {
      userId: userData.id,
    })
      .then((_res) => {
        console.log(_res);

        let data = _res.data;
        console.log(data);
        if (data) {
          console.log("succes");
          setUpdate(true);
        } else {
          console.log("null");
          setUpdate(false);
        }
      })
      .catch((error) => console.log(error));
  }, [refresh]);

  // useEffect(() => {
  //   Axios.post("http://localhost:8000/api/updates/insert", {
  //     userId: userData.id,
  //     firstName: userData.firstName,
  //     lastName: userData.lastName,
  //     contactNumber: userData.contactNumber,
  //     email: userData.email,
  //   }).then((_res) => {
  //     console.log(_res.data);
  //     let data = _res.data;
  //     console.log("Success");
  //   });
  // }, []);

  console.log(frontId);
  console.log(currentProfile);

  const handleToBack = (e) => {
    e.preventDefault();
    history.push("/profile");
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
                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>

                        <Label>
                          <h6 style={{ fontWeight: "bold" }}>
                            User ID : {userData.id}
                          </h6>
                          <h6 style={{ fontWeight: "bold" }}>
                            Username : {userData.userName}
                          </h6>
                          <h6 className="mt-3">
                            <Row>
                              {" "}
                              Firstname :{" "}
                              <input
                                style={{
                                  fontWeight: "bold",
                                  border: "hidden",
                                }}
                                value={userData.firstName}
                              ></input>
                            </Row>
                            <Row>
                              Lastname :{" "}
                              <input
                                style={{
                                  fontWeight: "bold",
                                  border: "hidden",
                                }}
                                value={userData.lastName}
                              ></input>
                            </Row>
                            <Row>
                              Contact Number :{" "}
                              <input
                                style={{
                                  fontWeight: "bold",
                                  border: "hidden",
                                }}
                                value={userData.contactNumber}
                              ></input>
                            </Row>
                            <Row>
                              Email Address :{" "}
                              <input
                                style={{
                                  fontWeight: "bold",
                                  border: "hidden",
                                }}
                                value={userData.email}
                              ></input>
                            </Row>
                          </h6>
                          <Row>
                            {update == true ? (
                              "Update Waiting"
                            ) : (
                              <UpdateRequest
                                buttonLabel={"Request Update"}
                                requestInfo={userData}
                                value={refresh}
                                clickValue={setRefresh}
                              />
                            )}
                          </Row>
                        </Label>
                        <CardSubtitle className="mt-2">
                          <h5 style={{ fontWeight: "bold" }}>ID Pictures</h5>
                          <img
                            src={frontId ? frontId : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",

                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>
                        <CardSubtitle>
                          <img
                            src={backId ? backId : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",

                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>
                        <CardSubtitle>
                          <img
                            src={idWithSelfie ? idWithSelfie : noimageicon}
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",

                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>
                        <Button
                          className="mt-2"
                          color="secondary"
                          style={{ fontWeight: "bold" }}
                          onClick={handleToBack}
                        >
                          Back
                        </Button>
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
