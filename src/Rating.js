import React from "react"
import Movie from "./Movie";
import Person from "./Person"

const HOST = "http://localhost:8080"

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        let movie = "";
        if (this.props.rating.movie) {
            movie = <div className="card-header">Film: <Movie movie = {this.props.rating.movie}/></div>
        }

        let person = "";
        if (this.props.rating.person) {
            person = <div className="card-header">Person: <Person person = {this.props.rating.person}/></div>
        }

        return (
            <div className="card">
                <span>Id: {this.props.rating.id}</span>
                <span>Film Id: {this.props.rating.movie_id}</span>
                <span>Person Id: {this.props.rating.person_id}</span>
                <span>Kommentar: {this.props.rating.comment}</span>
                <span>Sterne: {this.props.rating.stars}</span>
                <div>{person ? person : ""}</div>
                <div>{movie ? movie : ""}</div>
            </div>
        );
    }
}

function getMoviesURL() {
    return HOST + "/api/movies";
}

export default Rating;