import React, { Component } from "react";
import propTypes from "prop-types";
import QuestionItem from "../QuestionItem";
import styles from "./css/question.module.css";
import Button from "../button";
import Header from "../header";

export default class Question extends Component {
    finish = () => {
        this.props.changePage("playerVote");
      };
  render() {
    return (
      <div>
        <Header><h1>Question Time</h1></Header>
        {this.props.questions.map((question) => (
          <QuestionItem question={question} />
        ))}
        <Button className = {styles.button} onClick={this.finish}>Click me</Button>
      </div>
    );
  }
}

Question.propTypes = {
  questions: propTypes.array.isRequired,
};
