// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AddTransactionScreen = ({ navigation }) => {
//   const [amount, setAmount] = useState('');
//   const [category, setCategory] = useState('');
//   const [description, setDescription] = useState('');
//   const [transactionType, setTransactionType] = useState('deposit');

//   const handleAddTransaction = async () => {
//     if (!amount || !category) {
//       Alert.alert('Error', 'Amount and category are required.');
//       return;
//     }

//     const parsedAmount = parseFloat(amount);
//     const transactionAmount = transactionType === 'withdrawal' ? -parsedAmount : parsedAmount;

//     try {
//       const existingTransactions = await AsyncStorage.getItem('transactions');
//       const transactions = existingTransactions ? JSON.parse(existingTransactions) : [];
      
//       const budget = await AsyncStorage.getItem('budget');
//       const currentBalance = parseFloat(await AsyncStorage.getItem('currentBalance')) || 0;

//       const newBalance = currentBalance + transactionAmount;

//       if (transactionType === 'withdrawal' && newBalance < 0) {
//         Alert.alert('Error', 'Withdrawal not allowed. Insufficient balance.');
//         return;
//       }

//       if (transactionType === 'deposit' && newBalance > parseFloat(budget)) {
//         Alert.alert('Error', 'Deposit amount exceeds the budget.');
//         return;
//       }

//       const transactionData = {
//         amount: transactionAmount,
//         category,
//         description,
//         type: transactionType,
//         date: new Date().toISOString(),
//       };

//       transactions.push(transactionData);
//       await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
//       await AsyncStorage.setItem('currentBalance', newBalance.toString());

//       navigation.goBack();
//     } catch (error) {
//       console.error('Error saving transaction:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Add Transaction</Text>
//       <TextInput
//         placeholder="Amount"
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Category"
//         value={category}
//         onChangeText={setCategory}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//       />
//       <View style={styles.radioContainer}>
//         <TouchableOpacity
//           style={[styles.radioButton, transactionType === 'deposit' && styles.selectedRadioButton]}
//           onPress={() => setTransactionType('deposit')}
//         >
//           <Text style={styles.radioText}>Deposit</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[styles.radioButton, transactionType === 'withdrawal' && styles.selectedRadioButton]}
//           onPress={() => setTransactionType('withdrawal')}
//         >
//           <Text style={styles.radioText}>Withdrawal</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
//         <Text style={styles.buttonText}>Add Transaction</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#222',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginBottom: 20,
//   },
//   input: {
//     width: '80%',
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     color: '#fff',
//   },
//   addButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   buttonText: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   radioContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   radioButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//     borderColor: '#4CAF50',
//     borderWidth: 2,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   selectedRadioButton: {
//     backgroundColor: '#4CAF50',
//   },
//   radioText: {
//     fontSize: 16,
//     color: '#fff',
//     marginLeft: 5,
//   },
//   balanceText: {
//     fontSize: 18,
//     color: '#fff',
//     marginTop: 10,
//   },
// });

// export default AddTransactionScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Updates } from 'expo';
const AddTransactionScreen = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('deposit');
  const [modalVisible, setModalVisible] = useState(false);

  const commonCategories = ['Groceries', 'Entertainment', 'Transportation', 'Dining', 'Utilities', 'Others'];

  const handleAddTransaction = async () => {
    if (!amount || !category) {
      Alert.alert('Error', 'Amount and category are required.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    const transactionAmount = transactionType === 'withdrawal' ? -parsedAmount : parsedAmount;

    try {
      const existingTransactions = await AsyncStorage.getItem('transactions');
      const transactions = existingTransactions ? JSON.parse(existingTransactions) : [];
      
      const budget = await AsyncStorage.getItem('budget');
      const currentBalance = parseFloat(await AsyncStorage.getItem('currentBalance')) || 0;

      const newBalance = currentBalance + transactionAmount;

      if (transactionType === 'withdrawal' && newBalance < 0) {
        Alert.alert('Error', 'Withdrawal not allowed. Insufficient balance.');
        return;
      }

      if (transactionType === 'deposit' && newBalance > parseFloat(budget)) {
        Alert.alert('Error', 'Deposit amount exceeds the budget.');
        return;
      }

      const transactionData = {
        amount: transactionAmount,
        category,
        description,
        type: transactionType,
        date: new Date().toISOString(),
      };

      transactions.push(transactionData);
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));
      await AsyncStorage.setItem('currentBalance', newBalance.toString());

      navigation.goBack();
    } catch (error) {
      console.error('Error saving transaction:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Transaction</Text>
      <TextInput
        placeholder="Amount"
        placeholderTextColor="#999"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TouchableOpacity style={styles.categoryButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.categoryButtonText}>Select Category: {category || 'Choose Category'}</Text>
      </TouchableOpacity>
      
      <View style={styles.radioContainer}>
        <TouchableOpacity
          style={[styles.radioButton, transactionType === 'deposit' && styles.selectedRadioButton]}
          onPress={() => setTransactionType('deposit')}
        >
          <Text style={styles.radioText}>Deposit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, transactionType === 'withdrawal' && styles.selectedRadioButton]}
          onPress={() => setTransactionType('withdrawal')}
        >
          <Text style={styles.radioText}>Withdrawal</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
        <Text style={styles.buttonText}>Add Transaction</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {commonCategories.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalOption}
                onPress={() => {
                  setCategory(item);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
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
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  radioContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    borderColor: '#4CAF50',
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  selectedRadioButton: {
    backgroundColor: '#4CAF50',
  },
  radioText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  categoryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default AddTransactionScreen;
