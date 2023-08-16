import { useState, useEffect } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";


export const MovieView = ({ movies, user, setUser, token}) => {
    const { movieId } = useParams();
    const [ favoritesMovies, setFavoritesMovies ] = useState(false);

    useEffect(()=> {
      if(user.favoritesMovies &&  user.favoritesMovies.includes(movieId))
      {
        setFavoritesMovies(true);}
      }, []);

      const addFav= (event)=> {
        event.preventDefault();
          fetch(
            `https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movieId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ).then((response) => response.json())
          .then((data) => {
            setFavoritesMovies(true);
            user.favoritesMovies.push(movieId); 
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            
          })
          .catch((error) => {
              alert("Something is wrong");
            });
          
      };

      const removeFav = () => {
        fetch(
          `https://myflix-movies-2a93844126ef.herokuapp.com/users/${user.username}/movies/${movieId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
          .then((response) => response.json())
          .then((data) => {
            setFavoritesMovies(false);
            user.favoritesMovies = user.favoritesMovies.filter(id => id!== movieId); 
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            alert("movie was deleted from your list!");
          })
          .catch((error) => {
            alert("Something is wrong");
          });
      };        
    
  const movie = movies.find((b)=> b.id === movieId);

  return (
    <Card  className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />

      <Card.Body>
        <Card.Title>Title: {movie.title}</Card.Title>
        <Card.Title>Description:</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Card.Title>Director: {movie.director.name}</Card.Title>
        <Card.Text> {movie.director.bio}</Card.Text>
        <Card.Text> Birth: {movie.director.birth}</Card.Text>
        <Card.Title> Genre: {movie.genre.name}</Card.Title>
        <Card.Text>{movie.genre.description}</Card.Text>
        <Card.Text>Year: {movie.year}</Card.Text>
        <Row >
          <Col >
           
              {favoritesMovies ? (
                    <Button variant="primary" onClick={removeFav} style={{ cursor: "pointer"}} >
                      Remove from Favorites
                    </Button>
              ) : (
                    <Button variant="primary" onClick={addFav} style={{ cursor: "pointer"}}>
                      Add to Favorites
                    </Button>
                  
                )}
           
            </Col>
            <Col className="d-flex justify-content-right">
              <Link to={`/`}>
                  <Button
                      variant="primary"
                      style={{ cursor: "pointer" }}
                  >
                      Back
                  </Button>
              </Link>
            </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};