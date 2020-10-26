import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MobileRightMenuSlider from "@material-ui/core/Drawer";
import {
    AppBar,
    Toolbar,
    ListItem,
    IconButton,
    ListItemText,
    ListItemIcon,
    Avatar,
    Grid,
    Divider,
    List,
    Typography,
    Box
} from "@material-ui/core";
import {
    ArrowBack,
    PersonAdd,
    Home,
    Lock,
    Chat
} from "@material-ui/icons";
import { Link } from "react-router-dom";

//CSS Styles
const useStyles = makeStyles(theme => ({
    menuSliderContainer: {
        width: 250,
        background: "whitesmoke",
        height: "100%"
    },
    avatar: {
        display: "block",
        margin: "0.5rem auto",
        width: theme.spacing(13),
        height: theme.spacing(13)
    },
    listItem: {
        color: "#679459"

    }
}));

const menuItems = [
    {
        listIcon: <Home />,
        listText: "Home",
        listPath: "/"
    },
    {
        listIcon: <PersonAdd />,
        listText: "SignUp",
        listPath: "/signup"
    },
    {
        listIcon: <Lock />,
        listText: "SignIn",
        listPath: "/signin"
    },
    {
        listIcon: <Chat />,
        listText: "Chat Room",
        listPath: "/chat"
    }

]

const Navbar = () => {
    const [state, setState] = useState({
        left: false
    })

    const toggleSlider = (slider, open) => () => {
        setState({ ...state, [slider]: open });
    }
    const classes = useStyles();

    const sideList = slider => (
        <Box className={classes.menuSliderContainer} component="div"
            onClick={toggleSlider(slider, false)}>

            <i class="fas fa-carrot carrot-override"></i>
            <Divider />
            <List>
                {menuItems.map((lsItem, key) => (

                    <ListItem button key={key} component={Link} to={lsItem.listPath}>
                        <ListItemIcon className={classes.listItem}>
                            {lsItem.listIcon}

                        </ListItemIcon>
                        <ListItemText className={classes.listItem} primary={lsItem.listText} />
                    </ListItem>
                ))}
            </List>
        </Box>
    )
    return (
        <>
            <Box component="nav">
                <AppBar position="static" style={{ background: "#679459" }}>
                    <Toolbar>
                        <IconButton onClick={toggleSlider("left", true)}>
                            <ArrowBack style={{ color: "#222" }} />
                            <i class="fas fa-carrot"></i>
                        </IconButton>


                        <MobileRightMenuSlider
                            anchor="left"
                            open={state.left}
                        >
                            {sideList("left")}

                        </MobileRightMenuSlider>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;