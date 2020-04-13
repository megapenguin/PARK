import React, { useContext, useState, useEffect } from "react";
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
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { TransactionContext } from "../context/TransactionContext";
import Axios from "axios";

function MainProfile({ history }) {
  let userData = JSON.parse(localStorage.getItem("userData"));
  let providerData = JSON.parse(localStorage.getItem("providerData"));
  let { setTransactionData } = useContext(TransactionContext);
  let [error, setError] = useState("");
  let status = false;
  if (providerData) {
    status = true;
  } else {
    status = false;
  }

  useEffect(() => {
    Axios.get("http://localhost:8000/api/transactions/get")
      .then(_res => {
        console.log(_res);
        let data = _res.data[0];
        console.log(data);
      })
      .catch(error => console.log(error));
    console.log("what happend?");
  }, []);

  console.log(userData.profilePicture);
  let currentProfile = userData.profilePicture;

  const handleToProfile = e => {
    e.preventDefault();
    history.push("/edit-profile");
  };

  const handleToVerify = e => {
    e.preventDefault();
    if (userData.userStatus === "unverified") {
    } else {
      history.push("/verify-profile");
    }
  };

  const handleToParkingSpace = e => {
    e.preventDefault();
    history.push("/my-parking-space");
    console.log(status);
  };
  console.log(status);

  const handleToHome = e => {
    e.preventDefault();
    history.push("/home");
  };

  const handleToProfileSettings = e => {
    e.preventDefault();
    history.push("/profile-settings");
  };

  const handleToHistory = e => {
    e.preventDefault();
    history.push("/transaction-history");
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
                      P R O F I L E
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
                        <p
                          onClick={handleToProfile}
                          style={{ textAlign: "right", color: "#dc5e2e" }}
                        >
                          EDIT
                        </p>
                        <h1
                          id="userprofile"
                          style={{ fontWeight: "bold", color: "#bf4bdc" }}
                        >
                          {userData.userName}
                        </h1>

                        <Label for="userprofile">
                          {userData.userStatus === "verified" ? (
                            <h5>Verified</h5>
                          ) : (
                            <h5
                              id="userStatus"
                              style={{ color: "#2acfe0" }}
                              onClick={e => handleToVerify(e)}
                            >
                              Verify Your Account
                            </h5>
                          )}
                        </Label>
                      </div>
                      {status ? (
                        <h4
                          className={"mt-5"}
                          style={{ textAlign: "left", fontWeight: "bold" }}
                          onClick={handleToParkingSpace}
                        >
                          MY PARKING SPACE
                        </h4>
                      ) : (
                        ""
                      )}
                      <h4
                        className={"mt-3"}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                        onClick={handleToProfileSettings}
                      >
                        SETTINGS
                      </h4>
                      <h4
                        className="mt-3"
                        style={{ textAlign: "left", fontWeight: "bold" }}
                        onClick={handleToHistory}
                      >
                        HISTORY
                      </h4>
                      <h4
                        className="mt-5"
                        style={{ textAlign: "center", fontWeight: "bold" }}
                        onClick={handleToHome}
                      >
                        Back to home page
                      </h4>
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

export default MainProfile;
