import React, { useState,useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated } from 'react-native';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    // Perform authentication logic here
    // For simplicity, let's assume successful login for this example
    // You can replace this with your actual authentication logic
    setIsLogged(true);

    // Start the fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Home');
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {!isLogged && (
        <>
          <Text style={styles.heading}>Login to Your Account</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
