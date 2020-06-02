import React, { Component } from "react";

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
            zIndex: this.props.points,
            position: "absolute",
            display: this.state.display,
          }}
        >
          <h2 style = {{color: "white",width: "800px", height: "300px", background: "blue",}}>{this.props.question}</h2>
          <button
            style={{ cursor: "pointer", width: "200px", height: "100px" }}
            onClick={this.hide}
          >
            Next Question
          </button>
        </div>
      </div>
    );
  }
}
