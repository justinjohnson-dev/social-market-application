import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";


import './TextInput.css';
    
class TextInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            errors: {}
        }
    }

    //set state to value at id
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    //send message function
    sendMessage = (e) => {
        e.preventDefault();

        //sends message defined in state and set message to an empty string to clear input
        this.props.sendMessage(this.state.message);
        this.setState({message: ''})
        
    };
    
    render() {
        return (
            <div className="textInputForm">
                <input className="textMessageInput"
                type="text"
                id="message"
                placeholder="..."
                value={this.state.message}
                onChange={this.onChange}
                onKeyDown={event => {
                    event.key === 'Enter' &&  this.sendMessage(event) }
                }
                />
                <button className="sendInputButton" onClick={e => this.sendMessage(e)}>Send</button>
            </div>    
        );        
    }
}

TextInput.propTypes = {    
    auth: PropTypes.object.isRequired,
};
    
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    
});
    
export default connect(
    mapStateToProps,
    { }
)(TextInput);