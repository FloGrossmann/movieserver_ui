import React from "react"
import Person from "./Person"

class Persons extends React.Component {
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

        if (this.props.personList && this.props.personList._embedded.personModelList !== null) {
            let persons = this.props.personList._embedded.personModelList;
            if (!persons) {
                persons = [];
            }
            let personRender = [];
            let i = 0;
            for (let person of persons) {
                i++;
                personRender.push(<div className="card-body" key={"persons_"+i}><Person person={person} getData={this.getData}/></div>)
            }

            
            let linkButtons = [];

            if (this.props.personList.hasOwnProperty("_links")) {
                //Collectionlinks
                let collectionLinks = this.props.personList._links;
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
                        {personRender}
                        {linkButtons}
                    </div>
                </div>
            );
        } else if (this.props.person !== null) {
            return (
                <div className="card">
                    <div className="card-body">
                    <Person person = {this.props.person} getData={this.getData}/>
                    </div>
                </div>
            );
        }
    }
}

export default Persons;