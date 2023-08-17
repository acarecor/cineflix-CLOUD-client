import { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch(`https://myflix-movies-2a93844126ef.herokuapp.com/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User no found!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
                required
                placeholder="Enter your Username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </Form.Group>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button variant="primary" type="submit">
                  Log in
                </Button>
              </Col>
            </Row>
          </Form>
          <p className="d-flex justify-content-center mt-1"> or </p>
          <Link
            className="d-flex justify-content-center"
            as={Link}
            to="/signup"
          >
            <Button variant="secondary">Create new account</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
};
