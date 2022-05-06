import { StyleSheet,TextInput, Button,Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import React, { useState } from 'react';
import axios from "axios";

export default function TabSignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const [message, setMessage] = useState('');

  const register =async () => {
    try {
      const res = await axios.post('http://192.168.1.59:8080/api/create-new-user', {
        email:email,
        password: password,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address
      })
      if(res.data.errCode === 0){
        setMessage('Sign up successful!')
      }else{
        setMessage(res.data.errMessage)
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <TextInput
        style={{height: 40, width: 300}}
        placeholder="Email"
        onChangeText={newText => setEmail(newText)}
        defaultValue={email}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={{height: 40, width: 300}}
        placeholder="Password"
        onChangeText={newText => setPassword(newText)}
        defaultValue={password}
        secureTextEntry={true}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={{height: 40, width: 300}}
        placeholder="Full name"
        onChangeText={newText => setFullName(newText)}
        defaultValue={fullName}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={{height: 40, width: 300}}
        placeholder="Phone number"
        onChangeText={newText => setPhoneNumber(newText)}
        defaultValue={phoneNumber}
      />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TextInput
        style={{height: 40, width: 300}}
        placeholder="Address"
        onChangeText={newText => setAddress(newText)}
        defaultValue={address}
      />
      <Button
        title="REGISTER"
        onPress={register}
      />
      <Text style={styles.title}>{message ? message : ''}</Text>

      {/* <EditScreenInfo path="/screens/TabSignup.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
