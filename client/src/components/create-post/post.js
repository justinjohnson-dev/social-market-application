import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../actions/authActions";
import './post.css';



class Post extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      location: "",
      farmer: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const newPost = {
      description: this.state.description,
      location: this.state.location,
      farmer: this.state.farmer
    };
    this.props.createPost(newPost, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div>
          <label>description</label>
          <input type="text" id="description" onChange={this.onChange} value={this.state.description}></input>
        </div>
        <div>
          <label>location</label>
          <input type="text" id="location" onChange={this.onChange} value={this.state.location}></input>
        </div>
        <div>
          <label>Farmer</label>
          <input type="text" id="farmer" onChange={this.onChange} value={this.state.farmer}></input>
        </div>
        <button
          type="submit"
          className="btn btn-small waves-effect waves-light hoverable dark-green accent-3">submit
        </button>
      </form>
    );
  }
}

Post.propTypes = {
  createPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(Post));