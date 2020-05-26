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
  ButtonToggle,
} from "reactstrap";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const clear = (e) => {
    localStorage.clear();
  };

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
        className="mb-2 shadow mt-2"
        src={parklogo}
        style={{
          width: 75,
          height: 75,
          borderRadius: "50%",
          border: "1px white  ",
        }}
      />
      <NavbarBrand href="/admin" style={{ fontWeight: "bold" }}></NavbarBrand>
      <NavbarToggler onClick={toggle} />

      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto mb-auto" navbar>
          <NavbarBrand href="/admin" style={{ fontWeight: "bold" }}>
            ADMIN
          </NavbarBrand>
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
          {/* <NavItem>
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
          </NavItem> */}
          <NavItem>
            <NavLink href="/transaction-history" style={{ color: "black" }}>
              History
            </NavLink>
          </NavItem>
          <NavItem></NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Requests
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem href="/view-unverified-users">
                Unverified Users
              </DropdownItem>
              <DropdownItem href="/view-unverified-providers">
                Unverified Providers
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>

          <NavLink href="/welcome">
            <ButtonToggle color="danger" onClick={(e) => clear(e)}>
              Log Out
            </ButtonToggle>
          </NavLink>
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default NavBar;
