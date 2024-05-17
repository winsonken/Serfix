import { View, Text, Image, Button, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function PaymentScreen() {
    const navigation = useNavigation();
    
    const [pickedDocument, setPickedDocument] = useState(null);

    const pickDocument = async () => {
        try {
        const result = await DocumentPicker.getDocumentAsync();
        setPickedDocument(result);
        
        } catch (error) {
        console.error('Error while picking a document:', error);
        }
    };
console.log(pickedDocument)
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="w-full h-full flex gap-y-10 pt-5">
                <View className="flex bg-second-blue h-fit rounded-sm px-5 py-3 gap-y-3">
                    <Text className="font-bold text-xl">Payment details</Text>

                    <View className="flex w-full">
                        <View className="border-b-2 border-dotted pb-8">
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Type</Text>
                                <Text className="text-xl">Phone LCD Service</Text>
                            </View>
                            
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Cost</Text>
                                <Text className="text-xl">Rp. 5000000</Text>
                            </View>
                        </View>

                        <View className="flex flex-row justify-between items-center pt-5">
                            <Text className="text-xl">Total</Text>
                            <Text className="text-2xl text-[#2AB31E] font-medium">Rp. 5000000</Text>
                        </View>
                    </View>
                </View>

                <View className="flex">
                    <View className="flex flex-row">
                        <Image source={require('../../../assets/payment/example-qr.png')} className="w-48 h-48"/>
                        <View>
                            <Text>Transfer to:</Text>
                            <Text>Serfix 123456789</Text>
                        </View>
                    </View>
                    
                    <View className="mt-3">
                        <TouchableWithoutFeedback>
                            <View className="bg-second-blue p-2 rounded-md">
                                <Text>{pickedDocument && pickedDocument.assets[0].name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <TouchableOpacity className="mt-12" onPress={pickDocument}>
                        <View className="flex flex-row justify-center items-center bg-main-blue w-full p-2 rounded-md">
                            <MaterialCommunityIcons name="upload" color="#FFFFFF" size={30} />
                            <Text className="text-lg text-center text-[#FFFFFF] font-medium">Upload payment image</Text>
                        </View>
                    </TouchableOpacity>
                   
                </View>
            </View>

            <StatusBar style="auto" />
        </View>
    )
}