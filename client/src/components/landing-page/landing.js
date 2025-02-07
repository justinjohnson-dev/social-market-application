import React, { Component } from "react";
import './landing.css';
import { Link } from "react-router-dom";


class Landing extends Component {
    render() {
        return (
            
            <div className="container valign-wrapper">
                <div className="row">
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
            
        );
    }
}

export default Landing;
