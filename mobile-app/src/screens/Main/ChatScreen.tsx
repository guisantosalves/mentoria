import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ChatScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Chat</Text>
            </View>

            <View style={styles.contentContainer}>
                <Image
                    source={require('../../assets/images/cactus-cuate.png')}
                    style={styles.image}
                />
                <Text style={styles.title}>Funcionalidade Indisponível</Text>
                <Text style={styles.subtitle}>
                    Esta funcionalidade ainda não está disponível, mas em breve será!
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    headerContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: '700',
        marginLeft: 20,
        color: '#263238',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 300,
        height: 300,
        marginBottom: 20,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        color: '#263238',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 12,
        color: '#5C6D73',
        textAlign: 'center',
    },
});

export default ChatScreen;
