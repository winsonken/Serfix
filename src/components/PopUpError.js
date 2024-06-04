import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PopUpError(props) {
  const { title, content, isOpenPopUp, setIsOpenPopUp } = props;
 
  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUp ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(34,34,34,0.3)' }}>
      <View className="w-full h-full flex justify-center items-center">
          <View className="bg-white w-4/5 h-fit min-h-20 flex justify-between rounded-md p-2">
            <View>
                <View className="flex flex-row justify-center items-center space-x-2">
                    <MaterialCommunityIcons name="alert" color="#C40C0C" size={30}/>
                    <Text className="text-xl font-medium text-center">{ title || 'Title'}</Text>
                </View>

                <View className="py-3">
                    <Text className="text-center">{content}</Text>
                </View>
            </View>

            <View className="flex items-center">
                <TouchableOpacity className="flex justify-center items-center bg-green-500 w-12 h-8 rounded-md" onPress={() => { setIsOpenPopUp(false)} }>
                    <Text className="text-white font-bold">OK</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    </View>
  )
}