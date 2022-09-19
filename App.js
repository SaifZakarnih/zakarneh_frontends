import {NavigationContainer} from '@react-navigation/native';
import {Provider} from './components/globalContext';
import Navigator from './components/navigation';

function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
