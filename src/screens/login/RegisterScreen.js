import { View, Text, Image, TextInput, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, Link } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PopUpError from '../../components/PopUpError';

const RegisterScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const insets = useSafeAreaInsets();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPass] = useState("");
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    const [isOpenPopUpError, setIsOpenPopUpError] = useState(false);
    const [isOpenPopUpSuccess, setIsOpenPopUpSuccess] = useState(false);
    const [errorMessages, setErrorMessages] = useState('');

    axios.defaults.withCredentials = true;

    function handleSubmit() {
        axios.post(`${API_URL}register`, {username, email, phone, password})
        .then(res => {
            setIsOpenPopUpSuccess(true);
        }).catch(err => {
            if (err.response && err.response.data) {
                const serverMessage = err.response.data.message;
                if (serverMessage === 'Email already exists') {
                    setErrorMessages(serverMessage);
                    setIsOpenPopUpError(true);
                } else if (err.response.data.errors) {
                    const validationErrors = err.response.data.errors;
                    let errorMessage = "";
                    validationErrors.forEach(error => {
                        errorMessage += `- ${error.msg}\n`;
                    });
                    setErrorMessages(errorMessage)
                    // Alert.alert("Registration Error", errorMessage);
                    setIsOpenPopUpError(true);
                } else {
                    setErrorMessages("An unexpected error occurred. Please try again.");
                    setIsOpenPopUpError(true);
                }
            } else {
                console.log(err);
                setErrorMessages("An unexpected error occurred. Please try again.");
                setIsOpenPopUpError(true);
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
            
            <PopUpError title="Registration Error" content={errorMessages} isOpenPopUp={isOpenPopUpError} setIsOpenPopUp={setIsOpenPopUpError} />
            <PopUpRegisterSuccess title="Registration Success" content={"Data has been added successfully!"} isOpenPopUp={isOpenPopUpSuccess} setIsOpenPopUp={setIsOpenPopUpSuccess} />
            <StatusBar style="auto" />
        </View>
    )
}

export default RegisterScreen;

export function PopUpRegisterSuccess(props) {
    const { title, content, isOpenPopUp, setIsOpenPopUp } = props;
    const navigation = useNavigation();
  
    return (
      <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUp ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(34,34,34,0.3)' }}>
        <View className="w-full h-full flex justify-center items-center">
            <View className="bg-white w-4/5 h-fit min-h-20 flex justify-between rounded-md p-2">
              <View>
                  <View className="flex flex-row items-center space-x-2">
                      <MaterialCommunityIcons name="check-circle" color="#65B741" size={30}/>
                      <Text className="text-xl font-medium text-center">{ title || 'Title'}</Text>
                  </View>
  
                  <View className="py-3">
                      <Text>{content}</Text>
                  </View>
              </View>
  
              <View className="flex items-center">
                  <TouchableOpacity className="flex justify-center items-center bg-green-500 w-12 h-8 rounded-md" onPress={() => { navigation.navigate('LoginScreen') } }>
                      <Text className="text-white font-bold">OK</Text>
                  </TouchableOpacity>
              </View>
            </View>
        </View>
      </View>
    )
  }