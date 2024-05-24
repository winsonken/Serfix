import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import TrackCard from '../../components/TrackCard';
import TrackCardDetail from '../../components/TrackCardDetail';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler'

function TrackScreen({ route }) {
    const API_URL = process.env.EXPO_PUBLIC_API_URL;
    
    const [id, setId] = useState("");
    const [serviceTrack, setServiceTrack] = useState([]);
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

    useEffect(() => {
        const getId = async () => {
            const value = await AsyncStorage.getItem('id');
            setId(value);
            console.log("id:", value);
        };
        getId();
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (id) {
                fetchDataTrack(id);
            }
        }, [id])
    );

    const fetchDataTrack = async (id) => {
        try {
            const response = await axios.get(`${API_URL}track/${id}`);
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
    const snapPoints = ["80%"];

    return (
        <View className="flex flex-1 px-5 py-5 bg-main-background">
            <View className="flex w-full h-full">
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View className="flex justify-center items-center">
                        {serviceTrack?.map(track => (
                                <TrackCard 
                                    key={track.id}
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
                />

            <StatusBar style="auto" />
        </View>
    );
}

export default TrackScreen;
