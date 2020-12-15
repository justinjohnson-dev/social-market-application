import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GetPost from './fetchPostFarmer'
import GetLikedPost from './fetchLIkedPosts'
import {favorite_border, create} from "@material-ui/icons";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper, 
    
    
  },
}));


export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} > 
      
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
          
        
          <Tab label="Liked Posts" {...a11yProps(0)} />
          <span class="material-icons">
            favorite_border
          </span>
          <Tab label="Your Posts" {...a11yProps(1)} />
          <span class="material-icons">
            create
          </span>
        </Tabs>
      
      <TabPanel value={value} index={0}>
       <GetLikedPost/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GetPost/>
      </TabPanel>
   
    </div>
    
  );
}
