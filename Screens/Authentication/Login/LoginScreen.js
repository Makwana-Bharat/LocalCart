import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Image, StyleSheet, Dimensions, Keyboard } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Button, Snackbar, ActivityIndicator } from "react-native-paper";
import { signInWithPhoneNumber } from "@firebase/auth";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { auth, app } from "../../../Configartions/Firebase";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const recaptchaVerifier = useRef(null);
  
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [snackbarText, setSnackbarText] = useState("");
  const [snackbarType, setSnackbarType] = useState(""); // success, error, info, etc.
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleBtnClick = async () => {
    try {
      setIsLoading(true);
      const phoneNumber = `${selectedCountryCode} ${mobileNumber}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier.current);
      // Simulating the OTP sending process, replace with actual logic
      setTimeout(() => {
        setIsSnackbarVisible(true);
        setSnackbarText("OTP sent successfully");
        setSnackbarType("success");
        setIsLoading(false);
        setTimeout(() => {
          navigation.navigate('Otp', { mobileNumber: phoneNumber, confirmation: confirmation });
        }, 1000);
      }, 2000);
    } catch (error) {
      setIsSnackbarVisible(true);
      setSnackbarText("Error sending OTP. Please try again.");
      setSnackbarType("error");
      // console.error("Error sending OTP", error);
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
      <View style={[styles.imageContainer, { height: isKeyboardVisible ? height * 0.3 : height * 0.4, width: isKeyboardVisible ? width * 0.85 : width * 1 }]}>
        <Image source={require('../../../assets/LoginLogo.png')} style={styles.logo} />
      </View>
      <View style={{ width: width - 30, padding: 10, marginTop: 20 }}>
        <Text style={styles.label}>Enter your mobile number</Text>
        <Text style={styles.quote}>
          Please confirm your country code and{'\n'}
          enter your mobile number
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.picker}
              selectedValue={selectedCountryCode}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedCountryCode(itemValue)
              }>
              <Picker.Item label="+91" value="+91" />
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
            value={mobileNumber}
            onChangeText={(input) => setMobileNumber(input)}
            placeholder="Mobile number"
          />
        </View>
        {
          isLoading ?
            <View style={{ backgroundColor: "#127327", borderRadius: 10, padding: 13, marginTop: 20 }}>
              <ActivityIndicator color="#fff" />
              </View>
            :
        <Button
          onPress={handleBtnClick}
          disabled={mobileNumber.length !== 10 || isLoading}
          mode="contained"
          buttonColor="#127327"
          style={{ borderRadius: 10, padding: 5, marginTop: 20 }}
          labelStyle={{ fontSize: 17, fontWeight: 'bold', letterSpacing: 1 }}
          
        >
          Send OTP
        </Button>
        }
      </View>
      <Snackbar
        visible={isSnackbarVisible} // Set the visibility based on your state or condition
        onDismiss={() => setIsSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: "#2a2c2f", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' } }
      >
        <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
        <Text style={{ color: snackbarType === "success" ? "#0edb78" : '#f05d5d' }}>{snackbarText}</Text>
          <Ionicons name={snackbarType === "success" ? "checkmark-done-circle-outline" : "alert-circle-outline"} size={24} color={snackbarType === "success" ? "#0edb78" : '#f05d5d'} />
        </View>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    width: '60%',
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  quote: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 26,
    color: "rgba(0,0,0,.4)",
    lineHeight: 21
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerWrapper: {
    height: 50,
    width: 107,
    backgroundColor: 'rgba(0,0,0,.05)',
    borderRadius: 10,
    marginRight: 10,
  },
  picker: {
    flex: 1,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(0,0,0,.05)',
    padding: 10,
    borderRadius: 10,
    fontWeight: '500',
    fontSize: 18,
  },
});

export default LoginScreen;
