import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import PopUp from '../../components/PopUp'

const ProfileScreen = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [isOpenPopUpLogout, setIsOpenPopUpLogout] = useState(false);
    axios.defaults.withCredentials = true;

    AsyncStorage.getItem('username').then(value => {
      setUsername(value)
    });
    AsyncStorage.getItem('email').then(value => {
      setEmail(value)
    });
    AsyncStorage.getItem('phone').then(value => {
      setPhone(value)
    });

    function handleDelete() {
      axios.get(`${API_URL}logout`)
        .then(res => {
          AsyncStorage.clear()
            .then(() => {
              setIsOpenPopUpLogout(true);
            })
            .catch(error => {
              console.error('Error clearing AsyncStorage:', error);
            });
        })
        .catch(err => {
          console.error('Error logging out:', err);
        });
    }
    
    return (
    <View className="flex flex-1 bg-main-background px-2 py-5">
      
      <View className="flex w-full h-full">
        <View className="bg-[#FFFFFF] px-3 py-4 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="account" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Username</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">{username}</Text>
          </View>
        </View>

        <View className="bg-[#FFFFFF] px-3 py-4 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="email" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Email</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">{email}</Text>
          </View>
        </View>

        <View className="bg-[#FFFFFF] px-3 py-4 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="phone" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Phone</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base">{phone}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={() => { navigation.navigate('HomePage', {screen: 'HelpCenterScreen'}) }} className="bg-[#FFFFFF] px-3 py-4 flex flex-row justify-between items-center rounded-lg shadow-sm shadow-[#ACA9A9] border-b border-[#CCCCCC]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="help-circle" color="#00A9FF" size={30} />
            <Text className="text-base font-medium">Help Center</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base"></Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleDelete} className="bg-main-blue px-3 py-3 mt-5 flex flex-row justify-center items-center rounded-lg shadow-sm shadow-[#ACA9A9]">
          <View className="flex flex-row items-center gap-x-3">
            <MaterialCommunityIcons name="logout" color="#FFFFFF" size={30} />
            <Text className="text-base font-medium text-[#FFFFFF]">Logout</Text>
          </View>

          <View>
            <Text className="text-[#ACA9A9] font-bold text-base"></Text>
          </View>
        </TouchableOpacity>
        
      </View>
    
      <StatusBar style="auto" />
      <PopUpLogoutSuccess title="Logout success" content="You have been logged out!" isOpenPopUp={isOpenPopUpLogout} setIsOpenPopUp={setIsOpenPopUpLogout}/>
    </View>
    )
}

export default ProfileScreen

export function PopUpLogoutSuccess(props) {
  const { title, content, isOpenPopUp, setIsOpenPopUp } = props;
  const navigation = useNavigation();

  const handleClick = () => {
    setIsOpenPopUp(false);
    navigation.navigate('LoginScreen');
  }

  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUp ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(34,34,34,0.3)' }}>
      <View className="w-full h-full flex justify-center items-center">
          <View className="bg-white w-4/5 h-fit min-h-32 flex justify-between rounded-md p-2">
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
                <TouchableOpacity className="flex justify-center items-center bg-green-500 w-12 h-8 rounded-md" onPress={handleClick}>
                    <Text className="text-white font-bold">OK</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    </View>
  )
}