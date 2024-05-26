import { View, Text, Image, TouchableWithoutFeedback, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import PopUpSuccess from '../../components/PopUpSuccess';
import PopUpError from '../../components/PopUpError';

const PaymentScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();
    const route = useRoute();
    const { serviceId, price, category, type, device, notes } = route.params;
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [isOpenPopUpError, setIsOpenPopUpError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');

    const [pickedDocument, setPickedDocument] = useState(null);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync();
            if (result.assets && result.assets.length > 0) {
                const document = result.assets[0];
                if (document && document.uri && document.name && (document?.mimeType == 'image/jpeg' || document?.mimeType == 'image/jpg' || document?.mimeType == 'image/png')) {
                    setPickedDocument(document);
                } else {
                    setErrorTitle('Invalid file');
                    setErrorMessage('Please select image only');
                    setIsOpenPopUpError(true);
                }
            } else {
                console.log('Document picker returned no assets');
            }
        } catch (error) {
            setErrorTitle('Error');
            setErrorMessage('Failed to pick image, please try again');
            setIsOpenPopUpError(true);
            console.log('Error while picking a document:', error);
        }
    };

    const handleUpload = async () => {
        if (!pickedDocument || !pickedDocument.uri || !pickedDocument.name) {
            setErrorTitle('Error');
            setErrorMessage('No file selected');
            setIsOpenPopUpError(true);
            return;
        }

        const formData = new FormData();
        formData.append('image', {
            uri: pickedDocument.uri,
            name: pickedDocument.name,
            type: pickedDocument.mimeType || 'application/octet-stream',
        });

        formData.append('service_id', serviceId);

        try {
            console.log("Sending request to server...");
            const response = await axios.post(`${API_URL}uploadbukti`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Response received:", response.data);
            setIsOpenPopUp(true);
        } catch (error) {
            if (error.response) {
                console.log('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.log('No response received from the server:', error.request);
            } else {
                console.log('Error setting up the request:', error.message);
            }
        }
    };

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false}>
            <View className="w-full h-full flex gap-y-10 pt-5">
                <View className="flex bg-second-blue h-fit rounded-sm px-5 py-3 gap-y-3">
                    <Text className="font-bold text-xl">Payment details</Text>
                    <View className="flex w-full">
                        <View className="border-b-2 border-dotted pb-8">
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Device</Text>
                                <Text className="text-xl">{device}</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Type</Text>
                                <Text className="text-xl">{type} {category}</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Cost</Text>
                                <Text className="text-xl">Rp. {price?.toLocaleString("id-ID")}</Text>
                            </View>
                            <View className="flex flex-row justify-between">
                                <Text className="text-xl">Notes</Text>
                                <Text className="text-xl">{notes}</Text>
                            </View>
                        </View>
                        <View className="flex flex-row justify-between items-center pt-5">
                            <Text className="text-xl">Total</Text>
                            <Text className="text-2xl text-[#2AB31E] font-medium">Rp. {price?.toLocaleString("id-ID")}</Text>
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
                                <Text>{pickedDocument ? pickedDocument.name : 'No image selected'}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <TouchableOpacity className="mt-12" onPress={pickDocument}>
                        <View className="flex flex-row justify-center items-center bg-main-blue w-full p-2 rounded-md">
                            <MaterialCommunityIcons name="upload" color="#FFFFFF" size={30} />
                            <Text className="text-lg text-center text-[#FFFFFF] font-medium">Pick payment image</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className="mt-12" 
                        onPress={handleUpload}
                        disabled={!pickedDocument} // Disable button if no document is picked
                    >
                        <View className={`flex flex-row justify-center items-center w-full p-2 rounded-md ${pickedDocument ? 'bg-main-blue' : 'bg-gray-400'}`}>
                            <MaterialCommunityIcons name="upload" color="#FFFFFF" size={30} />
                            <Text className="text-lg text-center text-[#FFFFFF] font-medium">Upload payment image</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>

            <PopUpSuccess title="Service success" content="Bukti telah berhasil di upload, silahkan menunggu konfirmasi dari admin" isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />
            <PopUpError title="Invalid file" content={errorMessage} isOpenPopUp={isOpenPopUpError} setIsOpenPopUp={setIsOpenPopUpError} />
            <StatusBar style="auto" />
        </View>
    );
};

export default PaymentScreen;
