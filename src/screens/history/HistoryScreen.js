import { View, Text } from 'react-native'
import React, { useCallback, useMemo, useRef } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HistoryCard from '../../components/HistoryCard'
import HistoryCardDetail from '../../components/HistoryCardDetail'

export default function HistoryScreen({ route }) {
    const serviceHistoryDevice = route.params?.serviceHistoryDevice;
    const serviceHistoryLocation = route.params?.serviceHistoryLocation;
    const serviceHistoryPrice = route.params?.serviceHistoryPrice;
    const serviceHistoryProblem = route.params?.serviceHistoryProblem;
    const serviceHistoryService = route.params?.serviceHistoryService;
    const serviceHistoryStartDate = route.params?.serviceHistoryStartDate;
    const serviceHistoryFinishDate = route.params?.serviceHistoryFinishDate;
    const serviceHistoryWarranty = route.params?.serviceHistoryWarranty;
    const serviceHistoryWarrantyDate = route.params?.serviceHistoryWarrantyDate;
    const serviceHistoryStatus = route.params?.serviceHistoryStatus;
    const serviceHistoryIcon = route.params?.serviceHistoryIcon;

    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["75%"];

    const serviceHistory = [
        {
            id: 1,
            device: "Samsung S9",
            location: "Store1",
            price: 300000,
            service: 'Phone',
            problem: 'LCD',
            startDate: '05 January 2023',
            finishDate: '07 January 2023',
            status: 'Finished',
            warranty: 'Active',
            warrantyDate: '07 January 2024',
            icon: 'cellphone'
        },
        {
            id: 2,
            device: "Macbook Pro 13",
            location: "Store1",
            price: 4000000,
            problem: 'LCD',
            service: 'Laptop',
            startDate: '05 January 2023',
            finishDate: '07 January 2023',
            warranty: 'Active',
            warrantyDate: '07 January 2024',
            status: 'Finished',
            icon: 'laptop'
        },
        {
            id: 3,
            device: "PC",
            location: "Store2",
            price: 4000000,
            problem: 'LCD',
            service: 'PC',
            startDate: '05 January 2023',
            finishDate: '07 January 2023',
            warranty: 'Active',
            warrantyDate: '07 January 2024',
            status: 'Finished',
            icon: 'desktop-tower-monitor'
        }
    ]
    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <View className="flex w-full h-full">
                <View className="flex flex-row items-center gap-x-3">
                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                    <Text className="text-[#ACA9A9] text-base font-bold">19/10/23</Text>
                </View>

                <View className="flex justify-center items-center">
                { serviceHistory.map(allServiceHistory => (
                    <HistoryCard 
                        key = {allServiceHistory.id}
                        serviceHistoryDevice = {allServiceHistory.device}
                        serviceHistoryLocation = {allServiceHistory.location}
                        serviceHistoryPrice = {allServiceHistory.price}
                        serviceHistoryProblem = {allServiceHistory.problem}
                        serviceHistoryService = {allServiceHistory.service}
                        serviceHistoryStartDate = {allServiceHistory.startDate}
                        serviceHistoryFinishDate = {allServiceHistory.finishDate}
                        serviceHistoryWarranty = {allServiceHistory.warranty}
                        serviceHistoryWarrantyDate = {allServiceHistory.warrantyDate}
                        serviceHistoryStatus = {allServiceHistory.status}
                        serviceHistoryIcon = {allServiceHistory.icon}
                        bottomSheetModalRef = {bottomSheetModalRef}
                    />
                ))}
                </View>

                <View className="flex flex-row items-center gap-x-3 mt-5">
                    <MaterialCommunityIcons name="calendar-month" color="#222222" size={30} />
                    <Text className="text-[#ACA9A9] text-base font-bold">15/08/23</Text>
                </View>
            </View>

            <HistoryCardDetail 
                refs={bottomSheetModalRef} 
                index={0}
                snapPoints={snapPoints}
                serviceHistoryDevice = {serviceHistoryDevice}
                serviceHistoryLocation = {serviceHistoryLocation}
                serviceHistoryPrice = {serviceHistoryPrice}
                serviceHistoryProblem = {serviceHistoryProblem}
                serviceHistoryService = {serviceHistoryService}
                serviceHistoryStartDate = {serviceHistoryStartDate}
                serviceHistoryFinishDate = {serviceHistoryFinishDate}
                serviceHistoryWarranty = {serviceHistoryWarranty}
                serviceHistoryWarrantyDate = {serviceHistoryWarrantyDate}
                serviceHistoryStatus = {serviceHistoryStatus}
                serviceHistoryIcon = {serviceHistoryIcon}
            />
        </View>
    )
}