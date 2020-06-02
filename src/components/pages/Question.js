import React, { Component } from "react";
import propTypes from "prop-types";
import QuestionItem from "../QuestionItem";

export default class Question extends Component {
    finish = () => {
        this.props.changePage("playerVote");
      };
  render() {
    return (
      <div>
        {this.props.questions.map((question) => (
          <QuestionItem question={question} />
        ))}
        <button onClick={this.finish}>Click me</button>
      </div>
    );
  }
}

Question.propTypes = {
  questions: propTypes.array.isRequired,
};
