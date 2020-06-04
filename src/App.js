import React, { Component } from "react";
import Names from "./components/Names";
import AddName from "./components/AddName";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Category from "./components/pages/Category";
import Reveal from "./components/pages/Reveal";
import Question from "./components/pages/Question";
import PlayerVote from "./components/pages/PlayerVote";
import PlayerReveal from "./components/pages/PlayerReveal";
import AnswerVote from "./components/pages/AnswerVote";
import AnswerReveal from "./components/pages/AnswerReveal";
import ViewResults from "./components/pages/ViewResults";
import Circles from "./components/Circles";
import Button from "./components/button";
import Header from "./components/header";
import { v4 as uuidv4 } from 'uuid';

import styles from "./components/pages/css/app.module.css";

// Might be terribly inefficient, but import all potential answers and questions to begin with.
import foodData from "./data/food.json";
import foodQuestionsData from "./data/food_questions.json";
import animalData from "./data/animals.json";
import animalQuestionsData from "./data/animals_questions.json";
import locationsData from "./data/locations.json";
import locationsQuestionsData from "./data/locations_questions.json";
import playersQuestionsData from "./data/players_questions.json";

class App extends Component {
  state = {
    // Players is an array containing the information for each
    // participant including name, number of total points, number
    // of points for the current round, current vote, and number of
    // people who voted for that player
    players: [
      {
        name: "Rory",
        points: 0,
        currentPoints: 0,
        answer: "",
        vote: "",
        count: 0,
      },
      {
        name: "Jack",
        points: 0,
        currentPoints: 0,
        answer: "",
        vote: "",
        count: 0,
      },
      {
        name: "Zach",
        points: 0,
        currentPoints: 0,
        answer: "",
        vote: "",
        count: 0,
      },
    ],
    // Whether or not enough players are in the game (3 or more)
    enough: true,
    // Defines which stage of the game the players are currently on
    page: "viewResults",
    // Which category is picked:
    category: "",
    // The complete bank of answers and the answers used in the current round, respectively:
    answer_bank: [],
    answers: ["dfdsa", "Fvdssfa", "FDasfa", "Ddsf", "Ddsaa", "dvfds"],
    // The correct answer:
    answer: "",
    // Index value of which player is out of the loop:
    out_of_loop_index: -1,
    // Bank of questions and questions used in the current round, respectively:
    question_bank: [],
    questions: [],
  };

  // Delete name that you don't want to use by filtering out the names that
  // equals the name to be deleted:
  delName = (nameDel) => {
    this.setState({
      players: [
        ...this.state.players.filter((player) => player.name !== nameDel),
      ],
    });
    // If we don't have enough players, don't let the game start.
    /*There is a weird bug here that if there are 3 players and 1 is deleted, the play button 
    still appears (it should be deleted, as 2 people is not enough to play the game. The easy
    fix is to just change the number to 4. It seems to work fine but it might be source of error
    in a future corner case...*/
    if (this.state.players.length < 4) this.setState({ enough: false });
  };

  // Add Name
  addName = (title) => {
    let found = false;
    var nameList = this.state.players;
    // Cannot add duplicates:
    for (var i = 0; i < nameList.length; i++) {
      if (title === nameList[i].name) found = true;
    }
    var newPlayer = {
      name: title,
      points: 0,
      answer: "new answer",
    };
    // Push new player
    if (!found && title !== "" && this.state.players.length < 8) nameList.push(newPlayer);
    this.setState({ names: nameList });
    // If we have enough (3) players, allow game to start
    if (nameList.length >= 3) this.setState({ enough: true });
  };

  // Whenever we want to display a new page, we change the page state:
  changePage = (newPage) => {
    this.setState({ page: newPage });
  };

  // Converts json of answers/questions and returns array of respective string values:
  jsonToText = (data) => {
    let result = data.map((item, index) => {
      return item.title;
    });
    return result;
  };

  // Takes chosen category from Category submission and assigns it to state value:
  // Then assigns questions and answers from data files to question_bank and answer_bank
  // state values:
  pickCat = async (cat) => {
    this.setState({ category: cat });
    let answers;
    let questions;
    // Use the correct imported data, based on what was chosen in the
    // category picker:
    if (cat === "food") {
      answers = foodData;
      questions = foodQuestionsData;
    } else if (cat === "animals") {
      answers = animalData;
      questions = animalQuestionsData;
    } else if (cat === "locations") {
      answers = locationsData;
      questions = locationsQuestionsData;
    } else if (cat === "players") {
      answers = this.state.players.map((item) => {
        return item.name;
      });
      questions = playersQuestionsData;
    }
    // Convert answers and questions to text and remove white space:
    let answer_bank;
    // Any category except players takes answers from json files
    if (cat !== "players")
      answer_bank = await this.remove_white_space(this.jsonToText(answers));
    // Players answers is just the name of the players:
    else answer_bank = answers;
    // Retrieve questions from json files:
    let question_bank = await this.remove_white_space(
      this.jsonToText(questions)
    );
    // Update state:
    this.setState({ answer_bank: answer_bank });
    this.setState({ question_bank: question_bank });
    // Get answers and questions from respective functions:
    // Note: This return values isn't used, it is just used
    // to make the await keyword possible:
    answers = await this.getAnswers();
    this.getQuestions();
    // Initialize players with answer and point values:
    let passed = this.init_players();
    if (!passed) console.log("Players not properly instantiated");
    // Change to page where answers are revealed:
    this.changePage("reveal");
  };

