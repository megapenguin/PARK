import React, { useEffect, useState } from "react";
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
  let [refreshInfo, setRefreshInfo] = useState(false);
  let [refreshTable, setRefreshTable] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users/getverifiedusers")
      .then((_res) => {
        console.log(_res);
        let data = _res.data;
        searchResult = data;
        setSearchResult(searchResult);
        console.log(searchResult);
      })
      .catch((error) => console.log(error));
    console.log("what happend?");
    console.log("refreshTable");
  }, [refreshTable]);

  const enterSearch = (e) => {
    e.preventDefault();
    setSearchUser(e.currentTarget.value);
    console.log(searchUser);
  };

  const handleOnSearch = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8000/api/users/searchusers", {
      userId: searchUser,
      firstName: searchUser,
      lastName: searchUser,
    }).then((_res) => {
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

  const handleOnSelect = (index) => {
    console.log(index);
    setRefreshTable(false);
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
    setRefreshInfo(true);
  };

  const handleOnChange = (e) => {
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

  const handleToUpdate = (e) => {
    e.preventDefault();
    setRefreshInfo(false);
    setRefreshTable(true);
    Axios.post("http://localhost:8000/api/users/updateusers", {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      email: email,
    }).then((_res) => {
      console.log(_res);
      setRefreshTable(true);
    });
    // searchResult[index].firstName=firstName;
    // searchResult[index].lastName;
    // searchResult[index].email;
    // searchResult[index].contactNumber;
    Axios.get("http://localhost:8000/api/users/getverifiedusers").then(
      (_res) => {
        console.log(_res);
        let newdata = _res.data;
        searchResult = newdata;
        setSearchResult(searchResult);
        console.log("success update");
        console.log(searchResult);
        console.log(refreshInfo);
        setRefreshTable(true);
      }
    );
    setRefreshTable(true);
  };
  const handleOnEnter = (e) => {
    if (e.key === "Enter") {
      Axios.post("http://localhost:8000/api/users/searchusers", {
        userId: searchUser,
        firstName: searchUser,
        lastName: searchUser,
      }).then((_res) => {
        console.log(_res);
        let data = _res.data;
        searchResult = data;
        setSearchResult(searchResult);
        console.log("success");
        console.log(searchResult);
      });
    }
  };

  return (
    <React.Fragment>
      <Container>
        <Sidebar />
        <Row>
          <Col className="mb-5">
            <NavBar />
          </Col>
        </Row>
      </Container>

      <Container className="mt-5 mr-5">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 className="mt-5 shadow mt-5" style={{ borderRadius: 50 }}>
              {" "}
              Verified Users
            </h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Container className="mt-3">
              <h2>Search Users</h2>
              <Card style={{ height: 400, border: "hidden " }}>
                <InputGroup className="mt-2">
                  <Input
                    style={{
                      borderTopLeftRadius: 50,
                      borderBottomLeftRadius: 50,
                    }}
                    onChange={enterSearch}
                    onKeyPress={handleOnEnter}
                    placeholder="Search Users"
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      style={{
                        borderBottomRightRadius: 50,
                        borderTopRightRadius: 50,
                      }}
                      onClick={handleOnSearch}
                    >
                      Search
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
                <Table
                  className="mt-3"
                  style={{ textAlign: "center", border: "hidden" }}
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
              <h2>ID Pictures</h2>
              <Card style={{ fontWeight: "bold", border: "hidden" }}>
                <CardTitle>
                  <img
                    id="idfront"
                    src={refreshInfo === true ? idFront : noimageicon}
                    style={{
                      height: 150,
                      width: 150,
                      border: "1px solid black",
                    }}
                  ></img>{" "}
                  <img
                    id="idback"
                    src={refreshInfo === true ? idBack : noimageicon}
                    style={{
                      height: 150,
                      width: 150,
                      border: "1px solid black",
                    }}
                  ></img>{" "}
                </CardTitle>
                <CardBody>
                  <img
                    id="idwithselfie"
                    src={refreshInfo === true ? idWithSelfie : noimageicon}
                    style={{
                      height: 150,
                      width: 150,
                      border: "1px solid black",
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
          <h2 className="mt-2">User Information</h2>
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
                      <Label style={{ fontWeight: "bold" }}>
                        <h5>
                          Use ID:{refreshInfo === true ? userId : "User ID"}
                        </h5>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label style={{ fontWeight: "bold" }}>
                        <h5>
                          Username:
                          {refreshInfo === true ? userName : "Username"}
                        </h5>
                      </Label>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstname">Firstname</Label>
                      <Input
                        type="text"
                        name="firstname"
                        id="firstname"
                        onChange={handleOnChange}
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value={refreshInfo === true ? firstName : "Firstname"}
                      ></Input>
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
                          refreshInfo === true
                            ? contactNumber
                            : "Contact Number"
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
                        value={refreshInfo === true ? email : "Email Address"}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col>
                    <FormGroup>
                      <Label for="address">Personal Address</Label>
                      <Input
                        // defaultValue="Reset"
                        name="address"
                        id="address"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        value="Address"
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
              </Form>
              <Button color="success" onClick={handleToUpdate}>
                Update {<Input type="reset" defaultValue="Reset" hidden />}
              </Button>{" "}
              <Button color="danger">Delete</Button>{" "}
            </CardBody>
          </Card>
        </Container>
      </Row>
    </React.Fragment>
  );
}

export default ViewUsers;
