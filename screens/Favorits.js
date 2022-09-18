import React, {useContext} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import ProductList from '../store/ProductsListContext';

const Favorits = ({navigation}) => {
  const {favArray, productList} = useContext(ProductList);
  const filteredArray = productList.filter(item => {
    return !!favArray.find(findItem => item.id === findItem);
  });
  return (
    <View style={{flex: 1, paddingVertical: 24}}>
      {filteredArray.length !== 0 ? (
        <FlatList
          data={filteredArray}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={styles.itemInfo}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate('listDisplay', {item, favorit: true});
                }}>
                <Text
                  style={{
                    position: 'absolute',
                    right: 10,
                    alignSelf: 'center',
                  }}>
                  {item.name.length > 15
                    ? item.name.substring(0, 15) + '...'
                    : item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    left: 0,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 50,
                      backgroundColor: 'purple',
                      borderTopEndRadius: 6,
                      borderTopStartRadius: 6,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'lightgray',
                      width: 80,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 12,
                        color: 'white',
                      }}>
                      {'₪' + parseFloat(item.cost).toFixed(2)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      height: 50,
                      top: 6,
                      marginLeft: 5,
                      color: 'black',
                      shadowColor: 'purple',
                      fontWeight: '600',
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      shadowOffset: {width: 1, height: 1},
                    }}>
                    עלות
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    top: 25,
                    left: 0,
                  }}>
                  <View
                    style={{
                      height: 25,
                      width: 50,
                      backgroundColor: 'purple',
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                      width: 80,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: 12,
                        color: 'white',
                      }}>
                      {'₪' + parseFloat(item.cost).toFixed(2)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      height: 50,
                      top: 6,
                      marginLeft: 5,
                      color: 'black',
                      shadowColor: 'purple',
                      fontWeight: '600',
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      shadowOffset: {width: 1, height: 1},
                    }}>
                    רווח
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>
            אין מוצרים מועדפים !
          </Text>
        </View>
      )}
    </View>
  );
};

export default Favorits;

const styles = StyleSheet.create({
  itemInfo: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 15,
    height: 50,
    backgroundColor: '#E5B8AF',
    width: '90%',
    marginBottom: 15,
    borderRadius: 8,
    justifyContent: 'flex-start',
  },
});
