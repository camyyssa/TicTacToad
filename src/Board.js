import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.rows = [1, -1, 0, 1, -1, -1, -1, -1, -1];
    this.cellClicked = this.cellClicked.bind(this);
    this.renderCell = this.renderCell.bind(this);
  }

  cellClicked(key) {
    console.log(`Something here ${key}`);
  }

  renderCell(val, i) {
    return (
      <div key={i} className="Board-cell" onClick={this.cellClicked.bind(this, i)}>
      </div>
    );
  }

  render() {
    return (
      <div className="Board">
        {this.rows.map((val, i) => this.renderCell(val, i))}
      </div>
    );
  }
}

export default Board;
