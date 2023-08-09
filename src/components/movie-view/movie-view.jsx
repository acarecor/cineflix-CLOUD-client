import { Button, Card, Accordion } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Card className="h-100">
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
        <Button
          variant="primary"
          onClick={onBackClick}
          style={{ cursor: "pointer" }}
        >
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};