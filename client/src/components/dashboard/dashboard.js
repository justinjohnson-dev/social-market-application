import React, { Component } from "react";
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
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "100px"
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500
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
                  image="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"

                />
                <CardActions>
                  <Button size="small" color="primary">
                    Upload Picture
        </Button>

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
                    <label>  Name:{user.name} </label>
                  </div>
                  <div>
                    <label> Email: {user.email} </label>
                  </div>
                  <div>
                    <label>
                      Farmer:
                  </label>
                  </div>

                </div>
                <Button variant="contained" color="primary" disableElevation>
                  Edit
</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
     
         
      </Paper>
   
    </div>
    <div className={classes.root}>
   <Paper>
    <Grid container>
      <Grid item md={4}>

      </Grid>
      <Grid item md={8}>
      </Grid>
    </Grid>
  </Paper>
  </div>
   <div className={classes.root}>
  <Paper>
    <Grid container>
      <Grid item md={4}>

      </Grid>
      <Grid item md={8}>
      </Grid>
    </Grid>
  </Paper>
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