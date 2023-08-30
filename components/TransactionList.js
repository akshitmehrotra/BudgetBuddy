import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';
const ExpensesHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const storedTransactions = await AsyncStorage.getItem('transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    async function checkForUpdates() {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        // Handle the available update
        // You might prompt the user to reload the app or do it automatically
        await applyUpdatesAndReload();
      }
    }

    async function applyUpdatesAndReload() {
      await Updates.fetchUpdateAsync();
      Updates.reloadAsync();
    }

    // Call checkForUpdates when the app is launched
    checkForUpdates();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Expenses History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View style={styles.amountCategoryContainer}>
              <Text style={styles.amount}>₹{item.amount}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
            <Text style={styles.description}>Description: {item.description}</Text>
            <Text style={styles.type}>Type: {item.type}</Text>
            <Text style={styles.date}>Date: {formatDate(item.date)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', // Accent color
    marginVertical: 20,
    alignSelf: 'center',
  },
  transactionItem: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#1E1E1E', // Darker background color
    borderRadius: 10,
  },
  amountCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50', // Accent color
  },
  category: {
    fontSize: 16,
    color: '#ccc',
  },
  description: {
    color: '#ccc',
    marginBottom: 5,
  },
  type: {
    color: '#ccc',
    marginBottom: 5,
  },
  date: {
    color: '#ccc',
  },
});

export default ExpensesHistory;
