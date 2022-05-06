import { StyleSheet, TextInput, Button } from 'react-native';
import React, { useState} from 'react';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import axios from "axios";

export default function TabSignin({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const login =async () => {
    try {
      const res = await axios.post('http://192.168.1.18:8080/api/customer-login', {
        email:email,
        password: password
      })
      if(res.data.errCode === 0){
        setMessage('')
        setId(res.data.user.id)
        setUsername(res.data.user.email)
        setFullName(res.data.user.fullName)
        setPhoneNumber(res.data.user.phoneNumber)
        setAddress(res.data.user.address)
      }else{
        setMessage(res.data.message)
        setId('')
        setUsername('')
        setFullName('')
        setPhoneNumber('')
        setAddress('')
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>
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
      <Button
        title="LOGIN"
        onPress={login}
      />
      <Text style={styles.title}>{message ? message : ''}</Text>
      <Text style={styles.title}>{id ? 'Id:' : ''} {id}</Text>
      <Text style={styles.title}>{username ? 'Email:' : ''} {username}</Text>
      <Text style={styles.title}>{fullName ? 'Fullname:' : ''} {fullName}</Text>
      <Text style={styles.title}>{phoneNumber ? 'Phonenumber:' : ''} {phoneNumber}</Text>
      <Text style={styles.title}>{address ? 'Address' : ''} {address}</Text>
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
    marginBottom: 20
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
