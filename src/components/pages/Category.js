import React, { Component } from "react";
import propTypes from "prop-types";

const form = {
  background: "#286180",
  padding: "3rem",
  borderRadius: "3rem",
  textAlign: "center",
  fontSize: "4rem",
  width: "30%",
  marginBottom: "5%",
  cursor: "pointer",
  border: "none",
  color: "white",
  textShadow: "4px 3px #0a2242",
};

const bStyle = {
  background: "#286180",
  padding: "3rem",
  borderRadius: "3rem",
  textAlign: "center",
  fontSize: "4rem",
  width: "30%",
  marginBottom: "5%",
  border: "none",
  color: "white",
  textDecoration: "none",
  cursor: "pointer",
};

export default class Category extends Component {
  state = {
    selectValue: "food",
  };
  //Update category as we change select picker
  onChange = (e) => {
    this.setState({ selectValue: e.target.value });
  };

  //Pase this value back to App.js upon submission
  onSubmit = (e) => {
    e.preventDefault();
    this.props.pickCat(this.state.selectValue);
  };

  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <form id="category" onSubmit={this.onSubmit} style={form}>
            <select
              value={this.state.value}
              name="selectpicker"
              onChange={this.onChange}
            >
              <option name="food" value="food">
                Food!
              </option>
              <option name="players" value="players">
                Players
              </option>
              <option name="animals" value="animals">
                Animals
              </option>
              <option name="items" value="items">
                Household Items
              </option>
              <option name="locations" value="locations">
                Locations
              </option>
              <option name="clothing" value="clothing">
                Clothing
              </option>
            </select>
            <button style={bStyle}>Submit</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

Category.propTypes = {
  players: propTypes.array.isRequired,
  pickCat: propTypes.func.isRequired,
};
