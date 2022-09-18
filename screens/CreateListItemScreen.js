import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
const CreateListItemScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>המוצרים שלי</Text>
    </View>
  );
};

export default CreateListItemScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
});
