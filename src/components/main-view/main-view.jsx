import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () =>{
    const [ movies, setMovies ] = useState ([
        {
            id: 1,
            title: "E.T. the Extraterrestrial",
            description:
              "After a gentle alien becomes stranded on Earth, he is discovered and befriended by a 10-year-old boy named Elliott. Bringing him into his suburban California house, Elliott introduces E.T., as he is dubbed, to his brother, Michael, and sister, Gertie, and they decide to keep his existence a secret. Soon, however, he falls ill, resulting in government intervention and a dire situation for both him and Elliott.",
            director: {
              name: "Steven Spielberg",
              bio:
                "A leading figure of the New Hollywood era and pioneer of the modern blockbuster, he is the most commercially successful director in history. He has received numerous awards, including three Academy Awards and two BAFTAs. Seven of his films have been listed in the National Film Registry by the Library of Congress as: culturally, historically or aesthetically significant",
              birth: "1946-12-18",
              death: ""
            },
            genre: {
              name: "Adventure",
              description:
                "Implies a narrative that is defined by a journey (often including some form of pursuit) and is usually located within a fantasy or exoticized setting. Typically, though not always, such stories include the quest narrative. The predominant emphasis on violence and fighting in action films is the typical difference between the two genres"
            },
            image:
              "https://upload.wikimedia.org/wikipedia/en/6/66/E_t_the_extra_terrestrial_ver3.jpg",
            year: "1982"
          },
          {
            id: 2,
            title: "The Others",
            description:
              "A woman named Grace retires with her two children to a mansion on Jersey, towards the end of the Second World War, where she's waiting for her husband to come back from battle",
            director: {
              name: "Alejandro Amenabar",
              bio:
                "Is the son of a Spanish mother and a Chilean father. His family moved back to Spain when he was 1 year old, and he grew up and studied in Madrid. He wrote, produced and directed his first short film La cabeza at the age of 19, and he was 23 when he directed his feature debut Thesis (1996). His film Open Your Eyes (1997) was a huge success in Spain and was distributed worldwide. It was remade in Hollywood by Cameron Crowe as Vanilla Sky (2001), starring Tom Cruise, Penelope Cruz (also the star of the original version) and Cameron Diaz. The Others (2001) is Amenábar's first English language film.",
              birth: "1972-03-31",
              death: ""
            },
            genre: {
              name: "Thriller",
              description:
                "Thriller film, also known as suspense film or suspense thriller, is a broad film genre that evokes excitement and suspense in the audience. The suspense element found in most films' plots is particularly exploited by the filmmaker in this genre. Tension is created by delaying what the audience sees as inevitable, and is built through situations that are menacing or where escape seems impossible.s"
            },
            image: "https://upload.wikimedia.org/wikipedia/en/4/4c/TheOthers.jpg",
            year: "2002"
          },
          {
            id: 3,
            title: "Bicycle Thieves",
            description:
              "Antonio Ricci, an unemployed man in the depressed post-WWII economy of Italy, finally gets a job hanging up posters, but he needs a bicycle. But when his bicycle is stolen, he and son walk the streets of Rome looking for it. Antonio finally manages to locate the thief, but with no proof he must abandon his cause. But he and his son know perfectly well that without a bike, Antonio won't be able to keep his job.",
            director: {
              name: "Vittorio de Sica",
              bio:
                "He was an Italian film director and actor, a leading figure in the neorealist movement.Four of the films he directed won Academy Awards: Sciuscià and Bicycle Thieves (honorary), while Yesterday, Today and Tomorrow and Il giardino dei Finzi Contini won the Academy Award for Best Foreign Language Film. Indeed, the great critical success of Sciuscià (the first foreign film to be so recognized by the Academy of Motion Picture Arts and Sciences) and Bicycle Thieves helped establish the permanent Best Foreign Film Award. These two films are considered part of the canon of classic cinema. Bicycle Thieves was deemed the greatest film of all time by Sight & Sound magazine's poll of filmmakers and critics in 1958, and was cited by Turner Classic Movies as one of the 15 most influential films in cinema history. De Sica was also nominated for the 1957 Oscar for Best Supporting Actor for playing Major Rinaldi in American director Charles Vidor's 1957 adaptation of Ernest Hemingway's A Farewell to Arms, a movie that was panned by critics and proved a box office flop. De Sica's acting was considered the highlight of the film.",
              birth: "1901-07-07",
              death: "1974-11-13"
            },
            genre: {
              name: "Drama",
              description:
                "Drama film is a genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well. Often, these dramatic themes are taken from intense, real life issues. Whether heroes or heroines are facing a conflict from the outside or a conflict within themselves, Drama film aims to tell an honest story of human struggles."
            },
            image: "https://upload.wikimedia.org/wikipedia/en/2/20/Ladri3.jpg",
            year: "1948"
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

