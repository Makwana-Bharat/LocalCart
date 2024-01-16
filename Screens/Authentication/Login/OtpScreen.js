// OtpScreen.js
import { FontAwesome } from "@expo/vector-icons";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, StyleSheet, Keyboard, Dimensions, Image } from "react-native";
import { Button } from "react-native-paper";
import { getAuth, signInWithCredential, PhoneAuthProvider } from "@firebase/auth";
import { auth } from '../../../Configartions/Firebase';
const { width, height } = Dimensions.get("screen");

const OtpScreen = ({ route,navigation }) => {
  const [otp, setOtp] = useState("");
  const { mobileNumber, confirmation } = route.params;
  console.log(confirmation)
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const textInputRef = useRef();

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

  const OTPhandle = (val) => {
    setOtp(val);
  };

  const focusTextInput = () => {
    textInputRef.current.focus();
  };

  const verifyOTP = async() => {
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      try {
        const credential = PhoneAuthProvider.credential(confirmation.verificationId, otp);
        console.log(await signInWithCredential(auth, credential));
        // navigation.navigate('ProfileScreen');
      } catch (error) {
        console.error("Error verifying OTP", error);
      }
    } else {
      alert("Invalid OTP. Please enter a valid 6-digit OTP.");
    }
  };

  const renderOTPBoxes = () => {
    const otpArray = otp.split("");

    return Array(6)
      .fill(0)
      .map((_, index) => (
        <View key={index} style={[styles.OTPDigitContainer, otpArray[index] ? styles.FilledBox : null]} onTouchStart={focusTextInput}>
          <Text style={styles.OTPDigit}>{otpArray[index]}</Text>
        </View>
      ));
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.imageContainer,
          { height: isKeyboardVisible ? height * 0.28 : height * 0.4, width: isKeyboardVisible ? width * 0.7 : width * 1 },
        ]}
      >
        <Image
          source={{
            uri:
              "https://img.freepik.com/free-vector/enter-otp-concept-illustration_114360-7897.jpg?w=740&t=st=1704510953~exp=1704511553~hmac=6a3dcc0d2c81cd8f515cf5d0670cadfb64bcd352d878a781fff43818dd2da34e",
          }}
          style={styles.logo}
        />
      </View>
      <View style={{ width: width - 30, padding: 10, marginTop: 20 }}>
        <Text style={styles.label}>OTP Verification</Text>
        <Text style={styles.quote}>
          Enter the OTP sent to <Text style={{ fontWeight: "bold" }}>{mobileNumber}</Text>
        </Text>
        <View style={styles.otpInputContainer} onTouchStart={focusTextInput}>
          {renderOTPBoxes()}
          <TextInput
            ref={textInputRef}
            style={styles.hiddenTextInput}
            value={otp}
            onChangeText={OTPhandle}
            maxLength={6}
            keyboardType="numeric"
            cursorColor={'transparent'}
          />
        </View>
        <Text style={[styles.quote, { marginTop: 10, marginBottom: 10 }]}>
          Didn't receive OTP? <Text style={{ fontWeight: "bold", color: "#127327" }}>RESEND</Text>
        </Text>
        <Button
          onPress={verifyOTP}
          disabled={otp.length !== 6}
          mode="contained"
          buttonColor="#127327"
          style={{ borderRadius: 10, padding: 5, marginTop: 20 }}
          labelStyle={{ fontSize: 17, fontWeight: "bold", letterSpacing: 1 }}
        >
          Verify OTP
        </Button>
      </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    flex: 1,
    width: "60%",
  },
  label: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  quote: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 26,
    color: "rgba(0,0,0,.4)",
    lineHeight: 21,
  },
  otpInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  OTPDigitContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    margin: 5,
    // borderColor: "rgba(0,0,0,.5)",
    backgroundColor: "rgba(0,0,0,.05)",
  },
  OTPDigit: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#127327",
  },
  FilledBox: {
  },
  hiddenTextInput: {
    position: "absolute",
    flex:1,
    opacity: 0,
    width: '75%',
    height:'100%',
    backgroundColor: 'transparent',
    letterSpacing:52,
    zIndex:9999
  },
});

export default OtpScreen;
