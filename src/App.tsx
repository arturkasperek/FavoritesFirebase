import React from 'react';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Authentication from './components/Authentication';
import Layout from './components/Layout';
import GlobalState from './global-state/GlobalState';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <GlobalState>
        <View style={styles.scrollView}>
          <View style={styles.mainContainer}>
            <Authentication>
              <Layout>
                <Text>Welcome in App!</Text>
              </Layout>
            </Authentication>
          </View>
        </View>
      </GlobalState>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  mainContainer: {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default App;
