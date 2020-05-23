import React from "react";
import noimageicon from "././noimageicon.jpg";
import park from "././park.png";
import user from "././user.png";
import history from "././history.png";
import request from "././request.png";
import {
  GoRequestChanges,
  FaUserAlt,
  FaRedRiver,
  FaCarAlt,
  FaMailBulk,
  FaHistory,
} from "react-icons/fa";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  CardImg,
  CardBody,
} from "reactstrap";

function Cards() {
  return (
    <Container className="mt-5">
      <Row className="mt-5">
        <Col>
          <Card hover className="shadow mt-1">
            <CardTitle>
              <h1>
                <img
                  className="mt-3"
                  src={user}
                  style={{ width: 200, height: 200 }}
                ></img>
              </h1>
            </CardTitle>
            <CardBody>
              <Button href="/view-users"> Users</Button>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow mt-1">
            <CardTitle>
              <h1>
                <img
                  className="mt-3"
                  src={park}
                  style={{ width: 200, height: 200 }}
                ></img>
                {/* <FaCarAlt style={{ width: 150, height: 200 }} /> */}
              </h1>
            </CardTitle>
            <CardBody>
              <Button href="/view-providers">Providers</Button>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow mt-1">
            <CardTitle>
              <h1>
                <img
                  className="mt-3"
                  src={request}
                  style={{ width: 200, height: 200 }}
                ></img>
                {/* <FaMailBulk style={{ width: 150, height: 200 }} /> */}
              </h1>
            </CardTitle>
            <CardBody>
              <Button href="/view-unverified-users">Users</Button>
              <Button className="ml-2" href="/view-unverified-providers">
                Providers
              </Button>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card className="shadow mt-1">
            <CardTitle>
              <h1>
                <img
                  className="mt-3"
                  src={history}
                  style={{ width: 200, height: 200 }}
                ></img>
                {/* <FaHistory style={{ width: 150, height: 200 }} /> */}
              </h1>
            </CardTitle>
            <CardBody>
              <Button href="/transaction-history">History</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cards;
