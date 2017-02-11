import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      gameStarted: false,
      symbolChosen: false,
      vsCpu: false,
      xIsNext: true,
      p1Symbol: 'X'
    };
  }
  startGame(vsCpu) {
    this.setState({
      gameStarted: true,
      vsCpu: vsCpu
    });
  }
  setSymbol (p1Symbol) {
    this.setState({
      p1Symbol: p1Symbol,
      xIsNext: (p1Symbol === 'X'),
      symbolChosen: true
    });
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (squares[i])
      return;
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }
  render() {
    if (this.state.gameStarted && this.state.symbolChosen) {
      return (
          <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <Board 
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
      );
    } else if (this.state.gameStarted && !this.state.symbolChosen) {
      return <ChooseSymbol onClick={(s) => this.setSymbol(s)}/>;
    } else {
      return <ChoosePlayers onClick={(b) => this.startGame(b)}/>;
    }
  }
}

function Square (props) {
  return (
    <button className='square' onClick={() => props.onClick()}>{props.value}</button>
  );
}

class Board extends Component {
  render() {
    const squares = this.props.squares;
    const boardSquares = squares.map((item,i) => 
      <Square value={squares[i]} onClick={() => this.props.onClick(i)} />
    );
    return (
      <div className='board'>
        {boardSquares}
      </div>
    );
  }
}

class ChoosePlayers extends Component {
  render() {
    return (
      <div>
        <p>Please choose the number of players to start the game.</p>
        <button onClick={() => this.props.onClick()}>1 player</button>
        <button onClick={() => this.props.onClick()}>2 players</button>
      </div>
    );
  }
}

class ChooseSymbol extends Component {
  render() {
    return (
      <div>
        <p>Please choose your preferred symbol.</p>
        <button onClick={() => this.props.onClick()}>X</button>
        <button onClick={() => this.props.onClick()}>O</button>
      </div>
    );
  }
}

export default App;
