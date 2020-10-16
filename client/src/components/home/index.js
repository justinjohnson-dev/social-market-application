import React, { Component } from 'react';
import Navbar from '../navigation/Navbar';
import Header from '../header/Header';
import { render } from '@testing-library/react';
import { Link } from "react-router-dom";
import './home.css';

class Home extends Component {
  render() {
  return (
    <div>
      <Navbar />
      <Header />
    </div>
  );
}};

export default Home;