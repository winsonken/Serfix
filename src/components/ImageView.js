import { View, Text, Image, TouchableWithoutFeedback, Dimensions, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import PopUpError from './PopUpError';

export default function ImageView(props) {
  const { image, imageLoading, setImageLoading, imageError, setImageError, isOpenPopUpImage, setIsOpenPopUpImage, isOpenPopUpErrorImage, setIsOpenPopUpErrorImage, handleViewImage} = props;
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (image != '' && image != null && isOpenPopUpImage) {
      setImageError(false);
      setImageLoading(false);
      Image.getSize(`${API_URL}uploads/${image}`, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const aspectRatio = width / height;
        const calculatedHeight = screenWidth / aspectRatio;
        setImageHeight(calculatedHeight);
      }, error => {
        setImageError(true)
        setImageLoading(false);
        console.log('Failed to get image size:', error);
      });
    } else if (!image && isOpenPopUpImage) {
      setImageError(true)
      setImageLoading(false);
    }
  }, [isOpenPopUpImage]);

  useEffect(() => {
    if (imageError) {
      setIsOpenPopUpErrorImage(true);
      setImageLoading(false);
    }
  }, [imageError])

  const handleClosePopUpErrorImage = () => {
    setIsOpenPopUpErrorImage(false);
    setIsOpenPopUpImage(false);
    setImageError(false);
    setImageHeight(0);
  }

  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUpImage ? 'block' : 'hidden'} z-50`} style={{ backgroundColor: 'rgba(34,34,34,0.5)' }}>
        <View className="relative w-full h-full flex justify-center items-center">
            <View className="w-[100%] h-[90%] p-5">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {imageLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    <Image
                        source={{ uri: `${API_URL}uploads/${image}` }}
                        
                        onLoad={() => {
                            setImageLoading(true);
                            setImageError(false);
                        }}
                        // onError={() => {
                        //     setImageLoading(false);
                        //     setImageError(true);
                        // }}
                        onLoadEnd={() => {
                          setImageLoading(false);
                        }}
                        className="rounded-md"
                        style={{ height: imageHeight, width: '100%', maxHeight: '100%' }}
                        resizeMode="contain"
                    />
                </View>
                
            </View>
            <View className="absolute top-5 right-5 bg-white rounded-full p-1">
                    <TouchableWithoutFeedback onPress={() => { setIsOpenPopUpImage(false); setImageHeight(0) }}>
                        <MaterialCommunityIcons name="close" color="#222222" size={20} />
                    </TouchableWithoutFeedback>
                </View>
        </View>

        <PopUpErrorImage title="Error" content="Failed to load image" isOpenPopUp={isOpenPopUpErrorImage} handleClose={handleClosePopUpErrorImage} />
    </View>
  )
}

export function PopUpErrorImage(props) {
  const { title, content, isOpenPopUp, handleClose } = props;
 
  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUp ? 'block' : 'hidden'}`} style={{ backgroundColor: 'rgba(34,34,34,0.3)' }}>
      <View className="w-full h-full flex justify-center items-center">
          <View className="bg-white w-4/5 h-fit min-h-20 flex justify-between rounded-md p-2">
            <View>
                <View className="flex flex-row items-center space-x-2">
                    <MaterialCommunityIcons name="alert" color="#C40C0C" size={30}/>
                    <Text className="text-xl font-medium text-center">{ title || 'Title'}</Text>
                </View>

                <View className="py-3 flex items-center">
                    <Text>{content}</Text>
                </View>
            </View>

            <View className="flex items-center">
                <TouchableOpacity className="flex justify-center items-center bg-green-500 w-12 h-8 rounded-md" onPress={handleClose}>
                    <Text className="text-white font-bold">OK</Text>
                </TouchableOpacity>
            </View>
          </View>
      </View>
    </View>
  )
}