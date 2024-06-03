import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TrackCard from '../../components/TrackCard';
import TrackCardDetail from '../../components/TrackCardDetail';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function TrackScreen({ route }) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    const [id, setId] = useState("");
    const [status, setStatus] = useState(1); // Default to 'Service' tab
    const [serviceTrack, setServiceTrack] = useState([]);
    const [activeTabs, setActiveTabs] = useState(1);

    const serviceTrackUser = route.params?.serviceTrackUser;
    const serviceTrackDeviceName = route.params?.serviceTrackDeviceName;
    const serviceTrackCategory = route.params?.serviceTrackCategory;
    const serviceTrackStore = route.params?.serviceTrackStore;
    const serviceTrackPrice = route.params?.serviceTrackPrice;
    const serviceTrackNotes = route.params?.serviceTrackNotes;
    const serviceTrackStatus = route.params?.serviceTrackStatus;
    const serviceTrackType = route.params?.serviceTrackType;
    const serviceTrackStartDate = route.params?.serviceTrackStartDate;
    const serviceTrackEndDate = route.params?.serviceTrackEndDate;
    const serviceTrackImage = route.params?.serviceTrackImage;

    useEffect(() => {
        const getId = async () => {
            const value = await AsyncStorage.getItem('id');
            setId(value);
        };
        getId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (id) {
                fetchDataTrack(id, status);
            }
        }, [id, status])
    );

    const fetchDataTrack = async (id, status) => {
        try {
            const response = await axios.get(`${API_URL}track/${id}/${status}`);
            const data = response.data.data;
            setServiceTrack(data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setServiceTrack([]);
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    const bottomSheetModalRef = useRef(null);
    const snapPoints = [activeTabs == 1 ? "85%" : activeTabs == 4 ? "70%" : "80%"];

    const tabs = [
        { id: 1, name: 'Pending', status: 1 },
        { id: 2, name: 'On going', status: 2 },
        { id: 4, name: 'Rejected', status: 4 },
    ];

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView horizontal={true} className="w-full" style={{ flexGrow: 0}}>
                <View className="flex flex-row space-x-2">
                {tabs.map((tab) => (
                    <View key={tab.id}>
                        <TouchableWithoutFeedback onPress={() => { setActiveTabs(tab.id); setStatus(tab.status); }}>
                            <View className={`px-3 py-2 rounded-md ${activeTabs === tab.id ? 'bg-main-blue' : 'bg-second-blue'}`}>
                                <Text className="font-bold">{tab.name}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                ))}
                </View>
            </ScrollView>

            <View className="flex flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
                    <View className="flex justify-center items-center">
                        {serviceTrack?.map(track => (
                            <TrackCard 
                                key={track.id}
                                serviceTrackImage={track.image}
                                serviceTrackUser={track.iduser}
                                serviceTrackDeviceName={track.device_name}
                                serviceTrackCategory={track.category}
                                serviceTrackStore={track.store}
                                serviceTrackPrice={track.price}
                                serviceTrackNotes={track.notes}
                                serviceTrackStatus={track.status}
                                serviceTrackType={track.type}
                                serviceTrackStartDate={track.start_date}
                                bottomSheetModalRef={bottomSheetModalRef}
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>

            <TrackCardDetail 
                refs={bottomSheetModalRef} 
                index={0}
                snapPoints={snapPoints}
                serviceTrack={serviceTrack}
                serviceTrackUser={serviceTrackUser}
                serviceTrackDeviceName={serviceTrackDeviceName}
                serviceTrackCategory={serviceTrackCategory}
                serviceTrackStore={serviceTrackStore}
                serviceTrackPrice={serviceTrackPrice}
                serviceTrackNotes={serviceTrackNotes}
                serviceTrackStatus={serviceTrackStatus}
                serviceTrackType={serviceTrackType}
                serviceTrackStartDate={serviceTrackStartDate}
                serviceTrackEndDate={serviceTrackEndDate}
                serviceTrackImage={serviceTrackImage}
                activeTabs={activeTabs}
            />

            <StatusBar style="auto" />
        </View>
    );
}

export default TrackScreen;
