import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  FormGroup,
  Label,
  Form,
  Input,
} from "reactstrap";
import Axios from "axios";

const UpdateRequest = (props) => {
  const {
    buttonLabel,
    className,
    requestInfo,
    value,
    clickValue,
    description,
  } = props;
  const [result, setResult] = useState([]);
  const [modal, setModal] = useState(false);

  let [firstName, setFirstName] = useState(result.firstName);
  let [lastName, setLastname] = useState(result.lastName);
  let [contactNumber, setContactNumber] = useState(result.contactNumber);
  let [email, setEmail] = useState(result.email);
  let [status, setStatus] = useState("Yes");

  const handleOnChange = (e) => {
    e.preventDefault();
    if (e.currentTarget.name === "firstName") {
      setFirstName(e.currentTarget.value);
    }
    if (e.currentTarget.name === "lastName") {
      setLastname(e.currentTarget.value);
    }
    if (e.currentTarget.name === "contactNumber") {
      setContactNumber(e.currentTarget.value);

      console.log(contactNumber);
    }
    if (e.currentTarget.name === "email") {
      setEmail(e.currentTarget.value);
    }
  };

  const toggle = () => {
    if (description == "view") {
      setStatus("No");
    }
    setResult(requestInfo);
    setModal(!modal);
    clickValue(!value);
  };

  const requestUpdate = (e) => {
    // if (firstName == null) {
    //   setFirstName(result.firstName);
    // }
    // if (lastName == null) {
    //   setLastname(result.lastName);
    // }
    // if (contactNumber == null) {
    //   setContactNumber(result.contactNumber);
    // }
    // if (email == null) {
    //   setEmail(result.email);
    // }

    Axios.post("http://localhost:8000/api/updates/updateusers", {
      userId: result.id,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      email: email,
      status: status,
    }).then((_res) => {
      console.log(_res.data);
      let data = _res.data;
      console.log("No");
    });
    clickValue(!value);
    setModal(!modal);
  };
  const handleToUpdate = (e) => {
    Axios.post("http://localhost:8000/api/updates/updateusers", {
      userId: result.userId,
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
      email: email,
      status: status,
    }).then((_res) => {
      console.log(_res.data);
      let data = _res.data;
      console.log("Yes");
    });
    clickValue(!value);
    setModal(!modal);
  };

  const handleToClose = (e) => {
    clickValue(!value);
    setModal(!modal);
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>
          {" "}
          <Label>
            <h6>Profile Created: {result.createdAt}</h6>
          </Label>
          <Label>
            <h6>Last Updated: {result.updatedAt}</h6>
          </Label>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>
                <h6>User Id Number</h6> {result.id}
              </Label>
            </FormGroup>
            <FormGroup>
              <Label>
                <h6>First Name</h6>
              </Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                style={{ textAlign: "center", borderRadius: 10 }}
                placeholder={result.firstName ? result.firstName : "Firstname"}
                onChange={handleOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <h6>Last Name</h6>
              </Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                style={{ textAlign: "center", borderRadius: 10 }}
                placeholder={result.lastName ? result.lastName : "Lastname"}
                onChange={handleOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <h6>Contact Number</h6>
              </Label>
              <Input
                type="text"
                name="contactNumber"
                id="contactNumber"
                style={{ textAlign: "center", borderRadius: 10 }}
                placeholder={
                  result.contactNumber ? result.contactNumber : "Contact NUmber"
                }
                onChange={handleOnChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>
                <h6>Email Address</h6>
              </Label>
              <Input
                type="text"
                name="email"
                id="email"
                style={{ textAlign: "center", borderRadius: 10 }}
                placeholder={result.email ? result.email : "Email Address"}
                onChange={handleOnChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        {description === "view" ? (
          <ModalFooter>
            <Button color="primary" onClick={handleToUpdate}>
              Done
            </Button>
            <Button color="danger" onClick={handleToClose}>
              Cancel
            </Button>
          </ModalFooter>
        ) : (
          <ModalFooter>
            <Button color="success" onClick={requestUpdate}>
              Send Request
            </Button>
            <Button color="danger" onClick={handleToClose}>
              Cancel
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default UpdateRequest;
