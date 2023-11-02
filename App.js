import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './screens/home/HomeScreen.js';
import TransactionList from './components/TransactionList.js';
import AddTransactionScreen from './screens/home/AddTrasaction.js';
import SetupScreen from './screens/home/SetupScreen.js';
import * as Updates from 'expo-updates';
const Stack = createNativeStackNavigator();

const App = () => {
  const [initialRoute, setInitialRoute] = useState('Home'); // Default initial route

  useEffect(() => {
    // Check if setup is completed
    const checkSetupStatus = async () => {
      const setupCompleted = await AsyncStorage.getItem('setupCompleted');
      if (!setupCompleted) {
        setInitialRoute('Setup'); // Set initial route to SetupScreen
      }
    };
    
    checkSetupStatus();
  }, []); // Empty dependency array ensures this effect runs only once, on app launch
 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TransactionList" component={TransactionList} />
        <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />
        <Stack.Screen name="Setup" component={SetupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;