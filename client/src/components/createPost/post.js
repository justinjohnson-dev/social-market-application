import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/postAction";
import classnames from "classnames";
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

  validateFile() {
    if (this.state.photo !== '') {
      return true;
    }
  }

  onSubmit = e => {
    e.preventDefault();
    // create form as we are using the formidable package on backend
    let formData = new FormData();
    // add data from state to form
    formData.append('description', this.state.description);
    formData.append('location', this.state.location);
    let validated = this.validateFile();
    if (validated === true) {
      formData.append('photo', this.state.photo);
    }
    formData.append('farmer', this.state.farmer);

    this.props.createPost(formData);
    this.props.history.push('/');
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate onSubmit={this.onSubmit}>
        <div className="photo-div">
          <label className="photo-style">
            <input
              onChange={this.fileChange}
              error={errors.photo}
              type='file'
              name='photo'
              id="photo"
              className={classnames("", {
                invalid: errors.photo
              })}
            />
          </label>
          <span className="red-text">{errors.photo}</span>
        </div>
        <div className="description-div">
          <label className="description-label">Description</label>
          <input
            onChange={this.onChange}
            error={errors.description}
            value={this.state.description}
            type="textbox"
            id="description"
            className={classnames("", {
              invalid: errors.description
            })}
          />
          <span className="red-text">{errors.description}</span>
        </div>
        <div className="location-div">
          <label className="location-label">Location</label>
          <input
            onChange={this.onChange}
            error={errors.location}
            value={this.state.location}
            type="textbox" id="location"
            className={classnames("", {
              invalid: errors.location
            })}
          />
          <span className="red-text">{errors.location}</span>
        </div>
        <div className="farmer-div">
          <label className="farmer-label">Farmer</label>
          <input
            onChange={this.onChange}
            error={errors.farmer}
            value={this.state.farmer}
            type="textbox" id="farmer"
            className={classnames("", {
              invalid: errors.farmer
            })}
          />
          <span className="red-text">{errors.farmer}</span>
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