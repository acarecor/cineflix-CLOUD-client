import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () =>{
    const [ movies, setMovies ] = useState ([
    { id:1,
    title: "E.T. the Extraterrestrial",
        description:"After a gentle alien becomes stranded on Earth, he is discovered and befriended by a 10-year-old boy named Elliott. Bringing him into his suburban California house, Elliott introduces E.T., as he is dubbed, to his brother, Michael, and sister, Gertie, and they decide to keep his existence a secret. Soon, however, he falls ill, resulting in government intervention and a dire situation for both him and Elliott.",
        director: "Steven Spielberg",
        genre: "Adventure",
        image:"https://upload.wikimedia.org/wikipedia/en/6/66/E_t_the_extra_terrestrial_ver3.jpg",
        year:"1982",
    
},
{id:2,
    title: "The Others",
        description:"A woman named Grace retires with her two children to a mansion on Jersey, towards the end of the Second World War, where she's waiting for her husband to come back from battle",
        director: "Alejandro Amenabar",
        genre: "Thriller",
        image:"https://upload.wikimedia.org/wikipedia/en/4/4c/TheOthers.jpg",
        year:"2002",
    
},
{id:3,
    title: "Bicycle Thieves",
    description: "Antonio Ricci, an unemployed man in the depressed post-WWII economy of Italy, finally gets a job hanging up posters, but he needs a bicycle. But when his bicycle is stolen, he and son walk the streets of Rome looking for it. Antonio finally manages to locate the thief, but with no proof he must abandon his cause. But he and his son know perfectly well that without a bike, Antonio won't be able to keep his job.",
    director: "Vittorio de Sica",
    genre: "Drama",
    image: "https://upload.wikimedia.org/wikipedia/en/2/20/Ladri3.jpg",
    year: "1948",
   }

    ]);

    const [selectedMovie, setSelectedMovie] = useState (null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={()=> setSelectedMovie(null)} />
        );
    }

    if(movies.length === 0 ) {
        return <div> The list is empty! </div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key = {movie.id}
                movie = {movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};

