import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomAlert = ({ isVisible, message, onConfirm, onClose, type }) => {
    const getIconName = () => {
        switch (type) {
            case 'success':
                return 'check-circle';
            case 'error':
                return 'alert-circle';
            default:
                return 'information';
        }
    };

    return (
        <Modal isVisible={isVisible}>
            <View style={styles.container}>
                <MaterialCommunityIcons name={getIconName()} size={60} color="#00A9FF" />
                <Text style={styles.message}>{message}</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button} onPress={onConfirm}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={onClose}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: '#00A9FF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CustomAlert;
