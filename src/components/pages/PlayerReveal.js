import React, { Component } from "react";

export default class PlayerReveal extends Component {
  state = {
    guess: "",
    actual: "",
  };
  componentDidMount = () => {
    //Initialize count to 0:
    for (let i = 0; i < this.props.players.length; i++) {
      this.props.players[i].count = 0;
      console.log(this.props.players[i]);
    }
    //increment count for every vote a person has:
    for (let i = 0; i < this.props.players.length; i++) {
      this.props.players[this.find(this.props.players, this.props.players[i].vote)].count++;
    }
    //Set state accordingly:
    this.setState({guess: this.guess(this.props.players)});
    this.setState({actual: this.actual(this.props.players)});
}

  //Takes in a list of player objects and a name, returns
  // the index at which the name occurs, -1 not in list:
  find(players, name) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === name) return i;
    }
    console.log(name);
    return -1;
  }

  //Takes in a list of players and returns the player
  //who was the most voted for.
  guess(players){
    //First, find the maximum number of votes:
    let max = 0;
    for(let i = 0; i < players.length; i ++){
      if (players[i].count > max) max = players[i].count;
    }
    //Then, find which player(s) have a cout that equals the max:
    let guess = "";
    for(let i = 0; i < players.length; i ++){
      if(players[i].count === max && guess === ""){
        guess = players[i].name;
      }
      //If a guess was already found, then there was a tie
      else if (players[i].count === max && guess !== ""){
        guess = "It's a tie!";
      }
    }
    return guess;
  }


  //Takes in players and returns player who is out of the loop:
  actual(players) {
    for(let i = 0; i < players.length; i ++){
      if(players[i].inloop === false) return players[i].name;
    }
  }

  //Update the page:
  finish = () => {
    this.props.changePage("answerVote");
  }
  

  render() {
    return (
      <div>
      <div>
        <h1>The majority of players voted for: {this.state.guess}</h1>
        <h1>But who was actually out of the loop?</h1>
        <h1>{this.state.actual}</h1>
        
        <button onClick = {this.finish}>Vote for the answer</button>
      </div>
      </div>
    );
  }
}
