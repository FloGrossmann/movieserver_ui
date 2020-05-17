import React from "react"
import Movie from "./Movie"
import Movies from "./Movies";
import Person from "./Person"
import Persons from "./Persons";

const HOST = "http://localhost:8080"

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            movie: null,
            persons: null,
            person: null
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
                        }

                    } else if (responseJSON.hasOwnProperty("movie")){
                        // We are just a movie
                        this.setState({movie: responseJSON.movie, movies: null, persons: null, person: null});
                    } else if (responseJSON.hasOwnProperty("person")){
                        // We are just a person
                        this.setState({movie: null, movies: null, persons: null, person: responseJSON.person});
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
                <Movies movie = {this.state.movie} movies = {this.state.movies} getData={this.getData}/>
            );
        } else if (this.state.movie !== null) {
            return (
                <Movie movie = {this.state.movie} getData={this.getData}/>
            );
        } else if (this.state.persons !== null) {
            return (
                <Persons persons = {this.state.persons} getData={this.getData}/>
            );
        } else if (this.state.person !== null) {
            return (
                <Person person = {this.state.person} getData={this.getData}/>
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