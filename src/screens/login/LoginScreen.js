import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation, Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, ToastAndroid } from 'react-native';

const LoginScreen = () => {
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState ('');
    const [password, setPassword] = useState ('');
    const [userdata, setUserdata] = useState ('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();


    axios.defaults.withCredentials = true;
  
    function handleSubmit() {
      axios.post('http://localhost:8081/LoginScreen/', { user, password })
        .then(res => {
          console.log(res);
          setMessage(res.data.message);
          if (res.data.status === 'success') {
            alert("sukses");
            AsyncStorage.setItem('id', JSON.stringify(res.data.id));
            AsyncStorage.setItem('token', res.data.token);
            AsyncStorage.setItem('username', res.data.name);
            AsyncStorage.setItem('email', res.data.email);
            AsyncStorage.setItem('phone', JSON.stringify(res.data.phone));
            navigation.navigate('HomePage');
          } else {
            alert("gagal");
          }
        })
        .catch(err => {
          console.log(err);
          alert('ID atau Password salah');
          console.log(user)
        });
        
    }
    AsyncStorage.getItem('token').then(value => {
        setToken(value);
    });

    useEffect(() => {
        console.log(token);
        if (token) {
            navigation.navigate('HomePage');
        }
    }, [token]);

    useEffect(() => {
        let backPressCount = 0;
        const TIMEOUT_DURATION = 2000; // 2 seconds
    
        const backAction = () => {
            if (token) {
                // If user is authenticated (has token)
                if (backPressCount === 1) {
                    // If it's the second back press, close the app
                    BackHandler.exitApp();
                    return true; // Prevent default behavior
                } else {
                    // If it's the first back press, show a message and increment the count
                    backPressCount++;
                    ToastAndroid.show('Press back again to close the app', ToastAndroid.SHORT);
                    setTimeout(() => {
                        // Reset the count after the timeout duration
                        backPressCount = 0;
                    }, TIMEOUT_DURATION);
                    return true; // Prevent default behavior
                }
            } else {
                // If user is not authenticated (no token), allow default back button behavior
                return false;
            }
        };
    
        // Add event listener for back button press
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
    
        // Remove event listener on component unmount
        return () => backHandler.remove();
    }, [token]);     
    

    return (
        <View className="flex flex-1 bg-main-background px-5" style={{ paddingTop: insets.top }}>
            <View className="w-full h-full flex justify-center items-center px-5">
                <ScrollView showsVerticalScrollIndicator={false} className="w-full" > 
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
                                    <TextInput placeholder="Email" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setUser(text)}/>
                                </View>

                                <View>
                                    <TextInput secureTextEntry={true} textContentType='password' placeholder="Password" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setPassword(text)}/>
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
                                    <Text className="text-lg text-main-blue font-medium" >Sign up</Text>
                                    </Link>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <StatusBar style="auto" />
        </View>
    )
}

export default LoginScreen