import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () =>{
    const storedUser = JSON.parse(localStorage.getItem ("user"));
    const storedToken =localStorage.getItem("token");
    const [user,setUser] = useState (null);
    const [token, setToken] =useState(null);
    const [movies, setMovies ] = useState ([]); 
    const [selectedMovie, setSelectedMovie] = useState (null);

    useEffect(()=> {
        if(!token){
            return;
        }
        fetch("https://myflix-movies-2a93844126ef.herokuapp.com/movies",
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then ((response)=> response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    id: movie._id,
                    imagePath: movie.imagePath,
                    title: movie.title,
                    description: movie.description,
                    director: {
                        name: movie.director.name,
                        bio: movie.director.bio,
                        birth:movie.director.birth,
                        death:movie.director.death?.[0],
                    } ,
                    genre: { 
                        name: movie.genre.name,
                        description: movie.genre.description,
                    },
                    year: movie.year,
                    featured: movie.featured
                };
            });
            setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user){
        return (
            <>
                <LoginView 
                    onLoggedIn={(user,token)=> {
                        setUser (user);
                        setToken(token);
                    }} 
                />
                or
                <SignupView />
            </>
        );
    }

    if (selectedMovie) {
        return (
            <>
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
                
                <MovieView 
                    movie={selectedMovie} 
                    onBackClick={()=> setSelectedMovie(null)} 
                />
            </>
        );
    }

    if(movies.length === 0 ) {
        return <div> The list is empty! </div>;
    }
    return (
        <div>
            
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
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

