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
  NavLink,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";
import { ProviderContext } from "../context/ProviderContext";
import LogoutButton from "./layouts/LogoutButton";
import { withRouter, Link } from "react-router-dom";

//hindi na props kasi naka destrcuture na yan
//para di na mag props.Auth
function Search({ history, Auth }) {
  let { setProviderData } = useContext(ProviderContext);
  //let Auth = JSON.parse(localStorage.ge"));
  // Wala na laman ang userDat mo kasi di ka na nag sasave ng userdata sa local storage

  let [status, setStatus] = useState("No");

  useEffect(() => {
    Axios.post("http://localhost:8000/api/providers/searchprovider", {
      userId: Auth.state.userData.id,
      firstName: Auth.state.userData.firstName,
      lastName: Auth.state.userData.lastName,
    })
      .then((_res) => {
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
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:8000/api/updates/find", {
      userId: Auth.state.userData.id,
    })
      .then((_res) => {
        console.log(_res);

        let data = _res.data;
        console.log(data);
        if (data) {
          console.log("succes");
        } else {
          console.log("create update");
          Axios.post("http://localhost:8000/api/updates/insert", {
            userId: Auth.state.userData.id,
            firstName: Auth.state.userData.firstName,
            lastName: Auth.state.userData.lastName,
            contactNumber: Auth.state.userData.contactNumber,
            email: Auth.state.userData.email,
            status: status,
          }).then((_res) => {
            console.log(_res);
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  console.log("done");
  const handleToSearch = (e) => {
    e.preventDefault();

    history.push("/search-parking-lot");
  };

  const logOut = (e) => {
    localStorage.clear();
    history.push("/welcome");
  };

  const handleToProvide = (e) => {
    e.preventDefault();

    history.push("/provide");
  };

  const handleToProfile = (e) => {
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
                    <h4
                      onClick={(e) => handleToSearch(e)}
                      style={{ fontWeight: "bold" }}
                    >
                      Find Parking Space
                    </h4>
                  </div>
                  <div className="mb-5">
                    <h4
                      onClick={(e) => handleToProvide(e)}
                      style={{ fontWeight: "bold" }}
                    >
                      Provide Parking Space
                    </h4>
                  </div>
                  <Form></Form>
                </div>
                <div className="col-md-12 registerBtn">
                  <form>
                    <div className="mb-5 mt-5">
                      <h4
                        onClick={(e) => handleToProfile(e)}
                        style={{ textAlign: "left", fontWeight: "bold" }}
                      >
                        Profile
                      </h4>
                    </div>
                  </form>
                  <div>
                    <Row>
                      <Col>
                        <NavLink href="/welcome">
                          <Button onClick={(e) => logOut(e)} color="danger">
                            Log Out
                          </Button>
                        </NavLink>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Search);
