import React from 'react';
import PropTypes from 'prop-types';

const Scoreboard = ({ homeTeam, score, setScore, qtyGoal, testId }) => (
  <label htmlFor={ (homeTeam) ? 'home-team-scoreboard' : 'away-team-scoreboard' }>
    <p>Gols</p>
    {console.log(score)}
    <input
      data-testid={ testId }
      type="number"
      min="0"
      value={ score }
      onChange={ ({ target: { value } }) => {
        if (value < qtyGoal) {
          setScore(qtyGoal);
        } else {
          setScore(value);
        }
      } }
    />
  </label>
);

Scoreboard.propTypes = {
  homeTeam: PropTypes.bool.isRequired,
  score: PropTypes.number,
  setScore: PropTypes.func.isRequired,
  qtyGoal: PropTypes.number,
  testId: PropTypes.string.isRequired,
};

Scoreboard.defaultProps = {
  score: undefined,
  qtyGoal: undefined,
};

export default Scoreboard;
