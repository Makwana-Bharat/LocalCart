import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { HomeStyles } from '../assets/Styles/Home';

const Home = ({navigation}) => {
  const data = [
    {
      uri: 'https://www.store2k.com/cdn/shop/articles/store2k_blog_2_d342a3bc-141f-4ce3-a06b-bf988b9a78f4_1024x.png?v=1628237346',
      dimensions: { width: 150, height: 150 }, // Adjust dimensions as needed
      name: 'Grocery',
    },
    {
      uri: 'https://images.unsplash.com/photo-1583338917451-face2751d8d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3dlZXQlMjBzaG9wfGVufDB8fDB8fHww',
      dimensions: { width: 150, height: 360 }, // Adjust dimensions as needed
      name: 'Sweet Shop',
    },
    {
      uri: 'https://images.unsplash.com/photo-1631856956423-2b95dae0ba74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhhcmR3YXJlJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D',
      dimensions: { width: 150, height: 410 }, // Adjust dimensions as needed
      name: 'Hardware Shop',
    },
    {
      uri: 'https://www.daysoftheyear.com/wp-content/uploads/fresh-fruits-and-vegetables-2021-08-26-17-06-09-utc.jpg',
      dimensions: { width: 150, height: 200 }, // Adjust dimensions as needed
      name: 'Fruites & vegetable',
    },
    {
      uri: 'https://images.unsplash.com/photo-1562941995-17dc31eaaf6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dimensions: { width: 150, height: 160 }, // Adjust dimensions as needed
      name: 'Electronic Repair Shop',
    },
    {
      uri: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGhhaXIlMjBzYWxvbnxlbnwwfHwwfHx8MA%3D%3D',
      dimensions: { width: 150, height: 350 }, // Adjust dimensions as needed
      name: 'Hair Salon Shop',
    },
    {
      uri: 'https://images.unsplash.com/photo-1582719188393-bb71ca45dbb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhpbmclMjBzdG9yZXxlbnwwfHwwfHx8MA%3D%3D',
      dimensions: { width: 150, height: 390 }, // Adjust dimensions as needed
      name: 'Clothing Shop',
    },
    {
      uri: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      dimensions: { width: 150, height: 200 }, // Adjust dimensions as needed
      name: 'Medical Shop',
    },
    {
      uri: 'https://images.unsplash.com/photo-1628413993904-94ecb60f1239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZvb3R3ZWFyJTIwc2hvcHN8ZW58MHx8MHx8fDA%3D',
      dimensions: { width: 150, height: 400 }, // Adjust dimensions as needed
      name: 'Footwear Shop',
    },
    {
      uri: 'https://www.freecodecamp.org/news/content/images/2021/07/brandi-redd-aJTiW00qqtI-unsplash.jpg',
      dimensions: { width: 150, height: 400 }, // Adjust dimensions as needed
      name: 'other',
    },
    
    
  ];

return (
    <View style={HomeStyles.container}>
      <Text style={styles.heading}>Shop</Text>
    <MasonryList
  data={data}
  keyExtractor={(item)=>item.id}
  numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.shopContainer, {height:item.dimensions.height, backgroundColor: 'rgba(0, 0, 0, 1)' }]} onPress={()=>navigation.navigate('ItemList')}>
  <Image style={[styles.shopImage]} source={{ uri: item.uri }} />
  <Text style={styles.shopText}>{item.name}</Text>
</TouchableOpacity>

        )}
/>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginLeft: 10,
  },
  shopContainer: {
    margin: 5,
    position: 'relative',
    borderRadius: 10,
    overflow:'hidden'
  },
  shopImage: {
    flex:1
  },
  shopText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust background color for text overlay
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 16,
    fontWeight:'bold'
  },
});

export default Home;