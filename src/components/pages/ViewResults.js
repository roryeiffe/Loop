import React, { Component } from 'react'

export default class ViewResults extends Component {
    finish = () => {
        this.props.reset();
        this.props.changePage("cat");
    }
    render() {
        return (
            <div>
                {this.props.players.map((player) => (
                    <h1>{player.name} got {player.currentPoints} points for a total of {player.points}</h1>
                ))}
                <button onClick = {this.finish}>Next Round</button>
            </div>
        )
    }
}
