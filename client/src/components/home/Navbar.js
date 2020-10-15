import React, {useState} from 'react';
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
    Divider,
    List,
    Typography,
    Box
} from "@material-ui/core";
import {
    ArrowBack,
    PersonAdd,
    Home,
    Lock
} from "@material-ui/icons";
import avatar from '../avatar.png';

//CSS Styles
const useStyles = makeStyles(theme=>({
    menuSliderContainer: {
        width: 250,
        background: "#E9BD5E",
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
        listIcon: <Home/>,
        listText: "Home"
    },
    {
        listIcon: <PersonAdd/>,
        listText: "SignUp"
    },
    {
        listIcon: <Lock/>,
        listText: "LogIn"
    }
   
]

const Navbar = () => {
    const [state, setState] = useState({
        right: false
    })

    const toggleSlider = (slider, open) => () => {
        setState({...state, [slider]: open});
    }
    const classes = useStyles();

    const sideList = slider => (
<Box className={classes.menuSliderContainer} component="div"
onClick={toggleSlider(slider, false)}>
          <Avatar className={classes.avatar} src={avatar} alt="HomeGrown Logo" />
          <Divider />
          <List>
              {menuItems.map((lsItem, key)=>(

              <ListItem button key>
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
            <AppBar position="static" style={{background: "#679459"}}>
            <Toolbar>
                <IconButton onClick={toggleSlider("right", true)}>
                <ArrowBack style={{color: "#222"}} />
                </IconButton>
                <Typography variant="h5" style={{color: "#F3E2C0"}}>Welcome To HomeGrown</Typography>
                <MobileRightMenuSlider
                anchor="right"
                open={state.right}
                >
                    {sideList("right")}

                </MobileRightMenuSlider>
            </Toolbar>
        </AppBar>
    </Box> 
    </>
);
};

export default Navbar;