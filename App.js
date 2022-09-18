import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import CostsNavigatorScreen from './screens/CostsNavigatorScreen';
import CostsScreen from './screens/CostsScreen';
import EditOrAddCostScreen from './screens/EditOrAddCostScreen';
import Favorits from './screens/Favorits';
import ListDisplay from './screens/ListDisplay';
import ListScreen from './screens/ListScreen';
import ProductList, {ProductListProvider} from './store/ProductsListContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LoginScreen from './screens/LoginScreen';
import Settings from './screens/Settings';
import {Text} from '@rneui/themed';
import SignUp from './screens/SignUp';
import {QueryClient, QueryClientProvider} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userID');
        if (value) {
          setIsLogged(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (e) {
        setIsLoading(false);
        console.log(e);
      }
    };
    getData();
  }, []);

  const StackNavigation = () => {
    const {productList, favArray} = useContext(ProductList);
    return (
      <Tab.Navigator
        screenOptions={({navigation}) => ({
          headerLeft: () => (
            <TouchableOpacity
              style={{marginLeft: 14}}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('settings');
              }}>
              <Ionicons name="settings-sharp" size={32} color={'#645956'} />
            </TouchableOpacity>
          ),
          tabBarActiveTintColor: '#E39A8E',
          tabBarInactiveTintColor: '#E5B8AF',
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}>
        <Tab.Screen
          name="המוצרים שלי"
          component={ListScreen}
          options={{
            headerTitle: 'המוצרים שלי',
            tabBarIcon: ({color, size}) => (
              <View>
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={size}
                  color={color}
                />
              </View>
            ),
            headerRight: () => (
              <Image
                style={{width: 45, height: 45, marginRight: 5}}
                source={require('./assets/ogaZefet.png')}
              />
            ),
            tabBarBadge: productList.length === 0 ? null : productList.length,
          }}
        />
        <Tab.Screen
          name="מועדפים"
          component={Favorits}
          options={{
            headerTitle: 'המועדפים שלי',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="ios-star" size={size} color={color} />
            ),
            headerRight: () => (
              <Image
                style={{width: 45, height: 45, marginRight: 5}}
                source={require('./assets/ogaZefet.png')}
              />
            ),
            tabBarBadge: favArray.length === 0 ? null : favArray.length,
          }}
        />
        <Tab.Screen
          name="עלויות"
          component={CostsNavigatorScreen}
          options={{
            headerTitle: 'עוגצפת - תמחורון',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="clipboard-list" size={size} color={color} />
            ),
            headerRight: () => (
              <Image
                style={{width: 45, height: 45, marginRight: 5}}
                source={require('./assets/ogaZefet.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  if (isLoading) {
    return (
      <Image
        style={{width: '100%', height: '100%'}}
        source={require('./assets/splash.png')}
      />
    );
  } else {
    return (
      <QueryClientProvider client={queryClient}>
        <ProductListProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                title: 'עוגצפת - תמחורון',
                headerBackTitle: '',
                headerTintColor: 'black',
              }}
              initialRouteName={isLogged ? 'Home' : 'loginScreen'}>
              <Stack.Screen
                name="loginScreen"
                component={LoginScreen}
                options={({route}) => {
                  return {
                    title: 'התחברות',
                    headerLeft: () => <></>,
                    headerRight: () => (
                      <Image
                        style={{width: 45, height: 45, marginRight: 5}}
                        source={require('./assets/ogaZefet.png')}
                      />
                    ),
                  };
                }}
              />
              <Stack.Screen
                name="Home"
                component={StackNavigation}
                options={{headerShown: false}}
              />
              <Stack.Screen name="costsScreen" component={CostsScreen} />
              <Stack.Screen
                name="addCosts"
                component={EditOrAddCostScreen}
                options={({navigation}) => ({
                  presentation: 'modal',
                  headerRight: () => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.goBack();
                      }}
                      activeOpacity={0.6}>
                      <Ionicons name="close" size={24} />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen
                name="listDisplay"
                component={ListDisplay}
                options={({route}) => {
                  return {title: route.params?.item.name || 'עוגצפת - תמחורון'};
                }}
              />

              <Stack.Screen
                name="settings"
                component={Settings}
                options={({route}) => {
                  return {
                    title: 'הגדרות',
                    headerRight: () => (
                      <Image
                        style={{width: 45, height: 45, marginRight: 5}}
                        source={require('./assets/ogaZefet.png')}
                      />
                    ),
                  };
                }}
              />
              <Stack.Screen
                name="signUp"
                component={SignUp}
                options={({route}) => {
                  return {
                    title: 'הרשמה',
                    headerRight: () => (
                      <Image
                        style={{width: 45, height: 45, marginRight: 5}}
                        source={require('./assets/ogaZefet.png')}
                      />
                    ),
                  };
                }}
              />
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
          <Toast />
        </ProductListProvider>
      </QueryClientProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
