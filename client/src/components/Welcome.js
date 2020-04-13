import React from "react";
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
  Col
} from "reactstrap";
import logo from "./assets/parklogo.png";
import { withRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Welcome({ history }) {
  localStorage.clear();
  const handleNavigateToLogin = e => {
    e.preventDefault();
    history.push("/login");
  };
  const handleToNavigateRegister = e => {
    e.preventDefault();
    history.push("/register");
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
                <div className="col-md-12 loginBtn">
                  <form>
                    <div class="form-group">
                      <button
                        type="login"
                        class="btnLogin font-weight-bold"
                        style={{ borderRadius: 50 }}
                        onClick={e => handleNavigateToLogin(e)}
                      >
                        LOGIN
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-12 registerBtn">
                  <form>
                    <div class="">
                      <button
                        type="login"
                        class="btnReg font-weight-bold"
                        onClick={e => handleToNavigateRegister(e)}
                      >
                        REGISTER
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

export default withRouter(Welcome);
