import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Avatar, Grid, Box } from "@material-ui/core";
import Typed from 'react-typed';


// CSS Styles
const useStyles = makeStyles(theme => ({

    title: {
        textAlign: "top",
        color: "#E9BD5E"
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
            <button onSubmit={createPost()} className="btn btn-small waves-effect waves-light hoverable dark-green accent-3">Create Post</button>

        </Box>


    );
};

export default Header;
