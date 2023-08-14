import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const ProfileView = ({
  user,
  updatedUser,
  token,
  movies,
  onLoggedOut,
}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const favoriteMovies = movies.filter((movie) => {
    return user.favoritesMovies.includes(movie.id);
  });

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
      .then((data) => {
        if (data) {
          updatedUser(data);
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

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
            <h3>Your Info</h3>
          <div>Username: {user.username}!</div>
          <div>e-mail: {user.email}</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
            <Form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
              <h4>Want to change some Info?</h4>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="text"
                  password="password"
                  defaultValue={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  email="email"
                  defaultValue={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Birthday</Form.Label>
                <Form.Control
                  type="date"
                  birthday="birthday"
                  defaultValue={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="primary" onClick={handleDeleteUser}>
                Delete User
              </Button>
            </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <>
        <Row>
          <h2>Favorites Movies</h2>
          {favoriteMovies.map((movie) => (
            <Col key={movie.id} md={6} lg={4}>
              <MovieCard movie={movie}></MovieCard>
            </Col>
          ))}
        </Row>
      </>
    </Container>
  );
};
