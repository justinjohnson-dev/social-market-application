import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import Typed from 'react-typed';
import './header.css'

// CSS Styles
const useStyles = makeStyles(theme => ({

    title: {
        textAlign: "top",
        color: "#679459"
    },
    subtitle: {
        textAlign: "top",
        color: "tomato",
        marginBottom: "1rem"
    },
    typedContainer: {
        position: "absolute",
        top: "18%",
        left: "5%",
        width: "20vw",
        textAlign: "right",
        zIndex: 1
    }

}));

const Header = () => {

    // checking if we have a token to display users name
    const checkToken = () => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    const classes = useStyles()
    return (
        <Box className={classes.typedContainer}>
            <Typography className={classes.title} variant="h5">
                <Typed strings={["Home Grown Social App"]} typeSpeed={40} />
            </Typography>
            <Typography className={classes.subtitle} variant="h6">
                <Typed
                    strings={["Discover Local Farms", "Shop From Farmers", "Favorite Local Finds"]}
                    typeSpeed={30}
                    backSpeed={60}
                    loop
                />
            </Typography>
            {checkToken() === true &&
                <div>
                    <Link className="btn btn-small button-color" to="/post">Create New Post</Link>
                </div>
            }
        </Box>


    );
};

Header.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Header);
