import { View, Text, ScrollView } from 'react-native';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HistoryCard from '../../components/HistoryCard';
import HistoryCardDetail from '../../components/HistoryCardDetail';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function HistoryScreen({ route }) {
    const [id, setId] = useState("");
    const [serviceHistory, setServiceHistory] = useState([]);
    const serviceHistoryUser = route.params?.serviceHistoryUser;
    const serviceHistoryDeviceName = route.params?.serviceHistoryDeviceName;
    const serviceHistoryCategory = route.params?.serviceHistoryCategory;
    const serviceHistoryStore = route.params?.serviceHistoryStore;
    const serviceHistoryPrice = route.params?.serviceHistoryPrice;
    const serviceHistoryNotes = route.params?.serviceHistoryNotes;
    const serviceHistoryStatus = route.params?.serviceHistoryStatus;
    const serviceHistoryType = route.params?.serviceHistoryType;
    const serviceHistoryStartDate = route.params?.serviceHistoryStartDate;
    const serviceHistoryEndDate = route.params?.serviceHistoryEndDate;

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
                fetchDataHistory(id);
            }
        }, [id])
    );

    const fetchDataHistory = async (id) => {
        try {
            const response = await axios.get(`http://192.168.100.7:8082/history/${id}`);
            const data = response.data.data;
            setServiceHistory(data);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setServiceHistory([]);
            } else {
                console.error('Error fetching data:', error);
            }
        }
    };

    const bottomSheetModalRef = useRef(null);
    const snapPoints = ["80%"];

    return (
        <View className="flex flex-1 bg-main-background px-5 py-5">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex w-full h-full">
                    <View className="flex justify-center items-center">
                        {serviceHistory?.map(history => (
                            <HistoryCard
                                key={history.id} // Add a key prop here
                                serviceHistoryId={history.id}
                                serviceHistoryUser={history.iduser}
                                serviceHistoryDeviceName={history.device_name}
                                serviceHistoryCategory={history.category}
                                serviceHistoryStore={history.store}
                                serviceHistoryPrice={history.price}
                                serviceHistoryNotes={history.notes}
                                serviceHistoryStatus={history.status}
                                serviceHistoryType={history.type}
                                serviceHistoryStartDate={history.start_date}
                                bottomSheetModalRef={bottomSheetModalRef}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>

            <HistoryCardDetail 
                refs={bottomSheetModalRef} 
                index={0}
                snapPoints={snapPoints}
                serviceHistory={serviceHistory}
                serviceHistoryUser={serviceHistoryUser}
                serviceHistoryDeviceName={serviceHistoryDeviceName}
                serviceHistoryCategory={serviceHistoryCategory}
                serviceHistoryStore={serviceHistoryStore}
                serviceHistoryPrice={serviceHistoryPrice}
                serviceHistoryNotes={serviceHistoryNotes}
                serviceHistoryStatus={serviceHistoryStatus}
                serviceHistoryType={serviceHistoryType}
                serviceHistoryStartDate={serviceHistoryStartDate}
                serviceHistoryEndDate={serviceHistoryEndDate}
            />

            <StatusBar style="auto" />
        </View>
    )
}

export default HistoryScreen;
