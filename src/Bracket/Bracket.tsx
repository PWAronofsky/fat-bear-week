
import React from 'react';
import '../App.css';
import { mockBears, mockMatchupMap } from '../mockData';
import { Bear } from '../Bear/Bear';
import {  MatchupMap, MatchupType } from '../types';
import '../App.css';

const getBearField = (matchupId: number) => {
  return matchupId % 2 === 0 ? 'bear1' : 'bear2';
}

//TODO: loading logic.
export const Bracket = () => {
  const [matchupMap, setMatchupMap] = React.useState(mockMatchupMap);

  const pickWinner = (matchupId: number, bearId: number) => {
    const bearField = getBearField(matchupId);

    let currentMatchup = matchupMap[matchupId];
    let nextMatchup = matchupMap[currentMatchup.nextMatchup];

    currentMatchup.pickedWinner = bearId;
    nextMatchup[bearField] = mockBears.find(bear => bear.id === bearId);

    let newMatchups = {
      ...matchupMap,
      [matchupId]: currentMatchup,
      [nextMatchup.id]: nextMatchup
    }

    setMatchupMap(newMatchups);
  }

  return (
    <div className="container">
      <div className="column">
        <Matchup matchup={matchupMap[0]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[1]} pickWinner={pickWinner}/>
      </div>

      <div className="column round-two">
        <Matchup matchup={matchupMap[4]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[5]} pickWinner={pickWinner}/>
      </div>
      <div className="column center">
        <Matchup matchup={matchupMap[8]} pickWinner={pickWinner}/>
      </div>
      <div className="column center">
        <Matchup matchup={matchupMap[10]} pickWinner={pickWinner}/>
      </div>
      <div className="column right center">
        <Matchup matchup={matchupMap[9]} pickWinner={pickWinner}/>
      </div>
      <div className="column right round-two">
        <Matchup matchup={matchupMap[6]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[7]} pickWinner={pickWinner}/>
      </div>

      <div className="column right">
        <Matchup matchup={matchupMap[2]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[3]} pickWinner={pickWinner}/>
      </div>
    </div>
    
  );
}

interface MatchupProps {
  matchup: MatchupType,
  pickWinner: (matchupId: number, bearId: number) => void
}

const Matchup = ({ matchup, pickWinner}: MatchupProps) => {
  const matchupId = matchup.id;

  const pickThisBear = (bearId?: number) => {
    if(bearId !== undefined) pickWinner(matchupId, bearId);
  }
  return (
    <div className="matchup">
      <Bear bear={matchup.bear1} pickThisBear={pickThisBear}/>
      <Bear bear={matchup.bear2} pickThisBear={pickThisBear}/>
    </div>
  )
}