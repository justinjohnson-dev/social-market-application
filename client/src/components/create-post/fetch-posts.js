import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";


class getPost extends Component {
    render() {
        const { post } = this.props.post;
        return (
            <div className="main-container">
                <h2 className="mb-4 title home-page-title-styling">User Posts</h2>
                <div className="row">
                    // will figure out how to get post into the card
                    <Card key={index} post={post} />
                </div>
            </div>
        );
    }
}

getPost.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(getPost);