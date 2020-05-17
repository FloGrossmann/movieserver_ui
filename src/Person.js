import React from "react"
import Rating from "./Rating"
import Movie from "./Movie"

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
        if (this.props.person.ratings && this.props.person.ratings.length !== 0) {
            ratings = this.props.person.ratings
        }
        let ratingsRender = null;
        if (ratings) {
            let ratingsList = [];
            let i = 0;
            for (let rating of ratings) {
                i++;
                ratingsList.push(<div className="card" key={"person_rating_"+i}><Rating rating={rating} getData={this.props.getData}/></div>)
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
                moviesList.push(<div className="card" key={"person_movie_"+j}><Movie movie={movie} getData={this.props.getData}/></div>)
            }
            moviesRender = <span>Gesehene Filme: {moviesList}</span>;
        }

        let moviesNotWatched = null;
        if (this.props.person.movies_notWatched && this.props.person.movies_notWatched.length !== 0) {
            moviesNotWatched = this.props.person.movies_notWatched
        }
        let moviesNotWatchedRender = null;
        if(moviesNotWatched) {
            let moviesList = [];
            let j = 0;
            for (let movie of moviesNotWatched) {
                j++;
                moviesList.push(<div className="card" key={"person_movie_"+j}><Movie movie={movie} getData={this.props.getData}/></div>)
            }
            moviesNotWatchedRender = <span>Noch nicht gesehene Filme: {moviesList}</span>;
        }

        let linkButtons = [];

        if (this.props.person.hasOwnProperty("_links")) {
            //Collectionlinks
            let collectionLinks = this.props.person._links;
            for (let key in collectionLinks) {
                let link = collectionLinks[key].href;
                linkButtons.push(<button className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
            }
        }
        if (this.props.person.hasOwnProperty("links")) {
            //Model links
            let links = this.props.person.links;
            let i = 0;
            for (let linkObject of links) {
                i++;
                //Each model link has an object with 'rel' & 'href' keys
                let link = linkObject.href;
                linkButtons.push(<button className="btn btn-info" key={"link_"+i} onClick={() => this.props.getData(link)}>{linkObject.rel} - {link}</button>)
            }
        }

        return (
            <div className="card">
                <div className="card-header">Person</div>
                <span>Id: {this.props.person.id}</span>
                <span>Vorname: {this.props.person.firstName}</span>
                <span>Nachname: {this.props.person.lastName}</span>
                <span>{moviesRender ? moviesRender : ""}</span>
                <span>{ratingsRender ? ratingsRender : ""}</span>
                <span>{moviesNotWatchedRender ? moviesNotWatchedRender : ""}</span>
                <div>{linkButtons}</div>
            </div>
        );
    }
}

export default Person;