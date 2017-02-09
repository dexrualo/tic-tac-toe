import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      vsCpu: false,
      xIsNext: true
    };
  }
  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }
  render() {
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
    return (
      <div className='board'>
        <Square value={squares[0]} onClick={() => this.props.onClick(0)} />
        <Square value={squares[1]} onClick={() => this.props.onClick(1)} />
        <Square value={squares[2]} onClick={() => this.props.onClick(2)} />
        <Square value={squares[3]} onClick={() => this.props.onClick(3)} />
        <Square value={squares[4]} onClick={() => this.props.onClick(4)} />
        <Square value={squares[5]} onClick={() => this.props.onClick(5)} />
        <Square value={squares[6]} onClick={() => this.props.onClick(6)} />
        <Square value={squares[7]} onClick={() => this.props.onClick(7)} />
        <Square value={squares[8]} onClick={() => this.props.onClick(8)} />
      </div>
    );
  }
}

export default App;
