import React from 'react';
import Axios from 'axios';
import { useUserContext } from '../contexts/userContext';
import { UserStanding } from '../types';

export const Standings = () => {
  const [standings, setStandings] = React.useState<UserStanding[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = useUserContext();

  React.useEffect(() => {
    let canceled = false;

    const getStandings = async () => {
      setIsLoading(true);
      await Axios.post("/getStandings").then((response) => {
        if (!canceled && response.data) {
          try {
            setStandings(response.data);
          } catch {
            console.log("Received unexpected data.");
          }
        }
      }).catch(() => {
        console.log("Failure");
      }).finally(() => {
        if (!canceled) {
          setIsLoading(false);
        }
      });
    }

    if (user?.token) {
      getStandings();
    }

    return () => {
      canceled = true;
    }
  }, [user?.token]);

  const sortedStandings = React.useMemo(
    () => [...standings].sort((a, b) => b.total - a.total),
    [standings]
  );

  return (
    <div className="page-container">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 py-4 py-md-5">
            <div className="text-center mb-4">
              <h1 className="display-3">Standings</h1>
              <p className="lead text-dark">See how your bear picks stack up against everyone else.</p>
            </div>
            <div className="card standings-card shadowed">
              <div className="card-body p-0">
                {isLoading ? (
                  <div className="text-center text-muted py-5">Loading standings...</div>
                ) : sortedStandings.length === 0 ? (
                  <div className="text-center text-muted py-5">No standings available yet.</div>
                ) : (
                  <table className="table table-hover standings-table mb-0">
                    <thead>
                      <tr>
                        <th scope="col" className="text-center">Rank</th>
                        <th scope="col">Player</th>
                        <th scope="col" className="text-right">Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedStandings.map((userStanding, index) => {
                        const rank = index + 1;
                        const isCurrentUser = userStanding.username === user?.username;
                        return (
                          <tr
                            key={userStanding.username}
                            className={isCurrentUser ? "standings-current-user" : ""}
                          >
                            <td className="text-center align-middle">
                              <span className={rank <= 3 ? `standings-medal standings-medal-${rank}` : "standings-rank"}>
                                {rank}
                              </span>
                            </td>
                            <td className="align-middle">
                              {userStanding.username}
                              {isCurrentUser && <span className="badge badge-info ml-2">You</span>}
                            </td>
                            <td className="text-right align-middle font-weight-bold">{userStanding.total}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
