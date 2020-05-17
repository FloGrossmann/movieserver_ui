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

        if (this.props.persons !== null) {
            let persons = this.props.persons;
            if (!persons) {
                persons = [];
            }
            let personRender = [];
            let i = 0;
            for (let person of persons) {
                i++;
                personRender.push(<div className="card-body" key={"persons_"+i}><Person person={person} getData={this.getData}/></div>)
            }
    
            return (
                <div>
                    <div className="card">
                        {personRender}
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