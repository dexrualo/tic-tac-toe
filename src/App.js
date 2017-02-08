import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
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
      </div>
    );
  }
}

function Square (props) {
  return (
    <div onClick={props.onClick}>{props.symbol}</div>
  );
}

class Board extends Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null)
    }
  }
  handleClick() {

  }
  render() {
    return (
      <Square value={this.state.squares[i]} onClick={() => this.setState({value: 'X'})}></Square>
    );
  }
}

export default App;
