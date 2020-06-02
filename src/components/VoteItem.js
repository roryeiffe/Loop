import React, { Component } from "react";
import propTypes from "prop-types";

export default class VoteItem extends Component {
  state = {
    selectValue: [
      ...this.props.players.filter(
        (player_) => player_.name !== this.props.player.name
      ),
    ][0].name,
    display: "block",
  };
  //Update category as we change select picker
  onChange = (e) => {
    this.setState({ selectValue: e.target.value });
  };

  //Pase this value back to App.js upon submission
  onSubmit = (e) => {
    e.preventDefault();
    this.props.updateVotes(this.props.player.name, this.state.selectValue);
    this.setState({ display: "none" });
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            position: "absolute",
            background: "white",
            display: this.state.display,
            width: "500px",
          }}
        >
          <h1>{this.props.player.name} vote:</h1>
          <form id="player" onSubmit={this.onSubmit}>
            <select
              value={this.state.value}
              name="selectpicker"
              onChange={this.onChange}
            >
              {[
                ...this.props.players.filter(
                  (player_) => player_.name !== this.props.player.name
                ),
              ].map((player) => (
                <option name={player.name} value={player.name}>
                  {player.name}
                </option>
              ))}
            </select>
            <button>Submit</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

VoteItem.propTypes = {
  players: propTypes.array.isRequired,
  player: propTypes.object.isRequired,
  updateVotes: propTypes.func.isRequired,
};
