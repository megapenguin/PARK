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

function MyParkingLots({ history }) {
  let userData = JSON.parse(localStorage.getItem("userData"));
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

  useEffect(() => {
    console.log(userData);
    Axios.post(
      `http://localhost:8000/api/providers/myparkinglots/${userData.id}`,
      {}
    ).then((_res) => {
      console.log(_res);
      let data = _res.data;
      searchResult = data;
      setSearchResult(searchResult);
      console.log("success");
      console.log(searchResult);
    });
    console.log("what");
    console.log(searchResult);
  }, []);

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
    if (userData.userStatus === "verified") {
      history.push("/my-parking-space");
    } else {
      setWarning("You are not yet a verified user");
    }
  };
  const handleToRegisterParkingLot = (e) => {
    history.push("/parking-lot-registration");
  };
  const handleToBack = (e) => {
    history.push("/profile");
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <CardBody>
              <CardTitle>
                <div className="mt-5">
                  <h5 style={{ fontWeight: "bold" }}>My Parking Lots</h5>
                </div>
                {warning}
              </CardTitle>
              <CardSubtitle></CardSubtitle>
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
                        <ul
                          className="list-group"
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
                              <button onClick={goToGarage}>View Garage</button>
                            ) : (
                              " "
                            )}
                          </li>
                        </ul>
                      </React.Fragment>
                    ))
                  ) : (
                    <img src={logo} style={{ width: "80%" }} />
                  )}
                </div>
                <div className="col-md-12 registerBtn">
                  <Form>
                    <Button
                      color="primary"
                      onClick={handleToRegisterParkingLot}
                    >
                      Add Parking Lot
                    </Button>
                  </Form>
                  <Form className="mt-2">
                    <Button color="secondary" onClick={handleToBack}>
                      Back
                    </Button>
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

export default MyParkingLots;
