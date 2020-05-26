import React, { useState, useContext, useEffect } from "react";
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
  Label,
} from "reactstrap";
import { UserContext } from "../context/UserContext";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function Profile({ history, Auth }) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState("");
  let [newInfo, setNewInfo] = useState([]);
  let [currentInfo, setCurrentInfo] = useState([]);
  let [accName, setAccname] = useState("");
  let [accId, setAccId] = useState("");
  let [currentUser, setCurrentUser] = useState([]);

  //let Auth.state.userData = JSON.parse(localStorage.getItem("Auth.state.userData"));
  let { setUserData } = useContext(UserContext);

  // console.log(uploadedFile, filename);
  // console.log(Auth.state.userData);
  useEffect(() => {
    setCurrentInfo(Auth.state.userData);
    setAccId(Auth.state.userData.id);
    setAccname(Auth.state.userData.userName);
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:8000/api/users/search", {
      id: Auth.state.userData.id,
      userName: Auth.state.userData.userName,
    }).then((_res) => {
      console.log(_res);
      let data = _res.data;
      currentUser = data;
      setCurrentUser(currentUser);
      console.log(currentUser);
      console.log("currentUser");
    });
  }, []);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const profileData = new FormData();
    profileData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/uploadProfilePict/${accId}`,
        profileData,
        {
          headers: {
            "Content-Type": "mulifrom/form-data",
          },
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      console.log(filePath);
    } catch (err) {
      console.log(err);
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
        console.log(uploadedFile);

        console.log(profileData);
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    let check = 0;
    if (!uploadedFile) {
      check++;
    }

    if (check == 0) {
      Axios.post("http://localhost:8000/api/users/updateProfile", {
        id: accId,
        profilePicture: uploadedFile.filePath,
      }).then((_res) => {
        console.log(_res);
        let data = _res.data;
        console.log(data);
      });
      console.log(uploadedFile.filePath);
      history.push("/home");
    } else {
      console.log("no pictures uploaded");
    }
  };

  const handleToBack = (e) => {
    // Axios.post("http://localhost:8000/api/users/search", {
    //   userName: accName,
    //   id: accId,
    // }).then((_res) => {
    //   console.log(_res);
    //   let data = _res.data;
    //   localStorage.clear();
    //   localStorage.setItem("Auth.state.userData", JSON.stringify(data));
    // });
    history.push("/profile");
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
                      PROFILE
                    </h5>
                  </div>
                  <Form>
                    <FormGroup>
                      <div className="text-center">
                        <h1 for="parkingPhoto" style={{ fontWeight: "bold" }}>
                          {currentInfo.firstName} {currentInfo.lastName}
                        </h1>
                        <CardSubtitle>
                          <img
                            src={
                              uploadedFile ? uploadedFile.filePath : noimageicon
                            }
                            style={{
                              width: "50%",
                              border: "1px solid #ced4da",
                              borderRadius: "50%",
                              marginBottom: 10,
                            }}
                          />
                        </CardSubtitle>
                        <Input
                          type="file"
                          name="profilePhoto"
                          id="profilePhoto"
                          onChange={onChange}
                        />
                      </div>
                    </FormGroup>
                  </Form>
                  <Button
                    color="primary"
                    type="button"
                    class="font-weight-bold"
                    onClick={onSubmit}
                  >
                    Upload
                  </Button>
                </div>

                <div className="col-md-12">
                  <div class=""></div>
                </div>
              </div>
              <div className="col-md-12 registerBtn">
                <Form>
                  <Row>
                    <Col>
                      <Button color="success" type="submit" onClick={onSave}>
                        Save
                      </Button>
                      {"   "}
                      <Button color="danger" onClick={handleToBack}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default withRouter(Profile);
