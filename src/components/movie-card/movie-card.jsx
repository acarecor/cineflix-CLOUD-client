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
    movie: propTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
