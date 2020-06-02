import React, { Component } from "react";

export default class AnswerVote extends Component {
    state = {
        selectValue: this.props.answers[0],
        display: "block",
      };
      //Update category as we change select picker
      onChange = (e) => {
        this.setState({ selectValue: e.target.value });
      };
    
      //Pase this value back to App.js upon submission
      onSubmit = (e) => {
        e.preventDefault();
        console.log("this: ",this.state.selectValue)
        this.props.submitAnswer(this.state.selectValue);
        this.props.changePage("answerReveal");
        this.setState({ display: "none" });
      };
  render() {
    return (
      <div>
        <h1>{this.props.players[this.props.index].name} vote for your answer:</h1>
        <form id="answer" onSubmit={this.onSubmit}>
          <select
            value={this.state.value}
            name="selectpicker"
            onChange={this.onChange}
          >
            {
              this.props.answers
            .map((answer) => (
              <option name= {answer} value={answer}>
                {answer}
              </option>
            ))}
          </select>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
