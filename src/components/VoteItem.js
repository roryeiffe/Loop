import React, { Component } from "react";
import propTypes from "prop-types";
import Button from "./button";
import styles from "./pages/css/voteItem.module.css";

export default class VoteItem extends Component {
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
    if(this.state.selectValue !== "") {
      this.props.updateVotes(this.props.player.name, this.state.selectValue);
      this.setState({ display: "none" });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: this.state.display,
          }}
          className = {styles.wrapper}
        >
          <h1 className = {styles.header}>{this.props.player.name} votes for {this.state.selectValue}</h1>
          <div>
            {[
              ...this.props.players.filter(
                (player_) => player_.name !== this.props.player.name
              ),
            ].map((player) => (
              <Button className = {styles.choice} onClick={this.onChange.bind(this,player.name)}>{player.name}</Button>
            ))}
            <Button className = {styles.submit} onClick={this.onSubmit}>Submit</Button>
          </div>
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
