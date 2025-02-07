import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createPost } from "../actions/postAction";
import classnames from "classnames";
import { Fab, Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import {
  FormControl,
  InputLabel,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField
} from "@material-ui/core";
import './post.css';


class Post extends Component {
  constructor() {
    super();
    this.state = {
      description: "",
      location: "",
      photo: "",
      farmer: "No",
      highlight1: "",
      highlight2: "",
      farmerId: "",
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

  onRadioChange = e => {
    this.setState({
      farmer: e.currentTarget.value
    });
  }

  // function to put the file in state
  fileChange = e => {
    this.setState({
      photo: e.target.files[0]
    });
  }
  fileChangeHighlight = e => {
    this.setState({
      highlight1: e.target.files[0]
    });
  }
  fileChangeHighlight2 = e => {
    this.setState({
      highlight2: e.target.files[0]
    });
  }

  validateFile() {
    if (this.state.photo !== '') {
      console.log(this.state.photo)
      return true;
    }
  }

  findFarmerEmail = () => {
    const user = this.props.auth;
    return user.user.id;
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
      if (this.state.highlight1 !== "") {
        formData.append('highlight1', this.state.highlight1);
        formData.append('highlight2', this.state.highlight2);
        // find farmers email to save in mongo
        // will be tied to orders later on
        const farmerID = this.findFarmerEmail();
        formData.append('farmerId', farmerID);
        
      }
    }
    formData.append('farmer', this.state.farmer);
    let userId = this.findFarmerEmail();
    formData.append('userId',userId)
    this.props.createPost(formData);
 
    if (this.state.description !== '' && this.state.location !== '') {
      console.log('push to homepage')
      this.props.history.push('/');
    }
  };

  render() {
    const { errors } = this.state;
    return (
      <form noValidate onSubmit={this.onSubmit} className="post-form-style">
        <div className="photo-div">
          <label className="photo-style">
            <input
              style={{ display: "none" }}
              onChange={this.fileChange}
              error={errors.photo}
              type='file'
              name='photo'
              id="photo"
              className={classnames("", {
                invalid: errors.photo
              })}
            />
            <Fab
              color="default"
              size="small"
              component="span"
              aria-label="add"
              variant="extended"
            >
              <AddIcon /> Upload photo
            </Fab>
          </label>
          <p className="red-text">{errors.photo}</p>
        </div>
        <div className="">
          <TextField
            onChange={this.onChange}
            error={errors.description}
            value={this.state.description}
            type="textbox"
            id="description"
            label="Description"
            multiline
            rows={4}
            className={classnames("", {
              invalid: errors.description
            })}
          />
          <p className="red-text">{errors.description}</p>
        </div>
        <div className="location-div">
          <TextField
            onChange={this.onChange}
            error={errors.location}
            value={this.state.location}
            type="textbox"
            id="location"
            label="Location"
            multiline
            rows={1}
            className={classnames("", {
              invalid: errors.location
            })}
          />
          <p className="red-text">{errors.location}</p>
        </div>
        <div className="farmer-div">
          <FormControl component="fieldset">
            <FormLabel component="legend">Farmer</FormLabel>
            <RadioGroup
              aria-label="farmer"
              id="farmer"
              value={this.state.farmer}
              onChange={this.onRadioChange}
              error={errors.farmer}
              style={{ "flex-direction": "row" }}
              className={classnames("", {
                invalid: errors.farmer
              })}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <p className="red-text">{errors.farmer}</p>
        </div>
        {this.state.farmer === "Yes" &&
          <p>Highlight up to two images for users to look through!</p>
        }
        <div className="extra">
          {this.state.farmer === "Yes" &&
            <div className="highlight-photo">
              <label className="photo-style">
                <input
                  style={{ display: "none" }}
                  onChange={this.fileChangeHighlight}
                  error={errors.photo}
                  type='file'
                  name='highlight1'
                  id="highlight1"
                  className={classnames("", {
                    invalid: errors.photo
                  })}
                />
                <Fab
                  color="default"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon />
                </Fab>
              </label>
            </div>
          }
          {this.state.farmer === "Yes" &&
            <div className="highlight-photo">
              <label className="photo-style">
                <input
                  style={{ display: "none" }}
                  onChange={this.fileChangeHighlight2}
                  error={errors.photo}
                  type='file'
                  name='highlight2'
                  id="highlight2"
                  className={classnames("", {
                    invalid: errors.photo
                  })}
                />
                <Fab
                  color="default"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                >
                  <AddIcon />
                </Fab>
              </label>
            </div>
          }
        </div>
        <Button type="submit" variant="outlined" className="button-color">
          Create Post
        </Button>
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