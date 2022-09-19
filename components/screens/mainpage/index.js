import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {Context} from '../../globalContext';
import Flag from 'react-native-flags';
export default function MainPage({navigation}) {
  const myIcon = <Icon name="logout" size={20} style={{marginTop: 10}}></Icon>;
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const globalContext = useContext(Context);
  const {domain, setToken, token, setIsLoading, isLoading, username} =
    globalContext;
  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        fetch(`${domain}/api/v1/countries`, {
          method: 'GET',
          Accept: 'application/json',
        })
          .then(res => res.json())
          .then(data => setCountries(data));
      }
    };
    setIsLoading(false);
    fetchData();
  }, []);
  function handleSubscription(item) {
    fetch(`${domain}/api/v1/subscribe/${item.Slug}`, {
      method: 'POST',
      headers: {Authorization: `Bearer ${token}`},
    });
    Alert.alert(
      'Success!',
      `Subscribed to ${item.Country}`,
      [
        {
          text: 'Ok',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  }
  function handleClick(event, item) {
    fetch(`${domain}/api/v1/check/${username}/${item.Slug}`, {
      method: 'POST',
    }).then(response => {
      if (response.status == 200) {
        fetch(`${domain}/api/v1/percentage/deaths/confirmed/${item.Slug}`, {
          headers: {Authorization: `Bearer ${token}`},
        })
          .then(response => response.json())
          .then(response => {
            Alert.alert(
              `${item.Country} Statistics`,
              `Confirmed: ${response.Confirmed} \nDeaths: ${response.Deaths} \nPercentage: ${response.Percentage}`,
              [
                {
                  text: 'Ok',
                  style: 'default',
                },
              ],
              {
                cancelable: true,
              },
            );
          })
          .catch(() =>
            Alert.alert(
              'Missing data',
              `Statistics for ${item.Country} is unavailable.`,
            ),
          );
      } else
        Alert.alert(
          `Not subscribed to ${item.Country}`,
          'Would you like to subscribe?',
          [
            {
              text: 'Yes',
              onPress: () => handleSubscription(item),
              style: 'cancel',
            },
            {
              text: 'No',
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        );
    });
  }
  const handleLogout = () => {
    setToken(null);
    navigation.navigate('Login');
  };
  function country(item) {
    const JustAFlag = () => <Flag code={item.ISO2} size={64} />;
    return (
      <View>
        <TouchableOpacity
          onPress={event => handleClick(event, item)}
          style={styles.countryButton}>
          <View style={styles.flag}>{JustAFlag()}</View>
          <Text style={styles.text}>{item.Country}</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: 'black',
          borderWidth: 1,
          height: 45,
        }}>
        <TextInput
          placeholder="Search for a certain country"
          maxLength={20}
          cursorColor="black"
          textAlign="center"
          borderColor="#D3D3D3"
          borderWidth={1}
          autoCapitalize="words"
          onChangeText={setSearch}
          style={{flex: 9}}
          width="100%"></TextInput>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center'}}
          onPress={() => handleLogout()}>
          {myIcon}
        </TouchableOpacity>
      </View>
      <FlatList
        data={countries.filter(item => item.Country.includes(search))}
        renderItem={({item}) => country(item)}
        numColumns={2}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  countryButton: {
    height: 200,
    width: 200,
    borderColor: 'black',
    borderWidth: 0.5,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    flex: 2,
    fontWeight: '900',
    marginTop: '30%',
    textAlign: 'center',
  },
  flag: {
    flex: 2,
    alignContent: 'center',
    marginTop: '20%',
  },
});
