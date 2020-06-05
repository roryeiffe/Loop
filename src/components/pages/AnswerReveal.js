import React, { Component } from 'react'
import styles from "./css/playerReveal.module.css";
import Button from "../button";
import Header from "../header";

export default class AnswerReveal extends Component {
    finish = () => {
        this.props.changePage("viewResults");
        this.props.assign_scores();
    }
    render() {
        return (
            <div>
                <Header><p className = {styles.header}>Answer Reveal</p></Header>
                <h1 className = {styles.header1}>{this.props.player.name} voted for {this.props.player.vote}</h1>
                <h1 className = {styles.header2}> But the real answer is </h1>
                <h1 className = {styles.answer}>{this.props.answer}</h1>
                <Button className = {styles.submit} onClick = {this.finish}>See scores:</Button>
            </div>
        )
    }
}
