import React from "react"
import Movies from "./Movies";
import Persons from "./Persons";
import Ratings from "./Ratings";

const HOST = "http://localhost:8080"

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            movie: null,
            persons: null,
            person: null,
            ratings: null,
            rating: null
        }
        this.getData = this.getData.bind(this);
    }

    getData(link) {
        console.log("Get data called with link: ", link)
        if (!link || link === "") {
            link = getMoviesURL();
        } else {
            //Sanitize links from templating
            if (link.includes("{?title}")) {
                link = link.replace("{?title}", "");
            }
            if (link.includes("{?firstname}")) {
                link = link.replace("{?firstname}", "");
            }
        }
        var request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if(request.readyState === 4) {
                if (request.status === 200) {
                    let responseJSON = JSON.parse(request.responseText);
                    console.log("Received response: ", responseJSON);
                    if (responseJSON.hasOwnProperty("_embedded")) {
                        //We are a list
                        if (responseJSON._embedded.hasOwnProperty("movies")) {
                            // We are a movie list
                            this.setState({movies: responseJSON._embedded.movies, movie: null, persons: null, person: null});
                        } else if (responseJSON._embedded.hasOwnProperty("personModelList")) {
                            // We are a person list
                            this.setState({movies: null, movie: null, persons: responseJSON._embedded.personModelList, person: null});
                        } else if (responseJSON._embedded.hasOwnProperty("ratingModelList")) {
                            // We are a rating list
                            this.setState({movies: null, movie: null, persons: null, person: null, ratings: responseJSON._embedded.ratingModelList, rating: null});
                        }

                    } else if (responseJSON.hasOwnProperty("movie")){
                        // We are just a movie
                        this.setState({movie: responseJSON.movie, movies: null, persons: null, person: null, ratings: null, rating: null});
                    } else if (responseJSON.hasOwnProperty("person")){
                        // We are just a person
                        this.setState({movie: null, movies: null, persons: null, person: responseJSON.person, ratings: null, rating: null});
                    } else if (responseJSON.hasOwnProperty("rating")){
                        // We are just a rating
                        this.setState({movie: null, movies: null, persons: null, person: null, ratings: null, rating: responseJSON.rating});
                    }
                }
            }
        }
        console.log(getMoviesURL());
        request.open("GET", link, true);
        request.send();
    }

    render() {

        if (this.state.movies !== null || this.state.movie !== null) {
            return (
                <div>
                    <h2>Filme</h2>
                    <Movies movie = {this.state.movie} movies = {this.state.movies} getData={this.getData}/>
                </div>
            );
        } else if (this.state.persons !== null || this.state.person !== null) {
            return (
                <div>
                    <h2>Personen</h2>
                    <Persons persons = {this.state.persons} person = {this.state.person} getData={this.getData}/>
                </div>
            );
        } else if (this.state.ratings !== null || this.state.rating !== null) {
            return (
                <div>
                    <h2>Bewertungen</h2>
                    <Ratings ratings = {this.state.ratings} rating={this.state.rating} getData={this.getData}/>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="btn btn-primary" onClick={() => this.getData()}> Alle Filme holen </button>
                </div>
            );
        }
    }
}

function getMoviesURL() {
    return HOST + "/api/movies";
}

export default Controller;