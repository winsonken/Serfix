import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MainScreen from '../screens/main/MainScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/login/RegisterScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import HistoryScreen from '../screens/history/HistoryScreen';
import TrackScreen from '../screens/track/TrackScreen';
import LaptopScreen from '../screens/home/LaptopScreen';
import PhoneScreen from '../screens/home/PhoneScreen';
import PCScreen from '../screens/home/PCScreen';
import HelpCenterScreen from '../screens/home/HelpCenterScreen';
import FeedbackScreen from '../screens/home/FeedbackScreen';
import PaymentScreen from '../screens/home/PaymentScreen';
import PaymentSuccessScreen from '../screens/home/PaymentSuccessScreen';
import TrackCardDetail from '../components/TrackCardDetail';
import AboutScreen from '../screens/home/AboutScreen';
import TermsScreen from '../screens/home/TermsScreen';
import ReportBugScreen from '../screens/home/ReportBugScreen';

function ScreenNav() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, tabBarActiveTintColor: '#00A9FF', tabBarInactiveTintColor: '#CCCCCC', tabBarHideOnKeyboard: true, tabBarStyle: { height: 60 }, headerStyle: {backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#ACA9A9'}, headerTitleStyle: { color: "#00A9FF", fontSize: 23 }}}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, title: 'Home', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="home" color={color} size={28} /> ) }}/>
            <Tab.Screen name="TrackPage" component={TrackPage} options={{ title: 'Track', headerTitleStyle: { color: "#00A9FF", fontSize: 23}, tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="map-marker" color={color} size={28} /> ) }} />
            <Tab.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'History', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="history" color={color} size={28} /> ) }} />
            <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile', tabBarIcon: ({ color }) => ( <MaterialCommunityIcons name="account" color={color} size={28} /> ) }} />
        </Tab.Navigator>
    )
}

function HomePage() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerStyle: {backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#ACA9A9'}, headerTitleStyle: { color: "#00A9FF", fontSize: 23}, headerTitleAlign:'center' }}>
            <Stack.Screen name="Home" component={ScreenNav} options={{ headerShown: false }} />
            <Stack.Screen name="LaptopScreen" component={LaptopScreen} options={{ title: 'Laptop'}} />
            <Stack.Screen name="PhoneScreen" component={PhoneScreen} options={{ title: 'Phone'}} />
            <Stack.Screen name="PCScreen" component={PCScreen} options={{ title: 'PC'}} />
            <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} options={{ title: 'Help Center' }} />
            <Stack.Screen name="ReportBugScreen" component={ReportBugScreen} options={{ title: 'Report Bug' }} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About Serfix'}} />
            <Stack.Screen name="TermsScreen" component={TermsScreen} options={{ title: 'Terms & Condition'}} />
            <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} options={{ title: 'Feedback & Suggestion' }} />
            <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ title: 'Payment' }} />
            <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function TrackPage() {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator screenOptions={{ headerStyle: {backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#ACA9A9'}, headerTitleStyle: { color: "#00A9FF", fontSize: 23}, headerTitleAlign:'left' }}>
            <Stack.Screen name="TrackScreen" component={TrackScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TrackCardDetail" component={TrackCardDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default function Navigation() {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainScreen}/>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
                <Stack.Screen name="HomePage" component={HomePage}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}