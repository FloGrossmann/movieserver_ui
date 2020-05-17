import React from "react"
import Rating from "./Rating"
import Movie from "./Movie"

const HOST = "http://localhost:8080"

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        if (!this.props.person) {
            return "";
        }

        let ratings = null;
        if (this.props.person.rating && this.props.person.rating.length !== 0) {
            ratings = this.props.person.ratings
        }
        let ratingsRender = null;
        if (ratings) {
            let ratingsList = [];
            let i = 0;
            for (let rating of ratings) {
                i++;
                ratingsList.push(<div className="card" key={"person_rating_"+i}><Rating rating={rating}/></div>)
            }
            ratingsRender = <span>Abgegebene Bewertungen: {ratingsList}</span>
        }

        let movies = null;
        if (this.props.person.movies_watched && this.props.person.movies_watched.length !== 0) {
            movies = this.props.person.movies_watched
        }
        let moviesRender = null;
        if(movies) {
            let moviesList = [];
            let j = 0;
            for (let movie of movies) {
                j++;
                moviesList.push(<div className="card" key={"person_movie_"+j}><Movie movie={movie}/></div>)
            }
            moviesRender = <span>Gesehene Filme: {moviesList}</span>;
        }

        return (
            <div className="card">
                <span>Id: {this.props.person.id}</span>
                <span>Vorname: {this.props.person.firstName}</span>
                <span>Nachname: {this.props.person.lastName}</span>
                <span>{moviesRender ? moviesRender : ""}</span>
                <span>{ratingsRender ? ratingsRender : ""}</span>
            </div>
        );
    }
}

function getMoviesURL() {
    return HOST + "/api/movies";
}

export default Person;