import {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../screens/login';
import MainPage from '../screens/mainpage';
import {Context} from '../globalContext';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  const globalContext = useContext(Context);
  const {token} = globalContext;

  return (
    <Stack.Navigator initialRouteName="Login">
      {!token && (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
      )}
      {token && (
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};
export default Navigator;
