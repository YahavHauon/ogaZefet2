import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  Pressable,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import ProductList from "../store/ProductsListContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
let costs;
const ListDisplay = ({ navigation, route }) => {
  const item = route.params?.item;

  const [selectedItems, setSelectedItems] = useState(item?.selectedItems || []);

  const {
    rawMaterialList,
    decorationsList,
    packagingList,
    favArray,
    updateProductList,
    copyProductList,
    addProductList,
    deleteProductList,
    addFavArray,
    removeFavArray,
  } = useContext(ProductList);
  useEffect(() => {
    costs = [...rawMaterialList, ...packagingList, ...decorationsList];
  }, [rawMaterialList, packagingList, decorationsList]);
  const isFav = favArray?.find((id) => id === item?.id);
  const items = [
    {
      name: "חומרי גלם",
      id: 0,
      children: [...rawMaterialList],
    },
    {
      name: "אריזות",
      id: 1,
      children: [...packagingList],
    },
    {
      name: "קישוטים",
      id: 2,
      children: [...decorationsList],
    },
  ];
  const [data, setData] = useState([
    ...rawMaterialList,
    ...packagingList,
    ...decorationsList,
  ]);
  const [fav, setFav] = useState(isFav);
  const [totalAmout, setTotalAmout] = useState(0);
  const [valid, setValid] = useState(false);
  const [form, setForm] = useState(
    item || {
      id: "",
      name: "",
      hoursWorked: "",
      gettingPayed: "",
      notes: "",
    }
  );
  const {} = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return item ? (
          <TouchableOpacity
            style={{ padding: 5 }}
            onPress={() => {
              setFav((value) => !value);
              if (fav) {
                Toast.show({
                  type: "error",
                  text1: "הוסר ממועדפים",
                });
                removeFavArray(item?.id);
              } else {
                Toast.show({
                  type: "success",
                  text1: "נוסף למועדפים",
                });
                addFavArray(item?.id);
              }
            }}
          >
            <Ionicons size={25} name={fav ? "star" : "star-outline"} />
          </TouchableOpacity>
        ) : null;
      },
    });
  }, [fav]);

  useEffect(() => {
    let sum = 0;
    for (let key in selectedItems) {
      if (data) {
        let index = data.findIndex((item) => item?.id === selectedItems[key]);
        console.log(data[index], "amout");
        console.log(data[index].costPerUnit, "cost per");
        sum +=
          parseFloat(data[index].costPerUnit) * parseFloat(data[index].amout);
      }
    }
    setTotalAmout(sum.toFixed(2));
  }, [selectedItems, data]);

  useEffect(() => {
    if (
      form.name.length > 0 &&
      form.hoursWorked.length > 0 &&
      selectedItems.length > 0
    ) {
      setValid(true);
    }
    if (
      form.name.length === 0 ||
      form.hoursWorked.length === 0 ||
      selectedItems.length === 0
    ) {
      setValid(false);
    }
  }, [form, selectedItems]);

  // const renderItem = (item, flag, index) => {
  //   return (
  //     <View style={styles.item}>
  //       <AntDesign
  //         style={styles.icon}
  //         color="green"
  //         name="check"
  //         size={flag ? 16 : 0.1}
  //       />
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           position: "absolute",
  //           left: 60,
  //           alignSelf: "center",
  //           width: 150,
  //           justifyContent: "center",
  //         }}
  //       >
  //         <TextInput
  //           value={data[index].amout}
  //           onBlur={() => {
  //             if (data[index].amout === "") {
  //               const newArray = [...data];
  //               newArray[index] = {
  //                 ...item,
  //                 amout: "1",
  //               };
  //               setData(newArray);
  //             }
  //           }}
  //           style={{
  //             width: 80,
  //             height: 25,
  //             textAlign: "center",
  //             alignSelf: "center",
  //             borderColor: "gray",
  //             borderWidth: 0.5,
  //           }}
  //           keyboardType="numeric"
  //           onChangeText={(text) => {
  //             const newArray = [...data];
  //             newArray[index] = {
  //               ...item,
  //               amout: text,
  //             };
  //             setData(newArray);
  //           }}
  //         />
  //         <Text style={{ marginLeft: 6, alignSelf: "center" }}>כמות</Text>
  //       </View>
  //       <Text
  //         style={{
  //           left: 30,
  //           top: 18,
  //           position: "absolute",
  //           textAlign: "right",
  //           width: 40,
  //           height: 30,
  //         }}
  //       >
  //         {data[index].unit}
  //       </Text>
  //       <Text style={styles.selectedTextStyle}>{item.name}</Text>
  //     </View>
  //   );
  // };
  return (
    <KeyboardAwareScrollView viewIsInsideTabBar extraScrollHeight={100}>
      <Pressable
        style={{}}
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.spacer, { marginRight: 12 }]}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  marginRight: 10,
                  fontWeight: "500",
                }}
              >
                מחיר ללקוח
              </Text>
              <TextInput
                style={styles.inputFieldShort}
                placeholder="לא חובה - לדוגמא: ₪240"
                keyboardType="decimal-pad"
                onChangeText={(text) => {
                  setForm((state) => {
                    return { ...state, gettingPayed: text };
                  });
                }}
                value={form.gettingPayed}
              />
            </View>

            <View style={[styles.spacer, { marginRight: 32 }]}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  marginRight: 10,
                  fontWeight: "500",
                }}
              >
                שם המוצר
              </Text>
              <TextInput
                style={styles.inputFieldShort}
                placeholder="חובה - לדוגמא: עוגת גן"
                onChangeText={(text) => {
                  setForm((state) => {
                    return { ...state, name: text };
                  });
                }}
                value={form.name}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={[styles.spacer, { marginRight: 12 }]}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  marginRight: 10,
                  fontWeight: "500",
                }}
              >
                מידע נוסף
              </Text>
              <View style={styles.inputFieldShortInfo}>
                <Text style={{ textAlign: "right", fontWeight: "600" }}>
                  <Text style={{ fontWeight: "400" }}>רווח למוצר: </Text>
                  {`${
                    isNaN(
                      (parseFloat(form.gettingPayed) - totalAmout).toFixed(2)
                    )
                      ? "~"
                      : (parseFloat(form.gettingPayed) - totalAmout).toFixed(2)
                  }`}
                </Text>
                <Text style={{ textAlign: "right", fontWeight: "600" }}>
                  <Text style={{ fontWeight: "400" }}>שכר ברוטו לשעה: </Text>
                  {`${
                    form.hoursWorked.length === 0
                      ? "~"
                      : isNaN(
                          (
                            (parseFloat(form.gettingPayed) - totalAmout) /
                            form.hoursWorked
                          ).toFixed(2)
                        )
                      ? "~"
                      : (
                          (parseFloat(form.gettingPayed) - totalAmout) /
                          form.hoursWorked
                        ).toFixed(2)
                  }`}
                </Text>
              </View>
            </View>

            <View style={[styles.spacer]}>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "right",
                  marginRight: 10,
                  fontWeight: "500",
                }}
              >
                שעות עבודה
              </Text>
              <TextInput
                style={styles.inputFieldShort}
                placeholder="חובה - לדוגמא: 3.5"
                keyboardType="decimal-pad"
                value={form.hoursWorked}
                onChangeText={(text) => {
                  setForm((state) => {
                    return { ...state, hoursWorked: text };
                  });
                }}
              />
            </View>
          </View>

          <Text
            style={{
              fontSize: 12,
              textAlign: "right",
              marginRight: 10,
              fontWeight: "500",
              marginTop: 12,
            }}
          >
            <Text>{`עלויות - `}</Text>
            <Text style={{ fontSize: 10 }}>{`₪`}</Text>
            {`${totalAmout}  סה''כ`}
          </Text>
          {/* <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            labelField="name"
            valueField="id"
            placeholder=" הוסף עלויות ( שדה חובה )"
            value={form.selected}
            search
            searchPlaceholder="חיפוש..."
            onChange={(item) => {
              setForm((state) => {
                return { ...state, selected: item };
              });
            }}
            renderItem={renderItem}
            renderSelectedItem={(item, unSelect) => {
              return (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                    <Text
                      style={{ fontSize: 10 }}
                    >{`${item.amout} ${item.unit}`}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.textSelectedStyle}>{item.name}</Text>
                      <AntDesign color="black" name="delete" size={17} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          /> */}
          <View>
            <SectionedMultiSelect
              styles={{
                selectToggle: [styles.inputField, { textAlign: "center" }],
                selectToggleText: { textAlign: "right", alignSelf: "flex-end" },
                searchTextInput: { textAlign: "right", marginRight: 10 },
                button: { paddingVertical: 15 },
                confirmText: { fontSize: 20 },
                subItemText: {
                  alignSelf: "center",
                  textAlign: "right",
                  fontSize: 16,
                  paddingVertical: 3,
                },
                itemText: {
                  textAlign: "right",
                  fontSize: 16,
                  paddingVertical: 5,
                },
                backdrop: { backgroundColor: "black", opacity: 0.7 },
                chipsWrapper: {
                  paddingTop: 10,
                  alignSelf: "right",
                },
              }}
              showCancelButton
              selectedIconOnLeft
              modalWithSafeAreaView
              items={items}
              colors={{ primary: "#BBE3E8", cancel: "#82BBC2" }}
              IconRenderer={Icon}
              uniqueKey="id"
              subKey="children"
              selectText="עלויות"
              searchPlaceholderText="חיפוש"
              confirmText="שמור"
              selectedText="נבחרו"
              showDropDowns={true}
              readOnlyHeadings={true}
              dataState={data}
              dataStateSetter={setData}
              onSelectedItemsChange={setSelectedItems}
              selectedItems={selectedItems}
              renderAmout={(subItem) => {
                const index = data.findIndex((item) => item?.id === subItem.id);
                return (
                  <View
                    style={{
                      width: 175,
                      alignItems: "flex-end",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ marginRight: 6, alignSelf: "center" }}>
                        {subItem.unit}
                      </Text>
                      <TextInput
                        placeholder={data[index]?.amout}
                        // onBlur={() => {
                        //   if (data[index].amout === "") {
                        //     const newArray = [...data];
                        //     newArray[index] = {
                        //       ...item,
                        //       amout: "1",
                        //     };
                        //     setData(newArray);
                        //   }
                        // }}
                        style={{
                          width: 80,
                          height: 25,
                          textAlign: "center",
                          alignSelf: "center",
                          borderColor: "gray",
                          borderWidth: 0.5,
                        }}
                        keyboardType="numeric"
                        onChangeText={(text) => {
                          const newArray = [...data];
                          newArray[index] = {
                            ...subItem,
                            amout: text,
                          };
                          setData(newArray);
                        }}
                      />
                      <Text style={{ marginLeft: 6, alignSelf: "center" }}>
                        כמות
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.spacer}>
            <Text
              style={{
                fontSize: 12,
                textAlign: "right",
                marginRight: 10,
                fontWeight: "500",
                marginTop: 12,
              }}
            >
              הערות
            </Text>
            <TextInput
              style={styles.inputFieldMultiline}
              multiline
              placeholder={`לא חובה -  לדוגמא: הערה הערה`}
              onChangeText={(text) => {
                setForm((state) => {
                  return { ...state, notes: text };
                });
              }}
              value={form.notes}
            />
          </View>
        </View>
      </Pressable>
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item ? (
          <TouchableOpacity
            style={[
              styles.button,
              { width: item ? "35%" : "60%" },
              !valid && { backgroundColor: "gray" },
            ]}
            activeOpacity={valid ? 0.6 : 1}
            onPress={() => {
              copyProductList({
                ...form,
                name: form.name + " - שכפול",
                selectedItems,
              });
              Toast.show({
                type: "info",
                text1: "הועתק",
                text2: "פריט זה הועתק בהצלחה 👋",
              });
              navigation.goBack();
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>שכפל</Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={[
            styles.button,
            { width: item ? "35%" : "60%" },
            !valid && { backgroundColor: "gray" },
          ]}
          activeOpacity={valid ? 0.6 : 1}
          onPress={() => {
            if (valid) {
              if (item) {
                updateProductList({ ...form, selectedItems });
                Toast.show({
                  type: "success",
                  text1: "עודכן",
                  text2: "פריט זה עודכן בהצלחה 👋",
                });
                navigation.goBack();
              } else {
                addProductList({ ...form, selectedItems });
                Toast.show({
                  type: "success",
                  text1: "נוסף",
                  text2: "פריט זה נוסף בהצלחה 👋",
                });
                navigation.goBack();
              }
            }
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>
            {item ? "שמור" : "הוסף"}
          </Text>
        </TouchableOpacity>
        {item ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              deleteProductList(item?.id);
              Toast.show({
                type: "error",
                text1: "הוסר",
                text2: "פריט זה הוסר בהצלחה",
              });
              navigation.goBack();
            }}
          >
            <Ionicons name="md-trash" color="red" size={50} />
          </TouchableOpacity>
        ) : null}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ListDisplay;

const styles = StyleSheet.create({
  container: { padding: 12 },
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  inputField: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    textAlign: "right",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  inputFieldShort: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    width: Dimensions.get("window").width / 2 - 18,
    textAlign: "right",
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  inputFieldShortInfo: {
    height: 50,
    borderRadius: 12,
    width: Dimensions.get("window").width / 2 - 18,
    textAlign: "right",
    padding: 6,
    paddingRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  inputFieldMultiline: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 12,
    textAlign: "right",
    minHeight: 70,
    marginBottom: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  placeholderStyle: {
    color: "#bdbdbd",
    textAlign: "right",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
    textAlign: "right",
  },
  icon: {
    marginRight: 5,
  },
  spacer: {
    marginBottom: 16,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "white",
    shadowColor: "#000",
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 16,
  },
  button: {
    padding: 18,
    backgroundColor: "#BBE3E8",
    borderRadius: 20,
    alignItems: "center",
    marginRight: 10,
  },
});
