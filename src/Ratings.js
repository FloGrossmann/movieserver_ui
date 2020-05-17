import React from "react"
import Rating from "./Rating"

class Ratings extends React.Component {
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

        if (this.props.ratings !== null) {
            let ratings = this.props.ratings;
            if (!ratings) {
                ratings = [];
            }
            let ratingsRender = [];
            let i = 0;
            for (let rating of ratings) {
                i++;
                ratingsRender.push(<div className="card-body" key={"persons_"+i}><Rating rating={rating} getData={this.getData}/></div>)
            }
    
            return (
                <div>
                    <div className="card">
                        {ratingsRender}
                    </div>
                </div>
            );
        } else if (this.props.rating !== null) {
            return (
                <div className="card">
                    <div className="card-body">
                    <Rating rating = {this.props.rating} getData={this.getData}/>
                    </div>
                </div>
            );
        }
    }
}

export default Ratings;