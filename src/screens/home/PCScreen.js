import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';

export default function PCScreen() {
    const navigation = useNavigation();
    const [categoryValue, setCategoryValue] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [price, setPrice] = useState(0);

    const category = [
        { label: "Thermalpaste", value: "Thermalpaste"},
        { label: "Cleaning", value: "Cleaning"},
        { label: "Virus Protection", value: "Virus Protection"},
        { label: "Troubleshooting", value: "Troubleshooting"},
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
            categoryName: "Thermalpaste",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Thermalpaste",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Thermalpaste",
            price: 80000
        },
        {
            storeName: "Store1",
            categoryName: "Cleaning",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Cleaning",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Cleaning",
            price: 80000
        },
        {
            storeName: "Store1",
            categoryName: "Virus Protection",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Virus Protection",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Virus Protection",
            price: 80000
        },
        {
            storeName: "Store1",
            categoryName: "Troubleshooting",
            price: 50000
        },
        {
            storeName: "Store2",
            categoryName: "Troubleshooting",
            price: 60000
        },
        {
            storeName: "Store3",
            categoryName: "Troubleshooting",
            price: 80000
        }
    ]

    function filterItem(item) {
        const serviceLaptopAll = serviceLaptop.map(e => {
            return e;
        })

        const filtered = serviceLaptopAll.filter(e => {
            return (e.storeName == item) && (categoryValue == e.categoryName);
        })
        
        setPrice(filtered[0].price)
        setLocationValue(item)
    }
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false} >
                <View className="w-full h-full flex">
                    <Text className="text-main-blue font-medium text-2xl text-center">PC Service</Text>

                    <View className="flex gap-y-2">
                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Device</Text>
                            <TextInput className="bg-[#CDF5FD] rounded-md px-3 py-2" placeholder="Device name" placeholderTextColor="#00A9FF" />
                        </View>

                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Category</Text>
                            <Dropdown
                                data={category}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Select category"
                                searchPlaceholder="Search category"
                                className="bg-[#CDF5FD] rounded-md px-3 py-2"
                                onChange={item => {
                                    setCategoryValue(item.value);
                                    setPrice(0);
                                }}
                                value={categoryValue}
                                placeholderStyle={{ color: "#00A9FF" }}
                            />
                        </View>

                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Location</Text>
                            <Dropdown
                                data={categoryValue != "" ? store : blankStore}
                                search
                                labelField="label"
                                valueField="value"
                                placeholder="Select location"
                                searchPlaceholder="Search location"
                                className="bg-[#CDF5FD] rounded-md px-3 py-2"
                                onChange={(item) => {filterItem(item.value) }}
                                value={locationValue}
                                placeholderStyle={{ color: "#00A9FF" }}
                            />
                        </View>

                        <View className="flex flex-row justify-between py-3">
                            <Text className="text-lg font-medium">Price</Text>
                            <Text className="text-xl font-medium">Rp. {price}</Text>
                        </View>

                        <View className="flex flex-col gap-y-3">
                            <Text className="text-lg font-medium">Notes</Text>
                            <TextInput className="bg-[#CDF5FD] p-3 rounded-md" multiline placeholder="Notes" placeholderTextColor="#00A9FF" />
                        </View>
                        
                        <View className="flex items-end">
                            <TouchableOpacity className="bg-main-blue w-2/5 flex items-center py-2 rounded mt-3" onPress={() => { navigation.navigate('PaymentScreen')}}>
                                <Text className="text-[#FFFFFF] text-lg font-medium">Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}