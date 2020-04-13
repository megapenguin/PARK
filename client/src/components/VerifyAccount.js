import React, { useState, useContext } from "react";
import "./styles.css";
import noimageicon from "./assets/noimageicon.jpg";
import axios from "axios";

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
import { UserContext } from "../context/UserContext";
import { isEmpty } from "validator";
import Axios from "axios";
function VerifyAccount({ history }) {
  const [idFrontFile, setIdFrontFile] = useState("");
  const [idFrontFilename, setIdFrontFilename] = useState("Choose File");
  const [uploadedFileIdFront, setUploadedFileIdFront] = useState("");

  const [idBackFile, setIdBackFile] = useState("");
  const [idBackFilename, setIdBackFilename] = useState("Choose File");
  const [uploadedFileIdBack, setUploadedFileIdBack] = useState("");

  const [idWithSelfieFile, setIdWithSelfieFile] = useState("");
  const [idWithSelfieFilename, setIdWithSelfieFilename] = useState(
    "Choose File"
  );
  const [uploadedFileIdWithSelfie, setUploadedFileIdWithSelfie] = useState("");

  const [userStatus, setUserStatus] = useState("");

  let userData = JSON.parse(localStorage.getItem("userData"));
  // let { setUserData } = UserContext(UserContext);

  // console.log(uploadedFile, filename);
  // console.log(userData);

  const handleToVerify = e => {
    e.preventDefault();
    setUserStatus("unverified");
    let check = 0;
    if (isEmpty(uploadedFileIdFront.filePath)) {
      check++;
    }
    if (isEmpty(uploadedFileIdBack.filePath)) {
      check++;
    }
    if (isEmpty(uploadedFileIdWithSelfie.filePath)) {
      check++;
    }

    if (check === 0) {
      Axios.post("http://localhost:8000/api/users/verificationRequest", {
        id: userData.id,
        idFront: uploadedFileIdFront.filePath,
        idBack: uploadedFileIdBack.filePath,
        idWithSelfie: uploadedFileIdWithSelfie.filePath,
        userStatus: userStatus
      }).then(_res => {
        console.log(_res);
        let data = _res.data;
        console.log(data);
      });
      console.log();

      history.push();
    } else {
    }
  };

  const onChangeIdFront = e => {
    setIdFrontFile(e.target.files[0]);
    setIdFrontFilename(e.target.files[0].name);
  };

  const onChangeIdFrontSubmit = async e => {
    e.preventDefault();
    const idFrontData = new FormData();
    idFrontData.append("idFrontFile", idFrontFile);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/uploadidfront/${userData.id}`,
        idFrontData,
        {
          headers: {
            "Content-Type": "mulifrom/form-data"
          }
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFileIdFront({ fileName, filePath });
      console.log(filePath);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        console.log(uploadedFileIdFront);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const onChangeIdBack = e => {
    setIdBackFile(e.target.files[0]);
    setIdBackFilename(e.target.files[0].name);
  };

  const onChangeIdBackSubmit = async e => {
    e.preventDefault();
    const idBackData = new FormData();
    idBackData.append("idBackFile", idBackFile);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/uploadidback/${userData.id}`,
        idBackData,
        {
          headers: {
            "Content-Type": "mulifrom/form-data"
          }
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFileIdBack({ fileName, filePath });
      console.log(filePath);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        console.log(uploadedFileIdBack);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const onChangeIdWithSelfie = e => {
    setIdWithSelfieFile(e.target.files[0]);
    setIdWithSelfieFilename(e.target.files[0].name);
  };

  const onChangeIdWithSelfieSubmit = async e => {
    e.preventDefault();
    const idWithSelfieData = new FormData();
    idWithSelfieData.append("idWithSelfieFile", idWithSelfieFile);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/uploadidwithselfie/${userData.id}`,
        idWithSelfieData,
        {
          headers: {
            "Content-Type": "mulifrom/form-data"
          }
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFileIdWithSelfie({ fileName, filePath });
      console.log(filePath);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        console.log(uploadedFileIdBack);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 5, offset: 3 }}>
          <Card style={{ width: 400 }} className="shadow mt-2">
            <CardBody>
              <div className="row login-form">
                <div className="col-md-12 signUpTitle">
                  <div className="mb-2">
                    <h5 style={{ fontWeight: "bold", color: "blue" }}>
                      V E R I F Y
                    </h5>
                    <h5 style={{ color: "black" }}>
                      Provide a valid ID picture
                    </h5>
                  </div>
                  <Form>
                    <FormGroup>
                      <div className="text-center">
                        <Label for="idFront">FRONT</Label>
                        <CardSubtitle>
                          <img
                            src={
                              uploadedFileIdFront
                                ? uploadedFileIdFront.filePath
                                : noimageicon
                            }
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",
                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>
                        <Input
                          type="file"
                          name="idFront"
                          id="idFront"
                          onChange={onChangeIdFront}
                        />
                        <button type="button" onClick={onChangeIdFrontSubmit}>
                          Upload
                        </button>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="text-center">
                        <Label for="idBack">BACK</Label>
                        <CardSubtitle>
                          <img
                            src={
                              uploadedFileIdBack
                                ? uploadedFileIdBack.filePath
                                : noimageicon
                            }
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",
                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>
                        <Input
                          type="file"
                          name="idBack"
                          id="idBack"
                          onChange={onChangeIdBack}
                        />
                        <button type="button" onClick={onChangeIdBackSubmit}>
                          Upload
                        </button>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="text-center">
                        <Label for="idWithSelfie">SELFIE WITH ID</Label>
                        <CardSubtitle>
                          <img
                            src={
                              uploadedFileIdWithSelfie
                                ? uploadedFileIdWithSelfie.filePath
                                : noimageicon
                            }
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",
                              marginBottom: 10
                            }}
                          />
                        </CardSubtitle>
                        <Input
                          type="file"
                          name="idWithSelfie"
                          id="idWithSelfie"
                          onChange={onChangeIdWithSelfie}
                        />
                        <button
                          type="button"
                          onClick={onChangeIdWithSelfieSubmit}
                        >
                          Upload
                        </button>
                      </div>
                    </FormGroup>
                  </Form>
                </div>

                <div className="col-md-12 registerBtn">
                  <div class=""></div>
                </div>
              </div>
              <div className="col-md-12 registerBtn">
                <form>
                  <div class="">
                    <button
                      type="submit"
                      class="btnSign font-weight-bold"
                      onClick={handleToVerify}
                    >
                      Submit Pictures
                    </button>
                  </div>
                </form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VerifyAccount;
