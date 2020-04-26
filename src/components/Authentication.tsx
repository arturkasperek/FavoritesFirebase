import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
type User = FirebaseAuthTypes.User;

interface Props {
  children: React.ReactNode;
}

const Authentication = ({children}: Props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [activeLogin, setActiveLogin] = useState(true);
  const onAuthStateChanged = (user: User | null) => {
    setUser(user as User);
    if (initializing) setInitializing(false);
  };
  const toggleLogin = () => {
    setActiveLogin(!activeLogin);
  };
  const register = () => {
    auth()
      .createUserWithEmailAndPassword(registerEmail, registerPassword)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  const login = () => {
    auth()
      .signInWithEmailAndPassword(loginEmail, loginPassword)
      .then(() => {
        console.log('Signed in !');
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const renderRegister = () => {
    return (
      <View>
        <Text>Register</Text>
        <View>
          <TextInput
            placeholder={'Email'}
            value={registerEmail}
            onChangeText={setRegisterEmail}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Password'}
            secureTextEntry={true}
            value={registerPassword}
            onChangeText={setRegisterPassword}
          />
        </View>
        <View>
          <Button title={'Login'} onPress={register} />
        </View>
        <Text onPress={toggleLogin}>Have a account? Login!</Text>
      </View>
    );
  };

  const renderLogin = () => {
    return (
      <View>
        <Text>Login</Text>
        <View>
          <TextInput
            placeholder={'Email'}
            value={loginEmail}
            onChangeText={setLoginEmail}
          />
        </View>
        <View>
          <TextInput
            placeholder={'Password'}
            secureTextEntry={true}
            value={loginPassword}
            onChangeText={setLoginPassword}
          />
        </View>
        <View>
          <Button title={'Login'} onPress={login} />
        </View>
        <Text onPress={toggleLogin}>Don't have account? Register!</Text>
      </View>
    );
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return <View>{activeLogin ? renderLogin() : renderRegister()}</View>;
  }

  return <>{children}</>;
};

export default Authentication;
