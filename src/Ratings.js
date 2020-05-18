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

        if (this.props.ratingList && this.props.ratingList._embedded.ratingModelList !== null) {
            let ratings = this.props.ratingList._embedded.ratingModelList;
            if (!ratings) {
                ratings = [];
            }
            let ratingsRender = [];
            let i = 0;
            for (let rating of ratings) {
                i++;
                ratingsRender.push(<div className="card-body" key={"persons_"+i}><Rating rating={rating} getData={this.getData}/></div>)
            }

            let linkButtons = [];

            if (this.props.ratingList.hasOwnProperty("_links")) {
                //Collectionlinks
                let collectionLinks = this.props.ratingList._links;
                for (let key in collectionLinks) {
                    let link = collectionLinks[key].href;
                    if (key === "POST") {
                        //Disable POST-Buttons
                        linkButtons.push(<button disabled className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
                    } else {
                        linkButtons.push(<button className="btn btn-info" key={key} onClick={() => this.props.getData(link)}>{key} - {link}</button>)
                    }
                }
            }
    
            return (
                <div>
                    <div className="card">
                        {ratingsRender}
                        {linkButtons}
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