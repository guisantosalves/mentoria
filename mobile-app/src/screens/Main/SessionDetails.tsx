import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Session } from "./SessionsScreen";

type RootStackParamList = {
    SessionsScreen: undefined;
    SessionDetailsScreen: { session: Session };
};

type SessionDetailsScreenProps = {
    route: RouteProp<RootStackParamList, "SessionDetailsScreen">;
    navigation: StackNavigationProp<RootStackParamList, "SessionDetailsScreen">;
};

const SessionDetailsScreen: React.FC<SessionDetailsScreenProps> = ({ route, navigation }) => {
    const { session } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-back" size={24} color="#263238" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes da Aula</Text>
            </View>

            <Text style={styles.title}>{session.title}</Text>
            <Text style={styles.time}>
                {session.startTime} - {session.endTime}
            </Text>
            <Text style={styles.teacher}>Professor: {session.teacher}</Text>
            <Text style={styles.description}>{session.description}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#263238",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 10,
        color: "#263238",
    },
    time: {
        fontSize: 16,
        marginBottom: 10,
        color: "#263238",
    },
    teacher: {
        fontSize: 16,
        marginBottom: 10,
        color: "#263238",
    },
    description: {
        fontSize: 14,
        color: "#91989D",
    },
});

export default SessionDetailsScreen;
