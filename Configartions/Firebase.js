import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.API_KEY,
    authDomain: Constants.expoConfig.extra.AUTH_DOMAIN,
    projectId: Constants.expoConfig.extra.PROJECT_ID,
    storageBucket: Constants.expoConfig.extra.STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig.extra.MESSAGING_SENDER_ID,
    appId: Constants.expoConfig.extra.APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth, app };
