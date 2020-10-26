import React, { Component } from "react";
import ReactDOM from "react-dom";
import AddIcon from "@material-ui/icons/Add";
import { Fab, Button } from "@material-ui/core";


class tester extends Component {
    render() {
        return (
            <div className="App">
                <label htmlFor="upload-photo">
                    <input
                        style={{ display: "none" }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                    />
                    <Fab
                        color="secondary"
                        size="small"
                        component="span"
                        aria-label="add"
                        variant="extended"
                    >
                        <AddIcon /> Upload photo
              </Fab>
                    <br />
                    <br />
                    <Fab color="primary" size="small" component="span" aria-label="add">
                        <AddIcon />
                    </Fab>
                    <br />
                    <br />
                    <Button color="secondary" variant="contained" component="span">
                        Upload button
              </Button>{" "}
                </label>
            </div>
        );
    }
}

export default tester;
