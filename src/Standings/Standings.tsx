import React from 'react';
import Axios from 'axios';
import { useUserContext } from '../contexts/userContext';
import { UserStanding } from '../types';

export const Standings = () => {
  const [standings, setStandings] = React.useState<UserStanding[]>([]);
  const { user } = useUserContext();
  React.useEffect(() => {
    const getStandings = async () => {
      let canceled = false;
      await Axios.post("/getStandings", { token: user?.token }).then((response) => {
        if(!canceled && response.data) {
          try{
            setStandings(response.data);
          } catch {
            console.log("Received unexpected data.");
          }
        }
      }).catch(() => {
        console.log("Failure");
      })
    }

    if(user?.token) {
      getStandings();
    }
  }, [user?.token]);
  return (
    <div className="page-container">
      <div className="container">
      <div className="row align-items-center">
        <div className="py-3 py-md-5">
          <h1 className="display-3">Standings</h1>
          <p className="lead text-dark">
            This page is in hibernation, more improvements to come.
          </p>
          <ol>
            {standings.map((userStanding) => {
              return (
                <li key={userStanding.username} className="lead text-dark">{userStanding.username}   {userStanding.total}</li>
              )
            })}
          </ol>
        </div>
      </div>
      </div>
    </div>
  )
}