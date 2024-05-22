import { View, Text, Image, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RegisterScreen = () => {
    const insets = useSafeAreaInsets();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPass] = useState("");
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);

    axios.defaults.withCredentials = true;

    function handleSubmit() {
        axios.post('http://localhost:8081/register', {username, email, phone, password})
        .then(res => {
            console.log(res);
            alert('Data telah berhasil ditambah.');
            navigation.navigate('LoginScreen');
        }).catch(err => {
            if (err.response && err.response.data) {
                const serverMessage = err.response.data.message;
                if (serverMessage === 'Email already exists') {
                    Alert.alert("Registration Error", "Email already exists");
                } else if (err.response.data.errors) {
                    const validationErrors = err.response.data.errors;
                    let errorMessage = "";
                    validationErrors.forEach(error => {
                        errorMessage += `${error.msg}\n`;
                    });
                    Alert.alert("Registration Error", errorMessage);
                } else {
                    Alert.alert("Registration Error", "An unexpected error occurred. Please try again.");
                }
            } else {
                console.log(err);
                Alert.alert("Registration Error", "An unexpected error occurred. Please try again.");
            }
        });
    }

    return (
        <View className="flex flex-1 bg-main-background px-5" style={{ paddingTop: insets.top }}>
            <View className="w-full h-full flex justify-center items-center px-5">
                <ScrollView showsVerticalScrollIndicator={false} className="w-full"> 
                    <View className="flex w-full h-screen justify-center items-center gap-y-3">
                        <View className="">
                            <Image source={require("../../../assets/register-img.png")} className="w-[200px] h-[200px]" />
                        </View>

                        <View className="flex justify-center items-center gap-y-5 w-full">
                            <View className="mx-auto">
                                <Text className="text-main-blue text-3xl font-bold">Register</Text>
                            </View>

                            <View className="flex gap-y-5 w-full">
                                <View>
                                    <TextInput placeholder="Name" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setUsername(text)}/>
                                </View>

                                <View>
                                    <TextInput placeholder="Email" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setEmail(text)}/>
                                </View>

                                <View>
                                    <TextInput keyboardType='numeric' placeholder="Phone number" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setPhone(text)}/>
                                </View>

                                <View className="relative">
                                    <TextInput secureTextEntry={!showPassword} placeholder="Password" className="bg-second-blue px-3 py-2 rounded-md placeholder:text-main-blue" placeholderTextColor="#00A9FF" onChangeText={text => setPass(text)}/>
                                    <View style={{ position: 'absolute', top: '50%', right: 15, transform: [{ translateY: -12.5 }] }}>
                                        { !showPassword ? 
                                            <MaterialCommunityIcons name="eye" color="#00A9FF" size={25} onPress={() => setShowPassword(!showPassword)}/> : 
                                            <MaterialCommunityIcons name="eye-off" color="#00A9FF" size={25} onPress={() => setShowPassword(!showPassword)}/> 
                                        }
                                    </View>
                                </View>
                            </View>

                            <View className="w-full">
                                <TouchableOpacity onPress={handleSubmit} className="bg-main-blue w-full py-2 rounded-lg">
                                    <Text className="text-center text-main-text text-lg font-medium">Register</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex flex-row items-center gap-1 mt-3">
                                <Text className="text-lg">Already have account?</Text>
                                <Link to={{ screen: 'LoginScreen' }}>
                                    <Text className="text-lg text-main-blue font-medium">Login</Text>
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

export default RegisterScreen;