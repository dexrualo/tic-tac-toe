import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      gameStarted: false,
      symbolChosen: false,
      vsCpu: false,
      p1IsNext: true,
      p1Symbol: 'X',
      p2Symbol: 'O',
      gameEnded: false,
      winner: ''
    };
  }

  startGame(vsCpu) {
    this.setState({
      gameStarted: true,
      vsCpu: vsCpu,
    });
  }

  setSymbol (choice) {
    var p2 = choice === 'X' ? 'O' : 'X';
    this.setState({
      p1Symbol: choice,
      p2Symbol: p2,
      symbolChosen: true,
    });
  }

  resetGame () {
    this.setState({
      squares: Array(9).fill(null),
      gameStarted: false,
      symbolChosen: false,
      vsCpu: false,
      p1IsNext: true,
      p1Symbol: 'X',
      p2Symbol: 'O',
      gameEnded: false,
      winner: ''
    });
  }
  
  handleClick(i) {
    if ((this.state.vsCpu && !this.state.p1IsNext) || this.state.gameEnded)
      return;
    const squares = this.state.squares.slice();
    if (squares[i])
      return;
    squares[i] = this.state.p1IsNext ? this.state.p1Symbol : this.state.p2Symbol;
    this.setState({
      squares: squares,
      p1IsNext: !this.state.p1IsNext,
    });
  }

  componentDidUpdate () {
    const squares = this.state.squares.slice();
    if (!this.state.gameEnded) {
      const winner = checkForWinner(squares);
      if (winner){
        console.log(winner);
        this.setState({
          gameEnded: true,
          winner: winner
        });
        return;
      }
    }
    if (this.state.vsCpu && !this.state.p1IsNext && !this.state.gameEnded) {
      for (var i = 0; i < 9; i++) {
        if (squares[i] === null) {
          squares[i] = this.state.p2Symbol;
          this.setState({
            squares: squares,
            p1IsNext: !this.state.p1IsNext,
          });
          return;
        }
      }
    }
  }

  render() {
    var prompt;
    var componentToRender;
    if (this.state.gameEnded)
      prompt = <WinPrompt vsCpu={this.state.vsCpu} p1Symbol={this.state.p1Symbol} winner={this.state.winner} onClick={() => this.resetGame()}/>;
    else
      prompt = <TurnPrompt vsCpu={this.state.vsCpu} p1IsNext={this.state.p1IsNext}/>
    if (this.state.gameStarted && this.state.symbolChosen) {
      componentToRender = (
        <div>
          {prompt}
          <Board 
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)} />
        </div>
      );
    } else if (this.state.gameStarted && !this.state.symbolChosen) {
      componentToRender = <ChooseSymbol onClick={(s) => this.setSymbol(s)}/>;
    } else {
      componentToRender = <ChoosePlayers onClick={(b) => this.startGame(b)}/>;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic Tac Toe</h2>
        </div>
        {componentToRender}
      </div>
    );
  } 
}

function Square (props) {
  return (
    <button
      className='square'
      onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

function Board (props) {
  const squares = props.squares;
  const boardSquares = squares.map((item,i) => 
    <Square key={i} value={squares[i]} onClick={() => props.onClick(i)} />
  );
  return (
    <div className='board'>
      {boardSquares}
    </div>
  );
}

function ChoosePlayers (props) {
  return (
    <div>
      <p>Please choose the number of players to start the game.</p>
      <button onClick={() => props.onClick(true)}>1 player</button>
      <button onClick={() => props.onClick(false)}>2 players</button>
    </div>
  );
}

function ChooseSymbol (props) {
  return (
    <div>
      <p>Please choose your preferred symbol.</p>
      <button onClick={() => props.onClick('X')}>X</button>
      <button onClick={() => props.onClick('O')}>O</button>
    </div>
  );
}

function TurnPrompt (props) {
  var turnString = '';
  if (props.vsCpu)
    if (props.p1IsNext)
      turnString = <p>It&apos;s your turn.</p>;
    else
      turnString = <p>Computer&apos;s turn</p>;
  else
    if (props.p1IsNext)
      turnString = <p>Player one&apos;s turn.</p>;
    else
      turnString = <p>Player two&apos;s turn</p>;
  return (
    <div className='prompt'>
      {turnString}
    </div>
  );
}

function WinPrompt (props) {
  var winString = '';
  if (props.vsCpu)
    if (props.winner === props.p1Symbol)
      winString = <p>Player One wins!</p>;
    else
      winString = <p>Computer wins!</p>;
  else
    if (props.winner === props.p1Symbol)
      winString = <p>Player one wins!</p>;
    else
      winString = <p>Player two wins!</p>;
  return (
    <div className='prompt'>
      {winString}
      <button onClick={() => props.onClick()}>Reset</button>
    </div>
  );
}

function checkForWinner (squares) {
  const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  const win = winningCombos.find(function(combo){
    const i1 = combo[0];
    const i2 = combo[1];
    const i3 = combo[2];
    return (squares[i1] && squares[i1] === squares[i2]  && squares[i1] === squares[i3]);
  });
  return win ? squares[win[0]] : win;
}

export default App;
