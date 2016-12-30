# Tic-Tac-Toad

A tic-tac-toe webapp to be played in hotseat mode. 

Given two players seated at the same computer who want to play tic-tac-toe
with each other, the webapp will: 
- only allow legal moves (according to the official [rules](https://en.wikipedia.org/wiki/Tic-tac-toe#Rules) for the game)
- preview move on mouseover
- switch from one player to the other automatically
- determine end of game situations: draw or win/lose on either side
- reset the board when the game is finished (next first player is previous looser)
- keep score over multiple games
- reset score

## Running and installing the project

### Prerequisite

1. Install npm globally on the computer. 

2. Switch to root directory and install npm packages:

    > npm install

3. Install `react-scripts` globally:

    > npm i -g react-scripts


### Running the app

   > npm start

### Testing the app

   > npm test

### Building the project

   > npm run build

## Store model

The application model state will include the following information:

```
{
  board: Array of 9 values containing the state for each of the cells on the board
  players: Array of 2 strings, representing the names of the players
  currentPlayer: index of the player currently setting a piece on the board
  score: Array of 3 values: matches won by each of the players and draws
}
```
### Example

Alice is playing against Bob. They've already played 6 matches: 
Alice won twice, Bob once, and they had 3 draws. Now it's Alice's turn, and the 
board looks like this:

```
 x |   | 0
-----------
 x |   | 
-----------
   |   |  
```

The store object will look like this:

```
{
  'board': [1, -1, 0, 1, -1, -1, -1, -1, -1],
  'players': ['Alice', 'Bob'], 
  'currentPlayer': 0,
  'score': [2, 1, 3] 
}
```

## Directory structure

I will not go into full detail on the directory structure, but would like to provide 
a couple of possible entry points for a better reading experience of the 
implementation. 

```
.
|
+-- .vscode - Visual Studio specific linting options
|
+-- src   ---> All source files are in here
|   |
|   +-- index.js       --> Entry point into the application
|   |                      This is where the Redux store and provider get 
|   |                      initialized
|   |
|   +-- index.css      --> css rules specific to index.js
|   |
|   +-- App.js         --> Implementation of the App React component
|   |
|   +-- App.test.js    --> Unit tests specific for App.js
|   |                      Filename form consistent accross the program
|   |                           
|   +-- Actions.js     --> Redux actions
|   |
|   +-- Components     --> REACT components linked to Redux
|   |       |
|   |       +-- Board.js    --> implementation of the Board component
|   |       |
|   |       +-- Board.css   --> css rules specific to the Board component
|   |
|   +-- Reducers       --> Redux reducers 
|           |
|           +-- Main.js     --> the main repository of reducers for the program
|           |
|           +-- Main.test.js    --> unit tests describing the behaviour of 
|           |                       reducers implemented in Main.js
|           |
|           +-- Board.js    --> a secondary reducer for actions specific to the 
|           |                   board.
|           |
|           +-- Board.CheckLine.test.js  --> Unit tests for the checkLine 
|           |                                function implemented in Board.js
|           |
|           +-- Common.js   --> common helper functions for functionality used
|                               in multiple reducers
|
+-- public --> everything that needs to be publicly available, e.g. favicon
|   |
|   +-- index.html
|
+-- README.md --> this readme file
```
