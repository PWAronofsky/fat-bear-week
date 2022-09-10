
import React from 'react';
import '../App.css';
import { mockBears, mockMatchupMap } from '../mockData';
import { Bear } from '../Bear/Bear';
import {  MatchupMap, MatchupType } from '../types';
import '../App.css';

const getNextBearField = (matchupId: number) => {
  return matchupId % 2 === 0 ? 'bear1' : 'bear2';
}

const checkShouldClearDownstream = (pickedWinner?: number, bearId?: number) => {
  return pickedWinner && pickedWinner === bearId;
}

const clearDownstreamMatchups = (matchups: MatchupMap, matchupId: number): MatchupMap => {
  const nextBearField = getNextBearField(matchupId);
  const currentMatchup = matchups[matchupId];
  const nextMatchup = matchups[currentMatchup?.nextMatchup];

  if(!nextMatchup)
    return matchups;

  const shouldClearDownstream = checkShouldClearDownstream(nextMatchup.pickedWinner, nextMatchup[nextBearField]?.id);

  console.log(`Matchup: ${matchupId}, NextBearField: ${nextBearField}, NextMatchup: ${nextMatchup.id}`)
  matchups = {
    ...matchups,
    [nextMatchup.id]: {
      ...nextMatchup,
      pickedWinner: undefined,
      [nextBearField]: undefined
    }
  }

  if(shouldClearDownstream) {
    matchups = clearDownstreamMatchups(matchups, nextMatchup.id);
  }

  return matchups;
}

//TODO: loading logic.
export const Bracket = () => {
  const [matchupMap, setMatchupMap] = React.useState(mockMatchupMap);

  const pickWinner = (matchupId: number, bearId: number) => {
    let currentMatchup = matchupMap[matchupId];

    // If picked winner is already the picked bear, do nothing
    if(currentMatchup.pickedWinner === bearId)
      return;

    currentMatchup.pickedWinner = bearId;

    let nextMatchup = matchupMap[currentMatchup.nextMatchup];
    let newMatchups = {
      ...matchupMap
    };

    // If there is a next matchup, set the bear to the appropriate field, and clear downstream if needed
    if (nextMatchup) {
      const nextBearField = getNextBearField(matchupId);
      const shouldClearDownstream = checkShouldClearDownstream(nextMatchup.pickedWinner, nextMatchup[nextBearField]?.id);

      
      if(shouldClearDownstream) {
        newMatchups = clearDownstreamMatchups(newMatchups, nextMatchup.id);
      }

      nextMatchup[nextBearField] = mockBears.find(bear => bear.id === bearId);

      newMatchups = {
        ...newMatchups,
        [matchupId]: currentMatchup,
        [nextMatchup.id]: nextMatchup
      };

    } else {
      // Otherwise, pick this bear as Championship winner
      newMatchups = {
        ...newMatchups,
        [matchupId]: currentMatchup,
      };
      // setChampionshipWinner(bearId);
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