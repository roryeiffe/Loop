import React, { Component } from 'react'

export default class AnswerReveal extends Component {
    finish = () => {
        this.props.changePage("viewResults");
        this.props.assign_scores();
    }
    render() {
        return (
            <div>
                <h1>{this.props.player.name} voted for {this.props.player.vote} but the real answer is {this.props.answer}</h1>
                <button onClick = {this.finish}>See scores:</button>
            </div>
        )
    }
}
