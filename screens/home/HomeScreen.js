import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HomeScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('User');
  const [budget, setBudget] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const handleClearData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
      fetchUserInfo();
      updateCurrentBalance();
      Alert.alert('Success', 'All data cleared. Set Up new Budget');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const fetchUserInfo = async () => {
    const name = await AsyncStorage.getItem('userName');
    const userBudget = await AsyncStorage.getItem('budget');
    const balance = await AsyncStorage.getItem('currentBalance'); // Fetch current balance from AsyncStorage
    setUserName(name || 'User');
    setBudget(parseFloat(userBudget) || 0);
    setCurrentBalance(parseFloat(balance) || 0);
  };

  const updateCurrentBalance = async () => {
    const transactions = await AsyncStorage.getItem('transactions');
    if (transactions) {
      const parsedTransactions = JSON.parse(transactions);
      const newBalance = parsedTransactions.reduce((total, transaction) => {
        return total + transaction.amount;
      }, parseFloat(budget)); // Use parseFloat for accurate calculations
      setCurrentBalance(newBalance);
    } else {
      setCurrentBalance(parseFloat(budget)); // Use parseFloat for accurate calculations
    }
  };
  const getProgressColor = () => {
    const progress = calculateProgress();
    if (progress < 25) {
      return '#FF5733'; // Red
    } else if (progress < 50) {
      return '#FFA500'; // Orange
    } else if (progress < 75) {
      return '#FFD700'; // Yellow
    } else {
      return '#4CAF50'; // Green (default)
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserInfo();
      updateCurrentBalance();
    });

    return unsubscribe;
  }, [navigation]);

  const calculateProgress = () => {
    return (currentBalance / budget) * 100;
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Budget Tracker App</Text>
        <Text style={styles.userName}>Hello, {userName}</Text>
        <Text style={styles.budget}>Total Budget: ₹{budget}</Text>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearData}>
        <Ionicons name="trash" size={25} color="#fff" />
      </TouchableOpacity>
      <View style={styles.circleContainer}>
        <ProgressCircle
          percent={calculateProgress()}
          radius={80}
          borderWidth={8}
          color={getProgressColor()}
          shadowColor="#999"
          bgColor="#fff"
        >
          <Text style={styles.progressText}>₹{currentBalance.toFixed(2)}</Text>
       
        </ProgressCircle>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('TransactionList')}
        >
          <Text style={styles.buttonText}>Expenditure History</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AddTransaction')}
        >
          <Text style={styles.buttonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Setup')}
        >
          <Text style={styles.buttonText}>Set Up Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  userName: {
    fontSize: 18,
    color: '#fff',
  },
  budget: {
    fontSize: 18,
    color: '#fff',
  },
  circleContainer: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
    zIndex: 10,
  },
});

export default HomeScreen;
