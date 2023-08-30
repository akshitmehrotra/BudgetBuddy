import React, { useState,useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Animated } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleSignUp = () => {
    // Perform user registration logic here
    // For simplicity, let's assume successful registration for this example
    // You can replace this with your actual registration logic
    setIsRegistered(true);

    // Start the fade-out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('Login');
    });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {!isRegistered && (
        <>
          <Text style={styles.heading}>Sign Up for an Account</Text>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
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
          <Button title="Sign Up" onPress={handleSignUp} />
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

export default SignUpScreen;
