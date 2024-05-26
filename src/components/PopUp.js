import { View, Text } from 'react-native'
import React from 'react'

export default function PopUp(props) {
  const { title, isOpenPopUp, setIsOpenPopUp } = props;
  console.log(isOpenPopUp)
  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUp ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(34,34,34,0.3)' }}>
      <View className="w-full h-full flex justify-center items-center">
          <View className="bg-white w-4/5 h-1/2 rounded-md">
            <Text>{ title || 'Title'}</Text>
          </View>
      </View>
    </View>
  )
}