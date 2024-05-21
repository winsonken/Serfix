import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

const PaymentScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { serviceId, price, category, type } = route.params;

    console.log("Service ID:", serviceId);
    console.log("Price:", price);
    console.log("Category:", category);
    console.log("Type:", type);

    const [pickedDocument, setPickedDocument] = useState(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync();
                setPickedDocument(result);
                console.log("Picked document:", result);
        } catch (error) {
            console.error('Error while picking a document:', error);
        }
    };

    const handleUpload = async () => {
        console.log("handleUpload function called");

        if (!pickedDocument) {
            console.error('No file selected for upload');
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: pickedDocument.uri,
            name: pickedDocument.name,
            type: pickedDocument.mimeType || 'application/octet-stream',
        });

        console.log("FormData constructed:", formData);

        try {
            console.log("Sending request to server...");
            const response = await axios.post('http://192.168.100.7:8082/uploadbukti', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Response received:", response.data);
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="w-full h-full flex gap-y-10 pt-5">
                <View className="flex bg-second-blue h-fit rounded-sm px-5 py-3 gap-y-3">
                    <Text className="font-bold text-xl">Payment details</Text>
                    <View className="flex w-full">
                        <View className="border-b-2 border-dotted pb-8">
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Type</Text>
                                <Text className="text-xl">{type} {category}</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Cost</Text>
                                <Text className="text-xl">Rp. {price}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between items-center pt-5">
                            <Text className="text-xl">Total</Text>
                            <Text className="text-2xl text-[#2AB31E] font-medium">Rp. {price}</Text>
                        </View>
                    </View>
                </View>
                <View className="flex">
                    <View className="flex flex-row">
                        <Image source={require('../../../assets/payment/example-qr.png')} className="w-48 h-48" />
                        <View>
                            <Text>Transfer to:</Text>
                            <Text>Serfix 123456789</Text>
                        </View>
                    </View>
                    <View className="mt-3">
                        <TouchableWithoutFeedback>
                            <View className="bg-second-blue p-2 rounded-md">
                                <Text>{pickedDocument && pickedDocument.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableOpacity className="mt-12" onPress={pickDocument}>
                        <View className="flex flex-row justify-center items-center bg-main-blue w-full p-2 rounded-md">
                            <MaterialCommunityIcons name="upload" color="#FFFFFF" size={30} />
                            <Text className="text-lg text-center text-[#FFFFFF] font-medium">Pick payment image</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity className="mt-12" onPress={handleUpload}>
                        <View className="flex flex-row justify-center items-center bg-main-blue w-full p-2 rounded-md">
                            <MaterialCommunityIcons name="upload" color="#FFFFFF" size={30} />
                            <Text className="text-lg text-center text-[#FFFFFF] font-medium">Upload payment image</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
};

export default PaymentScreen;