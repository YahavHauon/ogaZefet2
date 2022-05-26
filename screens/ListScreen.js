import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useContext, useLayoutEffect } from "react";
import ProductList from "../store/ProductsListContext";
import SearchBar from "react-native-dynamic-search-bar";
import { applicationId } from "expo-application";

const ListScreen = ({ navigation }) => {
  const { productList, filterList, filterListHandler, setFilterList } =
    useContext(ProductList);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     tabBarBadge: productList.length,
  //   });
  // }, [productList]);
  console.log(applicationId);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>המוצרים שלי</Text>
      <View style={{ marginBottom: 20 }}>
        <SearchBar
          fontColor="#c6c6c6"
          shadowColor="#282828"
          cancelIconColor="#c6c6c6"
          placeholder="חיפוש"
          onChangeText={(text) => filterListHandler(text, productList)}
          onClearPress={() => setFilterList(productList)}
          searchIconComponent={<></>}
          textInputStyle={{ textAlign: "right" }}
          clearIconImageStyle={{ width: 11, margin: 10 }}
        />
      </View>
      {productList.length !== 0 ? (
        <FlatList
          data={filterList}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.itemInfo}
                activeOpacity={0.6}
                onPress={() => {
                  navigation.navigate("listDisplay", { item });
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    right: 10,
                    alignSelf: "center",
                  }}
                >
                  {item.name.length > 15
                    ? item.name.substring(0, 15) + "..."
                    : item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    left: 0,
                  }}
                >
                  <View
                    style={{
                      height: 25,
                      width: 50,
                      backgroundColor: "purple",
                      borderTopEndRadius: 6,
                      borderTopStartRadius: 6,
                      borderBottomWidth: 0.5,
                      borderBottomColor: "lightgray",
                      width: 80,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      {"₪" + parseFloat(item.cost).toFixed(2)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      height: 50,
                      top: 6,
                      marginLeft: 5,
                      color: "black",
                      shadowColor: "purple",
                      fontWeight: "600",
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      shadowOffset: { width: 1, height: 1 },
                    }}
                  >
                    עלות
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    position: "absolute",
                    top: 25,
                    left: 0,
                  }}
                >
                  <View
                    style={{
                      height: 25,
                      width: 50,
                      backgroundColor: "purple",
                      borderBottomLeftRadius: 6,
                      borderBottomRightRadius: 6,
                      width: 80,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "600",
                        fontSize: 12,
                        color: "white",
                      }}
                    >
                      {"₪" + parseFloat(item.cost).toFixed(2)}
                    </Text>
                  </View>
                  <Text
                    style={{
                      height: 50,
                      top: 6,
                      marginLeft: 5,
                      color: "black",
                      shadowColor: "purple",
                      fontWeight: "600",
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      shadowOffset: { width: 1, height: 1 },
                    }}
                  >
                    רווח
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <Text>ברשימה זו אין מוצרים ברגע זה, אנא הוסף</Text>
        </View>
      )}
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text>
          {productList.length !== 0 &&
            filterList.length === 0 &&
            "לא נמצא פריטים בשם זה"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate("listDisplay");
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>+ צור מוצר</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    marginBottom: 12,
  },
  itemInfo: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 15,
    height: 50,
    backgroundColor: "#E5B8AF",
    width: "90%",
    marginBottom: 15,
    borderRadius: 8,
    justifyContent: "flex-start",
  },
  button: {
    padding: 18,
    width: "60%",
    backgroundColor: "#BBE3E8",
    borderRadius: 20,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: "center",
    alignItems: "center",
  },
});
