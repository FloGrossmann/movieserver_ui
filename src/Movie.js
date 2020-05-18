import React from "react"
import Rating from "./Rating"
import Person from "./Person"

class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }



    render() {

        if (!this.props.movie) {
            return "";
        }

        let ratings = null;
        if (this.props.movie.ratings && this.props.movie.ratings.length !== 0) {
            ratings = this.props.movie.ratings;
        }
        let ratingsRender = null;
        if (ratings) {
            let i = 0;
            let ratingsList = [];
            for (let rating of ratings) {
                i++;
                ratingsList.push(<div className="list-group-item" key={"movie_rating_"+i}><Rating rating={rating} getData={this.props.getData}/></div>)
            }
            ratingsRender = <div className="card"><div className="card">Bewertungen: <div className="card-body list-group list-group-flush">{ratingsList}</div></div></div>
        }


        let persons = null;
        if (this.props.movie.watched_by && this.props.movie.watched_by.length !== 0) {
            persons = this.props.movie.watched_by;
        }
        
        let personsRender = null;
        if (persons) {
            let j = 0;
            let personsList = [];
            for (let person of persons) {
                j++;
                personsList.push(<div className="list-group-item" key={"movie_person_"+j}><Person person={person} getData={this.props.getData}/></div>)
            }
            personsRender = <div className="card"><div className="card">Gesehen von: <div className="card-body list-group list-group-flush">{personsList}</div></div></div>
        }

        let linkButtons = [];

        if (this.props.movie.hasOwnProperty("_links")) {
            //Collectionlinks
            let collectionLinks = this.props.movie._links;
            for (let key in collectionLinks) {
                let link = collectionLinks[key].href;
                if (key === "DELETE" || key === "PUT") {
                    //Disable DELETE & PUT -Buttons
                    linkButtons.push(<button disabled className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
                } else {
                    linkButtons.push(<button className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
                }
            }
        }
        if (this.props.movie.hasOwnProperty("links")) {
            //Model links
            let links = this.props.movie.links;
            let i = 0;
            for (let linkObject of links) {
                i++;
                //Each model link has an object with 'rel' & 'href' keys
                let link = linkObject.href;
                if (linkObject.rel === "DELETE" || linkObject.rel ===  "PUT") {
                    //Disable DELETE & PUT -Buttons
                    linkButtons.push(<button disabled className="btn btn-info" key={"link_"+i} onClick={() => this.props.getData(link)}>{linkObject.rel} - {link}</button>)
                } else {
                    linkButtons.push(<button className="btn btn-info" key={"link_"+i} onClick={() => this.props.getData(link)}>{linkObject.rel} - {link}</button>)
                }
            }
        }
        

        return (
            <div className="card">
                <div className="card-header">Film</div>
                <span>Id: {this.props.movie.id}</span>
                <span>Titel: {this.props.movie.title}</span>
                <span>Beschreibung: {this.props.movie.description}</span>
                <span>Sleeve: {this.props.movie.sleeve}</span>
                <span>3D: {this.props.movie.threeD ? "Ja" : "Nein"}</span>
                <div>{ratingsRender ? ratingsRender : "Keine Personen festgehalten"}</div>
                <div>{personsRender ? personsRender : "Keine Bewertungen festgehalten"}</div>
                <div>{linkButtons}</div>
            </div>
        );
    }
}

export default Movie;