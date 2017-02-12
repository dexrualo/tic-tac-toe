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
      p1IsNext: true,
      p1Symbol: 'X',
      p2Symbol: 'O'
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
  
  handleClick(i) {
    if (this.state.vsCpu && !this.state.p1IsNext)
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
    if (this.state.vsCpu && !this.state.p1IsNext) {
      const squares = this.state.squares.slice();
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
    <button
      className='square'
      onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends Component {
  render() {
    const squares = this.props.squares;
    const boardSquares = squares.map((item,i) => 
      <Square key={i} value={squares[i]} onClick={() => this.props.onClick(i)} />
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
        <button onClick={() => this.props.onClick(true)}>1 player</button>
        <button onClick={() => this.props.onClick(false)}>2 players</button>
      </div>
    );
  }
}

class ChooseSymbol extends Component {
  render() {
    return (
      <div>
        <p>Please choose your preferred symbol.</p>
        <button onClick={() => this.props.onClick('X')}>X</button>
        <button onClick={() => this.props.onClick('O')}>O</button>
      </div>
    );
  }
}

export default App;
