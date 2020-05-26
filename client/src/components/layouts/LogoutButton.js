import React from "react";
import { Button, Container } from "reactstrap";
import { Link } from "react-router-dom";

function LogoutButton() {
  return (
    <Container>
      <Link to="/home">
        {" "}
        <Button color="primary">Home</Button>
      </Link>
    </Container>
  );
}

export default LogoutButton;
