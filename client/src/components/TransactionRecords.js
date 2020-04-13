import React, { useEffect, useState } from "react";
import noimageicon from "./assets/noimageicon.jpg";
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
  Label
} from "reactstrap";
import { Row, Col, Container } from "reactstrap";
import NavBar from "./layouts/NavBar";

import { Button, Input, InputGroupAddon, InputGroup } from "reactstrap";
import Axios from "axios";

function TransactionRecords() {
  let [searchResult, setSearchResult] = useState([]);
  let [userInfo, setUserInfo] = useState("");
  let [providerInfo, setProviderInfo] = useState("");
  let [plateNumber, setPlateNumber] = useState("");
  let [dateAndTime, setDateAndTime] = useState("");
  let [searchTransaction, setSearchTransaction] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8000/api/transactions/gettransactions")
      .then(_res => {
        console.log(_res);
        let data = _res.data;
        searchResult = data;
        setSearchResult(searchResult);
        console.log(searchResult);
      })
      .catch(error => console.log(error));
    console.log("what happend?");
  }, []);

  const handleOnSelect = index => {
    console.log(index);
    setPlateNumber(searchResult[index].vehiclePlatenumber);
    setDateAndTime(
      `${searchResult[index].createdAt} ${searchResult[index].requestedAt}`
    );
    Axios.post("http://localhost:8000/api/users/searchusers", {
      userId: searchResult[index].userId,
      firstName: searchResult[index].userId,
      lastName: searchResult[index].userId
    }).then(_res => {
      console.log(_res);
      let data = _res.data[0];
      userInfo = data;
      setUserInfo(userInfo);
      console.log("success");
      console.log(userInfo);
    });

    Axios.post("http://localhost:8000/api/providers/searchproviders", {
      providerId: searchResult[index].providerId,
      firstName: searchResult[index].providerId,
      lastName: searchResult[index].providerId
    }).then(_res => {
      console.log(_res);
      let data = _res.data[0];
      providerInfo = data;
      setProviderInfo(providerInfo);
      console.log("success");
      console.log(providerInfo);
    });
  };
  const enterSearch = e => {
    e.preventDefault();
    setSearchTransaction(e.currentTarget.value);
    console.log(searchTransaction);
  };

  const handleOnSearch = e => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/transactions/searchtransactions", {
      transactionId: searchTransaction,
      providerId: searchTransaction,
      userId: searchTransaction,
      vehiclePlatenumber: searchTransaction
    }).then(_res => {
      console.log(_res);
      let data = _res.data;
      searchResult = data;
      setSearchResult(searchResult);
      console.log("success");
      console.log(searchResult);
    });
    console.log("what");
    console.log(searchResult);
  };

  return (
    <React.Fragment>
      <Row>
        <Col className="mb-5">
          <NavBar />
        </Col>
      </Row>
      <Container className="mt-6">
        <Row className="mt-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="mt-5 shadow mt-5" style={{ borderRadius: 50 }}>
              {" "}
              Transaction Records
            </h1>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row></Row>
        <Row>
          <Col>
            <Container className="mt-3">
              <Row>
                {" "}
                <Col>
                  <Card
                    className="mt-5 mb-5"
                    style={{
                      textAlign: "center",

                      border: "hidden"
                    }}
                  >
                    <Label>
                      <h4>Customer Information</h4>
                    </Label>

                    <Form className="mt-3">
                      <FormGroup row>
                        <Label for="userid" style={{ fontWeight: "bold" }}>
                          User ID:
                        </Label>
                        <Col sm={6}>
                          <Label id="userid">
                            {userInfo.id ? userInfo.id : "User ID"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="username" style={{ fontWeight: "bold" }}>
                          Name:
                        </Label>
                        <Col sm={6}>
                          <Label id="username">
                            {userInfo.firstName
                              ? userInfo.firstName
                              : "Firstname"}{" "}
                            {userInfo.lastName ? userInfo.lastName : "Lastname"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="userplatenumber"
                          style={{ fontWeight: "bold" }}
                        >
                          Vehicle#:
                        </Label>
                        <Col sm={6}>
                          <Label id="userplatenumber">
                            {plateNumber ? plateNumber : "Platenumber"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="date/time" style={{ fontWeight: "bold" }}>
                          Time/Date:{" "}
                        </Label>
                        <Col sm={6}>
                          {dateAndTime ? dateAndTime : "Date and Time"}
                        </Col>
                      </FormGroup>
                    </Form>
                  </Card>
                </Col>
                <Col>
                  <Card
                    className="mt-5 mb-5"
                    style={{
                      textAlign: "center",

                      border: "hidden"
                    }}
                  >
                    <Label>
                      <h4>Provider Information</h4>
                    </Label>
                    <Form className="mt-3 ">
                      <FormGroup row>
                        <Label for="providerid" style={{ fontWeight: "bold" }}>
                          Provider ID:
                        </Label>
                        <Col sm={6}>
                          <Label id="providerid">
                            {providerInfo.id ? providerInfo.id : "Provider ID"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="providername"
                          style={{ fontWeight: "bold" }}
                        >
                          Name:
                        </Label>
                        <Col sm={6}>
                          <Label id="providername">
                            {providerInfo.firstName
                              ? providerInfo.firstName
                              : "Firstname"}{" "}
                            {providerInfo.lastName
                              ? providerInfo.lastName
                              : "Lastname"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label
                          for="parkinglotaddress"
                          style={{ fontWeight: "bold" }}
                        >
                          Parkinglot Address:
                        </Label>
                        <Col sm={6}>
                          <Label id="parkinglotaddress">
                            {providerInfo.parkingLotLocation
                              ? providerInfo.parkingLotLocation
                              : "Parking Location"}
                          </Label>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label for="date/time" style={{ fontWeight: "bold" }}>
                          Time/Date:{" "}
                        </Label>
                        <Col sm={6}>
                          {dateAndTime ? dateAndTime : "Date and Time"}
                        </Col>
                      </FormGroup>
                    </Form>
                  </Card>
                </Col>
              </Row>
              <h2>Search Transactions</h2>
              <Card style={{ height: 400, border: "hidden " }}>
                <InputGroup className="mt-2 mb-2">
                  <Input
                    style={{
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50
                    }}
                    placeholder="Search Transactions"
                    onChange={enterSearch}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      style={{
                        borderBottomRightRadius: 50,
                        borderTopRightRadius: 50
                      }}
                      onClick={handleOnSearch}
                    >
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>

                <Table
                  hover
                  responsive
                  style={{
                    textAlign: "center",

                    border: "hidden"
                  }}
                >
                  <tr fixed>
                    <th>Transaction ID</th>
                    <th>Provider ID</th>
                    <th>User ID</th>
                    <th>Plate Number</th>
                    <th>Time</th>
                    <th>Date</th>
                  </tr>

                  <tbody>
                    {searchResult.length !== 0
                      ? searchResult.map((info, index) => (
                          <tr id={index} onClick={e => handleOnSelect(index)}>
                            <th scope="row">{info.id}</th>
                            <td>{info.providerId}</td>
                            <td>{info.userId}</td>
                            <td>{info.vehiclePlatenumber}</td>
                            <td>{info.requestedAt}</td>
                            <td>{info.createdAt}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </Table>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default TransactionRecords;
