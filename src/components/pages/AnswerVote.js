import React, { Component } from "react";
import Button from "../button";
import styles from "./css/answerVote.module.css";
import Header from "../header";

export default class AnswerVote extends Component {
  state = {
    selectValue: "",
    display: "block",
  };
  //Update category as we change select picker
  onChange = (e) => {
    this.setState({ selectValue: e });
  };

  //Pase this value back to App.js upon submission
  onSubmit = () => {
    if (this.state.selectValue !== "") {
      this.props.submitAnswer(this.state.selectValue);
      this.props.changePage("answerReveal");
      this.setState({ display: "none" });
    }
  };
  render() {
    return (
      <div>
        <h1>
          <Header>
            <h3>Answer Vote</h3>
          </Header>
        </h1>
        <div className={styles.wrapper}>
          <h1 className={styles.header}>
            {this.props.players[this.props.index].name} votes for {this.state.selectValue}
          </h1>
          {this.props.answers.map((answer) => (
            <Button
              className={styles.choice}
              onClick={this.onChange.bind(this, answer)}
            >
              {answer}
            </Button>
          ))}
          <Button onClick = {this.onSubmit} className={styles.submit}>Submit</Button>
        </div>
      </div>
    );
  }
}
