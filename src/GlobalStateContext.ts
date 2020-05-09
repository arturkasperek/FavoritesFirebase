import React from 'react';
import {FirebaseUser} from "./types/Types";

export interface IGlobalState {
  user?: FirebaseUser;
}

const defaultState: IGlobalState = {
  user: undefined,
};

export const GlobalStateContext = React.createContext({
  state: defaultState,
  setActiveUser: (user: FirebaseUser | undefined) => {},
});
