import React, {useState} from 'react';
import {GlobalStateContext, IGlobalState} from './GlobalStateContext';
import {FirebaseUser} from '../types/Types';

interface Props {
  children: React.ReactNode;
}

const GlobalState = ({children}: Props) => {
  const [globalState, setGlobalState] = useState<IGlobalState>({
    user: undefined,
  });
  const {Provider: GlobalStateProvider} = GlobalStateContext;
  const setActiveUser = (user: undefined | FirebaseUser) => {
    setGlobalState({
      ...globalState,
      user,
    });
  };
  const providerState = {
    state: globalState,
    setActiveUser,
  };

  return (
    <GlobalStateProvider value={providerState}>{children}</GlobalStateProvider>
  );
};

export default GlobalState;
