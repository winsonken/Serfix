import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ImageView(props) {
  const { image, imageLoading, setImageLoading, imageError, setImageError, isOpenPopUpImage, setIsOpenPopUpImage} = props;
  const API_URL = process.env.EXPO_PUBLIC_API_URL;
  const [imageHeight, setImageHeight] = useState(0);

  useEffect(() => {
    if (image && isOpenPopUpImage) {
      Image.getSize(`${API_URL}uploads/${image}`, (width, height) => {
        const screenWidth = Dimensions.get('window').width;
        const aspectRatio = width / height;
        const calculatedHeight = screenWidth / aspectRatio;
        setImageHeight(calculatedHeight);
      }, error => {
        console.error('Failed to get image size:', error);
      });
    }
  }, [image, isOpenPopUpImage]);

  return (
    <View className={`absolute top-0 bottom-0 left-0 right-0 ${isOpenPopUpImage ? 'block' : 'hidden'} z-50`} style={{ backgroundColor: 'rgba(34,34,34,0.5)' }}>
        <View className="relative w-full h-full flex justify-center items-center">
            <View className="w-[100%] h-[90%] p-5">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {imageLoading && <ActivityIndicator size="large" color="#0000ff" />}
                    <Image
                        source={{ uri: `${API_URL}uploads/${image}` }}
                        onLoadStart={() => {
                            setImageLoading(true);
                            setImageError(false); // Reset the image error state
                        }}
                        onLoad={() => {
                            setImageLoading(false);
                        }}
                        onError={() => {
                            setImageLoading(false);
                            setImageError(true);
                        }}
                        className="rounded-md"
                        style={{ height: imageHeight, width: '100%', maxHeight: '100%' }}
                        resizeMode="contain"
                    />
                    {imageError && <Text style={{ color: 'red', marginTop: 10 }}>Failed to load image</Text>}
                </View>
                
            </View>
            <View className="absolute top-5 right-5 bg-white rounded-full p-1">
                    <TouchableWithoutFeedback onPress={() => { setIsOpenPopUpImage(false) }}>
                        <MaterialCommunityIcons name="close" color="#222222" size={20} />
                    </TouchableWithoutFeedback>
                </View>
        </View>
    </View>
  )
}
