# CINEFLIX React App

CINEFLIX is a client-side application built using React, uses the server-side myFlix Rest API and the database (mongo DB atlas).

## Tech Stack used

MERN (MongoDB, Express, React and Node.js)

## Design Criteria

* The user will be able to access information about movies such as description, director, genre among others.
* The user will be able to create a profile where they can add their favorite movies to a list and save them. 

## Essential Views & Features

Main view
* Returns ALL movies to the user (each movie item with an image, title, and description)
* Filtering the list of movies with a “search” feature
* Ability to select a movie for more details
* Ability to log out
* Ability to navigate to Profile view

Single Movie view
* Returns data (description, genre, director, image) about a single movie to the user
* Allows users to add a movie to their list of favorites 

Login view
* Allows users to log in with a username and password 

Signup view
* Allows new users to register (username, password, email, date of birth) 

Profile view
* Displays user registration details
* Allows users to update their info (username, password, email, date of birth)
* Displays favorite movies
* Allows users to remove a movie from their list of favorites
* Allows existing users to deregister

### Parcel

To test the project using Parsel use in terminal: npm start or  parcel src/index.html 