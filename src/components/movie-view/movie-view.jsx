export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.image} />
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