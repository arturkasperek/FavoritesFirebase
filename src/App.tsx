import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Authentication from './components/Authentication';
import Layout from './components/Layout';
import GlobalState from './global-state/GlobalState';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <GlobalState>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Authentication>
            <Layout>
              <Text>Welcome in App!</Text>
            </Layout>
          </Authentication>
        </ScrollView>
      </GlobalState>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;
