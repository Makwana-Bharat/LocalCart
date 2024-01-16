// setupFirebase.js

import Constants from 'expo-constants';
// Your Firebase configuration
export const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.API_KEY,
    authDomain: Constants.expoConfig.extra.AUTH_DOMAIN,
    projectId: Constants.expoConfig.extra.PROJECT_ID,
    storageBucket: Constants.expoConfig.extra.STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig.extra.MESSAGING_SENDER_ID,
    appId: Constants.expoConfig.extra.APP_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = initializeAuth(app, {
//     persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// export { auth };
