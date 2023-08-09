import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ( { movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img className="h-100" variant="top" src={movie.imagePath} />
            <Card.Body>
                <Card.Title> {movie.title}</Card.Title>
                <Card.Text>{movie.director.name}</Card.Text>
                <Card.Text>{movie.year}</Card.Text>
                <Button onClick= { ()=> 
                 onMovieClick(movie)} variant="primary">Open
                 </Button>
       
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
                bio:PropTypes.string,
                birth: PropTypes.date}),
            genre: PropTypes.shape({
                name:PropTypes.string,
                description: PropTypes.string}),
            year: PropTypes.string
        }).isRequired,
        onMovieClick: PropTypes.func.isRequired
    };
