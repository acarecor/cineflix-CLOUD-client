import { useState, useEffect } from "react";
import { Button, Card, Row, Col, Accordion } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { GoPlus} from "react-icons/go";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  
  const movie = movies.find((b) => b.id === movieId);

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />

      <Card.Body>
        <Card.Title> {movie.title}</Card.Title>
        <Card.Title>Description:</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Accordion defaultActiveKey="0">
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
        <Card.Text>Realese Year: {movie.year}</Card.Text>
        <Row>
          
          <Col className="d-flex justify-content-right">
            <Link to={`/`}>
              <Button variant="primary" style={{ cursor: "pointer" }}>
                Back
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
