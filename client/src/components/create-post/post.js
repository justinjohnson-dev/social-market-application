import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './post.css';


class Post extends Component {

  render() {
    const { user } = this.props.auth;
    return (
      <div className="container">

      </div>
    );
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {  }
)(Post);