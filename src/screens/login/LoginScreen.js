import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from 'axios'
import { useNavigation, Link } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BackHandler, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const LoginScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const insets = useSafeAreaInsets();
    const [user, setUser] = useState ('');
    const [password, setPassword] = useState ('');
    const [userdata, setUserdata] = useState ('');
    const [message, setMessage] = useState('');
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const navigation = useNavigation();
    const [errors, setErrors] = useState({ user: '', password: ''});

    const handleSubmit = async() => {
        setErrors({ user: '', password: ''});

        // Validate inputs
        if (!user) {
            setErrors(prev => ({ ...prev, user: 'Email cannot be empty' }));
            return;
        }
        if (!password) {
            setErrors(prev => ({ ...prev, password: 'Password cannot be empty' }));
            return;
        }

        const payload = JSON.stringify({
            user: user,
            password: password,
        })

        try {
            const response = await fetch(`${API_URL}LoginScreen/`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: payload,
            })
            const data = await response.json();
            if (data?.status == "success") {
                AsyncStorage.setItem('id', JSON.stringify(data?.id));
                AsyncStorage.setItem('token', data?.token);
                AsyncStorage.setItem('username', data?.name);
                AsyncStorage.setItem('email', data?.email);
                AsyncStorage.setItem('phone', JSON.stringify(data?.phone));
                AsyncStorage.setItem('role', data?.role);
                setErrors({ user: '', password: ''});
                setUser('');
                setPassword('');
                navigation.navigate('HomePage'); 
            } else if (data?.status == "error"){
                if (data?.message?.toLowerCase() == "Akun tidak terdaftar") setErrors(prev => ({ ...prev, user: data?.message }))
                if (data?.message?.toLowerCase() == "Password salah") setErrors(prev => ({ ...prev, password: data?.message }))
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    // AsyncStorage.getItem('token').then(value => {
    //     setToken(value);
    // });

    // useEffect(() => {
    //     if (token) {
    //         navigation.navigate('HomePage');
    //     }
    // }, [token]);    
    
    const [showPassword, setShowPassword] = useState(false);

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
                                    <TextInput placeholder="Email" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setUser(text)} value={user}/>
                                    {errors.user ? <Text className="text-red-500">{errors.user}</Text> : null}

                                </View>

                                <View>
                                    <View className="relative">
                                        <TextInput secureTextEntry={!showPassword && true} textContentType='password' placeholder="Password" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setPassword(text)} value={password}/>
                                        <View style={{ position: 'absolute', top: '50%', right: 15, transform: [{ translateY: -12.5 }] }}>
                                            { !showPassword ? <MaterialCommunityIcons name="eye" color="#00A9FF" size={25} onPress={() => setShowPassword(!showPassword)}/>
                                            : <MaterialCommunityIcons name="eye-off" color="#00A9FF" size={25} onPress={() => setShowPassword(!showPassword)}/> }
                                        </View>
                                    </View>
                                    {errors.password ? <Text className="text-red-500">{errors.password}</Text> : null}
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