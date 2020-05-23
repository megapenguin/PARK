import React, { useState, useEffect } from "react";
import noimageicon from "./assets/noimageicon.jpg";
import Sidebar from "./layouts/Sidebar";
import parklogo from "./assets/parklogo.png";
import {
  Table,
  Card,
  CardTitle,
  CardText,
  CardBody,
  FormGroup,
  CardImg,
  Form,
  Label,
} from "reactstrap";
import { Row, Col, Container } from "reactstrap";
import NavBar from "./layouts/NavBar";

import { Button, Input, InputGroupAddon, InputGroup } from "reactstrap";
import Axios from "axios";

function ViewUnverifiedProviders() {
  let [searchResult, setSearchResult] = useState([]);
  let [userProfile, setUserProfile] = useState([]);
  let [profilePicture, setProfilePicture] = useState("");
  let [providerId, setProviderId] = useState("");
  let [userId, setUserId] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastname] = useState("");
  let [contactNumber, setContactNumber] = useState("");
  let [parkingLotPicture, setParkingLotPicture] = useState("");
  let [personalAddress, setPersonalAddress] = useState("");
  let [parkingLotLocation, setParkingLotLocation] = useState("");
  let [parkingLotStatus, setParkingLotStatus] = useState("");
  let [parkingLotName, setParkingLotName] = useState("");
  let [vehicleType, setVehicleType] = useState("");
  let [vehicleCapacity, setVehicleCapacity] = useState("");
  let [parkingPrice, setParkingPrice] = useState("");
  let [providerStatus, setProviderStatus] = useState("");
  let [refreshInfo, setRefreshInfo] = useState(false);
  let [refreshTable, setRefreshTable] = useState(false);

  console.log(providerStatus);

  useEffect(() => {
    setProviderStatus("verified");
    Axios.get("http://localhost:8000/api/providers/getunverifiedproviders")
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        searchResult = data;
        setSearchResult(searchResult);
        console.log(searchResult);
      })
      .catch((error) => console.log(error));
    console.log("what happend?");
  }, [refreshTable]);

  useEffect(() => {
    setProviderStatus("verified");
    Axios.get("http://localhost:8000/api/providers/getunverifiedproviders")
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        searchResult = data;
        setSearchResult(searchResult);
        console.log(searchResult);
      })
      .catch((error) => console.log(error));
    console.log("what happend?");
  }, [refreshTable]);

  const handleOnSelect = (index) => {
    console.log(index);
    setRefreshInfo(true);
    setRefreshTable(false);
    Axios.post("http://localhost:8000/api/users/userprofilepicture", {
      id: searchResult[index].userId,
    }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      userProfile = data;
      setUserProfile(userProfile);
      setProfilePicture(userProfile.profilePicture);
    });
    console.log(userProfile);

    setParkingLotPicture(searchResult[index].parkingLotPicture);
    setParkingLotName(searchResult[index].parkingLotName);
    setVehicleCapacity(searchResult[index].totalSlots);
    setVehicleType(searchResult[index].vehicleType);
    setParkingPrice(searchResult[index].parkingPrice);

    setProviderId(searchResult[index].id);
    setUserId(searchResult[index].userId);
    setFirstName(searchResult[index].firstName);
    setLastname(searchResult[index].lastName);
    setContactNumber(searchResult[index].mobileNumber);
    setParkingLotStatus(searchResult[index].parkingLotStatus);
    setParkingLotLocation(searchResult[index].parkingLotLocation);
    setPersonalAddress(searchResult[index].personalAddress);
    console.log(parkingLotLocation);
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setRefreshTable(!refreshTable);
    if (e.currentTarget.name === "vehicletype") {
      setVehicleType(e.currentTarget.value);
      console.log(vehicleType);
    }
    if (e.currentTarget.name === "vehiclecapacity") {
      setVehicleCapacity(e.currentTarget.value);
      console.log(vehicleCapacity);
    }
    if (e.currentTarget.name === "parkingprice") {
      setParkingPrice(e.currentTarget.value);
    }
    if (e.currentTarget.name === "firstname") {
      setFirstName(e.currentTarget.value);
    }
    if (e.currentTarget.name === "lastname") {
      setLastname(e.currentTarget.value);
    }
    if (e.currentTarget.name === "contactnumber") {
      setContactNumber(e.currentTarget.value);
      console.log(contactNumber);
    }
    if (e.currentTarget.name === "parkinglotstatus") {
      setParkingLotStatus(e.currentTarget.value);
    }
    if (e.currentTarget.name === "parkinglotlocation") {
      setParkingLotLocation(e.currentTarget.value);
    }
    if (e.currentTarget.name === "personaladdress") {
      setPersonalAddress(e.currentTarget.value);
    }
  };

  const handleToApprove = (e) => {
    e.preventDefault();
    setRefreshInfo(false);
    setRefreshTable(true);
    Axios.post("http://localhost:8000/api/providers/updateprovider", {
      id: providerId,
      firstName: firstName,
      lastName: lastName,
      vehicleType: vehicleType,
      mobileNumber: contactNumber,
      parkingPrice: parkingPrice,
      totalSlots: vehicleCapacity,
      parkingLotStatus: parkingLotStatus,
      providerStatus: providerStatus,
    }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      userProfile = data;
      setUserProfile(userProfile);
      setRefreshTable(true);
    });

    Axios.get("http://localhost:8000/api/providers/getunverifiedproviders")
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        searchResult = data;
        setSearchResult(searchResult);
        console.log(searchResult);
        setRefreshTable(true);
      })
      .catch((error) => console.log(error));
    console.log("what happend?");
    setRefreshTable(true);
  };

  return (
    <React.Fragment>
      <Sidebar />
      <Row>
        <Col className="mb-5">
          <NavBar />
        </Col>
      </Row>

      <Container className="mt-6">
        <Row className="mt-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="mt-6 shadow mt-5" style={{ borderRadius: 50 }}>
              {" "}
              Unverified Providers
            </h1>
          </Col>
        </Row>

        <Row>
          <Col>
            <Container className="mt-3">
              <h2>Provider Request List</h2>
              <Card style={{ height: 400, border: "hidden " }}>
                <Table
                  className="mt-3"
                  style={{
                    textAlign: "center",
                    border: "hidden",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                    </tr>
                  </thead>
                </Table>
                <Table hover responsive>
                  <tbody>
                    {searchResult.length !== 0
                      ? searchResult.map((info, index) => (
                          <tr id={index} onClick={(e) => handleOnSelect(index)}>
                            <th scope="row">{info.id}</th>
                            <td>{info.firstName}</td>
                            <td>{info.lastName}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </Table>
              </Card>
            </Container>
          </Col>
          <Col>
            <Container className="mt-3">
              <h2>Parkinglot Information</h2>
              <Card style={{ fontWeight: "bold", border: "hidden" }}>
                <CardTitle>
                  <img
                    id="garagepicture"
                    src={refreshInfo === true ? parkingLotPicture : noimageicon}
                    style={{
                      height: 200,
                      width: 250,
                      border: "1px solid black",
                    }}
                  ></img>{" "}
                </CardTitle>
                <Label for="garagepicture">
                  <h5>
                    {refreshInfo === true ? parkingLotName : "Parkinglot Name"}
                  </h5>
                </Label>
                <CardBody>
                  <Form>
                    <FormGroup row>
                      <Col>
                        <Label for="vehicletype">Vehicle Type : </Label>
                      </Col>

                      <Col sm={8}>
                        {" "}
                        <Input
                          type="text"
                          name="vehicletype"
                          id="vehicletype"
                          onChange={handleOnChange}
                          style={{ textAlign: "center", borderRadius: 10 }}
                          value={
                            refreshInfo === true ? vehicleType : "Vehicle Type"
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Label for="vehiclecapacity">Vehicle Capacity :</Label>
                      </Col>

                      <Col sm={8}>
                        <Input
                          type="text"
                          name="vehiclecapacity"
                          id="vehiclecapacity"
                          onChange={handleOnChange}
                          style={{ textAlign: "center", borderRadius: 10 }}
                          value={
                            refreshInfo === true
                              ? vehicleCapacity
                              : "Vehicle Capacity"
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Col>
                        <Label for="parkingprice">
                          Parking Price per Hour:
                        </Label>
                      </Col>

                      <Col sm={8}>
                        <Input
                          type="text"
                          name="parkingprice"
                          id="parkingprice"
                          onChange={handleOnChange}
                          style={{ textAlign: "center", borderRadius: 10 }}
                          value={
                            refreshInfo === true
                              ? parkingPrice
                              : "Parking Price"
                          }
                        />
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
      <Row>
        <Container>
          <h2 className="mt-2">Provider Information</h2>
          <Card style={{ border: "hidden" }}>
            <CardTitle className="mt-2">
              <img
                id="profilepicture"
                src={refreshInfo === true ? profilePicture : noimageicon}
                style={{
                  height: 150,
                  width: 150,
                  border: "1px solid black",
                }}
              ></img>{" "}
            </CardTitle>
            <CardBody>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <h5>
                          {refreshInfo === true
                            ? `User ID : ${userId}`
                            : "User ID"}
                        </h5>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label>
                        <h5>
                          {" "}
                          {refreshInfo === true
                            ? `Provider Id : ${providerId}`
                            : "Provider ID"}
                        </h5>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstname">Firstname</Label>
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={refreshInfo === true ? firstName : "Firstname"}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastname">Lastname</Label>
                      <Input
                        type="text"
                        name="lastname"
                        id="lastname"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={refreshInfo === true ? lastName : "Lastname"}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="contactnumber">Contact Number</Label>
                      <Input
                        type="text"
                        name="contactnumber"
                        id="contactnumber"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={
                          refreshInfo === true ? contactNumber : "Contactnumber"
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="parkinglotstatus">Parkinglot Status</Label>
                      <Input
                        type="text"
                        name="parkinglotstatus"
                        id="parkinglotstatus"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={
                          refreshInfo === true
                            ? parkingLotStatus
                            : "Parkinglot Status"
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="parkinglotaddress">Parkinglot Address</Label>
                      <Input
                        type="text"
                        name="parkinglotaddress"
                        id="parkinglotaddress"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={
                          refreshInfo === true
                            ? parkingLotLocation
                            : "Parkinglot Address"
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="personaladdress">Personal Address</Label>
                      <Input
                        type="text"
                        name="personaladdress"
                        id="personaladdress"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={
                          refreshInfo === true
                            ? personalAddress
                            : "Personal Address"
                        }
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Button color="success" onClick={handleToApprove}>
                Approve
              </Button>{" "}
              <Button color="danger">Decline</Button>{" "}
            </CardBody>
          </Card>
        </Container>
      </Row>
    </React.Fragment>
  );
}

export default ViewUnverifiedProviders;
