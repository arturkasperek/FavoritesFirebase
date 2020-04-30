import React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import Authentication from './components/Authentication';
import Layout from './components/Layout';

declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Authentication>
          <Layout>
            <Text>Welcome in App!</Text>
          </Layout>
        </Authentication>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;
