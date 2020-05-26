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
import { withRouter } from "react-router-dom";

function TransactionHistory({ history, Auth }) {
  //let Auth.state.userData = JSON.parse(localStorage.getItem("Auth.state.userData"));
  let [transactionData, setTransactionData] = useState([]);
  let [currentUser, setCurrentUser] = useState([]);

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

  let currentProfile = currentUser.profilePicture;

  useEffect(() => {
    Axios.post(
      `http://localhost:8000/api/transactions/searchtransactions/${Auth.state.userData.id}`,
      {}
    ).then((_res) => {
      console.log(_res);
      let data = _res.data;
      transactionData = data;
      setTransactionData(transactionData);

      console.log("success");
      console.log(transactionData);
    });
    console.log("what");
    console.log(transactionData);
  }, []);

  const back = (e) => {
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
                          {Auth.state.userData.firstName}{" "}
                          {Auth.state.userData.lastName}
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

                        <Label>Transaction History</Label>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <React.Fragment>
                        {transactionData.map((info, index) => (
                          <ul class="list-group">
                            <li class="list-group-item list-group-item-secondary">
                              Transaction Id: {info.id} Provider Id:{" "}
                              {info.providerId} Time: {info.requestedAt} Date:
                              {info.createdAt}
                            </li>
                          </ul>
                        ))}
                      </React.Fragment>
                    </FormGroup>
                    <FormGroup>
                      <h5></h5>
                    </FormGroup>
                    <FormGroup>
                      <Button
                        className="mt-3"
                        color="secondary"
                        onClick={(e) => back(e)}
                      >
                        Back
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

export default withRouter(TransactionHistory);
