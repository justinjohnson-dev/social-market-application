import React, { Component, useEffect } from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchPost } from "../actions/postAction";


class getPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: [],
            photo: '',
            loading: true,
            errors: {}
        };
    }

    async componentDidMount() {
        // trying with a fetch
        const url = "api/posts/getPost";
        const response = await fetch(url);

        // get data
        const data = await response.json();
        console.log(data)
        
        this.setState({ post: data, loading:false })
        console.log(this.state.post.description)
    }

    render() {
        const { post } = this.state.post;
        return (
            <div className="main-container">
                <h2 className="mb-4 title home-page-title-styling">User Posts</h2>
                <div>
                    {this.state.loading ? <div>loading...</div> : <div> <div>{this.state.post.location}</div> <img src={this.state.post.photo.data} /></div>}
                </div>
            </div>
        );
    }
}


getPost.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    postData: state.post
});

export default connect(
    mapStateToProps,
    { fetchPost }
)(getPost);