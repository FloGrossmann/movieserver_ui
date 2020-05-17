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

        if (this.props.movies !== null) {
            let movies = this.props.movies;
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
        } else if (this.props.movie !== null) {
            return (
                <div className="card">
                    <div className="card-body">
                    <Movie movie = {this.props.movie} getData={this.getData}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <button className="btn btn-primary" onClick={() => this.props.getData()}> Alle Filme holen </button>
                </div>
            );
        }
    }
}

export default Movies;