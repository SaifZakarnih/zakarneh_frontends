import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {Context} from '../../globalContext';

const Login = ({navigation}) => {
  const globalContext = useContext(Context);
  const {
    domain,
    setToken,
    token,
    username,
    setPassword,
    setUsername,
    password,
    setIsLoading,
  } = globalContext;

  useEffect(() => {
    setIsLoading(true);
    if (token != null) {
      navigation.navigate('MainPage');
    }
  }, [token]);

  const getToken = () => {
    if (!username) {
      alert('Please insert a username!');
    }
    if (!password) {
      alert('Please insert a password!');
    }
    const loginData = {
      grant_type: 'password',
      username: username,
      password: password,
      client_id: 'hjkOwRCWReDkq4Wq7sU20BWSnIe2p0VWCJI1sM3c',
    };
    var formBody = [];
    for (var property in loginData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(loginData[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(`${domain}/o/token/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
      body: formBody,
    })
      .then(res => res.json())
      .then(res => setToken(res['access_token']));
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.header}>Covid19 API</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          placeholder="Username"
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button} onPress={() => getToken()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '5%',
  },
  button: {
    width: '100%',
    height: '100%',
    backgroundColor: '#800080',
  },
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  headerView: {
    flex: 1,
  },
  inputView: {
    flex: 1.5,
  },
  buttonView: {
    flex: 0.175,
  },
});

export default Login;
