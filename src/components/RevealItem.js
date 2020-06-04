import React, { Component } from "react";
import propTypes from "prop-types";
import styles from "./pages/css/revealItem.module.css";
import Button from "./button";

export default class RevealItem extends Component {
  state = {
    display: "block",
    showAnswer: false,
  };

  hide = () => {
    this.setState({ display: "none" });
  };

  showAnswer = () => {
    this.setState({ showAnswer: true });
  };

  render() {
    return (
      <div
        className={styles.wrapper}
        style={{ zIndex: this.props.id, display: this.state.display }}
      >
        <h1>{this.props.name}</h1>
        {this.state.showAnswer && <h2>Answer: {this.props.answer}</h2>}
        <Button className = {styles.button} onClick={this.showAnswer}>View answer</Button>
        <Button className = {styles.button} onClick={this.hide}>Next Person</Button>
      </div>
    );
  }
}

RevealItem.propTypes = {
  answer: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  points: propTypes.number.isRequired,
};
