import React, { useState, useEffect } from "react";
import parklogo from "././parklogo.png";
import noimageicon from "././noimageicon.jpg";
import {
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  ButtonToggle,
  Button,
} from "reactstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [wide, setWide] = useState("");

  useEffect(() => {
    setWide(120);
  }, []);

  const toggle = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setWide(0);
    } else {
      setWide(120);
    }
  };
  return (
    <Navbar
      className="navbar mb-5"
      color="light"
      expand="mb"
      style={{
        height: "100%",
        width: wide,
        boder: "1px solid black",
        color: "black",
      }}
      fixed="top"
    >
      <Collapse isOpen={isOpen}>
        <Nav className="mb-auto mt-5" navbar vertical>
          <NavbarBrand href="/admin" style={{ color: "black" }}></NavbarBrand>
          <NavItem className="mr-auto mt-5">
            <NavLink href="/admin" style={{ color: "black" }}>
              Home
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink href="/view-users" style={{ color: "black" }}>
              Users
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink href="/view-providers" style={{ color: "black" }}>
              Providers
            </NavLink>
          </NavItem>
          <NavItem className="mr-auto">
            <NavLink href="/view-unverified-users" style={{ color: "black" }}>
              Requests
            </NavLink>
          </NavItem>

          <NavItem className="mr-auto">
            <NavLink href="/transaction-history" style={{ color: "black" }}>
              History
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
      <Nav className="mt-auto">
        <Button color="light" blue onClick={toggle}>
          <h3>{isOpen ? <FaAngleLeft /> : <FaAngleRight />}</h3>
        </Button>
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
