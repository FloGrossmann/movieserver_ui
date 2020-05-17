import React from "react"
import Movie from "./Movie"

class Movies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
        this.getData = this.getData.bind(this);
    }

    getData(link) {
        this.props.getData(link);
    }

    render() {

        if (this.props.movieList && this.props.movieList._embedded.movies !== null) {
            let movies = this.props.movieList._embedded.movies;
            if (!movies) {
                movies = [];
            }
            let movieRender = [];
            let i = 0;
            for (let movie of movies) {
                i++;
                movieRender.push(<div className="card-body" key={"movies_"+i}><Movie movie={movie} getData={this.getData}/></div>)
            }

            let linkButtons = [];

            if (this.props.movieList.hasOwnProperty("_links")) {
                //Collectionlinks
                let collectionLinks = this.props.movieList._links;
                for (let key in collectionLinks) {
                    let link = collectionLinks[key].href;
                    linkButtons.push(<button className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
                }
            }
    
            return (
                <div>
                    <div className="card">
                        {movieRender}
                        {linkButtons}
                    </div>
                </div>
            );
        } else if (this.props.movie !== null) {
            return (
                <div className="card">
                    <div className="card-body">
                    <Movie movie = {this.props.movie} getData={this.getData}/>
                    </div>
                </div>
            );
        }
    }
}

export default Movies;