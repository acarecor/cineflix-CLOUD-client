import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import  './navigation-bar.scss';

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput }) => {
  return (
    <Navbar  className="justify-content-between"   data-bs-theme="dark"  expand="lg" >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <h1>my Flix</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                <Form>
                  <Form.Control
                    id="search-bar"
                    type="text"
                    placeholder="Search by title"
                    onChange={handleSearchInput}
                    style= {{background: "black" }}
                  />
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
