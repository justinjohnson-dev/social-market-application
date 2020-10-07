import React, { Component } from "react";
import { Link } from "react-router-dom";
import './home.css';


class Home extends Component {
    render() {
        return (
            <div style={{ height: "75vh", background: "whitesmoke", 'margin-top': "20%" }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <div className="col s4">
                            <Link to="/signup" className="btn btn-large waves-effect waves-light hoverable dark-green accent-3">SignUp</Link>
                        </div>
                        <div className="col s4">
                            <Link to="/signin" className="btn btn-large btn-flat waves-effect white black-text">Login</Link>
                        </div>
                        <div className="col s4">
                            <Link to="/JoinChat" className="btn btn-large black white-text">Chat</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
