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
  InputGroupAddon,
} from "reactstrap";
import { TransactionContext } from "../context/TransactionContext";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function MainProfile({ history, Auth }) {
  //let Auth.state.userData = JSON.parse(localStorage.getItem("Auth.state.userData"));
  let providerData = JSON.parse(localStorage.getItem("providerData"));
  let { setTransactionData } = useContext(TransactionContext);
  let [error, setError] = useState("");
  let [currentUser, setCurrentUser] = useState([]);
  let status = false;
  if (providerData) {
    status = true;
  } else {
    status = false;
  }

  useEffect(() => {
    Axios.get("http://localhost:8000/api/transactions/get")
      .then((_res) => {
        console.log(_res);
        let data = _res.data[0];
        console.log(data);
      })
      .catch((error) => console.log(error));
    // console.log("what happend?");
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:8000/api/users/search", {
      id: Auth.state.userData.id,
      userName: Auth.state.userData.userName,
    }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      currentUser = data;
      setCurrentUser(currentUser);
      console.log(currentUser);
      console.log("currentUser");
    });
  }, []);

  console.log(Auth.state.userData.profilePicture);
  let currentProfile = currentUser.profilePicture;

  const handleToProfile = (e) => {
    e.preventDefault();
    history.push("/edit-profile");
  };

  const handleToVerify = (e) => {
    e.preventDefault();
    if (currentUser.userStatus === "unverified") {
    } else {
      history.push("/verify-profile");
    }
  };

  const handleToParkingSpace = (e) => {
    e.preventDefault();
    history.push("/my-parking-lots");
    console.log(status);
  };
  console.log(status);

  const handleToHome = (e) => {
    e.preventDefault();
    history.push("/home");
  };

  const handleToProfileSettings = (e) => {
    e.preventDefault();
    history.push("/profile-settings");
  };

  const handleToRecords = (e) => {
    e.preventDefault();
    history.push("/transaction-records");
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2 mb-2">
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
                          {currentUser.firstName} {currentUser.lastName}
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
                          {currentUser.userName}
                        </h1>

                        <Label for="userprofile">
                          {currentUser.userStatus === "verified" ? (
                            <h5>Verified</h5>
                          ) : (
                            <h5
                              id="userStatus"
                              style={{ color: "#2acfe0" }}
                              onClick={(e) => handleToVerify(e)}
                            >
                              {currentUser.userStatus === "unverified"
                                ? "Waiting for verification"
                                : "Verify your account"}
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
                          My Parking Space
                        </h4>
                      ) : (
                        ""
                      )}
                      <h4
                        className={"mt-3"}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                        onClick={handleToProfileSettings}
                      >
                        Settings
                      </h4>
                      <h4
                        className="mt-3"
                        style={{ textAlign: "left", fontWeight: "bold" }}
                        onClick={handleToRecords}
                      >
                        History
                      </h4>
                      <Button
                        className="mt-3"
                        color="secondary"
                        onClick={handleToHome}
                      >
                        Home
                      </Button>
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

export default withRouter(MainProfile);
