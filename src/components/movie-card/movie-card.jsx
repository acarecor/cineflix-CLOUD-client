import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ( { movie }) => {
    return (
        <Card className="h-100">
            <Card.Img className="h-100" variant="top" src={movie.imagePath} />
            <Card.Body >
                <Card.Title className="d-flex justify-content-center"> {movie.title}</Card.Title>
                <Card.Text className="d-flex justify-content-center">{movie.director.name}</Card.Text>
                <Card.Text className="d-flex justify-content-center">{movie.year}</Card.Text>
                
                <Link className="d-flex justify-content-center" to={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="primary">Open</Button>
                </Link>
                
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
                birth: PropTypes.string}),
            genre: PropTypes.shape({
                name:PropTypes.string,
                description: PropTypes.string}),
            year: PropTypes.string
        }).isRequired,
        
    };
