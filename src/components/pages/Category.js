import React, { Component } from "react";
import propTypes from "prop-types";
import Button from "../button";
import Header from "../header";
import styles from "./css/category.module.css"

export default class Category extends Component {
  state = {
    selectValue: "Pick a Category:",
  };
  //Update category as we change select picker
  onChange = (e) => {
    this.setState({ selectValue: e });
  };

  //Pase this value back to App.js upon submission
  onSubmit = () => {
    if(this.state.selectValue !== "Pick a Category:") this.props.pickCat(this.state.selectValue);
  };

  render() {
    return (
      <React.Fragment>
        <Header><p className = {styles.header}>{this.state.selectValue}</p></Header>
        <div className = {styles.form}>
          <Button className = {styles.catItem} onClick={this.onChange.bind(this,"food")}>Food</Button>
          <Button className = {styles.catItem} onClick={this.onChange.bind(this,"players")}>Players</Button>
          <Button className = {styles.catItem} onClick={this.onChange.bind(this,"animals")}>Animals</Button>
          <Button className = {styles.catItem} onClick={this.onChange.bind(this,"locations")}>Locations</Button>
          <Button className = {styles.catItem} onClick={this.onChange.bind(this,"items")}>Items</Button>
          <Button className = {styles.catItem} onClick={this.onChange.bind(this,"clothes")}>Clothes</Button>
          <Button className = {styles.submit} onClick = {this.onSubmit}>Submit</Button>
        </div>
      </React.Fragment>
    );
  }
}

Category.propTypes = {
  players: propTypes.array.isRequired,
  pickCat: propTypes.func.isRequired,
};
