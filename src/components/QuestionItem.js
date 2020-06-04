import React, { Component } from "react";
import Button from "./button";
import styles from "./pages/css/questionItem.module.css";

export default class QuestionItem extends Component {
  state = {
    display: "block",
    showQuestion: false,
  };

  hide = () => {
    this.setState({ display: "none" });
    console.log(this.state.display);
  };

  showQuestion = () => {
    this.setState({ showQuestion: true });
  };
  render() {
    return (
      <div>
        <div
          style={{
            display: this.state.display,
          }}
          className={styles.wrapper}
        >
          <h2>{this.props.question}</h2>
          <Button className={styles.button} onClick={this.hide}>
            Next Question
          </Button>
        </div>
      </div>
    );
  }
}
