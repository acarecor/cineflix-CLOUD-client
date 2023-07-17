import propTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.imagePath} />
            </div>
            <div>
                <span> Title: </span>
                <span> {movie.title}</span>
            </div>
            <div>
                <span>Description:</span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Director:</span>
                <span>{movie.director.name}</span> <br />
                <span>Bio: {movie.director.bio}</span> <br/>
                <span>Birth {movie.director.birth}</span>

           </div>
           <div>
                <span>Genre:</span>
                <span>{movie.genre.name}</span> <br/>
                <span>{movie.genre.description}</span>

           </div>
           <div>
                <span>Year:</span>
                <span>{movie.year}</span>
           </div>
           <button onClick={onBackClick}>Back</button>
        </div>
    );
};

MovieView.propTypes = {
    movie: PropTypes.shape({
        imagePath: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        director: PropTypes.shape({
            name: PropTypes.string, 
            bio:PropTypes.string,
            birth: PropTypes.date}),
        genre: PropTypes.shape({
            name:PropTypes.string,
            description: PropTypes.string}),
        year: PropTypes.date
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};