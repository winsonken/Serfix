import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react'
import TrackCard from '../../components/TrackCard';
import TrackCardDetail from '../../components/TrackCardDetail';
import { StatusBar } from 'expo-status-bar';
import ServiceCard from '../../components/ServiceCard';
import ServiceCardDetail from '../../components/ServiceCardDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler'

function ServiceScreen({ route }) {
    const [services, setServices] = useState([]);
    const [activeTabs, setActiveTabs] = useState(1);
    const serviceId = route.params?.serviceId;
    const serviceUser = route.params?.serviceUser;
    const serviceDeviceName = route.params?.serviceDeviceName;
    const serviceCategory = route.params?.serviceCategory;
    const serviceStore = route.params?.serviceStore;
    const servicePrice = route.params?.servicePrice;
    const serviceNotes = route.params?.serviceNotes;
    const serviceStatus = route.params?.serviceStatus;
    const serviceType = route.params?.serviceType;
    const serviceStartDate = route.params?.serviceStartDate;
    const serviceEndDate = route.params?.serviceEndDate;

    useEffect(() => {
        fetchDataValidation(activeTabs);
    }, [activeTabs]);

    const refreshData = () => {
        fetchDataValidation(activeTabs); // Call the fetch function to refresh the data
    };

    const fetchDataValidation = async (status) => {
        try {
            const response = await axios.get(`http://localhost:8081/admin-page/${status}`);
            const data = response.data.data.filter(item => item.status === status);
            setServices(data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Handle 404 error (data not found)
                setServices([]);
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    const filterService = services.filter(e => e.status === activeTabs);

    const tabs = [
        { id: 1, name: 'Service'},
        { id: 2, name: 'On going'},
        { id: 3, name: 'Completed'},
    ]

    const bottomSheetModalRef = useRef(null);
    const snapPoints = [activeTabs == 1 ? "100%" : "80%"];

    return (
        <View className="flex flex-1 px-5 py-5 bg-main-background">
            <View className="flex flex-row gap-2">
                {tabs.map((tab) => (
                    <TouchableWithoutFeedback key={tab.id} onPress={() => setActiveTabs(tab.id)}>
                        <View className={`px-3 py-2 ml-2 rounded-md ${activeTabs === tab.id ? 'bg-main-blue' : 'bg-second-blue'}`}>
                            <Text className="font-bold">{tab.name}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
            <View className="flex w-full h-full">
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View className="flex justify-center items-center">
                    {services?.map((service) => (
                        <ServiceCard
                        serviceId={service.id}
                        serviceUser={service.iduser}
                        serviceDeviceName={service.device_name}
                        serviceCategory={service.category}
                        serviceStore={service.store}
                        servicePrice={service.price}
                        serviceNotes={service.notes}
                        serviceStatus={service.status}
                        serviceStartDate = {service.start_date}
                        serviceType={service.type}
                        bottomSheetModalRef={bottomSheetModalRef}
                        />
                    ))}
                    </View>
                </ScrollView>
            </View>
            
            <ServiceCardDetail 
                refs={bottomSheetModalRef}
                index={0}
                service = {services}
                snapPoints={snapPoints}
                serviceId = {serviceId}
                serviceUser={serviceUser}
                serviceDeviceName={serviceDeviceName}
                serviceCategory={serviceCategory}
                serviceStore={serviceStore}
                servicePrice={servicePrice}
                serviceNotes={serviceNotes}
                serviceStatus={serviceStatus}
                serviceType={serviceType}
                serviceStartDate={serviceStartDate}
                serviceEndDate={serviceEndDate}
                activeTabs = {activeTabs}
                fetchDataValidation={fetchDataValidation}
            />

        <View className="absolute right-3 bottom-3">
            <TouchableOpacity className="bg-main-blue px-3 py-1 rounded-md" onPress={refreshData}>
                <Text className="text-sm text-[#FFFFFF] font-bold">Refresh</Text>
            </TouchableOpacity>
        </View>

            <StatusBar style="auto" />
        </View>
    )
}

export default ServiceScreen