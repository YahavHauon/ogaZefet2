import axios from 'axios';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useMutation} from 'react-query';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductList from '../store/ProductsListContext';
import Feather from 'react-native-vector-icons/Feather';
const LoginScreen = ({navigation, route}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const {setId} = useContext(ProductList);
  const [passwordProtected, setPasswordProtected] = useState(true);
  const {isLoading, mutateAsync, isSuccess, isError} = useMutation(
    async () => {
      return await axios.post(`http://51.195.61.125:27004/api/auth/login`, {
        email: userName,
        password: password,
      });
    },
    {
      onSuccess: res => {
        Toast.show({
          type: 'success',
          text1: `התחברת בהצלחה`,
        });
        const stringID = res.data.id.toString();
        const storeData = async value => {
          try {
            await AsyncStorage.setItem('userID', value);
          } catch (e) {
            console.log(e);
          }
        };
        setId(stringID);
        storeData(stringID);
        navigation.navigate('Home');
      },
      onError: err => {
        setIsValid(false);
      },
    },
  );
  return (
    <TouchableWithoutFeedback
      style={{backgroundColor: 'white', height: 0}}
      onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            marginTop: 24,
            fontSize: 22,
            fontWeight: '800',
            textAlign: 'center',
          }}>
          פרטי התחברות
        </Text>
        <View
          style={{
            backgroundColor: 'pink',
            width: '80%',

            marginTop: 0,
            borderRadius: 16,
            shadowRadius: 2.5,
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowOpacity: 0.7,
            padding: 24,
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'white',
              alignSelf: 'center',
              borderWidth: 0.5,
              borderRadius: 24,
              marginBottom: 24,
            }}
            source={require('../assets/ogaZefet.png')}
          />
          <View style={{marginTop: 0}}>
            <TextInput
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 12,
                paddingTop: 22,
                paddingBottom: 8,
                borderRadius: 8,
                borderColor: !isValid ? 'red' : 'transparent',
                borderWidth: 1,
                textAlign: 'right',
                color: !isValid ? 'red' : 'black',
              }}
              onChangeText={text => {
                setUserName(text);
                if (!isValid && text.length > 0) {
                  setIsValid(true);
                }
              }}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
            />
            <Text
              style={{
                position: 'absolute',
                right: 10,
                top: 3,
                fontWeight: '600',
                color: !isValid ? 'red' : 'black',
              }}>
              שם משתמש
            </Text>
          </View>

          <View style={{marginTop: 32}}>
            <TextInput
              style={{
                backgroundColor: 'white',
                paddingHorizontal: 12,
                paddingTop: 22,
                paddingBottom: 8,
                borderRadius: 8,
                textAlign: 'right',
                borderColor: !isValid ? 'red' : 'transparent',
                borderWidth: 1,
                color: !isValid ? 'red' : 'black',
              }}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              onChangeText={text => {
                setPassword(text);
                if (!isValid && text.length > 0) {
                  setIsValid(true);
                }
              }}
              secureTextEntry={passwordProtected}
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 11, left: 11}}
              onPress={() => {
                setPasswordProtected(value => !value);
              }}>
              <Feather
                name={passwordProtected ? 'eye' : 'eye-off'}
                size={24}
                color={isValid ? 'darkgray' : 'red'}
              />
            </TouchableOpacity>
            <Text
              style={{
                position: 'absolute',
                right: 10,
                top: 3,
                fontWeight: '600',
                color: !isValid ? 'red' : 'black',
              }}>
              סיסמא
            </Text>
          </View>
          <View style={{height: 40}}>
            {!isValid && (
              <Text
                style={{
                  marginTop: 6,
                  color: 'red',
                  textAlign: 'center',

                  fontWeight: '600',
                }}>
                שם משתמש או סיסמא שגויים
              </Text>
            )}
          </View>
          <View style={{}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 48,
                  marginTop: 24,
                  backgroundColor: '#BBE3E8',
                  flexDirection: 'row',
                }}
                onPress={() => {
                  if (userName.length === 0 || password.length === 0) {
                    setIsValid(false);
                  } else {
                    mutateAsync();
                  }
                }}>
                <Text>התחבר</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  paddingVertical: 8,
                  paddingHorizontal: 48,
                  marginLeft: 6,
                  marginTop: 24,
                  backgroundColor: '#BBE3E8',
                }}
                onPress={() => {
                  navigation.navigate('signUp');
                }}>
                <Text>הרשם</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{alignSelf: 'center'}}>שכחתי סיסמא</Text>
            </TouchableOpacity>
          </View>
        </View>
        {isLoading && (
          <ActivityIndicator style={{marginTop: 12}} size="large" />
        )}
        <View style={{flexDirection: 'row', marginTop: 24}}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.facebook.com');
            }}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/facebook.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              height: 25,
              alignSelf: 'center',
              width: 1,
              backgroundColor: 'gray',
              marginHorizontal: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.instagram.com');
            }}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/instagram.png')}
            />
          </TouchableOpacity>
          <View
            style={{
              height: 25,
              alignSelf: 'center',
              width: 1,
              backgroundColor: 'gray',
              marginHorizontal: 10,
            }}
          />
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.whatsapp.com');
            }}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/whatsapp.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={{position: 'absolute', bottom: 20, fontWeight: '600'}}>
          כל הזכויות שמורות לעוגצפת בע׳׳מ @copyrights
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});
