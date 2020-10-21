import React, { Component } from "react";
import './home.css';
import GetPost from '../createPost/fetchPost'


class Home extends Component {
    render() {
        return (
            <div>
                <GetPost />
            </div>
        );
    }
}

export default Home;