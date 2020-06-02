import React, {useContext} from 'react';
import {Button} from 'react-native-elements';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {GlobalStateContext} from '../global-state/GlobalStateContext';
import globalStyles from '../styles/globalStyles';
type User = FirebaseAuthTypes.User;

export interface Props {
  children: React.ReactNode;
}

const Authentication = ({children}: Props) => {
  const [initializing, setInitializing] = React.useState(true);
  const [registerEmail, setRegisterEmail] = React.useState('');
  const [registerPassword, setRegisterPassword] = React.useState('');
  const [loginEmail, setLoginEmail] = React.useState('');
  const [loginPassword, setLoginPassword] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [registerError, setRegisterError] = React.useState('');
  const [activeLogin, setActiveLogin] = React.useState(true);
  const {setActiveUser, state: globalState} = useContext(GlobalStateContext);
  const onAuthStateChanged = (user: User | null) => {
    if (user) {
      setActiveUser({
        id: user!.uid,
      });
    }
    if (initializing) setInitializing(false);
  };
  const toggleLogin = () => {
    setActiveLogin(!activeLogin);
  };
  const register = async () => {
    if (!registerEmail) {
      setRegisterError('Please set email!');
      return;
    }

    if (!registerPassword) {
      setRegisterError('Please set password!');
      return;
    }

    try {
      const result = await auth().createUserWithEmailAndPassword(
        registerEmail,
        registerPassword,
      );

      await firestore().collection('users').doc(result.user.uid).set({});
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        setRegisterError('That email address is already in use!');
      } else if (e.code === 'auth/invalid-email') {
        setRegisterError('Invalid email!');
      } else {
        setRegisterError(e.message);
      }
    }
  };
  const login = async () => {
    if (!loginEmail) {
      setLoginError('Please set email!');
      return;
    }

    if (!loginPassword) {
      setLoginError('Please set password!');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(loginEmail, loginPassword);
      setLoginError('');
    } catch (e) {
      console.log('dupa');
      if (e.code === 'auth/invalid-email') {
        setLoginError('Invalid email!');
      } else if (e.code === 'auth/user-not-found') {
        setLoginError('User not exists!');
      } else if (e.code === 'auth/wrong-password') {
        setLoginError('Wrong password!');
      } else {
        setLoginError(e.message);
      }
    }
  };
  const renderRegister = () => {
    return (
      <View>
        <Text style={globalStyles.title}>Register</Text>
        <View>
          <TextInput
            testID={'register-email'}
            style={{
              ...globalStyles.input,
              ...styles.input,
            }}
            placeholder={'Email'}
            value={registerEmail}
            onChangeText={setRegisterEmail}
          />
        </View>
        <View>
          <TextInput
            testID={'register-password'}
            style={{
              ...globalStyles.input,
              ...styles.input,
            }}
            placeholder={'Password'}
            secureTextEntry={true}
            value={registerPassword}
            onChangeText={setRegisterPassword}
          />
        </View>
        <View>
          <Button
            testID={'register-submit'}
            buttonStyle={styles.button}
            title={'Register'}
            onPress={register}
          />
        </View>
        {!!registerError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorContainerText}>{registerError}</Text>
          </View>
        )}
        <Text testID="toggle-login" onPress={toggleLogin}>
          Have a account? <Text style={styles.bold}>Login!</Text>
        </Text>
      </View>
    );
  };

  const renderLogin = () => {
    return (
      <View>
        <Text style={globalStyles.title}>Login</Text>
        <View>
          <TextInput
            testID={'login-email'}
            style={{
              ...globalStyles.input,
              ...styles.input,
            }}
            placeholder={'Email'}
            value={loginEmail}
            onChangeText={setLoginEmail}
          />
        </View>
        <View>
          <TextInput
            testID={'login-password'}
            style={{
              ...globalStyles.input,
              ...styles.input,
            }}
            placeholder={'Password'}
            secureTextEntry={true}
            value={loginPassword}
            onChangeText={setLoginPassword}
          />
        </View>
        <View>
          <Button
            testID={'login-submit'}
            buttonStyle={styles.button}
            title={'Login'}
            onPress={login}
          />
        </View>
        {!!loginError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorContainerText}>{loginError}</Text>
          </View>
        )}
        <Text testID="toggle-register" onPress={toggleLogin}>
          Don't have account? <Text style={styles.bold}>Register!</Text>
        </Text>
      </View>
    );
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!globalState.user) {
    return <View>{activeLogin ? renderLogin() : renderRegister()}</View>;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  errorContainer: {},
  errorContainerText: {
    color: '#D50000',
  },
  input: {
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  button: {
    marginBottom: 20,
  },
});

export default Authentication;
