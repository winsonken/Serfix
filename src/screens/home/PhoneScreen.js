import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhoneScreen = () => {
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
    axios.defaults.withCredentials = true;

    function handleSubmit() {
        axios.post('http://localhost:8082/data/phone/services', {device, category1, selectedLocation, price, notes, id, username})
        .then(res => {
            console.log(res);
            navigation.navigate('PaymentScreen', { serviceId: res.data.id, price : res.data.price, category : res.data.category, type : res.data.type });
        }).catch(err => console.log(err));
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
        setId(value)
        console.log(value);
    });

    AsyncStorage.getItem('username').then(value => {
        setUsername(value)
        console.log(value);
    });

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:8082/data/phone/categories?type=Phone');
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchLocation = async () => {
        try {
            const response = await axios.get('http://localhost:8082/data/phone/location?type=Phone&category=' + category1);
            setLocation(response.data.data || []);
        } catch (error) {
            console.error('Error fetching location:', error);
        }
    };

    const category = [
        { label: "Camera", value: "Camera"},
        { label: "LCD", value: "LCD"},
        { label: "Battery", value: "Battery"},
        { label: "Speaker", value: "Speaker"},
    ];

    const blankStore = [];
    const store = [
        { label: "Store1", value: "Store1"},
        { label: "Store2", value: "Store2"},
        { label: "Store3", value: "Store3"},
    ];

    const serviceLaptop = [
        {
            storeName: "Store1",
            categoryName: "LCD",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "LCD",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "LCD",
            price: 80000
        },
        {
            storeName: "Store1",
            categoryName: "Camera",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Camera",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Camera",
            price: 80000
        },
        {
            storeName: "Store1",
            categoryName: "Battery",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Battery",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Battery",
            price: 80000
        },
        {
            storeName: "Store1",
            categoryName: "Speaker",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Speaker",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Speaker",
            price: 80000
        }
    ]

    const handleCategoryChange = async (item) => {
        setCategory1(item.value);
        setPrice(0);
        await fetchLocation();
    };

    const handleLocationChange = async (item) => {
        setSelectedLocation(item.value); // Update selected location
        try {
            const response = await axios.get(`http://localhost:8082/data/phone/price?category=${category1}&location=${item.value}`);
            const priceData = response.data.data;
            if (priceData) {
                setPrice(priceData.price);
            } else {
                setPrice(0);
            }
        } catch (error) {
            console.error('Error fetching price:', error);
            setPrice(0);
        }
    };

    function filterItem(item) {
        console.log("Selected item:", item);
        console.log("Selected category:", category1);
    
        // Filter serviceLaptop array based on selected store and category
        const filtered = serviceLaptop.find(e => e.storeName === item && e.categoryName === category1);
        console.log("Filtered item:", filtered);
    
        if (filtered) {
            // If a matching item is found, update the price state
            console.log("Setting price:", filtered.price);
            setPrice(filtered.price);
            setLocationValue(item);
        } else {
            // If no matching item is found, set price to 0 and location value to empty string
            console.log("No matching item found. Setting price to 0.");
            setPrice(0);
            setLocationValue('');
        }
    }
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false} >
                <View className="w-full h-full flex">
                    <Text className="text-main-blue font-medium text-2xl text-center">Phone Service</Text>

                    <View className="flex gap-y-2">
                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Device</Text>
                            <TextInput className="bg-[#CDF5FD] rounded-md px-3 py-2" placeholder="Device name" placeholderTextColor={"#00A9FF"} onChangeText={text => setDevice(text)}/>
                        </View>

                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Category</Text>
                            <Dropdown
                                data={categories.map(cat => ({ label: cat.name, value: cat.name }))}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Select category"
                                searchPlaceholder="Search category"
                                className="bg-[#CDF5FD] rounded-md px-3 py-2"
                                onChange={handleCategoryChange}
                                value={category1}
                                placeholderStyle={{ color: "#00A9FF" }}
                            />
                        </View>

                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Location</Text>
                            <Dropdown
                                data={location.map(loc => ({ label: loc.name, value: loc.name }))}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Select location"
                                searchPlaceholder="Search location"
                                className="bg-[#CDF5FD] rounded-md px-3 py-2"
                                onChange={handleLocationChange}
                                value={selectedLocation}
                                placeholderStyle={{ color: "#00A9FF" }}
                            />
                        </View>

                        <View className="flex flex-row justify-between py-3">
                            <Text className="text-lg font-medium">Price</Text>
                            <Text className="text-xl font-medium" onChangeText={text => setPrice(text)}>Rp. {price}</Text>
                        </View>

                        <View className="flex flex-col gap-y-3">
                            <Text className="text-lg font-medium">Notes</Text>
                            <TextInput className="bg-[#CDF5FD] p-3 rounded-md" multiline numberOfLines={3} textAlignVertical="top" placeholder="Notes" placeholderTextColor="#00A9FF" onChangeText={text => setNotes(text)}/>
                        </View>

                        <View className="flex flex-col gap-y-3">
                            {/* <Text className="text-lg font-medium">User</Text> */}
                            {/*  <Text className="text-xl font-medium" onChangeText={text => setId(text)}>{id}</Text> */}
                        </View>
                        
                        <View className="flex flex-col gap-y-3">
                            {/* <Text className="text-lg font-medium">User</Text> */}
                            {/*  <Text className="text-xl font-medium" onChangeText={text => setUsername(text)}>{username}</Text> */}
                        </View>
                        
                        <View className="flex items-end">
                            <TouchableOpacity className="bg-main-blue w-2/5 flex items-center py-2 rounded mt-3" onPress={handleSubmit}>
                                <Text className="text-[#FFFFFF] text-lg font-medium">Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </View>
            </ScrollView>

            <StatusBar style="auto" />
        </View>
    )
}

export default PhoneScreen