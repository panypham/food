import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import yelp from '../api/yelp'

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');

    const getResult = async id => {
        const respone = await yelp.get(`/${id}`);
        setResult(respone.data);
    };

    useEffect(() => {
        getResult(id);
    }, [])

    if (!result) {
        return null;
    }

    return <>
        <Text>{result.name}</Text>
        <FlatList
            data={result.photos}
            keyExtractor={(photo) => photo}
            renderItem={({ item }) => {
                console.log(item)
                return (
                    <Image style={styles.image} source={{ uri: item }} />
                )
            }} />
    </>
};

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 200,
        borderRadius: 4,
        margin: 4
    }
});

export default ResultsShowScreen;