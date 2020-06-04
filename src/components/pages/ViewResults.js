import React, { Component } from "react";
import Button from "../button";
import Header from "../header";
import styles from "./css/results.module.css";

export default class ViewResults extends Component {
  finish = () => {
    this.props.reset();
    this.props.changePage("cat");
  };
  render() {
    return (
      <div>
        <Header>
          <h1>Results:</h1>
        </Header>
        <div className={styles.wrapper}>
          {this.props.players.map((player) => (
            <p>
              {player.name} got <span className = {styles.points}>{player.currentPoints}</span> points this round
              for a total of <span className = {styles.points}>{player.points}</span>
            </p>
          ))}
        </div>
        <Button className = {styles.submit} onClick={this.finish}>Next Round</Button>
      </div>
    );
  }
}
