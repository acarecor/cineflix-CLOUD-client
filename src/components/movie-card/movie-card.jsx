import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, user, setUser, token}) => {   
  const [favoritesMovies, setFavoritesMovies] = useState(false);
  
  
  useEffect(() => {
    if (user.favoritesMovies && user.favoritesMovies.includes(movie.id)) {
      setFavoritesMovies(true);
    }
  }, []);

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
        user.favoritesMovies.push(movie.id);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        alert("movie was added to your list!");
         return console.log (user.favoritesMovies);
         
      })
      .catch((error) => {
        alert("Something is wrong");
      });
  };

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
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        alert("movie was deleted from your list!");
        window.location.reload();
      })
      .catch((error) => {
        alert("Something is wrong");
      });
  };

  return (
    <Card className="h-100">
      <Card.Img className="h-100" variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title className="d-flex justify-content-center">
          {" "}
          {movie.title}
        </Card.Title>
        <Card.Text className="d-flex justify-content-center">
          {movie.director.name}
        </Card.Text>
        <Card.Text className="d-flex justify-content-center">
          {movie.year}
        </Card.Text>

        <Link
          className="d-flex justify-content-center"
          to={`/movies/${encodeURIComponent(movie.id)}`}
        >
          <Button variant="primary">Open</Button>
        </Link>
        <Col>
          {favoritesMovies ? (
            <Button
              variant="primary"
              onClick={removeFav}
              style={{ cursor: "pointer" }}
            >
              Remove from Favorites
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={addFav}
              style={{ cursor: "pointer" }}
            >
              Add to Favorites
            </Button>
          )}
        </Col>
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
