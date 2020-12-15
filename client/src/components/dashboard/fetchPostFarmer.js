import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostsById } from '../../components/createPost/postApi'
import Card from '../../components/createPost/postCard'
import './postFarmer.css';


class GetPost extends Component {
    constructor() {
        super();
        this.state = {
            loadPosts: [],
            error: false,
            errors: {}
        };
    }

    componentDidMount() {
       
        // FETCH data
        this.loadPostsByCreatedAt();
    }

    loadPostsByCreatedAt() {
        const { user } = this.props.auth;
        getPostsById(user.id,'createdAt').then(data => {
            if (data.error) {
                this.setState({
                    error: data.error
                });
            } else {
                this.setState({
                    loadPosts: data
                });
            }
        });
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="main-container">
                <h2 className="mb-4 title home-page-title-styling"></h2>
                <div className="row">
                    {this.state.loadPosts.map((post, index) => (<Card key={index} post={post} user={user} />))}
                </div>
            </div>
        );
    }
}

// if we convert to redux implementation 
GetPost.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {}
)(GetPost);