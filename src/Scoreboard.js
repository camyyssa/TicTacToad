import React from 'react';
import { connect } from 'react-redux';
import './Scoreboard.css';

const mapStateToProps = (state) => {
  return { score: state.score };
};

let Scoreboard = ({ score }) => {
  return (
    <div className='Score'>
      <div className='Score-entry'>{score[0]}</div>
      <div className='Score-entry Score-draw'>{score[2]}</div>
      <div className='Score-entry'>{score[1]}</div>   
    </div>
  );
};

Scoreboard = connect(mapStateToProps)(Scoreboard);

export default Scoreboard;
