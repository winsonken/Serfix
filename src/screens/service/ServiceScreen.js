import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import ServiceCard from '../../components/ServiceCard';
import ServiceCardDetail from '../../components/ServiceCardDetail';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

function ServiceScreen({ route }) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [services, setServices] = useState([]);
    const [activeTabs, setActiveTabs] = useState(1);
    const bottomSheetModalRef = useRef(null);

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
    const serviceImage = route.params?.serviceImage;

    useFocusEffect(
        useCallback(() => {
            fetchDataValidation(activeTabs);
        }, [activeTabs])
    );

    const fetchDataValidation = async (status) => {
        try {
            const response = await axios.get(`${API_URL}admin-page/${status}`);
            const data = response.data.data.filter(item => item.status === status);
            setServices(data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Handle 404 error (data not found)
                setServices([]);
            } else {
                console.log('Error fetching data:', error);
            }
        }
    };

    const tabs = [
        { id: 1, name: 'Pending' },
        { id: 2, name: 'On going' },
        { id: 3, name: 'Completed' },
        { id: 4, name: 'Rejected' },
    ];

    const snapPoints = [activeTabs == 1 ? "85%" : activeTabs == 4 ? "70%" : "80%", "100%"];

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView horizontal={true} className="w-full" style={{ flexGrow: 0}} showsHorizontalScrollIndicator={false}>
                <View className="flex flex-row space-x-2">
                    {tabs.map((tab) => (
                        <View key={tab.id}>
                            <TouchableWithoutFeedback onPress={() => setActiveTabs(tab.id)}>
                                <View className={`px-3 py-2 rounded-md ${activeTabs === tab.id ? 'bg-main-blue' : 'bg-second-blue'}`}>
                                    <Text className={`font-bold ${activeTabs === tab.id ? 'text-white' : 'text-black'}`}>{tab.name}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ))}
                </View>
            </ScrollView>
            
            <View className="flex flex-1">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex justify-center items-center">
                        {services?.map((service) => (
                            <ServiceCard
                                key={service.id}
                                serviceImage={service.image}
                                serviceId={service.id}
                                serviceUser={service.iduser}
                                serviceDeviceName={service.device_name}
                                serviceCategory={service.category}
                                serviceStore={service.store}
                                servicePrice={service.price}
                                serviceNotes={service.notes}
                                serviceStatus={service.status}
                                serviceStartDate={service.start_date}
                                serviceEndDate={service.finish_date}
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
                service={services}
                snapPoints={snapPoints}
                serviceId={serviceId}
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
                serviceImage={serviceImage}
                activeTabs={activeTabs}
                fetchDataValidation={fetchDataValidation}
            />

            <StatusBar style="auto" />
        </View>
    );
}

export default ServiceScreen;
