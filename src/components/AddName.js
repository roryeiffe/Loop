import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./pages/css/addName.module.css";
import Button from "./button";

export default class AddName extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addName(this.state.title);
        this.setState({ title: '' });
    }

    onChange = (e) => this.setState({[e.target.name] : e.target.value});

    render() {
        return (
            <form onSubmit = {this.onSubmit}>
                <input
                    type = "text"
                    name = "title"
                    placeholder = "Add Name..."
                    value = {this.state.title}
                    onChange = {this.onChange}
                    className = {styles.input}
                />
                <Button
                    type = "submit"
                    value = "Submit"
                    onClick = {this.onSubmit}
                    className = {styles.submit}
                >
                Submit
                </Button>
            </form>
        )
    }
}

//Prop Types:
AddName.propTypes = {
    addName: PropTypes.func.isRequired
}
