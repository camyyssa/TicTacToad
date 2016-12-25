import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [1, -1, 0, 1, -1, -1, -1, -1, -1]
    };
    this.onCellClick = this.onCellClick.bind(this);
    this.renderCell = this.renderCell.bind(this);
  }

  onCellClick(key) {
    console.log(`Clicked ${key}`);
  }

  renderCell(val, i) {
    // Prepare classes that this cell should have
    let classList = ['Board-cell'];
    if (this.state.rows[i] !== 1) {
      classList.push(`Board-${i}`);
    };
    let classes = classList.join(' ');

    return (
      <div key={i} className={classes} onClick={this.onCellClick.bind(this, i)}>
      </div>
    );
  }

  render() {
    return (
      <div className="Board">
        {this.state.rows.map((val, i) => this.renderCell(val, i))}
      </div>
    );
  }
}

export default Board;
