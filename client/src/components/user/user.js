import React, { Component } from 'react';
import axios from 'axios';
import './user.css';

class User extends Component {
  constructor() {
    super();
    this.state = {
      name: ''
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    // get our form data out of state
    const { name } = this.state;

    axios.post('http://localhost:5000/api/name', { name })
      .then((result) => {
        //access the results here....
      });
  }

  render() {
    const { name } = this.state;
    return (
        <div className="form-style">
            <form onSubmit={this.onSubmit} className="mb-3">
                <h3> Send a name to mongodb </h3>
                <div className="form-group">
                    <label className="btn btn-secondary">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={this.onChange}
                        />
                    </label>
                </div>
                <button className="send-button">
                    <span>Send name!</span>
                </button>
            </form>
        </div>
    );
  }
}

export default User;