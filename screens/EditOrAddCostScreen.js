import { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import ProductList from "../store/ProductsListContext";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "@expo/vector-icons/Ionicons";
let exampleName;
let addFunc;
let updateFunc;
let copyFunc;
let deleteFunc;
const EditOrAddCostScreen = ({ navigation, route }) => {
  const kind = route.params?.kind;
  const item = route.params?.item;

  const {
    addRawMaterial,
    updateRawMaterial,
    copyRawMaterial,
    deleteRawMaterial,
    addDecorations,
    updateDecorations,
    copyDecorations,
    deleteDecorations,
    addPackaging,
    updatePackaging,
    copyPackaging,
    deletePackaging,
  } = useContext(ProductList);
  const [form, setForm] = useState(
    item || {
      name: "",
      unitAmout: "",
      costPerUnit: "",
      unit: "",
      cost: "",
      notes: "",
      amout: "1",
    }
  );
  console.log(form);
  const [value, setValue] = useState(null);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (
      form.name.length > 0 &&
      form.unit.length > 0 &&
      form.unitAmout.length > 0 &&
      form.cost.length > 0
    ) {
      setValid(true);
    }
    if (
      form.name.length === 0 ||
      form.unit.length === 0 ||
      form.unitAmout.length === 0 ||
      form.cost.length === 0
    ) {
      setValid(false);
    }
  }, [form]);

  switch (kind) {
    case "rawMaterials":
      exampleName = "קמח תופח";
      addFunc = addRawMaterial;
      updateFunc = updateRawMaterial;
      copyFunc = copyRawMaterial;
      deleteFunc = deleteRawMaterial;
      break;
    case "packaging":
      exampleName = "אריזה שופרסל";
      addFunc = addPackaging;
      updateFunc = updatePackaging;
      copyFunc = copyPackaging;
      deleteFunc = deletePackaging;
      break;
    case "decorations":
      exampleName = "קישוט כחול";
      addFunc = addDecorations;
      updateFunc = updateDecorations;
      copyFunc = copyDecorations;
      deleteFunc = deleteDecorations;
      break;
    default:
      break;
  }
  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value}
      </View>
    );
  };

  const data = [
    { label: "גרם", value: "1" },
    { label: "יחידה", value: "2" },
  ];
  return (
    <KeyboardAwareScrollView
      style={{ backgroundColor: "white" }}
      extraScrollHeight={100}
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder={"שם העלות ( שדה חובה ) - לדוגמא: " + exampleName}
            onChangeText={(text) => {
              setForm((state) => {
                return { ...state, name: text };
              });
            }}
            value={form.name}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="מס' יחידות ( שדה חובה ) - לדוגמא: 1000 "
            keyboardType="numeric"
            onChangeText={(text) => {
              setForm((state) => {
                return { ...state, unitAmout: text };
              });
            }}
            value={form.unitAmout}
          />
        </View>
        <Dropdown
          style={styles.input}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="סוג יחידה ( שדה חובה ) - לדוגמא: גרם"
          searchPlaceholder="חיפוש..."
          value={form.unitId}
          onChange={(text) => {
            setForm((state) => {
              return { ...state, unit: text.label, unitId: text.value };
            });
            setValue(text.value);
          }}
          renderLeftIcon={() => (
            <Image
              source={require("../assets/down.png")}
              style={{ width: 15, height: 15 }}
            />
          )}
          renderItem={renderItem}
        />
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            placeholder="מחיר המוצר ( שדה חובה ) - לדוגמא: 12.90"
            keyboardType="numeric"
            onChangeText={(text) => {
              setForm((state) => {
                return { ...state, cost: text };
              });
            }}
            value={form.cost}
          />
        </View>
        <View style={styles.inputField}>
          <TextInput
            style={[styles.input, { paddingBottom: 100 }]}
            placeholder={
              "הערות ( אופציונלי )\nלדוגמא: אפשר להשיג יותר בזול אם ככה וככה"
            }
            multiline
            onChangeText={(text) => {
              setForm((state) => {
                return { ...state, notes: text };
              });
            }}
            value={form.notes}
          />
        </View>
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
                if (valid) {
                  copyFunc({
                    ...form,
                    name: form.name + " - שכפול",
                    costPerUnit: `${(
                      parseFloat(form.cost) / parseFloat(form.unitAmout)
                    ).toFixed(2)}`,
                    amout: "1",
                  });
                  Toast.show({
                    type: "info",
                    text1: "הועתק",
                    text2: "פריט זה הועתק בהצלחה 👋",
                  });
                  navigation.goBack();
                }
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
                Toast.show({
                  type: "success",
                  text1: item ? "עודכן" : "נוסף",
                  text2: item
                    ? "פריט זה עודכן בהצלחה 👋"
                    : "פריט זה נוסף בהצלחה 👋",
                });
                item
                  ? updateFunc({
                      ...form,
                      costPerUnit: `${(
                        parseFloat(form.cost) / parseFloat(form.unitAmout)
                      ).toFixed(2)}`,
                      amout: "1",
                    })
                  : addFunc({
                      ...form,
                      costPerUnit: `${(
                        parseFloat(form.cost) / parseFloat(form.unitAmout)
                      ).toFixed(2)}`,
                      amout: "1",
                    });
                navigation.goBack();
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
                deleteFunc(item.id);
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
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default EditOrAddCostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 24,
  },
  inputContainer: {},
  inputField: {
    marginVertical: 12,
  },
  input: {
    borderRadius: 8,
    borderColor: "lightgray",
    borderWidth: 1,
    fontSize: 16,
    padding: 18,
    textAlign: "right",
  },
  button: {
    padding: 12,
    backgroundColor: "#BBE3E8",
    borderRadius: 20,
    marginRight: 12,
    marginTop: 12,
    marginBottom: 12,
    alignSelf: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    textAlign: "right",
  },
  placeholderStyle: {
    fontSize: 16,
    textAlign: "right",
    color: "lightgray",
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: "right",
  },
  iconStyle: {
    width: 0,
    height: 0,
  },
  inputSearchStyle: {
    textAlign: "right",
    height: 40,
    fontSize: 16,
  },
});
