// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';

const ProfileScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCameraClick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfilePic(result.uri);
        }
    };

    const handleRegister = () => {
        // Implement your registration logic here
        // For simplicity, just alert the entered values
        navigation.navigate("HomeScreen")
        alert(`Username: ${username}\nPassword: ${password}\nConfirm Password: ${confirmPassword}`);
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <TouchableOpacity onPress={handleCameraClick} style={styles.cameraButton}>
                    {!profilePic ? (
                        <MaterialCommunityIcons name="camera-plus-outline" size={50} color="#127327" />
                    ) : (
                        <Image source={{ uri: profilePic }} style={styles.profilePic} />
                    )}
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={handleTogglePassword} style={styles.eyeIcon}>
                        <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={24} color="#127327" />
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={!showPassword}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                />
            </View>
            <Button
                onPress={handleRegister}
                disabled={!username || !password || !confirmPassword}
                mode="contained"
                buttonColor="#127327"
                style={styles.registerButton}
                labelStyle={styles.registerButtonText}
            >
                Register
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    imageContainer: {
        alignItems: "center",
        marginVertical: 20,
    },
    cameraButton: {
        width: 120,
        height: 120,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 5,
        borderColor: "grey",
    },
    inputContainer: {
        width: "80%",
        marginTop: 20,
    },
    input: {
        height: 50,
        backgroundColor: 'rgba(0,0,0,.05)',
        padding: 10,
        borderRadius: 10,
        fontWeight: '500',
        marginBottom: 20,
    },
    passwordContainer: {
        height:50,
        width: '100%',
        marginBottom: 20,
        backgroundColor: 'rgba(0,0,0,.05)',
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent:'space-around'
    },
    passwordInput: {
        width:'90%',
        height: '100%',
        padding:10,
        fontWeight: '500',
    },
    eyeIcon: {
     marginRight:10   
    },
    registerButton: {
        width:'80%',
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
    },
    registerButtonText: {
        fontSize: 17,
        fontWeight: "bold",
        letterSpacing: 1,
    },
});

export default ProfileScreen;
