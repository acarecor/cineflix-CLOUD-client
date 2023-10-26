import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GoHeart } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import Swal from "sweetalert2";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, setUser, token }) => {
  const [favoritesMovies, setFavoritesMovies] = useState(false);

  useEffect(() => {
    if (user.favoritesMovies && user.favoritesMovies.includes(movie.id)) {
      setFavoritesMovies(true);
    }
  }, []);

  // add favorite movie to the user's list
  const addFav = (event) => {
    event.preventDefault();
    fetch(
      `https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoritesMovies(true);
        //user.favoritesMovies.push(movie.id);
        let updatedUser = {...user}
        updatedUser.favoritesMovies.push(movie.id);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        Swal.fire({
          position: "top-end",
          icon: "success",
          text: "Movie added to your Favorites",
          showConfirmButton: false,
          timer: 1500,
        });
        return console.log(user.favoritesMovies);
      })
      .catch((error) => {
        alert("Something is wrong");
      });
  };

  //remove movie from user list
  const removeFav = () => {
    fetch(
      `https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movie.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setFavoritesMovies(false);
        user.favoritesMovies = user.favoritesMovies.filter(
          (id) => id !== movie.id
        );
        let updatedUser = {...user}
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        Swal.fire({
          position: "top-end",
          icon: "error",
          text: "Movie deleted from your Favorite's list!",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        alert("Something is wrong");
      });
  };

  return (
    <Card className="h-100">
      <Card.Header className="h-5">
        <>
          {favoritesMovies ? (
            <FcLike
              onClick={removeFav}
              style={{ cursor: "pointer" }}
              className="full-heart"
            ></FcLike>
          ) : (
            <GoHeart
              onClick={addFav}
              style={{ cursor: "pointer" }}
              className="empty-heart"
            ></GoHeart>
          )}
        </>
      </Card.Header>
      <Card.Img className="h-100" variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center">
          {" "}
          {movie.title}
        </Card.Title>
        <Row>
          <Col>
            <Link
              className="d-flex justify-content-center mt-2"
              to={`/movies/${encodeURIComponent(movie.id)}`}
            >
              <Button variant="primary">More Info</Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birth: PropTypes.string,
    }),
    genre: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    year: PropTypes.string,
  }).isRequired,
};
