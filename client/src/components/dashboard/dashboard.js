import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import { Fab} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import GetPost from './fetchPostFarmer'
import GetLikedPost from './fetchLIkedPosts'
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "100px"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    minHeight:"250px"
  },
  image: {
    width: 128,
    height: 128
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
  },
  formContent: {
    textAlign: "left",
    fontSize: "18px",
    marginBottom: "50px"
  }
}));

function ComplexGrid(props) {
  const classes = useStyles();

  const { user } = props.auth;
  const [profileImage,setProfileImage] =useState(null)
  const [preview,setPreview] =useState(`/api/users/user/photo/${user.id}`)
  const [loader,setLoader] = useState(false)
  
  const fileChange = e => {
   // this.setState({
    //  photo: e.target.files[0]
    ////});
   setProfileImage(e.target.files[0]) 
   setPreview(URL.createObjectURL(e.target.files[0]))
   //readURL(e.target.files[0])
  }

 const onSubmit = async  e => {
    e.preventDefault();
    // create form as we are using the formidable package on backend
    let formData = new FormData();
    formData.append('photo',profileImage);
    setLoader(true)
   await axios
    .post("/api/users/updateProfile/"+user.id,formData)
    .catch(err =>
       alert('something went wrong')
    );
    setPreview(`/api/users/user/photo/${user.id}`)
    setLoader(false)
    
    // add data from state to form   
  };
 
  return (
   
    <div>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item md={4}>

            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="140"
                  image={preview||"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}

                />
                <CardActions>
                  
              
                <label className="photo-style">
                <input
                  style={{ display: "none" }}
                  onChange={fileChange}
                  //error={errors.photo}
                  type='file'
                  name='highlight2'
                  id="highlight2"
                  //className={classnames("", {
                   // invalid: errors.photo
                 // })}
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
                
      
               </CardActions>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item md={8} sm container>
            <Grid item xs container direction="column" spacing={2}>

              <Grid item xs>
                <div className={classes.formContent}>
                  <div>
                    User Profile
               </div>
                
                  <div>
                    <label>  Name: {user.name} </label>
                  </div>
                  <div>
                    <label> Email: {user.email} </label>
                  </div>
                  <div>
                    <label>
                      Farmer:
                       <RadioGroup aria-label="farmer" name="notfarmer" > 
        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
        
      </RadioGroup>
                  </label>
                  
                  </div>

                </div>
                <Button variant="contained" color="primary" onClick={onSubmit} >
                {loader? "...":"Upload"} 
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
     
         
      </Paper>
   
    </div>
    <div className={classes.root}>
   <GetLikedPost/>
  </div>
   <div className={classes.root}>
              
               <GetPost />       
  </div>
  
</div>
  );
}
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(ComplexGrid);