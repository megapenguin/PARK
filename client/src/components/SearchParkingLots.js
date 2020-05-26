import React, { useState, useEffect, useContext } from "react";
import "./styles.css";
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
  CustomInput,
  InputGroupAddon,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";
import { ParkingContext } from "../context/ParkingContext";
import LogoutButton from "./layouts/LogoutButton";
import { withRouter } from "react-router-dom";

function SearchParkingLots({ history, Auth }) {
  //let Auth.state.userData = JSON.parse(localStorage.getIt//em("Auth.state.userData"));
  let [parkingLotLocation, setParkingLotLocation] = useState("");

  let [parkingId, setParkingId] = useState({ id: "", userId: "" });

  let [parkingUserId, setParkingUserId] = useState("");
  let { setParkingData } = useContext(ParkingContext);

  let [searchResult, setSearchResult] = useState([]);
  let [warning, setWarning] = useState("");

  console.log(parkingId);
  setParkingData(parkingId);
  localStorage.setItem("parkingData", JSON.stringify(parkingId));

  const enterLocation = (e) => {
    e.preventDefault();
    setParkingLotLocation(e.currentTarget.value);
    console.log(parkingLotLocation);
  };

  const searchParking = (e) => {
    e.preventDefault();
    console.log(parkingLotLocation);
    Axios.post(
      `http://localhost:8000/api/providers/searchparking/${parkingLotLocation}`,
      {}
    ).then((_res) => {
      console.log(_res);
      let data = _res.data;
      searchResult = data;
      setSearchResult(searchResult);
      console.log(parkingLotLocation);
      console.log("success");
      console.log(searchResult);
    });
    console.log("what");
    console.log(searchResult);
  };

  const viewGarage = (id, userId) => {
    setParkingId({ id, userId });
    console.log(parkingId);
    setParkingData(parkingId);
    localStorage.setItem("parkingData", JSON.stringify(parkingId));

    //
  };
  const goToGarage = (e) => {
    if (Auth.state.userData.userStatus === "verified") {
      history.push("/view-parking-lot");
    } else {
      setWarning("You are not yet a verified user");
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
              <CardTitle>
                <div className="mt-5">
                  <h5 style={{ fontWeight: "bold" }}>Find Parking Space</h5>
                </div>
              </CardTitle>
              <CardSubtitle></CardSubtitle>
              <Form>
                <InputGroup>
                  <Input
                    style={{
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                    }}
                    onChange={enterLocation}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      style={{
                        borderBottomRightRadius: 50,
                        borderTopRightRadius: 50,
                      }}
                      onClick={searchParking}
                    >
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                {warning}
              </Form>
              <div className="row login-form">
                <div className="col-md-12 loginTitle">
                  {searchResult.length !== 0 ? (
                    searchResult.map((info, index) => (
                      <React.Fragment
                        key={index}
                        id={info.id}
                        name={info.userid}
                        style={{ fontWeight: "bold" }}
                      >
                        {info.providerStatus !== "unverified" ? (
                          <ul
                            className="mb-3 list-group"
                            onClick={(e) => viewGarage(info.id, info.userId)}
                          >
                            <li
                              className="list-group-item list-group-item-secondary"
                              style={{ textAlign: "left" }}
                            >
                              <img
                                style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  border: "1px solid #ced4da",
                                  width: "30%",
                                }}
                                src={info.parkingLotPicture}
                              />
                              <div style={{ textAlign: "right" }}>
                                <h5>{info.parkingLotName}</h5>
                                <p>{info.parkingLotLocation}</p>
                              </div>
                              {parkingId.id === info.id ? (
                                <button onClick={goToGarage}>
                                  View Garage
                                </button>
                              ) : (
                                " "
                              )}
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <img className="mb-3" src={logo} style={{ width: "80%" }} />
                  )}
                </div>
                <div></div>
                <Col>
                  <Button
                    className="mt-2"
                    color="secondary"
                    onClick={handleToBack}
                  >
                    Home
                  </Button>
                </Col>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(SearchParkingLots);
