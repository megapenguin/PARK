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
import Axios from "axios";

function Profile({ history }) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState("");

  let userData = JSON.parse(localStorage.getItem("userData"));
  let { setUserData } = useContext(UserContext);

  // console.log(uploadedFile, filename);
  // console.log(userData);

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const profileData = new FormData();
    profileData.append("file", file);

    try {
      const res = await axios.post(
        `http://localhost:8000/api/users/uploadProfilePict/${userData.id}`,
        profileData,
        {
          headers: {
            "Content-Type": "mulifrom/form-data"
          }
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

  const onSave = e => {
    e.preventDefault();

    Axios.post("http://localhost:8000/api/users/updateProfile", {
      id: userData.id,
      profilePicture: uploadedFile.filePath
    }).then(_res => {
      console.log(_res);
      let data = _res.data;
      console.log(data);
    });
    console.log(uploadedFile.filePath);

    Axios.post("http://localhost:8000/api/users/search", {
      userName: userData.userName,
      id: userData.id
    }).then(_res => {
      console.log(_res);

      let data = _res.data;

      localStorage.setItem("userData", JSON.stringify(data));
    });
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
                          {userData.firstName} {userData.lastName}
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
                              marginBottom: 10
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
                  <button
                    type="button"
                    class="font-weight-bold"
                    onClick={onSubmit}
                  >
                    Upload
                  </button>
                </div>

                <div className="col-md-12">
                  <div class=""></div>
                </div>
              </div>
              <div className="col-md-12 registerBtn">
                <form>
                  <div class="">
                    <button
                      type="submit"
                      class="btnSign font-weight-bold"
                      onClick={onSave}
                    >
                      Save
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

export default Profile;
