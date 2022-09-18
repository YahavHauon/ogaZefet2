import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

import Toast from 'react-native-toast-message';
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontWeight: '700', marginBottom: 50}}>
        שלום מירי, ברוכה הבאה לעמוד ההגדרות
      </Text>

      <TouchableOpacity onPress={() => {}} activeOpacity={0.7}>
        <Text style={{fontSize: 17, fontWeight: '500'}}>שנה סיסמא</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <TouchableOpacity
        onPress={() => {
          Alert.alert('התנתקות', 'האם הינך בטוח שברצונך להתנתק ?', [
            {
              text: 'התנתק',
              onPress: () => {
                const deleteToken = async value => {
                  try {
                    await AsyncStorage.removeItem('userID');
                    Toast.show({
                      type: 'error',
                      text1: `התנתקת בהצלחה`,
                    });
                    navigation.navigate('loginScreen');
                  } catch (e) {
                    console.log(e);
                  }
                };
                deleteToken();
              },
              style: 'destructive',
            },
            {
              text: 'ביטול',
            },
          ]);
        }}
        activeOpacity={0.7}>
        <Text style={{fontSize: 17, fontWeight: '500', color: 'red'}}>
          התנתק
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Settings;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  separator: {
    width: '10%',
    height: 1,
    backgroundColor: 'gray',
    marginVertical: 24,
  },
});
