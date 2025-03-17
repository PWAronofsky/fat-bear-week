import { MatchupType } from '../types';
import { Bear } from '../Bear/Bear';
import { getNodeId } from '../util';

export interface MatchupProps {
    matchup: MatchupType,
    pickWinner: (matchupId: number, bearId: number) => void
  }
  
  export const Matchup = ({ matchup, pickWinner }: MatchupProps) => {
    const matchupId = matchup.id;
  
    const pickThisBear = (bearId?: number) => {
      if(bearId !== undefined) pickWinner(matchupId, bearId);
    }
    
    return (
      <div className="matchup">
        <Bear bear={matchup.bear1} pickThisBear={pickThisBear} nodeId={getNodeId(matchup.id, 0)}/>
        <Bear bear={matchup.bear2} pickThisBear={pickThisBear} nodeId={getNodeId(matchup.id, 1)}/>
      </div>
    )
  }