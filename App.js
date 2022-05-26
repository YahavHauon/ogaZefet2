import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import ListScreen from "./screens/ListScreen";
import CostsNavigatorScreen from "./screens/CostsNavigatorScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import ProductList, { ProductListProvider } from "./store/ProductsListContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CostsScreen from "./screens/CostsScreen";
import EditOrAddCostScreen from "./screens/EditOrAddCostScreen";
import Toast from "react-native-toast-message";
import ListDisplay from "./screens/ListDisplay";
import Favorits from "./screens/Favorits";
import { useContext } from "react";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const StackNavigation = () => {
    const { productList, favArray } = useContext(ProductList);
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#E39A8E",
          tabBarInactiveTintColor: "#E5B8AF",
        }}
      >
        <Tab.Screen
          name="המוצרים שלי"
          component={ListScreen}
          options={{
            headerTitle: "עוגצפת - תמחורון",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
            headerRight: () => (
              <Image
                style={{ width: 45, height: 45, marginRight: 5 }}
                source={require("./assets/ogaZefet.png")}
              />
            ),
            tabBarBadge: productList.length === 0 ? null : productList.length,
          }}
        />
        <Tab.Screen
          name="מועדפים"
          component={Favorits}
          options={{
            headerTitle: "המועדפים שלי",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="ios-star" size={size} color={color} />
            ),
            headerRight: () => (
              <Image
                style={{ width: 45, height: 45, marginRight: 5 }}
                source={require("./assets/ogaZefet.png")}
              />
            ),
            tabBarBadge: favArray.length === 0 ? null : favArray.length,
          }}
        />
        <Tab.Screen
          name="עלויות"
          component={CostsNavigatorScreen}
          options={{
            headerTitle: "עוגצפת - תמחורון",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="albums" size={size} color={color} />
            ),
            headerRight: () => (
              <Image
                style={{ width: 45, height: 45, marginRight: 5 }}
                source={require("./assets/ogaZefet.png")}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  return (
    <ProductListProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            title: "עוגצפת - תמחורון",
            headerBackTitle: "",
            headerTintColor: "black",
          }}
        >
          <Stack.Screen
            name="Home"
            component={StackNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="costsScreen" component={CostsScreen} />
          <Stack.Screen
            name="addCosts"
            component={EditOrAddCostScreen}
            options={({ navigation }) => ({
              presentation: "modal",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                  activeOpacity={0.6}
                >
                  <Ionicons name="close" size={24} />
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="listDisplay"
            component={ListDisplay}
            options={({ route }) => {
              return { title: route.params?.item.name || "עוגצפת - תמחורון" };
            }}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
      <Toast />
    </ProductListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
