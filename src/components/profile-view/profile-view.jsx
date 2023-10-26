import React from "react";
import { useState } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { Modal } from "react-bootstrap";

export const ProfileView = ({
  user,
  updatedUser,
  token,
  movies,
  onLoggedOut,
  setUser,
  
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [showModal, setShowModal] = useState(false);

  const favoriteMovies = movies.filter((movie) =>
    user.favoritesMovies.includes(movie.id)
  );

  //Update a user account
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(
      `https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return (
            response.json(), alert("User information succesfully changed!")
          );
        }
      })
      .then((user) => {
        if (user) {
          updatedUser(user);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //Delete a user account function
  const handleDeleteUser = () => {
    fetch(
      `https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("User deleted!");
        onLoggedOut();
      } else {
        alert("Something is wrong");
      }
    });

  };
  
  // modal
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <Container>
      <Row className="mt-5">
        <Col xs={12} sm={4}>
          <Card className="mb-3">
            <Card.Body className="mb-3">
              <h2>Your Info</h2>
              <div>Username: {user.username}</div>
              <div>e-mail: {user.email}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body className="mb-3">
              <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
                <h4>Want to change some Info?</h4>
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    defaultValue={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    password="password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    email="email"
                    defaultValue={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Birthday</Form.Label>
                  <Form.Control
                    type="date"
                    birthday="birthday"
                    defaultValue={user.birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col> </Col>
                  <Col>
                    <>
                      <Button variant="primary" onClick={handleShowModal}>
                        Delete account
                      </Button>

                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        animation={false}
                      >
                        <Modal.Header closeButton></Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete your account?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="primary" onClick={handleCloseModal}>
                            Return
                          </Button>
                          <Button variant="primary" onClick={handleDeleteUser}>
                            Yes, delete my account
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <>
        <Row className="mt-5">
          <Row>
            <h2 className="d-flex justify-content-center">Favorites Movies</h2>
          </Row>
          {favoriteMovies.map((movie) => (
            <Col className="mb-5 mt-2" key={movie.id} md={6} lg={4}>
              <MovieCard
                movie={movie}
                user={user}
                setUser={setUser}
                token={token}
              ></MovieCard>
            </Col>
          ))}
        </Row>
      </>
    </Container>
  );
};
