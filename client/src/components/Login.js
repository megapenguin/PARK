import React, { useState, useContext } from "react";
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
  Col,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import logo from "./assets/parklogo.png";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "./GlobalContext/AuthContext";

function Login({ history }) {
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState("");
  localStorage.clear();
  let Auth = useContext(AuthContext);

  // let { setUserData } = useContext(UserContext);
  console.log("rendered");
  const handleChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "userName") {
      setUserName(e.currentTarget.value);
    }
    if (e.currentTarget.name === "password") {
      setPassword(e.currentTarget.value);
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let values = {
      userName,
      password,
    };
    console.log(values);
    let { success, errorMassage } = await Auth.authenticate(values);
    console.log(success);
    // if (succes && userName === "ADMIN" && password === "ADMIN") {
    //   history.push("/admin");
    // }
    if (success) {
      if (userName === "ADMIN" && password === "ADMIN") {
        history.push("/admin");
      } else {
        history.push("/home");
      }
    } else {
      setError("Wrong username or password");
    }

    console.log(userName, password);
    // if (userName === "ADMIN" && password === "ADMIN") {
    //   history.push("/admin");
    // } else {
    //   Axios.post("http://localhost:8000/api/auth/login", {
    //     userName,
    //     password,
    //   })
    //     .then((_res) => {
    //       console.log(_res);

    //       let data = _res.data;

    //       if (data) {
    //         setUserData(data);
    //         localStorage.setItem("userData", JSON.stringify(data));
    //         history.push("/home");
    //       } else {
    //         setError("Wrong username or password");
    //       }
    //     })
    //     .catch((error) => console.log(error));
    // }
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
                  <div className="mb-2">
                    <h5 style={{ fontWeight: "bold" }}>L O G I N</h5>
                    {error ? <p className="text-danger">{error}</p> : ""}
                  </div>
                  <Form>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        name="userName"
                        id="userName"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Username"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="password"
                        id="password"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Password"
                      />
                    </FormGroup>
                    <CardTitle>
                      <p style={{ textAlign: "right", color: "red" }}>
                        Forgot Password?
                      </p>
                    </CardTitle>
                  </Form>
                </div>
                <div className="col-md-12 registerBtn">
                  <form>
                    <div>
                      {/* The fuck is this shit? */}
                      <button
                        onClick={(e) => handleSubmit(e)}
                        type="login"
                        class="btnReg font-weight-bold"
                      >
                        LOGIN
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

export default withRouter(Login);
