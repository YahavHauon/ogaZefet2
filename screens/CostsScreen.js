import React, {useContext, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import ProductList from '../store/ProductsListContext';
import Toast from 'react-native-toast-message';
let title;
let backgroundColor;
let data;
let dataFiltered;
let deleteFunc;
let copyFunc;
let setFilterArray;
const CostsScreen = ({route, navigation}) => {
  const kind = route.params?.kind;

  const {
    decorationsList,
    decorationsListFiltered,
    rawMaterialList,
    rawMaterialListFiltered,
    packagingList,
    packagingListFiltered,
    filterListHandler,
    deleteRawMaterial,
    copyRawMaterial,
    deleteDecorations,
    copyDecorations,
    deletePackaging,
    copyPackaging,
    setRawMaterialListFiltered,
    setDecorationsListFiltered,
    setPackagingListFiltered,
  } = useContext(ProductList);
  switch (kind) {
    case 'rawMaterials':
      title = 'חומרי גלם';
      backgroundColor = route.params?.backgroundColor;
      data = rawMaterialList;
      dataFiltered = rawMaterialListFiltered;
      deleteFunc = deleteRawMaterial;
      copyFunc = copyRawMaterial;
      setFilterArray = setRawMaterialListFiltered;
      break;
    case 'packaging':
      title = 'אריזות';
      backgroundColor = backgroundColor = route.params?.backgroundColor;
      data = packagingList;
      dataFiltered = packagingListFiltered;
      deleteFunc = deletePackaging;
      copyFunc = copyPackaging;
      setFilterArray = setPackagingListFiltered;
      break;
    case 'decorations':
      title = 'קישוטים';
      backgroundColor = backgroundColor = route.params?.backgroundColor;
      data = decorationsList;
      dataFiltered = decorationsListFiltered;
      deleteFunc = deleteDecorations;
      copyFunc = copyDecorations;
      setFilterArray = setDecorationsListFiltered;
      break;
    default:
      title = 'error';
      break;
  }

  useLayoutEffect(() => {
    navigation.setOptions({title});
  }, []);

  const copyHandler = item => {
    copyFunc({...item, name: item.name + ' - שכפול'});
    Toast.show({
      type: 'success',
      text1: 'הועתק',
      text2: 'פריט זה הועתק בהצלחה 👋',
    });
  };

  const deleteHandler = item => {
    deleteFunc(item.id);
    Toast.show({
      type: 'error',
      text1: 'הוסר ',
      text2: 'פריט זה הוסר בהצלחה',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SearchBar
          fontColor="#c6c6c6"
          shadowColor="#282828"
          cancelIconColor="#c6c6c6"
          placeholder="חיפוש"
          onChangeText={text => {
            filterListHandler(text, data);
          }}
          onClearPress={() => {
            setFilterArray(data);
          }}
          searchIconComponent={<></>}
          textInputStyle={{textAlign: 'right'}}
          clearIconImageStyle={{width: 11, margin: 10}}
        />
      </View>
      {data.length !== 0 ? (
        <FlatList
          data={dataFiltered}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  style={[styles.itemInfo, {backgroundColor}]}
                  activeOpacity={0.6}
                  onPress={() => {
                    navigation.navigate('addCosts', {kind, item});
                  }}>
                  <Text
                    style={{
                      position: 'absolute',
                      right: 10,
                      alignSelf: 'flex-end',
                      paddingRight: 10,
                    }}>
                    {`${item.unitAmout} ${item.unit}`}
                  </Text>
                  <View
                    style={{
                      width: '60%',
                      position: 'absolute',
                      right: '25%',
                      borderBottomEndRadius: 8,
                      borderBottomStartRadius: 8,
                      backgroundColor: '#738086',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 18,
                      }}>
                      {item.name?.length > 15
                        ? item.name.substring(0, 15) + '...'
                        : item.name}
                    </Text>
                  </View>
                  <Text
                    style={{
                      position: 'absolute',
                      left: '45%',
                      alignSelf: 'flex-end',
                      paddingRight: 10,
                    }}>
                    {`₪${item.costPerUnit} ל${item.unit}`}
                  </Text>
                  <Text
                    style={{
                      position: 'absolute',
                      left: 10,
                      paddingLeft: 10,
                      alignSelf: 'flex-end',
                    }}>
                    {'₪' + parseFloat(item.cost).toFixed(2)}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    backgroundColor: '#738086',
                    height: 6,
                    width: '95%',
                    alignSelf: 'center',
                    marginBottom: 20,
                    borderBottomEndRadius: 8,
                    borderBottomStartRadius: 8,
                  }}
                />
              </View>
            );
          }}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Text>ברשימה זו אין {title} ברגע זה, אנא הוסף</Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
        }}>
        <Text>
          {data.length !== 0 &&
            dataFiltered.length === 0 &&
            'לא נמצאו פריטים בשם זה'}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('addCosts', {kind});
        }}>
        <Text style={{fontSize: 20, color: 'white'}}>+ הוסף פריט</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
  },
  search: {
    marginVertical: 16,
  },
  itemInfo: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 15,
    height: 60,
    backgroundColor: '#E5B8AF',
    width: '95%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-start',
  },
  button: {
    padding: 18,
    width: '60%',
    backgroundColor: '#BBE3E8',
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: 'center',
    alignItems: 'center',
  },
});
