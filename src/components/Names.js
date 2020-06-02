import React, { Component } from 'react';
import NameItem from "./NameItem";
import PropTypes from 'prop-types';

// This component is the list of players. For each player, this object displays
// the name and, when clicked, deletes the name:
export default class Names extends Component {
    render() {
        return this.props.players.map((player) => (
            <NameItem key = {player.name + "_"} name = {player.name} delName = {this.props.delName}/>
        ));
    }
}

Names.propTypes = {
    players: PropTypes.array.isRequired,
    delName: PropTypes.func.isRequired,
}
