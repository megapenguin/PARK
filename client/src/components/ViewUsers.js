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

function ViewUsers() {
  let [searchResult, setSearchResult] = useState([]);
  let [idFront, setIdFront] = useState("");
  let [idBack, setIdBack] = useState("");
  let [idWithSelfie, setIdWithSelfie] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let [userId, setUserId] = useState("");
  let [userName, setUserName] = useState("");
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastname] = useState("");
  let [contactNumber, setContactNumber] = useState("");
  let [email, setEmail] = useState("");
  let [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users/getverifiedusers")
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

  const enterSearch = e => {
    e.preventDefault();
    setSearchUser(e.currentTarget.value);
    console.log(searchUser);
  };

  const handleOnSearch = e => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/users/searchusers", {
      userId: searchUser,
      firstName: searchUser,
      lastName: searchUser
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

  const handleOnSelect = index => {
    console.log(index);
    setIdFront(searchResult[index].idFront);
    setIdBack(searchResult[index].idBack);
    setIdWithSelfie(searchResult[index].idWithSelfie);
    setProfilePicture(searchResult[index].profilePicture);
    setUserId(searchResult[index].id);
    setUserName(searchResult[index].userName);
    setFirstName(searchResult[index].firstName);
    setLastname(searchResult[index].lastName);
    setEmail(searchResult[index].email);
    setContactNumber(searchResult[index].contactNumber);
  };

  const handleOnChange = e => {
    e.preventDefault();
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
    if (e.currentTarget.name === "email") {
      setEmail(e.currentTarget.value);
    }
  };

  const handleToUpdate = e => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/users/updateusers", {
      id: userId,
      firstName: firstName,
      lastName: lastName,

      contactNumber: contactNumber,
      email: email
    }).then(_res => {
      console.log(_res);
    });
  };

  return (
    <React.Fragment>
      <Container className="mb-5">
        <Row className="mb-5">
          <Col className="mb-5">
            <NavBar />
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="mt-5">
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="mt-5 shadow mt-5" style={{ borderRadius: 50 }}>
              {" "}
              Verified Users
            </h1>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Container className="mt-3">
              <h2>Search Users</h2>
              <Card style={{ height: 400, border: "hidden " }}>
                <InputGroup className="mt-2">
                  <Input
                    style={{
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50
                    }}
                    onChange={enterSearch}
                    placeholder="Search Users"
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
                  className="mt-3"
                  style={{ textAlign: "center", width: 525, border: "hidden" }}
                >
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                  </tr>
                </Table>
                <Table hover responsive>
                  <tbody>
                    {searchResult.length !== 0
                      ? searchResult.map((info, index) => (
                          <tr id={index} onClick={e => handleOnSelect(index)}>
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
              <h2>ID Pictures</h2>
              <Card style={{ fontWeight: "bold", border: "hidden" }}>
                <CardTitle>
                  <img
                    id="idfront"
                    src={idFront ? idFront : noimageicon}
                    style={{
                      height: 150,
                      width: 150,
                      border: "1px solid black"
                    }}
                  ></img>{" "}
                  <img
                    id="idback"
                    src={idBack ? idBack : noimageicon}
                    style={{
                      height: 150,
                      width: 150,
                      border: "1px solid black"
                    }}
                  ></img>{" "}
                </CardTitle>
                <CardBody>
                  <img
                    id="idwithselfie"
                    src={idWithSelfie ? idWithSelfie : noimageicon}
                    style={{
                      height: 150,
                      width: 150,
                      border: "1px solid black"
                    }}
                  ></img>{" "}
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Row>
      </Container>
      <Row>
        <Container>
          <h2 className="mt-5">User Information</h2>
          <Card style={{ border: "hidden" }}>
            <CardTitle className="mt-5">
              <img
                id="profilepicture"
                src={profilePicture ? profilePicture : noimageicon}
                style={{
                  height: 150,
                  width: 150,
                  border: "1px solid black"
                }}
              ></img>{" "}
            </CardTitle>

            <CardBody>
              <Form>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label style={{ fontWeight: "bold" }}>
                        <h5> {userId ? userId : "User ID"}</h5>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label style={{ fontWeight: "bold" }}>
                        <h5> {userName ? userName : "User Name"}</h5>
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
                        placeholder={firstName ? firstName : "Firstname"}
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
                        placeholder={lastName ? lastName : "Lastname"}
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
                        placeholder={
                          contactNumber ? contactNumber : "Contact Number"
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="emailaddress">Email Address</Label>
                      <Input
                        type="text"
                        name="emailaddress"
                        id="emailaddress"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder={email ? email : "Email Address"}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="address">Personal Address</Label>
                      <Input
                        type="text"
                        name="address"
                        id="address"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Address"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Form>
              <Button color="success" onClick={handleToUpdate}>
                Update
              </Button>{" "}
              <Button color="danger">Decline</Button>{" "}
            </CardBody>
          </Card>
        </Container>
      </Row>
    </React.Fragment>
  );
}

export default ViewUsers;
