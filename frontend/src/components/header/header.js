import React from "react";
import { Container, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";

const Header = () => {
  const history = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
    history("/");
  };

  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">DulyNoted</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto"></Nav>
          <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/mynotes">My Notes</Nav.Link>
            <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
