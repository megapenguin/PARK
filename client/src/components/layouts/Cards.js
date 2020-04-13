import React from "react";
import noimageicon from "././noimageicon.jpg";
import parklogo from "././parklogo.png";

import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  CardImg,
  CardBody
} from "reactstrap";

function Cards() {
  return (
    <Container className="mt-5">
      <Row className="mt-5">
        <Col>
          <Container style={{ height: 350, width: 250 }}>
            <Card hover className="shadow mt-3">
              <CardImg
                style={{ width: "100%", height: "100%" }}
                src={parklogo}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Verified Users</CardTitle>
                <CardText></CardText>
                <Button href="/view-users">View Users</Button>
              </CardBody>
            </Card>
          </Container>
        </Col>
        <Col>
          <Container style={{ height: 350, width: 250 }}>
            <Card className="shadow mt-3">
              <CardImg
                style={{ width: "100%", height: "100%" }}
                src={parklogo}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Parking Providers</CardTitle>
                <CardText></CardText>
                <Button>View Providers</Button>
              </CardBody>
            </Card>
          </Container>
        </Col>
        <Col>
          <Container style={{ height: 350, width: 250 }}>
            <Card className="shadow mt-3">
              <CardImg
                style={{ width: "100%", height: "100%" }}
                src={parklogo}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Unverified Users</CardTitle>
                <CardText></CardText>
                <Button>Verify Users</Button>
              </CardBody>
            </Card>
          </Container>
        </Col>
        <Col>
          <Container style={{ height: 350, width: 250 }}>
            <Card className="shadow mt-3">
              <CardImg
                style={{ width: "100%", height: "100%" }}
                src={parklogo}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>Unverified Providers</CardTitle>
                <CardText></CardText>
                <Button>Verify Providers</Button>
              </CardBody>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Cards;
