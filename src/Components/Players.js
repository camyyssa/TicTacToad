import React from 'react';
import { connect } from 'react-redux';
import { setPlayerName } from '../Actions';
import './Players.css';

const mapStateToProps = (state) => {
  return { 
    players: state.players,
    currentPlayer: state.currentPlayer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePlayer: (i, val) => {
      dispatch(setPlayerName(i, val));
    }
  };
};

const displayPlayer = (opt, updatePlayer) => {
  let classList = ['Players-input', 'Players-input-active'];
  if (opt.isTheirTurn) {
    classList.push('Players-current-player');
  }
  let classes = classList.join(' ');

  return (
    <div key={opt.index} className='Players-name'>
      <input 
        className={classes}
        value={opt.value}
        onChange={(event) => updatePlayer(opt.index, event.target.value)} 
        type='text' />
    </div> 
  );
};

let Players = ({ players, currentPlayer, updatePlayer }) => {
  const playerTrees = players.map((val, i) => { 
    const options = {
      value: val,
      index: i,
      isTheirTurn: i === currentPlayer
    };
    return displayPlayer(options, updatePlayer);
  });

  return (
    <div className="Players">
      {playerTrees[0]}
      <div className='Players-name'>
        <input 
          className="Players-input Players-input-disabled" 
          defaultValue='Draws'
          readOnly='readOnly' 
          type='text' />
      </div>
      {playerTrees[1]}      
    </div>
  );
};

Players = connect(mapStateToProps, mapDispatchToProps)(Players);

export default Players;
