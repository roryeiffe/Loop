import React, { Component } from "react";
import RevealItem from "../RevealItem";
import propTypes from "prop-types";
import styles from "./css/reveal.module.css";
import Button from "../button";

export default class Reveal extends Component {
  finish = () => {
    this.props.changePage("questions");
  };
  render() {
    return (
      <div>
        {this.props.players.map((player) => (
          <RevealItem
            name={player.name}
            answer={player.answer}
            points={player.points}
            key={player.id}
          />
        ))}
        <Button className = {styles.button} onClick={this.finish}>Ask Questions</Button>
      </div>
    );
  }
}

Reveal.propTypes = {
  players: propTypes.array.isRequired,
};
