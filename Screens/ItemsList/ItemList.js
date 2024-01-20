import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import data from '../../DemoData';
import MasonryList from '@react-native-seoul/masonry-list';
const ItemList = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleCategoryPress = (category) => {
        setSelectedCategory(category === 'All' ? null : category);
    };

    const renderCategoryItem = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.categoryItem,
                (item === 'All' && selectedCategory === null) || item === selectedCategory && styles.selectedCategory
            ]}
            onPress={() => handleCategoryPress(item)}
        >
            <Text style={styles.categoryItemText}>{item}</Text>
        </TouchableOpacity>
    );

    const getFilteredData = () => {
        return !selectedCategory
            ? data.flatMap(category => category.items)
            : data.flatMap(category => category.items.filter(item => item.category === selectedCategory));
    };

    const handleItemPress = (item) => {
        
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardContainer} onPress={() => handleItemPress(item)}>
            <View style={{ flex: 1, height: '80%', backgroundColor: '#EFEFEF' ,width:'100%'}}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            </View>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>₹{item.price}/{item.unit}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{height:40}}>
                <FlatList
                    data={['All', ...new Set(data.map(item => item.category))]}
                    horizontal
                    keyExtractor={(item) => item}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderCategoryItem}
                />
            </View>
            <MasonryList
                data={getFilteredData()}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={renderItem}
                
            // Other MasonryList props can be added here
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingBottom: 0, // Add this line to remove bottom padding
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    categoryItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        marginRight: 8,
        borderRadius: 12,
        maxheight: 10,
        minWidth: 80,
        backgroundColor: '#EFEFEF',
    },
    selectedCategory: {
        backgroundColor: 'green',
    },
    categoryItemText: {
        color: 'black',
        fontSize: 16,
    },
    cardContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems:'center',
        margin: 8,
        height:300,
        borderRadius: 12,
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        elevation: 3,
    },
    itemImage: {
        flex: 1,
        
    },

    itemDetails: {
        backgroundColor:'#ffffff',
        width:'100%',
        padding: 12,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        fontWeight:'bold',
        color: '#127327',
    },
});

export default ItemList;
