import React from 'react';
import auth from '@react-native-firebase/auth';
import {View, Button} from 'react-native';
import SearchWithPopup from './SearchWithPopup';

interface Props {
  children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };

  return (
    <View>
      <Button title={'Logout'} onPress={logout} />
      <SearchWithPopup />
      {children}
    </View>
  );
};

export default Layout;
