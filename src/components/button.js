import React, { Component } from 'react'
import styles from "./pages/css/button.module.css"

export default class button extends Component {
    render() {
        return (
            <div onClick = {this.props.onClick} className = {[this.props.className,styles.wrapper].join(" ")}>
                <p>{this.props.children}</p>
            </div>
        )
    }
}
