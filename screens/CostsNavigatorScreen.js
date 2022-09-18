import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

const CostsNavigatorScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          flex: 1,
          backgroundColor: '#E5B8AF',
          marginBottom: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('costsScreen', {
            kind: 'rawMaterials',
            backgroundColor: '#E5B8AF',
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/costs_background.png')}
          />
          <Text style={styles.title}>חומרי גלם</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          flex: 1,
          backgroundColor: '#BBE3E8',
          marginBottom: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('costsScreen', {
            kind: 'packaging',
            backgroundColor: '#BBE3E8',
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/costs_background.png')}
          />
          <Text style={styles.title}>אריזות</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          flex: 1,
          backgroundColor: '#B8BAD9',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('costsScreen', {
            kind: 'decorations',
            backgroundColor: '#B8BAD9',
          });
        }}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/costs_background.png')}
          />
          <Text style={styles.title}>קישוטים</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CostsNavigatorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    color: '#565656',
    position: 'absolute',
  },
  image: {
    width: 200,
    height: 200,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
