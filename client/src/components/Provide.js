import React from "react";
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
import { UserContext } from "../context/UserContext";

function Provide({ history }) {
  let providerData = JSON.parse(localStorage.getItem("providerData"));
  console.log(providerData);

  const handleNavigateToRegister = e => {
    e.preventDefault();
    if (providerData) {
      history.push("/home");
    } else {
      history.push("/parking-lot-registration");
    }
  };
  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <CardBody>
              <CardTitle></CardTitle>
              <CardSubtitle>
                <img src={logo} style={{ width: "70%" }} />
              </CardSubtitle>
              <div className="row login-form">
                <div className="col-md-12 loginTitle">
                  <div className="mb-5">
                    <h5 style={{ fontWeight: "bold" }}>
                      {providerData
                        ? "Your request is still being verified"
                        : "You are not a registered provider  "}
                    </h5>
                  </div>
                  <Form>
                    <FormGroup></FormGroup>
                    <FormGroup></FormGroup>
                    <CardTitle></CardTitle>
                  </Form>
                </div>
                <div className="col-md-12 registerBtn">
                  <form>
                    <div className="mt-5">
                      <button
                        type="login"
                        class="btnReg font-weight-bold"
                        onClick={e => handleNavigateToRegister(e)}
                      >
                        {providerData ? " Back" : " Register Here"}
                      </button>
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

export default Provide;
