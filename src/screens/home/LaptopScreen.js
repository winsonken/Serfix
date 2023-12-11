import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-element-dropdown';

export default function LaptopScreen() {
    const navigation = useNavigation();
    const [categoryValue, setCategoryValue] = useState("");
    const [locationValue, setLocationValue] = useState("");
    const [price, setPrice] = useState(0);

    const category = [
        { label: "Camera", value: "Camera"},
        { label: "LCD", value: "LCD"},
        { label: "Battery", value: "Battery"},
        { label: "Speaker", value: "Speaker"},
    ];

    const blankStore = [];
    const store = [
        { label: "BCS", value: "BCS"},
        { label: "Grandmall", value: "Grandmall"},
        { label: "Lucky Plaza", value: "Lucky Plaza"},
    ];

    const serviceLaptop = [
        {
            storeName: "BCS",
            categoryName: "LCD",
            price: 50000
        },
        {
            storeName: "Grandmall",
            categoryName: "LCD",
            price: 60000
        },
        {
            storeName: "Lucky Plaza",
            categoryName: "LCD",
            price: 80000
        },
        {
            storeName: "BCS",
            categoryName: "Camera",
            price: 50000
        },
        {
            storeName: "Grandmall",
            categoryName: "Camera",
            price: 60000
        },
        {
            storeName: "Lucky Plaza",
            categoryName: "Camera",
            price: 80000
        },
        {
            storeName: "BCS",
            categoryName: "Battery",
            price: 50000
        },
        {
            storeName: "Grandmall",
            categoryName: "Battery",
            price: 60000
        },
        {
            storeName: "Lucky Plaza",
            categoryName: "Battery",
            price: 80000
        },
        {
            storeName: "BCS",
            categoryName: "Speaker",
            price: 50000
        },
        {
            storeName: "Grandmall",
            categoryName: "Speaker",
            price: 60000
        },
        {
            storeName: "Lucky Plaza",
            categoryName: "Speaker",
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
                    <Text className="text-main-blue font-medium text-2xl text-center">Laptop Service</Text>

                    <View className="flex gap-y-2">
                        <View className="flex gap-3">
                            <Text className="text-lg font-medium">Device</Text>
                            <TextInput className="bg-[#CDF5FD] rounded-md px-3 py-2" placeholder="Device name"/>
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
                            />
                        </View>

                        <View className="flex flex-row justify-between py-3">
                            <Text className="text-lg font-medium">Price</Text>
                            <Text className="text-xl font-medium">Rp. {price}</Text>
                        </View>

                        <View className="flex flex-col gap-y-3">
                            <Text className="text-lg font-medium">Notes</Text>
                            <TextInput className="bg-[#CDF5FD] p-3 rounded-md" multiline placeholder="Notes" />
                        </View>
                        
                        <View className="flex items-end">
                            <TouchableOpacity className="bg-main-blue w-1/3 flex items-center py-3 rounded mt-3" onPress={() => { navigation.navigate('PaymentScreen')}}>
                                <Text className="text-[#FFFFFF] text-xl font-medium">Submit</Text>
                            </TouchableOpacity>
                        </View>
                    
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}