  // Obtains a number-length subset of random elements taken from L:
  get_subset = (L, number) => {
    let subset = [];
    while (subset.length < number) {
      let index = Math.floor(Math.random() * L.length);
      let choice = L[index];
      if (choice !== "") subset.push(choice);
      L[index] = "";
    }
    return subset;
  };

  // Takes a list of items and trims them of white space.
  remove_white_space = (L) => {
    for (let i = 0; i < L.length; i++) L[i] = L[i].trim();
    return L;
  };

  //This function takes the state values and uses it to update the players state
  //attribute, ex: points = 0, answer = "apple"
  init_players = () => {
    let playersTemp = this.state.players;
    // Pick random index:
    let out_of_loop_index = Math.floor(
      Math.random() * this.state.players.length
    );
    this.setState({ out_of_loop_index: out_of_loop_index });
    // For each player, either make them out of the loop, or
    // give them the answer:
    for (let i = 0; i < this.state.players.length; i++) {
      if (i === this.state.out_of_loop_index) {
        playersTemp[i].answer = "You are out of the loop!";
        playersTemp[i].inloop = false;
      } else {
        playersTemp[i].answer = this.state.answer;
        playersTemp[i].inloop = true;
      }
      // All players start with 0 points:
      playersTemp[i].currentPoints = 0;
      playersTemp[i].count = 0;
      playersTemp[i].id = uuidv4();
    }
    // Update the state:
    this.setState({ players: playersTemp });
    return true;
  };

  // From answer bank, pick THE answer and initializes state values accordingly:
  getAnswers = async () => {
    // Initialize list of answers to use:
    let answers;
    if (this.state.category === "players") {
      answers = this.state.answer_bank;
    } else {
      answers = this.get_subset(this.state.answer_bank, 6);
    }
    // Pick a random answer:
    let answer = await answers[Math.floor(Math.random() * answers.length)];
    // Update state:
    this.setState({ answer: answer });
    this.setState({ answers: answers });
    return answers;
  };

  // This function reads in questions from input files based on what the category is
  // It then formulates the question in the form {player} ask {player}: {question}
  getQuestions = () => {
    // Obtains as many questions as there are players:
    let questions = this.get_subset(
      this.state.question_bank,
      this.state.players.length
    );
    // Obtain pairs of players:
    let pairs = this.get_pairs();
    // Keep trying pairs until a valid set is reached:
    while (!this.check_pairs(pairs)) pairs = this.get_pairs();
    // Concatenate pairs of players with questions:
    for (let i = 0; i < this.state.players.length; i++) {
      questions[i] =
        pairs[i].first + " ask " + pairs[i].second + ": " + questions[i];
    }
    // Update question state:
    this.setState({ questions: questions });
    return questions;
  };

  // Randomly creates pairs of askers to askees. Returns a list of pair objects where
  // the first item is the name of the asker and the second item is the name of the askee:
  get_pairs = () => {
    let askers = [];
    let askees = [];
    // Fill up askers and askees with random, unique numbers from 0 to number of players
    // ex: a askers = [3,2,4,0,1], askees = [1,3,2,4,0]
    while (askers.length < this.state.players.length) {
      let rand_num = Math.floor(
        Math.random() * Math.floor(this.state.players.length)
      );
      if (!askers.includes(rand_num)) askers.push(rand_num);
    }
    while (askees.length < this.state.players.length) {
      let rand_num = Math.floor(
        Math.random() * Math.floor(this.state.players.length)
      );
      if (!askees.includes(rand_num)) askees.push(rand_num);
    }
    let pairs = [];
    // Then, make pairs, based on the randomized indices
    for (let i = 0; i < this.state.players.length; i++) {
      var pair = {
        first: this.state.players[askers[i]].name,
        second: this.state.players[askees[i]].name,
      };
      pairs.push(pair);
    }
    return pairs;
  };

  // Returns true if there does not exist a pair of the same name repeating:
  // eg: Rory ask Rory
  check_pairs = (pairs) => {
    for (let i = 0; i < pairs.length; i++) {
      if (pairs[i].first === pairs[i].second) return false;
    }
    return true;
  };

