import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, ScrollView, Button, StyleSheet} from 'react-native';
import SearchWithPopup from './SearchWithPopup';
import FavoritesList from './FavoritesList';
import {Icon} from 'react-native-elements';
import {EntertainmentItem, UserFirebaseDataShape} from '../types/Types';
import {GlobalStateContext} from '../global-state/GlobalStateContext';

interface Props {}

const Layout = ({}: Props) => {
  const {setActiveUser, state} = useContext(GlobalStateContext);
  const [searchActive, setSearchActive] = useState(false);
  const userId = state.user!.id;
  const logout = async () => {
    await auth().signOut();
    setActiveUser(undefined);
  };
  const [userData, setUserData] = useState<UserFirebaseDataShape>({});
  const toggleItemConsumption = (item: EntertainmentItem) => {
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        [item.id]: {
          watched: !userData[item.id]?.watched,
          data: item,
        },
      });
  };
  const removeItemConsumption = (item: EntertainmentItem) => {
    firestore()
      .collection('users')
      .doc(userId)
      .update({
        [item.id]: {
          watched: false,
          data: item,
        },
      });
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('users')
      .doc(userId)
      .onSnapshot((documentSnapshot) => {
        setUserData(documentSnapshot.data() as UserFirebaseDataShape);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);

  return (
    <View style={styles.mainContainer}>
      <SearchWithPopup
        userData={userData}
        toggleItemConsumption={toggleItemConsumption}
        setSearchActive={setSearchActive}
        searchActive={searchActive}
      />
      {!searchActive && (
        <FavoritesList
          removeItemConsumption={removeItemConsumption}
          userData={userData}
        />
      )}
      <View style={styles.buttonContainer} onTouchEnd={logout}>
        <Icon
          size={20}
          reverse
          name="sign-out-alt"
          type="font-awesome-5"
          color="#4388d6"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default Layout;
