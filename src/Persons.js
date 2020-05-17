import React from "react"
import Movie from "./Movie"

const HOST = "http://localhost:8080"

class Movies extends React.Component {
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
                        // We are a movie list
                        this.setState({movies: JSON.parse(request.responseText)._embedded.movies, movie: null});
                    } else if (responseJSON.hasOwnProperty("movie")){
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

        if (this.state.movies !== null) {
            let movies = this.state.movies;
            if (!movies) {
                movies = [];
            }
            let movieRender = [];
            let i = 0;
            for (let movie of movies) {
                i++;
                movieRender.push(<div className="card-body" key={"movies_"+i}><Movie movie={movie} getData={this.getData}/></div>)
            }
    
            return (
                <div>
                    <div className="card">
                        {movieRender}
                    </div>
                </div>
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

export default Movies;