import React from "react";
import Sidebar from "./layouts/Sidebar";
import Cards from "./layouts/Cards";
import Navbar from "./layouts/NavBar";
import { Row, Col, Container, Jumbotron, Nav } from "reactstrap";

function Admin() {
  return (
    <React.Fragment>
      <Sidebar />
      <Row>
        <Col className="mb-5">
          <Navbar />
        </Col>
      </Row>{" "}
      <Row className="mt-5">
        <Col className="mt-5">
          <Container className="mt-5 mr-5">
            <Cards />
          </Container>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Admin;
