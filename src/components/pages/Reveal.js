import React, { Component } from "react";
import RevealItem from "../RevealItem";
import propTypes from "prop-types";

export default class Reveal extends Component {
  finish = () => {
    this.props.changePage("questions");
  };
  render() {
    return (
      <div>
        {this.props.players.map((player) => (
          <RevealItem
            key={player.name}
            name={player.name}
            answer={player.answer}
            points={player.points}
          />
        ))}
        <button onClick={this.finish}>Click me</button>
      </div>
    );
  }
}

Reveal.propTypes = {
  players: propTypes.array.isRequired,
};
