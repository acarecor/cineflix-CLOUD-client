import { useState, useEffect } from "react";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { ImageView } from "../images-view/images-view";

import {
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  const updatedUser = (user) => {
    setUser(user);
    console.log(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  //get all movies
  useEffect(() => {
    if (!token) {
      return;
    }
    //fetch(`https://myflix-movies-2a93844126ef.herokuapp.com/movies`, {
    
    fetch(`http://3.67.92.151/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            imagePath: movie.imagePath,
            title: movie.title,
            description: movie.description,
            director: {
              name: movie.director.name,
              bio: movie.director.bio,
              birth: movie.director.birth,
              death: movie.director.death?.[0],
            },
            genre: {
              name: movie.genre.name,
              description: movie.genre.description,
            },
            year: movie.year,
            featured: movie.featured,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  //search movies by title
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  //search movies by title
  const handleSearchInput = (e) => {
    const searchWord = e.target.value.toLowerCase();
    let tempArray = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchWord)
    );
    setFilteredMovies(tempArray);
  };

  //added grid to the main view

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        handleSearchInput={handleSearchInput}
      />
      <Container>
        <Row className="justify-content-md-center">
          <Routes>
            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/movies/:movieId"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col> The list is empty!</Col>
                  ) : (
                    <Col md={8}>
                      <MovieView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col> The list is empty!</Col>
                  ) : (
                    <>
                      {filteredMovies.map((movie) => (
                        <Col
                          className="mb-5 mt-2"
                          key={movie.id}
                          sm={12}
                          md={6}
                          lg={4}
                          xl={3}
                        >
                          <MovieCard
                            movie={movie}
                            user={user}
                            setUser={setUser}
                            token={token}
                          />
                        </Col>
                      ))}
                    </>
                  )}
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : (
                    <>
                      <Col
                        className="mb-5"
                        //key={user.username}
                      >
                        <ProfileView
                          user={user}
                          token={token}
                          updatedUser={updatedUser}
                          movies={movies}
                          onLoggedOut={onLoggedOut}
                          setUser={setUser}
                        />
                      </Col>
                    </>
                  )}
                </>
              }
            />
            <Route 
              path="/images" 
              element={
                <Col md={5}>
                  <ImageView 
                  token={token}
                  />
                </Col>} />
          </Routes>
        </Row>
      </Container>
      <footer>
        <div> 2023 Cineflix</div>
      </footer>
    </BrowserRouter>
  );
};
