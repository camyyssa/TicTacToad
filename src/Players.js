import React from 'react';
import { connect } from 'react-redux';
import { setPlayerName } from './Actions';
import './Players.css';

const mapStateToProps = (state) => {
  return { players: state.players };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayer: (i, val) => {
      dispatch(setPlayerName(i, val));
    }
  };
};

const displayPlayer = (val, i, updatePlayer) => {
  return (
    <div key={i} className="Players-name">
      <input 
        className="Players-input Players-input-active" 
        value={val}
        onChange={(event) => updatePlayer(i, event.target.value)} 
        type='text' />
    </div> 
  );
};

let Players = ({ players, updatePlayer }) => {
  return (
    <div className="Players">
      {displayPlayer(players[0], 0, updatePlayer)}
      <div className='Players-name'>
        <input 
          className="Players-input Players-input-disabled" 
          defaultValue='Draws'
          readOnly='readOnly' 
          type='text' />
      </div>
      {displayPlayer(players[1], 1, updatePlayer)}      
    </div>
  );
};

Players = connect(mapStateToProps, mapDispatchToProps)(Players);

export default Players;
