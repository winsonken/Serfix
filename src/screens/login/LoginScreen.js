import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation, Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import PopUpError from '../../components/PopUpError';

const LoginScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isOpenPopUpError, setIsOpenPopUpError] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');

    const navigation = useNavigation();

    axios.defaults.withCredentials = true;
  
    function handleSubmit() {
        setEmailError('');
        setPasswordError('');
      
        axios.post(`${API_URL}LoginScreen/`, { user, password })
          .then(res => {
            if (res.data.status === 'success') {
              console.log('Login successful:', res.data); // Debug log
              AsyncStorage.setItem('id', JSON.stringify(res.data.id));
              AsyncStorage.setItem('token', res.data.token);
              AsyncStorage.setItem('username', res.data.name);
              AsyncStorage.setItem('email', res.data.email);
              AsyncStorage.setItem('phone', JSON.stringify(res.data.phone));
              AsyncStorage.setItem('role', res.data.role);
      
              navigation.reset({
                index: 0,
                routes: [{ name: 'HomePage' }],
              });
              setUser('');
              setPassword('');
            } else {
              handleErrors(res.data.message);
            }
          })
          .catch(err => {
            console.log('Login error:', err); // Debug log
            if (err.response && err.response.data && err.response.data.message) {
              handleErrors(err.response.data.message);
            } else {
              setErrorMessages('An error occurred. Please try again.');
              setIsOpenPopUpError(true);
            }
          });
      }

    function handleErrors(message) {
        if (message === 'Akun tidak Terdaftar') {
            setEmailError('Email is not existed');
        } else if (message === 'Password Salah') {
            setPasswordError('Wrong Password');
        }
    }

    AsyncStorage.getItem('token').then(value => {
        setToken(value);
    });

    useEffect(() => {
        if (token) {
            navigation.navigate('HomePage');
        }
    }, [token]);    
  
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className="flex flex-1 bg-main-background px-5" style={{ paddingTop: insets.top }}>
            <View className="w-full h-full flex justify-center items-center px-5">
                <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                    <View className="flex w-full h-screen justify-center items-center gap-y-1">
                        <View className="">
                            <Image source={require("../../../assets/login-img.png")} className="w-[230px] h-[230px]" />
                        </View>

                        <View className="flex justify-center items-center gap-y-8 w-full">
                            <View className="mx-auto">
                                <Text className="text-main-blue text-xl font-bold">Welcome back, please login</Text>
                            </View>

                            <View className="flex gap-y-5 w-full">
                                <View>
                                    <TextInput
                                        placeholder="Email"
                                        className="bg-main-gray px-3 py-2 rounded-md placeholder:text-second-gray placeholder:font-medium"
                                        placeholderTextColor="rgba(0,0,0,0.5)"
                                        onChangeText={text => setUser(text)}
                                        value={user}
                                    />
                                    {emailError ? <Text className="text-red-500">{emailError}</Text> : null}
                                </View>
                                <View>  
                                <View className="relative">
                                    <TextInput
                                        secureTextEntry={!showPassword}
                                        textContentType='password'
                                        placeholder="Password"
                                        className="bg-main-gray px-3 py-2 rounded-md placeholder:text-second-gray placeholder:font-medium"
                                        placeholderTextColor="rgba(0,0,0,0.5)"
                                        onChangeText={text => setPassword(text)}
                                        value={password}
                                    />
                                    <View style={{ position: 'absolute', top: '50%', right: 15, transform: [{ translateY: -12.5 }] }}>
                                        { !showPassword ? <MaterialCommunityIcons name="eye" color="rgba(0,0,0,0.5)" size={25} onPress={() => setShowPassword(!showPassword)}/>
                                        : <MaterialCommunityIcons name="eye-off" color="rgba(0,0,0,0.5)" size={25} onPress={() => setShowPassword(!showPassword)}/> }
                                    </View>         
                                </View>
                                {passwordError ? <Text className="text-red-500">{passwordError}</Text> : null}
                                </View>
                                
                            </View>

                            <View className="w-full">
                                <TouchableOpacity onPress={handleSubmit} className="bg-main-blue w-full py-2 rounded-lg">
                                    <Text className="text-center text-main-text text-lg font-medium">Log In</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center gap-1 mt-3">
                                <Text className="text-lg">Don't have an account?</Text>
                                <Link to={{ screen: 'RegisterScreen' }}>
                                    <Text className="text-lg text-main-blue font-medium">Sign up</Text>
                                </Link>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <PopUpError title="Login Error" content={errorMessages} isOpenPopUp={isOpenPopUpError} setIsOpenPopUp={setIsOpenPopUpError} />
            <StatusBar style="auto" />
            
        </View>
    )
}

export default LoginScreen
