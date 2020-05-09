import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Authentication from './components/Authentication';
import Layout from './components/Layout';
import {GlobalStateContext, IGlobalState} from './GlobalStateContext';
import {FirebaseUser} from './types/Types';

declare const global: {HermesInternal: null | {}};

const App = () => {
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
    <>
      <GlobalStateProvider value={providerState}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Authentication>
            <Layout>
              <Text>Welcome in App!</Text>
            </Layout>
          </Authentication>
        </ScrollView>
      </GlobalStateProvider>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;
