import React, { useContext, useState, useEffect } from "react";
import "./styles.css";
import { isEmpty } from "validator";

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
  Label
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";
import { ProviderContext } from "../context/ProviderContext";

function Search({ history }) {
  let { setProviderData } = useContext(ProviderContext);
  let userData = JSON.parse(localStorage.getItem("userData"));

  useEffect(() => {
    Axios.post("http://localhost:8000/api/providers/searchprovider", {
      userId: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName
    })
      .then(_res => {
        console.log(_res);

        let data = _res.data;
        console.log(data);
        if (data) {
          setProviderData(data);
          localStorage.setItem("providerData", JSON.stringify(data));
          console.log(data);
          console.log("succes");
        } else {
          console.log(data);
          console.log("null");
        }
      })

      .catch(error => console.log(error));
  }, []);

  console.log("done");
  const handleToSearch = e => {
    e.preventDefault();

    history.push("/search-parking-lot");
  };

  const handleToProvide = e => {
    e.preventDefault();

    history.push("/provide");
  };

  const handleToProfile = e => {
    e.preventDefault();
    history.push("/profile");
  };
  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle>
                <img src={logo} style={{ width: "50%" }} />
              </CardSubtitle>
              <div className="row login-form">
                <div className="col-md-12 loginTitle">
                  <div className="mb-5 mt-3">
                    <h5
                      onClick={e => handleToSearch(e)}
                      style={{ fontWeight: "bold" }}
                    >
                      Find Parking Space
                    </h5>
                  </div>
                  <div className="mb-5">
                    <h5
                      onClick={e => handleToProvide(e)}
                      style={{ fontWeight: "bold" }}
                    >
                      Provide Parking Space
                    </h5>
                  </div>
                  <Form></Form>
                </div>
                <div className="col-md-12 registerBtn">
                  <form>
                    <div className="mb-5 mt-5">
                      <h5
                        onClick={e => handleToProfile(e)}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Profile
                      </h5>
                    </div>
                  </form>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
