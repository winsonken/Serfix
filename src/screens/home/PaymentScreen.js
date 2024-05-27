import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as DocumentPicker from 'expo-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import PopUpSuccess from '../../components/PopUpSuccess';
import PopUpError from '../../components/PopUpError';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();
    const route = useRoute();
    const { serviceId, price, category, type, device, notes, selectedLocation, username} = route.params;
    const [id, setId] = useState("");
    const [isOpenPopUp, setIsOpenPopUp] = useState(false);
    const [isOpenPopUpError, setIsOpenPopUpError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorTitle, setErrorTitle] = useState('');
    const [showPaymentGuide, setShowPaymentGuide] = useState(false);

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

    AsyncStorage.getItem('id').then(value => {
        setId(value);
    });

    const handleProceed = async () => {
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

        formData.append('device', device);
        formData.append('category1', category);
        formData.append('selectedLocation', selectedLocation);
        formData.append('price', price);
        formData.append('notes', notes);
        formData.append('type', type);
        formData.append('id', serviceId);
        formData.append('username', username);

        try {
            const response = await axios.post(`${API_URL}data/laptop/services`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
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

    const paymentGuide = [
        { no: 1, steps: 'Serfix hanya menerima pembayaran dengan transfer nomor rekening bank tertentu.' },
        { no: 2, steps: 'Customer bisa membayar dengan mentransfer ke nomor rekening bank yang telah disediakan.'},
        { no: 3, steps: 'Setelah mentransfer, silahkan mengupload bukti pembayaran pada form upload bukti pembayaran.'},
        { no: 4, steps: 'Setelah upload bukti pembayaran, pihak admin akan memvalidasi transaksi tersebut.'},
        { no: 5, steps: 'Setelah admin memvalidasi, pesanan customer akan langsung diproses oleh pihak toko.'}
    ];

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="w-full h-full flex space-y-3">
                    <View className="flex bg-second-blue h-fit rounded-xl px-5 py-3 space-y-3">
                        <Text className="font-bold text-lg">Payment details</Text>
                        <View className="flex w-full">
                            <View className="border-b-2 border-dotted pb-3">
                                <View className="flex flex-row justify-between">
                                    <Text className="text-sm">Device</Text>
                                    <Text className="text-sm">{device}</Text>
                                </View>
                                <View className="flex flex-row justify-between">
                                    <Text className="text-sm">Type</Text>
                                    <Text className="text-sm">{type} {category}</Text>
                                </View>
                                <View className="flex flex-row justify-between">
                                    <Text className="text-sm">Cost</Text>
                                    <Text className="text-sm">Rp. {price?.toLocaleString("id-ID")}</Text>
                                </View>
                                <View className="flex flex-row justify-between">
                                    <Text className="text-sm">Notes</Text>
                                    <Text className="text-sm">{notes}</Text>
                                </View>
                            </View>
                            <View className="flex flex-row justify-between items-center pt-3">
                                <Text className="text-xl">Total</Text>
                                <Text className="text-2xl text-[#2AB31E] font-medium">Rp. {price?.toLocaleString("id-ID")}</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex bg-second-blue h-fit rounded-xl px-5 py-3 space-y-1">
                        <Text className="font-bold text-base">Payment account</Text>
                        <View className="flex">
                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-base">BCA</Text>
                                <Text>0834517613</Text>
                            </View>

                            <View className="flex flex-row justify-between items-center">
                                <Text className="text-base">BRI</Text>
                                <Text>0876423107</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex bg-second-blue h-fit rounded-xl px-5 py-3 space-y-1">
                        <View className="flex flex-row justify-between items-center">
                            <Text className="font-bold text-base">Payment guide</Text>  
                            <TouchableWithoutFeedback onPress={() => { setShowPaymentGuide(!showPaymentGuide)}}>
                                <MaterialCommunityIcons name={ showPaymentGuide ? 'chevron-up' : 'chevron-down'} color="#000000" size={30} />
                            </TouchableWithoutFeedback>   
                        </View>

                        <View className={`${showPaymentGuide ? 'block' : 'hidden'}`}>
                            <View className="flex justify-start items-center">
                                { paymentGuide?.map((paymentGuides, index) => (
                                    <View key={paymentGuides?.no} className="flex flex-row items-start space-x-1 w-full">
                                        <Text className="font-bold">{ `${index + 1}.` }</Text>
                                        <Text>{paymentGuides?.steps}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    
                    <View className="flex py-1 space-y-3">
                        <Text className="text-base font-bold text-center">Upload payment image</Text>
                        <View>
                            <TouchableWithoutFeedback>
                                <View className="bg-second-blue p-2 rounded-md">
                                    <Text>{pickedDocument ? pickedDocument.name : 'No file chosen'}</Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <Text style={{ display: pickedDocument ? 'none' : 'block' }} className="text-xs text-red-500">File must be JPG/JEPG/PNG</Text>
                        </View>

                        <TouchableOpacity className="bg-second-blue rounded-md p-2" onPress={pickDocument}>
                            <Text className="text-center font-bold">Choose File</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            className="mt-12" 
                            onPress={handleProceed}
                            disabled={!pickedDocument} // Disable button if no document is picked
                        >
                            <View className={`flex flex-row justify-center items-center w-full px-2 py-5 rounded-md ${pickedDocument ? 'bg-main-blue' : 'bg-gray-400'}`}>
                                <Text className="text-lg text-center text-[#FFFFFF] font-medium">Proceed</Text>
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
