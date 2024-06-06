import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LaptopScreen = () => {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const navigation = useNavigation();
    const [id, setId] = useState("");
    const [username, setUsername] = useState("");
    const [categoryValue, setCategoryValue] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [price, setPrice] = useState(0);
    const [device, setDevice] = useState("");
    const [category1, setCategory1] = useState("");
    const [categories, setCategories] = useState([]);
    const [location, setLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({ device: '', category: '', location: '', notes: '' });
    const maxDeviceLength = 15;
    const maxNotes = 35;
    axios.defaults.withCredentials = true;

    function handleSubmit() {
        // Reset errors
        setErrors({ device: '', category: '', location: '' });

        // Validate inputs
        if (!device) {
            setErrors(prev => ({ ...prev, device: 'Device name cannot be empty' }));
            return;
        } else if (device?.length > maxDeviceLength) {
            setErrors(prev => ({ ...prev, device: `Device name cannot exceed ${maxDeviceLength} characters` }));
            return;
        }

        if (!category1) {
            setErrors(prev => ({ ...prev, category: 'Category cannot be empty' }));
            return;
        }
        if (!selectedLocation) {
            setErrors(prev => ({ ...prev, location: 'Location cannot be empty' }));
            return;
        }

        if (notes?.length > maxNotes) {
            setErrors(prev => ({ ...prev, notes: `Notes name cannot exceed ${maxNotes} characters` }));
            return;
        }

        const type = "Laptop"
        navigation.navigate('PaymentScreen', { serviceId: id, price: price, category: category1, device:device, notes:notes, selectedLocation : selectedLocation, username : username, type : type });
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (category1) {
            fetchLocation();
        }
    }, [category1]);

    AsyncStorage.getItem('id').then(value => {
        setId(value);
    });

    AsyncStorage.getItem('username').then(value => {
        setUsername(value);
    });

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}data/laptop/categories?type=Laptop`);
            setCategories(response.data.data);
        } catch (error) {
            console.log('Error fetching categories:', error);
        }
    };

    const fetchLocation = async () => {
        try {
            const response = await axios.get(`${API_URL}data/laptop/location?type=Laptop&category=` + category1);
            setLocation(response.data.data || []);
        } catch (error) {
            console.log('Error fetching location:', error);
        }
    };

    const handleCategoryChange = async (item) => {
        setCategory1(item.value);
        setPrice(0);
        await fetchLocation();
    };

    const handleLocationChange = async (item) => {
        setSelectedLocation(item.value); // Update selected location
        try {
            const response = await axios.get(`${API_URL}data/laptop/price?category=${category1}&location=${item.value}`);
            const priceData = response.data.data;
            if (priceData) {
                setPrice(priceData.price);
            } else {
                setPrice(0);
            }
        } catch (error) {
            console.log('Error fetching price:', error);
            setPrice(0);
        }
    };

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="w-full h-full flex">
                    <Text className="text-main-blue font-medium text-2xl text-center">Laptop Service</Text>

                    <View className="flex gap-y-2">
                        <View>
                            <View className="flex gap-3">
                                <Text className="text-lg font-medium">Device</Text>
                                <TextInput
                                    className="bg-main-gray rounded-md px-3 py-2"
                                    placeholder="Device name"
                                    placeholderTextColor="rgba(0,0,0,0.5)"
                                    onChangeText={text => setDevice(text)}
                                />
                            </View>
                            {errors.device ? <Text className="text-red-500">{errors.device}</Text> : null}
                        </View>

                        <View>
                            <View className="flex gap-3">
                                <Text className="text-lg font-medium">Category</Text>
                                <Dropdown
                                    data={categories.map(cat => ({ label: cat.name, value: cat.name }))}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select category"
                                    searchPlaceholder="Search category"
                                    className="bg-main-gray rounded-md px-3 py-2"
                                    onChange={handleCategoryChange}
                                    value={category1}
                                    placeholderStyle={{ color: "rgba(0,0,0,0.5)" }}
                                />
                            </View>
                            {errors.category ? <Text className="text-red-500">{errors.category}</Text> : null}
                        </View>

                        <View>
                            <View className="flex gap-3">
                                <Text className="text-lg font-medium">Location</Text>
                                <Dropdown
                                    data={location.map(loc => ({ label: loc.name, value: loc.name }))}
                                    search
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Select location"
                                    searchPlaceholder="Search location"
                                    className="bg-main-gray rounded-md px-3 py-2"
                                    onChange={handleLocationChange}
                                    value={selectedLocation}
                                    placeholderStyle={{ color: "rgba(0,0,0,0.5)" }}
                                />
                            </View>
                            {errors.location ? <Text className="text-red-500">{errors.location}</Text> : null}
                        </View>

                        <View className="flex flex-row justify-between py-3">
                            <Text className="text-lg font-medium">Price</Text>
                            <Text className="text-xl font-medium">Rp. {price?.toLocaleString("id-ID")}</Text>
                        </View>

                        <View>
                            <View>
                                <View className="flex flex-col gap-y-3">
                                    <Text className="text-lg font-medium">Notes</Text>
                                    <TextInput
                                        className="bg-main-gray p-3 rounded-md"
                                        multiline
                                        numberOfLines={3}
                                        textAlignVertical="top"
                                        placeholder="Notes"
                                        placeholderTextColor="rgba(0,0,0,0.5)"
                                        onChangeText={text => setNotes(text)}
                                    />
                                </View>
                                {errors.notes ? <Text className="text-red-500">{errors.notes}</Text> : null}

                            </View>
                        </View>

                        <View className="flex items-end">
                            <TouchableOpacity className="bg-main-blue w-2/5 flex items-center py-2 rounded-lg mt-3" onPress={handleSubmit}>
                                <Text className="text-[#FFFFFF] text-lg font-medium">Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    );
}

export default LaptopScreen;
