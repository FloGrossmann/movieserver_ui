import React from "react"
import Movie from "./Movie"
import Movies from "./Movies";

const HOST = "http://localhost:8080"

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            movie: null
        }
        this.getData = this.getData.bind(this);
    }

    getData(link) {
        console.log("Get data called with link: ", link)
        if (!link || link === "") {
            link = getMoviesURL();
        } else {
            //Sanitize
            if (link.includes("{?title}")) {
                link = link.replace("{?title}", "");
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
                            this.setState({movies: responseJSON._embedded.movies, movie: null});
                        }

                    } else if (responseJSON.hasOwnProperty("movie")){
                        // We are just a movie
                        this.setState({movie: JSON.parse(request.responseText).movie, movies: null});
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
                <div className="card">
                    <div className="card-body">
                    <Movie movie = {this.state.movie} getData={this.getData}/>
                    </div>
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