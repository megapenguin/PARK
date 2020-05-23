import React, { useState, useEffect } from "react";
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
  FormFeedback,
  FormText,
} from "reactstrap";

import { isEmpty, isEmail } from "validator";

import "./styles.css";
import Axios from "axios";

function Register({ history }) {
  let [firstName, setFirstName] = useState("");
  let [email, setEmail] = useState("");
  let [lastName, setLastName] = useState("");
  let [contactNumber, setContactNUmber] = useState("");
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [profilePicture, setProfilePicture] = useState("");
  let [idFront, setIdFront] = useState("");
  let [idBack, setIdBack] = useState("");
  let [idWithSelfie, setIdWithSelfie] = useState("");
  let [userStatus, setUserStatus] = useState("");

  let [check, setCheck] = useState(false);

  let [firstNameError, setFirstNameError] = useState(false);
  let [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");

  let [emailError, setEmailError] = useState(false);
  let [emailErrorMessage, setEmailErrorMessage] = useState("");

  let [lastNameError, setLastNameError] = useState(false);
  let [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  let [contactNumberError, setContactNumberError] = useState(false);
  let [contactNumberErrorMessage, setContactNumberErrorMessage] = useState("");

  let [userNameError, setUserNameError] = useState(false);
  let [userNameErrorMessage, setUserNameErrorMessage] = useState("");

  let [passwordError, setPasswordError] = useState(false);
  let [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  let [d, setD] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:8000/api/users/get")
      .then((_res) => {
        console.log(_res);
        let data = _res.data[0];
        console.log(data);
      })
      .catch((error) => console.log(error));
    console.log("what happend?");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let check = 0;
    console.log(contactNumber);

    if (isEmpty(firstName)) {
      setFirstNameErrorMessage("First name field is required");
      setFirstNameError(true);
      check = ++check;
    } else {
      setFirstNameError(false);
    }

    if (isEmpty(lastName)) {
      setLastNameErrorMessage("Lastname field is required");
      setLastNameError(true);
      check = ++check;
    } else {
      setLastNameError(false);
    }

    if (isEmpty(contactNumber)) {
      setContactNumberErrorMessage("Contact Number is required");
      setContactNumberError(true);
      check = ++check;
    } else {
      setContactNumberError(false);
    }

    if (isEmpty(email)) {
      setEmailErrorMessage("Email is required");
      setEmailError(true);
      check = ++check;
    } else {
      setEmailError(false);
    }

    if (isEmpty(userName)) {
      setUserNameErrorMessage("Username is required");
      setUserNameError(true);
      check = ++check;
    } else {
      setUserNameError(false);
    }

    if (isEmpty(password)) {
      setPasswordErrorMessage("Password is required");
      setPasswordError(true);
      check = ++check;
    }

    if (password !== confirmPassword) {
      setPasswordErrorMessage("password does not match");
      setPasswordError(true);
      check = ++check;
    }
    if (password === confirmPassword && !isEmpty(password)) {
      setPasswordError(false);
    }

    console.log(contactNumber);
    // Axios.get("link", { params: { firstName } });
    if (check === 0) {
      Axios.post("http://localhost:8000/api/users/insert", {
        firstName,
        lastName,
        contactNumber,
        email,
        userName,
        password,
        profilePicture,
        idFront,
        idBack,
        idWithSelfie,
        userStatus,
      })
        .then((_res) => {
          console.log(_res);
          let data = _res.data;

          setD(
            `Succesfully created user with name ${data.firstName} ${data.lastName}, contact number ${data.contactNumber}`
          );
        })

        .catch((error) => console.log(error));
      history.push("/login");
    } else {
      console.log("error");
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "firstName") {
      setFirstName(e.currentTarget.value);
      setProfilePicture("");
      setIdFront("");
      setIdBack("");
      setIdWithSelfie("");
      setUserStatus("");
    }
    if (e.currentTarget.name === "lastName") {
      setLastName(e.currentTarget.value);
    }

    if (e.currentTarget.name === "contactNumber") {
      setContactNUmber(e.currentTarget.value);
    }
    if (e.currentTarget.name === "email") {
      setEmail(e.currentTarget.value);
    }
    if (e.currentTarget.name === "userName") {
      setUserName(e.currentTarget.value);
    }
    if (e.currentTarget.name === "password") {
      setPassword(e.currentTarget.value);
    }
    if (e.currentTarget.name === "confirmPassword") {
      setConfirmPassword(e.currentTarget.value);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            {d}
            <CardBody>
              <div className="row login-form">
                <div className="col-md-12 signUpTitle">
                  <div className="mb-2">
                    <h5 style={{ fontWeight: "bold" }}>REGISTER</h5>
                  </div>
                  <Form>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        invalid={firstNameError}
                        type="text"
                        name="firstName"
                        id="firstName"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Firstname"
                      />
                      <FormFeedback invalid={firstNameError}>
                        {firstNameErrorMessage}
                      </FormFeedback>
                      {/* <FormText>
                        Example help text that remains unchanged.
                      </FormText> */}
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        invalid={lastNameError}
                        type="text"
                        name="lastName"
                        id="lastName"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Lastname"
                      />
                      <FormFeedback invalid={lastNameError}>
                        {lastNameErrorMessage}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        invalid={contactNumberError}
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Contact Number"
                      />
                      <FormFeedback invalid={contactNumberError}>
                        {contactNumberErrorMessage}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        invalid={emailError}
                        type="text"
                        name="email"
                        id="email"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="EmailAddress"
                      />
                      <FormFeedback invalid={emailError}>
                        {emailErrorMessage}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        invalid={userNameError}
                        type="text"
                        name="userName"
                        id="userName"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Username"
                      />
                      <FormFeedback invalid={userNameError}>
                        {userNameErrorMessage}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        invalid={passwordError}
                        type="password"
                        name="password"
                        id="password"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Password"
                      />
                      <FormFeedback invalid={passwordError}>
                        {passwordErrorMessage}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={(e) => handleChange(e)}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        style={{ textAlign: "center", borderRadius: 10 }}
                        placeholder="Confirm Password"
                      />
                    </FormGroup>
                  </Form>
                </div>
                <div className="col-md-12 registerBtn">
                  <form onClick={(e) => handleSubmit(e)}>
                    <div class="">
                      <button type="submit" class="btnSign font-weight-bold">
                        SIGN UP
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

export default Register;
