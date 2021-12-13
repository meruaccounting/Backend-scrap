import React, { useContext, useReducer, useEffect } from 'react';

import {
  TEAM_CREATE_FAILED,
  TEAM_CREATE_REQUEST,
  TEAM_CREATE_RESET,
  TEAM_CREATE_SUCCESS
} from '../constants/TeamConstants';

export const teamContext = React.createContext();

const initialValue = {
  teamCreate: {},
  loader: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case TEAM_CREATE_REQUEST:
      return {
        loader: true
      };
    case TEAM_CREATE_SUCCESS:
      return {
        loader: false,
        teamCreate: action.payload
      };
    case TEAM_CREATE_FAILED:
      return {
        loader: false,
        err: action.payload
      };
    case TEAM_CREATE_RESET:
      return initialValue;
    default:
      return state;
  }
};

export function TeamsProvider(props) {
  const [teamCreate, dispatchTeamCreate] = useReducer(reducer, initialValue);

  useEffect(() => {
    localStorage.setItem('teamCreate', JSON.stringify(teamCreate));
  }, [teamCreate]);

  return (
    <teamContext.Provider value={{ teamCreate, dispatchTeamCreate }}>
      {props.children}
    </teamContext.Provider>
  );
}