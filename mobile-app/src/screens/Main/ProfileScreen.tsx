import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProfileScreen: React.FC = () => {
    const handleLogout = () => {
        console.log("Usuário deslogado");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../../assets/images/lotus.png')}
                    style={styles.avatar}
                />
                <Text style={styles.username}>João da Silva</Text>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>E-mail:</Text>
                <Text style={styles.infoText}>joao.silva@gmail.com</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#263238',
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoLabel: {
        color: "#5C6D73",
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 5,
    },
    infoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5C6D73',
        borderRadius: 10,
        height: 50,
        marginBottom: 15,
        backgroundColor: "#D9D9D966",
        padding: 12
    },
    logoutButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#D32F2F',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default ProfileScreen;
