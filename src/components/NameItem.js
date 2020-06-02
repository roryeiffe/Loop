import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from "./pages/css/nameItem.module.css"

// This component is used to display the name item:
export default class NameItem extends Component {
    render() {
        const name = this.props.name;
        return (
            <div>
                <button className = {styles.name} onClick = {this.props.delName.bind(this, name)}>{name}</button>
            </div>
        )
    }
}

NameItem.propTypes = {
    name: PropTypes.string.isRequired,
    delName: PropTypes.func.isRequired,
}
