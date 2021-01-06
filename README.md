## Overview

This repository is a recreation of the phone game "Out of the Loop" by the company Tasty Rook. The recreation was done in order to fulfill my self-designed project requirement at Rensselaer Polytechnic Institute. 

No original code or questions from the original game were used for this recreation.

Original game: https://play.google.com/store/apps/details?id=com.tastyrook.loop&hl=en_US&gl=US

To play the game, all players enter their names and hit the "play" button. There must be 3 or more players registered to start the game. Next, the player selects a category from which an answer and questions will be selected. 

Players pass the device around and click "view answer" to look at the secret word. Exactly one player will not see the answer (They will only see "you are out of the loop"). Once all (but one) players have seen the secret word, the app generates questions for the players to ask each other. During the phase, the player who is out of the loop will need to figure out what the secret word is, without giving away they don't know what it is. Players in the know need to figure out who the out player is, as well as convince everyone that they know what the word is. Finally, all players vote who they think is out of the loop and the out player votes for what they think is the correct answer. 

Scores are assigned to the players based on how successfully they discovered the secret word or the out player. 

## How to run

To run this, you must have node and npm installed on the device. 

To install packages used for this project, type 

`npm install` 

To run the project, run 

`npm start`

The app can be viewed by typing "localhost:3000" into the address bar of a browser. 

## File structure

Under src, the file App.js is the main file. From here, all components of the application are rendered and data is manipulated by functions. All data is stored in the state of App.js. Data is passed into components through props. 

Under components, there is a pages folder that stores all the pages that are visited over the course of the game as well as css modules that are used to style the pages. 

There are also components that are instantiated throughout these pages (ex: AddName.js contains the input field that allows players to enter their names).

The data folder stores json files of the answers/questions that are used for the application. 

The file "convert.py" converts a text file of questions or answers to a json file. 
