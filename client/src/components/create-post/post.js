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

    console.log(this.state.photo)
    console.log(this.state.location)
    // add data from state to form
    formData.append('description', this.state.description);
    formData.append('location', this.state.location);
    formData.append('photo', this.state.photo, this.state.photo.name);
    formData.append('farmer', this.state.farmer);
    console.log(formData)

    // this was a test without redux first
    // axios.post("/api/posts/createpost", formData)
    //   .then(res => {
    //     console.log(res)
    //   })

    this.props.createPost(formData);
  };

  render() {
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
        <div className="form-group">
          <label className="btn btn-secondary">
            <input id="photo" onChange={this.fileChange} type='file' name='photo' />
          </label>
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
)(Post);