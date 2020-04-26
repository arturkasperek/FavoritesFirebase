import React from 'react';
import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, ScrollView, Text, View} from 'react-native';
import Authentication from './components/Authentication';
import Layout from './components/Layout';

declare const global: {HermesInternal: null | {}};

const App = () => {
  // useEffect(() => {
  //   const a = async () => {
  //     console.log('a');
  //     const todos = await firestore()
  //       .collection('todos2')
  //       .doc('hW7aI8B7xBniOsS2L9FX')
  //       .get();
  //
  //     console.log('todos are ', todos);
  //   };
  //
  //   a();
  // }, []);

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
