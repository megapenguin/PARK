import React, { useState } from "react";
import parklogo from "././parklogo.png";
import noimageicon from "././noimageicon.jpg";
import {
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
  ButtonToggle
} from "reactstrap";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <Navbar
      className="navbar-fixed-top mb-5"
      color="light"
      light
      expand="md"
      fixed="top"
      style={{}}
    >
      <img
        className="mr-2 shadow mt-2"
        src={parklogo}
        style={{
          width: 75,
          height: 75,
          borderRadius: "50%",
          border: "1px white  "
        }}
      ></img>
      <NavbarBrand href="/admin" style={{ fontWeight: "bold" }}>
        {" "}
        ADMIN
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/admin" style={{ color: "black" }}>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/view-users" style={{ color: "black" }}>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/view-providers" style={{ color: "black" }}>
              Providers
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/view-unverified-users" style={{ color: "black" }}>
              Unverified Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/view-unverified-providers"
              style={{ color: "black" }}
            >
              Unverified Porviders
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/transaction-history" style={{ color: "black" }}>
              Transaction Records
            </NavLink>
          </NavItem>

          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem>Option 2</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
        <NavbarText>
          {" "}
          <img
            className="mr-3 shadow mt-2"
            src={noimageicon}
            style={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              border: "1px white  "
            }}
          ></img>
        </NavbarText>
        <ButtonToggle color="danger">Log Out</ButtonToggle>{" "}
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
