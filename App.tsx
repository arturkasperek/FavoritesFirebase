import React from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const a = 34;
const App = () => {
  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Text>Hello world</Text>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;
