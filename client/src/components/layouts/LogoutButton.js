import React from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

function LogoutButton() {
  return (
    <Container>
      <Link to="/welcome">
        {" "}
        <Button color="danger">Log Out</Button>
      </Link>
    </Container>
  );
}

export default LogoutButton;
