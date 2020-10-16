import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/authActions";
import './post.css';


class Post extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      location: "",
      photo: "",
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

  // function to put the file in state
  fileChange = e => {
    this.setState({
      photo: e.target.files[0]
    });
  }

  onSubmit = e => {
    e.preventDefault();
    // create form as we are using the formidable package on backend
    let formData = new FormData();
    // add data from state to form
    formData.append('description', this.state.description);
    formData.append('location', this.state.location);
    formData.append('photo', this.state.photo, this.state.photo.name);
    formData.append('farmer', this.state.farmer);
    console.log(formData)
    this.props.createPost(formData);
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="photo-div">
          <label className="photo-style">
            <input className="photo-button" id="photo" onChange={this.fileChange} type='file' name='photo' />
          </label>
        </div>
        <div className="description-div">
          <label className="description-label">Description</label>
          <input className="description-input" type="textbox" id="description" onChange={this.onChange} value={this.state.description}></input>
        </div>
        <div className="location-div">
          <label className="location-label">Location</label>
          <input type="textbox" id="location" onChange={this.onChange} value={this.state.location}></input>
        </div>
        <div className="farmer-div">
          <label className="farmer-label">Farmer</label>
          <input type="textbox" id="farmer" onChange={this.onChange} value={this.state.farmer}></input>
        </div>
        <button
          type="submit"
          className="btn btn-small waves-effect waves-light hoverable dark-green accent-3">Create Post
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
)(Post);