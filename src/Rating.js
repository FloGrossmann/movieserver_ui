import React from "react"
import Movie from "./Movie";
import Person from "./Person"

class Rating extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {

        if (!this.props.rating) {
            return "";
        }

        let movie = "";
        if (this.props.rating.movie) {
            movie = <div className="card">Film: <Movie movie = {this.props.rating.movie} getData={this.props.getData}/></div>
        }

        let person = "";
        if (this.props.rating.person) {
            person = <div className="card">Person: <Person person = {this.props.rating.person} getData={this.props.getData}/></div>
        }

        let linkButtons = [];

        if (this.props.rating.hasOwnProperty("_links")) {
            //Collectionlinks
            let collectionLinks = this.props.rating._links;
            for (let key in collectionLinks) {
                let link = collectionLinks[key].href;
                linkButtons.push(<button className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
            }
        }
        if (this.props.rating.hasOwnProperty("links")) {
            //Model links
            let links = this.props.rating.links;
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
                <div className="card-header">Bewertung</div>
                <span>Id: {this.props.rating.id}</span>
                <span>Film Id: {this.props.rating.movie_id}</span>
                <span>Person Id: {this.props.rating.person_id}</span>
                <span>Kommentar: {this.props.rating.comment}</span>
                <span>Sterne: {this.props.rating.stars}</span>
                <div>{person ? person : ""}</div>
                <div>{movie ? movie : ""}</div>
                <div>{linkButtons}</div>
            </div>
        );
    }
}

export default Rating;