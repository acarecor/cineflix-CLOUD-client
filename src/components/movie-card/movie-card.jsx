import PropTypes from "prop-types";

export const MovieCard = ( { movie, onMovieClick }) => {
    return (
        <div
        onClick= { ()=> {
            onMovieClick(movie);
        }}
        >
            {movie.title}
        </div>
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