  // Given a list of players with updated votes, set the state of
  // player with the new votes:
  updateVotes = (players) => {
    this.setState({ players: players });
  };

  // After the out of the loop players votes for the answer,
  // update their vote attribute in this.state:
  submitAnswer = (vote) => {
    let players = this.state.players;
    players[this.state.out_of_loop_index].vote = vote;
    this.setState({ players: players });
  };

  // Based on votes, assign points:
  assign_scores = () => {
    // Keeps track of how many inner loopers correctly guessed
    // who was out of the loop.
    let players = this.state.players;
    let numright = 0;
    for (let i = 0; i < players.length; i++) {
      if (players[i].inloop) {
        // Counts how many inner loops guessed correctly, each correct player
        // receives 25 points:
        if (players[i].vote === players[this.state.out_of_loop_index].name) {
          players[i].currentPoints += 25;
          numright++;
        }
      } else {
        // If out of loop gets it right, award 125 points:
        if (players[i].vote === this.state.answer) {
          players[i].currentPoints += 125;
        }
      }
    }
    // Loop through and award inner loops for guessing the out-of-looper correctly:
    if (numright > players.length / 2) {
      for (let i = 0; i < players.length; i++) {
        if (players[i].inloop) players[i].currentPoints += 100;
      }
    }
    // Reward out of looper for getting caught.
    else {
      players[this.state.out_of_loop_index].currentPoints += 50;
    }
    for (let i = 0; i < players.length; i++) {
      players[i].points += players[i].currentPoints;
    }
    this.setState({ players: players });
  };

  // At the start of the next round, reset some parameters:
  // ex: current points, votes, out of loop index:
  reset = () => {
    this.setState({ out_of_loop_index: -1 });
    this.setState({ category: "" });
    this.setState({ answer_bank: [] });
    this.setState({ answer: "" });
    this.setState({ question_bank: [] });
    this.setState({ questionws: [] });
    let players = this.state.players;
    for (let i = 0; i < players.length; i++) {
      players[i].currentPoints = 0;
      players[i].vote = "";
      players[i].answer = "";
      players[i].count = 0;
    }
  };

  render() {
    // Render the page:
    // Everything from the app is actually rendered on this page. the way we keep
    // only one set of information on one page is using the state property "page". (ex: if page
    // is set to "cat", the category selection page will be displayed and nothing else.)
    return (
      <div>
        <Router>
          <Route
            exact
            path="/"
            render={(props) => (
              <div className={styles.page}>
                <Circles className = {styles.circles}></Circles>
                {this.state.page === "start" && (
                  <div className={styles.above}>
                    <Header className = {styles.header}>
                      <h1>Enter Player Names:</h1>
                      <h3>(Tap to Delete)</h3>
                    </Header>
                    <Names
                      players={this.state.players}
                      delName={this.delName}
                    />
                    <AddName addName={this.addName} />
                  </div>
                )}
                {this.state.enough && this.state.page === "start" && (
                  <Button className = {styles.play} onClick={this.changePage.bind(this, "cat")}>
                    Play
                  </Button>
                )}

                {this.state.page === "cat" && (
                  <Category
                    players={this.state.players}
                    pickCat={this.pickCat}
                  />
                )}
                {this.state.page === "reveal" && (
                  <div>
                    <Reveal
                      players={this.state.players}
                      questions={this.state.questions}
                      answers={this.state.answers}
                      changePage={this.changePage}
                    ></Reveal>
                  </div>
                )}
                {this.state.page === "questions" && (
                  <div>
                    <Question
                      questions={this.state.questions}
                      changePage={this.changePage}
                    ></Question>
                  </div>
                )}
                {this.state.page === "playerVote" && (
                  <PlayerVote
                    players={this.state.players}
                    update={this.updateVotes}
                    changePage={this.changePage}
                  ></PlayerVote>
                )}
                {this.state.page === "playerReveal" && (
                  <PlayerReveal
                    players={this.state.players}
                    changePage={this.changePage}
                  ></PlayerReveal>
                )}
                {this.state.page === "answerVote" && (
                  <AnswerVote
                    players={this.state.players}
                    changePage={this.changePage}
                    submitAnswer={this.submitAnswer}
                    index={this.state.out_of_loop_index}
                    answers={this.state.answers}
                  />
                )}
                {this.state.page === "answerReveal" && (
                  <AnswerReveal
                    player={this.state.players[this.state.out_of_loop_index]}
                    changePage={this.changePage}
                    assign_scores={this.assign_scores}
                    answer={this.state.answer}
                  ></AnswerReveal>
                )}
                {this.state.page === "viewResults" && (
                  <ViewResults
                    players={this.state.players}
                    reset={this.reset}
                    changePage={this.changePage}
                  ></ViewResults>
                )}
              </div>
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
