import "./movie-view.scss";

import { Button, Card, Row, Col, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  
  const movie = movies.find((b) => b.id === movieId);

  return (
    <Card className="h-100 mt-3">
      <Card.Img variant="top" src={movie.imagePath} alt={movie.title} />

      <Card.Body className="movie-view-card">
        <Card.Title ><h2>{movie.title}</h2></Card.Title>
        <Card.Text>Year of release: {movie.year}</Card.Text>
        <Card.Title>Description:</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Accordion defaultActiveKey="0" className="border-none">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Director: {movie.director.name}</Accordion.Header>
             <Accordion.Body>
             <Card.Text> {movie.director.bio}</Card.Text>
             <Card.Text> Birth: {movie.director.birth}</Card.Text>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Genre: {movie.genre.name}</Accordion.Header>
             <Accordion.Body>
             <Card.Text> {movie.genre.description}</Card.Text>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        
        <Row className="mt-4 mb-0.5">
            <Link to={`/`}>
              <Button className="back-btn" variant="primary" style={{ cursor: "pointer" }}>
                Back
              </Button>
            </Link>
        </Row>
      </Card.Body>
    </Card>
  );
};
