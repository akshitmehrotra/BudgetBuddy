// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const SetupScreen = ({ navigation }) => {
//   const [userName, setUserName] = useState('');
//   const [budget, setBudget] = useState('');

//   const handleSetup = async () => {
//     if (userName && budget) {
//       await AsyncStorage.setItem('userName', userName);
//       await AsyncStorage.setItem('budget', budget);
//       await AsyncStorage.setItem('setupCompleted', 'true');
//       navigation.replace('Home');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Setup Budget</Text>
//       <TextInput
//         placeholder="Enter your name"
//         value={userName}
//         onChangeText={setUserName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Enter your budget"
//         value={budget}
//         onChangeText={setBudget}
//         keyboardType="numeric"
//         style={styles.input}
//       />
//       <TouchableOpacity style={styles.addButton} onPress={handleSetup}>
//         <Text style={styles.buttonText}>Set Up Budget</Text>
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
// });

// export default SetupScreen;
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import * as Updates from 'expo-updates';
const SetupScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [budget, setBudget] = useState('');

  const handleSetup = async () => {
    if (userName && budget) {
      await AsyncStorage.setItem('userName', userName);
      await AsyncStorage.setItem('budget', budget);
      await AsyncStorage.setItem('currentBalance', budget); // Set current balance to budget
      await AsyncStorage.setItem('setupCompleted', 'true');
      navigation.replace('Home');
    }
  };
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
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Setup Budget</Text>
      <TextInput
        placeholder="Enter your name"
        placeholderTextColor={'#999'}
        value={userName}
        onChangeText={setUserName}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter your budget"
        placeholderTextColor={'#999'}
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleSetup}>
        <Text style={styles.buttonText}>Set Up Budget</Text>
      </TouchableOpacity>
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
});

export default SetupScreen;
