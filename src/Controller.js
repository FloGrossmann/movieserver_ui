import React from "react"
import Movies from "./Movies";
import Persons from "./Persons";
import Ratings from "./Ratings";

const HOST = "http://localhost:8080";
const MAINURL = HOST +"/api";

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: null,
            movie: null,
            persons: null,
            person: null,
            ratings: null,
            rating: null,
            links: null,
            error: null
        }
        this.getData = this.getData.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData(link) {
        console.log("Get data called with link: ", link)
        if (!link || link === "") {
            link = MAINURL;
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
                    this.setState({error: null});
                    let responseJSON = JSON.parse(request.responseText);
                    console.log("Received response: ", responseJSON);
                    if (responseJSON.hasOwnProperty("_embedded")) {
                        //We are a list
                        if (responseJSON._embedded.hasOwnProperty("movies")) {
                            // We are a movie list
                            this.setState({movies: responseJSON, movie: null, persons: null, person: null});
                        } else if (responseJSON._embedded.hasOwnProperty("personModelList")) {
                            // We are a person list
                            this.setState({movies: null, movie: null, persons: responseJSON, person: null});
                        } else if (responseJSON._embedded.hasOwnProperty("ratingModelList")) {
                            // We are a rating list
                            this.setState({movies: null, movie: null, persons: null, person: null, ratings: responseJSON, rating: null});
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
                    } else {
                        // Root navigation
                        if (responseJSON.hasOwnProperty("_links")) {
                            //Root navigation!
                            this.setState({movie: null, movies: null, persons: null, person: null, ratings: null, rating: null, links: responseJSON._links });
                        }
                    }
                } else {
                    console.error("Call to main url " + MAINURL + " was not successfull, retrieved answer: ", request)
                    this.setState({movie: null, movies: null, persons: null, person: null, ratings: null, rating: null, links: null, error: request.errorText});
                }
            }
        }
        request.open("GET", link, true);
        request.send();
    }

    render() {

        let linkButtons = [];

        if (this.state.links !== null) {
            //Collectionlinks
            let collectionLinks = this.state.links;
            for (let key in collectionLinks) {
                if (key !== "self") {
                    let link = collectionLinks[key].href;
                    linkButtons.push(<button className="btn btn-info" key={key} onClick={() => this.getData(link)}>{key} - {link}</button>)
                }
            }
        }

        if (this.state.movies !== null || this.state.movie !== null) {
            return (
                <div>
                    <h2>Filme</h2>
                    <Movies movie = {this.state.movie} movieList = {this.state.movies} getData={this.getData}/>
                </div>
            );
        } else if (this.state.persons !== null || this.state.person !== null) {
            return (
                <div>
                    <h2>Personen</h2>
                    <Persons personList = {this.state.persons} person = {this.state.person} getData={this.getData}/>
                </div>
            );
        } else if (this.state.ratings !== null || this.state.rating !== null) {
            return (
                <div>
                    <h2>Bewertungen</h2>
                    <Ratings ratingList = {this.state.ratings} rating={this.state.rating} getData={this.getData}/>
                </div>
            );
        } else {

            let fetchButton = "";
            if (linkButtons.length === 0) {
                //Some error has occured, show a retry button
                fetchButton = <div>
                    <h3>Is the movieserver running under {HOST} ?</h3>
                    <p>The UI expects the movieserver to expose the API {MAINURL}.</p>
                    <p> You can configure this URL in the Controller.js</p>
                    <p><button className="btn btn-primary" onClick={() => this.getData()}> Retry get data </button></p>
                </div>
            }
            let error = this.state.error;

            return (
                <div className="card">
                    <h2 className="card-header">Root-Navigation</h2>
                    {error}
                    {fetchButton}
                    <div className="card-body">
                        {linkButtons}
                        <p>Notice this webapplication can currently only call GET-APIs. POST, PUT, DELETE Buttons are therefore disabled, but shown anyway.</p>
                    </div>
                </div>
            );
        }
    }
}

export default Controller;