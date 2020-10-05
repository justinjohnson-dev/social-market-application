import React, { Component } from "react";
import './navigation.css';


class Navigation extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <h4 className="app-name"><i className="fas fa-seedling"></i> Home Grown Social App</h4>
      </div>
    );
  }
}

export default Navigation;