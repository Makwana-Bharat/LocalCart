import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';

// Screens
// import Home from '../../Screens/Home';
import Cart from '../../Screens/Cart';
import Profile from '../../Screens/Profile';
import Notification from '../../Screens/Notification';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress, label,Icon }) => {
 const navigation = useNavigation();
  const isFocused = navigation.isFocused();
  return (
  <TouchableOpacity
    style={{
      flex: 1,
        justifyContent: 'center',
        alignItems: isFocused ? 'flex-start' : 'center',
        margin: 5,
        marginVertical: 12,
        borderRadius:100,
        backgroundColor: isFocused ? '#c0e2c8' : 'transparent'
      
    }}
    onPress={onPress}
  >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isFocused ? <View style={{
          backgroundColor: '#127327',
          padding: 12,
          borderRadius:100
        }}>
        <Ionicons
          name={Icon}
          color={isFocused ? '#fff' : '#000000'}
          size={isFocused ? 18 : 22}
            />
        </View>:
        <Ionicons
          name={Icon}
          color={isFocused ? '#fff' : '#000000'}
          size={isFocused ? 18 : 22}
            />
        }
       {isFocused && <Text style={{ marginLeft: label=='Notification'? 4: 8, color: '#000',fontWeight:'bold',fontSize:label=='Notification' ? 12 : 14 }}>{label}</Text>}
    </View>
  </TouchableOpacity>
)};



const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#dff4e3',
          height: 70,
          borderTopWidth:0
        },
        headerStyle: {
          backgroundColor: '#127327'
        }
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarButton: (props) =>(
              <CustomTabBarButton {...props} label="Home" Icon='ios-home' />
          ),
          headerTitle: 'LocalCart',
          headerTitleStyle: {
            color: '#fff',
          }
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} label="Cart" Icon='ios-cart' />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} label="Notification" Icon='ios-notifications'/>
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton {...props} label="Profile" Icon='ios-person'/>
          ),
          headerShown:false
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
