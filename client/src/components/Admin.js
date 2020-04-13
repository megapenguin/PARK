import React from "react";
import NavBar from "./layouts/NavBar";
import Cards from "./layouts/Cards";
import { Row, Col, Container, Jumbotron } from "reactstrap";

function Admin() {
  return (
    <React.Fragment>
      <Row>
        <Col>
          <NavBar />
        </Col>
      </Row>
      <Container className="mt-5">
        <Row>
          <Cards />
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default Admin;
