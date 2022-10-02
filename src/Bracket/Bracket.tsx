
import React from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { mockBears, mockMatchupMap } from '../mockData';
import { Matchup } from '../Matchup/Matchup';
import { BearType, MatchupMap } from '../types';
import { useUserContext } from '../contexts/userContext';
import '../App.css';

export const getNextBearField = (matchupId: number) => {
  return matchupId % 2 === 1 ? 'bear1' : 'bear2';
}

export const checkShouldClearDownstream = (pickedWinner?: number, bearId?: number) => {
  return pickedWinner !== undefined && pickedWinner === bearId;
}

export const clearDownstreamMatchups = (matchups: MatchupMap, matchupId: number): MatchupMap => {
  const nextBearField = getNextBearField(matchupId);
  const currentMatchup = matchups[matchupId];
  const nextMatchup = matchups[currentMatchup?.nextMatchup];

  if(!nextMatchup)
    return matchups;

  const shouldClearDownstream = checkShouldClearDownstream(nextMatchup.pickedWinner, nextMatchup[nextBearField]?.id);

  matchups = {
    ...matchups,
    [nextMatchup.id]: {
      ...nextMatchup,
      pickedWinner: shouldClearDownstream ? undefined : nextMatchup.pickedWinner,
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
  const [champion, setChampion] = React.useState<BearType>();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useUserContext();

  // Preload images
  // const bearsRef = React.useRef(mockBears)
  // React.useEffect(() => {
  //   bearsRef.current.forEach((bear) => {
  //     const img = new Image();
  //     img.src = bear.beforeImgSrc || '';
  //   });
  // }, []);

  React.useEffect(() => {
    let isCancelled = false;

    const getBracket = async () => {
      try {
        await Axios.post("/bracket/get", {token: user?.token }).then((response) => {
          if(isCancelled) {
            return;
          }

          const bracketMap = response?.data?.bracketMap;
          if(bracketMap) {
            setMatchupMap(bracketMap);
            if(bracketMap[11] && bracketMap[11].pickedWinner) {
              const pickedChampion = mockBears.find(bear => bear.id === bracketMap[11].pickedWinner);
              setChampion(pickedChampion);
            }
          } else {
            console.log("oh nooo bracket not found.")
          }
        })
      } catch {
        console.log("oh nooo bracket fetching failed.")
      }
    }

    if(user) {
      getBracket();
    }

    return () => {
      isCancelled = true;
    }

  }, [navigate, user]);

  const pickWinner = (matchupId: number, bearId: number) => {
    let currentMatchup = matchupMap[matchupId];

    // If picked winner is already the picked bear, do nothing
    if(currentMatchup.pickedWinner === bearId)
      return;

    setShowSuccess(false);

    if(currentMatchup.pickedWinner === champion?.id)
      setChampion(undefined);

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
        newMatchups = clearDownstreamMatchups(newMatchups, matchupId);
        // clearDownstream will update the next matchup, so we need to update our nextMatchup object
        nextMatchup = newMatchups[nextMatchup.id];
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

      const pickedChampion = mockBears.find(bear => bear.id === bearId);
      setChampion(pickedChampion);
    }

    setMatchupMap(newMatchups);
  }

  const submitBracket = async () => {
    try {
      await Axios.post("/bracket/update-create", { token: user?.token, bracketMap: matchupMap}).then((response) => {
          setShowSuccess(true);
          console.log("bracket saved")
        });
    } catch(e) {
      console.log("oh nooo bracket saving failed.")
    }
  }

  return (
    <div className="page-container">
      <div className="column">
        <Matchup matchup={matchupMap[1]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[2]} pickWinner={pickWinner}/>
      </div>

      <div className="column round-two">
        <Matchup matchup={matchupMap[5]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[6]} pickWinner={pickWinner}/>
      </div>
      <div className="column center">
        <Matchup matchup={matchupMap[9]} pickWinner={pickWinner}/>
      </div>
      <div className="column center">
        <Matchup matchup={matchupMap[11]} pickWinner={pickWinner}/>
        {champion && (
          <div className="champion-container">
            <div className="column center">
              <div>
                Champion
              </div>
              <img className="bear-image shadowed" data-testid="champion-image" src={require(`../images/${champion?.afterImgSrc}`)} alt="champion profile"/>
              <div className="champion-name" data-testid="champion-name">
                {champion?.tagNumber} {champion?.name}
              </div>
              <button className="btn btn-secondary btn-sm shadowed" onClick={submitBracket}>Submit</button>
              {showSuccess && 
                <div>Success!</div>
              }
            </div>
          </div>
        )}
      </div>
      <div className="column right center">
        <Matchup matchup={matchupMap[10]} pickWinner={pickWinner}/>
      </div>
      <div className="column right round-two">
        <Matchup matchup={matchupMap[7]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[8]} pickWinner={pickWinner}/>
      </div>

      <div className="column right">
        <Matchup matchup={matchupMap[3]} pickWinner={pickWinner}/>
        <Matchup matchup={matchupMap[4]} pickWinner={pickWinner}/>
      </div>
    </div>
  );
}