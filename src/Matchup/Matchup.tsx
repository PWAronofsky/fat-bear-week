import { MatchupType } from '../types';
import { Bear } from '../Bear/Bear';
import { getNodeId } from '../util';

export interface MatchupProps {
    matchup: MatchupType,
    offsetTop?: number,
    offsetBottom?: number,
    spaceBetween?: boolean,
    pickWinner: (matchupId: number, bearId: number) => void
  }
  
  export const Matchup = ({ matchup, offsetTop, offsetBottom, spaceBetween, pickWinner }: MatchupProps) => {
    const matchupId = matchup.id;
  
    const pickThisBear = (bearId?: number) => {
      if(bearId !== undefined) pickWinner(matchupId, bearId);
    }
    
    return (
      <div className={spaceBetween ? "column": ""}>
        <Bear bear={matchup.bear1} pickThisBear={pickThisBear} nodeId={getNodeId(matchup.id, 0)} offsetTop={offsetTop}/>
        <Bear bear={matchup.bear2} pickThisBear={pickThisBear} nodeId={getNodeId(matchup.id, 1)} offsetBottom={offsetBottom}/>
      </div>
    )
  }