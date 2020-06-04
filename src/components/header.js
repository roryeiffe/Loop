import React, { Component } from 'react'
import styles from "./pages/css/header.module.css";

export default class header extends Component {
    render() {
        return (
            <div className = {[styles.header,this.props.className].join(" ")}>
                {this.props.children}
            </div>
        )
    }
}
