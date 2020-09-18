import React from 'react';
import './home.css';

class Home extends React.Component {
    render() {
        return(
            <div className="home-page">
                <h1>HomeGrown</h1>
                <h2 className="override-main-div">Hi, this is a test home page</h2>
            </div>
        );
    }   
}

export default Home;