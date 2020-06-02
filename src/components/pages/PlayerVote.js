import React, { Component } from "react";
import VoteItem from "../VoteItem";

export default class Vote extends Component {
    //Takes in player and vote and updates the vote atttribute of the player
  updateVotes = (player, vote) => {
    for (let i = 0; i < this.props.players.length; i++) {
      if (player === this.props.players[i].name) this.props.players[i].vote = vote;
    }
    console.log(this.props.players);
  };

  finish = () => {
    this.props.update(this.props.players);
    this.props.changePage("playerReveal");
  }

  render() {
    //Maps each player to a voting screen, allowing the player to
    //for who they think is out of the loop:
    return (
      <div>
        {this.props.players.map((player) => (
          <VoteItem
            key={player.name}
            player={player}
            players={this.props.players}
            updateVotes={this.updateVotes}
          />
        ))}
        <button onClick = {this.finish}>Click Me Now</button>
      </div>
    );
  }
}
