import React, {useState} from 'react';
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
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import Toast from 'react-native-toast-message';

import Feather from 'react-native-vector-icons/Feather';
const SignUp = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [passwordProtected, setPasswordProtected] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const {isLoading, mutate} = useMutation(
    async () => {
      return await axios.post(`http://51.195.61.125:27004/api/auth/register`, {
        first_name: firstName,
        last_name: lastName,
        email: userName,
        password: password,
      });
    },
    {
      onSuccess: res => {
        Toast.show({
          type: 'success',
          text1: `נרשמת בהצלחה`,
        });
        navigation.navigate('Home');
      },
      onError: err => {
        console.log(err.response.data.message);
        setIsValid(false);
        Toast.show({
          type: 'error',
          text1: `אחד מהפרטים אינו תקין`,
        });
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
          טופס הרשמה
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
          <View style={{marginTop: 24}}>
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
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
              onChangeText={text => {
                setFirstName(text);
                if (!isValid && text.length > 0) {
                  setIsValid(true);
                }
              }}
            />
            <Text
              style={{
                position: 'absolute',
                right: 10,
                top: 3,
                fontWeight: '600',
                fontSize: 12,
                color: !isValid ? 'red' : 'black',
              }}>
              שם פרטי
            </Text>
          </View>
          <View style={{marginTop: 24}}>
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
              autoCapitalize="none"
              autoCorrect={false}
              spellCheck={false}
              autoComplete="off"
              onChangeText={text => {
                setUserName(text);
                if (!isValid && text.length > 0) {
                  setIsValid(true);
                }
              }}
            />
            <Text
              style={{
                position: 'absolute',
                right: 10,
                fontSize: 12,
                top: 3,
                fontWeight: '600',
                color: !isValid ? 'red' : 'black',
              }}>
              שם משפחה
            </Text>
          </View>
          <View style={{marginTop: 24}}>
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
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
              onChangeText={text => {
                setLastName(text);
                if (!isValid && text.length > 0) {
                  setIsValid(true);
                }
              }}
            />
            <Text
              style={{
                position: 'absolute',
                fontSize: 12,
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
              spellCheck={false}
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
                fontSize: 12,
                color: !isValid ? 'red' : 'black',
              }}>
              סיסמא
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
              spellCheck={false}
              maxLength={12}
              onChangeText={text => {
                if (text.length === 3 && phone.length === 2) {
                  setPhone(text + '-');
                } else {
                  if (text.length === 8 && phone.length === 7) {
                    setPhone(text + '-');
                  } else {
                    setPhone(text);
                  }
                }
                if (!isValid && text.length > 0) {
                  setIsValid(true);
                }
              }}
              keyboardType={'number-pad'}
              value={phone}
            />

            <Text
              style={{
                position: 'absolute',
                right: 10,
                top: 3,
                fontWeight: '600',
                fontSize: 12,
                color: !isValid ? 'red' : 'black',
              }}>
              פלאפון נייד
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
                לפחות אחד מהשדות אינו תקין, אנא נסה שנית
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'center',
              paddingVertical: 8,
              paddingHorizontal: 48,

              backgroundColor: '#BBE3E8',
            }}
            onPress={() => {
              mutate();
            }}>
            <Text>הרשם</Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <ActivityIndicator style={{marginTop: 12}} size="large" />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});
