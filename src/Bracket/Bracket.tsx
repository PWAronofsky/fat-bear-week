
import React from 'react';
import Axios from 'axios';
import Xarrow, { Xwrapper } from 'react-xarrows';
import { useNavigate } from 'react-router-dom';

import { mockBears, mockMatchupMap } from '../mockData';
import { Matchup } from '../Matchup/Matchup';
import { BearType, MatchupMap } from '../types';
import { useUserContext } from '../contexts/userContext';
import '../App.css';
import { getNodeId } from '../util';

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
  const { user, canEditBracket } = useUserContext();

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
        await Axios.post("/bracket/get").then((response) => {
          if(isCancelled) {
            return;
          }

          const bracketMap = response?.data?.bracketMap;
          if(bracketMap) {
            setMatchupMap(bracketMap);
            if(bracketMap[15] && bracketMap[15].pickedWinner) {
              const pickedChampion = mockBears.find(bear => bear.id === bracketMap[15].pickedWinner);
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
      await Axios.post("/bracket/update-create", { bracketMap: matchupMap }).then((response) => {
          setShowSuccess(true);
          console.log("bracket saved")
        });
    } catch(e) {
      console.log("oh nooo bracket saving failed.")
    }
  }
  return (
    <div className="page-container bracket-container">
      <Xwrapper>
        <div className="bracket-side bracket-side-left">
          <div className="bracket-cell" style={{ gridColumn: 1, gridRow: 1 }}>
            <Matchup matchup={matchupMap[1]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 1, gridRow: 3 }}>
            <Matchup matchup={matchupMap[2]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 1, gridRow: 5 }}>
            <Matchup matchup={matchupMap[3]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 1, gridRow: 7 }}>
            <Matchup matchup={matchupMap[4]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 2, gridRow: '1 / 4' }}>
            <Matchup matchup={matchupMap[9]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 2, gridRow: '5 / 8' }}>
            <Matchup matchup={matchupMap[10]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 3, gridRow: '1 / 8' }}>
            <Matchup matchup={matchupMap[13]} pickWinner={pickWinner}/>
          </div>
        </div>

        <div id="champion-container" className="bear column center flex-one final-round">

          {champion && (
            <div className="bear column center" style={{position: "absolute", top: 60}}>
              <div>
                Champion
              </div>
              <img className="bear-image shadowed" data-testid="champion-image" src={require(`../images/${champion?.afterImgSrc}`)} alt="champion profile"/>
              <div className="champion-name" data-testid="champion-name">
                {champion?.tagNumber} {champion?.name}
              </div>
              <button className="btn btn-secondary btn-sm shadowed" onClick={submitBracket} disabled={!canEditBracket}>Submit</button>
              {showSuccess &&
                <div>Success!</div>
              }
            </div>
          )}


          <Matchup matchup={matchupMap[15]} pickWinner={pickWinner}/>
        </div>

        <div className="bracket-side bracket-side-right">
          <div className="bracket-cell" style={{ gridColumn: 1, gridRow: '1 / 8' }}>
            <Matchup matchup={matchupMap[14]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 2, gridRow: '1 / 4' }}>
            <Matchup matchup={matchupMap[11]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 2, gridRow: '5 / 8' }}>
            <Matchup matchup={matchupMap[12]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 3, gridRow: 1 }}>
            <Matchup matchup={matchupMap[5]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 3, gridRow: 3 }}>
            <Matchup matchup={matchupMap[6]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 3, gridRow: 5 }}>
            <Matchup matchup={matchupMap[7]} pickWinner={pickWinner}/>
          </div>
          <div className="bracket-cell" style={{ gridColumn: 3, gridRow: 7 }}>
            <Matchup matchup={matchupMap[8]} pickWinner={pickWinner}/>
          </div>
        </div>


        {/* Bracket Lines - Left Side */}
        <Xarrow start={getNodeId(1, 0)} end={getNodeId(9, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(1, 1)} end={getNodeId(9, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(2, 0)} end={getNodeId(9, 1)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(2, 1)} end={getNodeId(9, 1)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(3, 0)} end={getNodeId(10, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(3, 1)} end={getNodeId(10, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(4, 0)} end={getNodeId(10, 1)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(4, 1)} end={getNodeId(10, 1)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(9, 0)} end={getNodeId(13, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(9, 1)} end={getNodeId(13, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(10, 0)} end={getNodeId(13, 1)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(10, 1)} end={getNodeId(13, 1)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(13, 0)} end={getNodeId(15, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        <Xarrow start={getNodeId(13, 1)} end={getNodeId(15, 0)} color="black" showHead={false} startAnchor={'right'} endAnchor={'left'} path={'grid'} />
        {/* Bracket Lines - Right Side */}
        <Xarrow start={getNodeId(5, 0)} end={getNodeId(11, 0)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(5, 1)} end={getNodeId(11, 0)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(6, 0)} end={getNodeId(11, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(6, 1)} end={getNodeId(11, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(7, 0)} end={getNodeId(12, 0)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(7, 1)} end={getNodeId(12, 0)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(8, 0)} end={getNodeId(12, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(8, 1)} end={getNodeId(12, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(11, 0)} end={getNodeId(14, 0)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(11, 1)} end={getNodeId(14, 0)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(12, 0)} end={getNodeId(14, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(12, 1)} end={getNodeId(14, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(14, 0)} end={getNodeId(15, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
        <Xarrow start={getNodeId(14, 1)} end={getNodeId(15, 1)} color="black" showHead={false} startAnchor={'left'} endAnchor={'right'} path={'grid'} />
      </Xwrapper>
    </div>
  );
}
