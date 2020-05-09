import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, Button} from 'react-native';
import SearchWithPopup from './SearchWithPopup';
import FavoritesList from './FavoritesList';
import {EntertainmentItem, UserFirebaseDataShape} from '../types/Types';
import {GlobalStateContext} from '../GlobalStateContext';

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  const {setActiveUser, state} = useContext(GlobalStateContext);
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
    <View>
      <Button title={'Logout'} onPress={logout} />
      <SearchWithPopup
        userData={userData}
        toggleItemConsumption={toggleItemConsumption}
      />
      <FavoritesList userData={userData} />
      {children}
    </View>
  );
};

export default Layout;
