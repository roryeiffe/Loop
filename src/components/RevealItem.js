import React, { Component } from 'react'
import propTypes from "prop-types"

export default class RevealItem extends Component {
    state = {
        display: "block",
        showAnswer: false,
    }

    hide = () => {
        this.setState({display: "none"});
    }

    showAnswer = () => {
        this.setState({showAnswer:true});
    }

    render() {
        return (
             <div style = {{zIndex: this.props.points,
                position: "absolute",
                background: "white",
                display: this.state.display,}}>
                <h1>Name: {this.props.name}</h1>
                {this.state.showAnswer && <h2>Answer: {this.props.answer}</h2> }
                <button style = {{cursor: "pointer", width: "200px", height: "100px"}} onClick = {this.showAnswer}>View answer</button>
                <button style = {{cursor: "pointer", width: "200px", height: "100px",}} onClick = {this.hide}>Next Person</button>
            </div>
        )
    }
}

RevealItem.propTypes = {
    answer : propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    points: propTypes.number.isRequired,
    key: propTypes.string.isRequired,
}