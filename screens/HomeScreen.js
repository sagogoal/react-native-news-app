import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { ListItem } from "../components/ListItem";
import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";;

const URL = `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${Constants.manifest.extra.newsApiKey}`

export const HomeScreen = ({ navigation }) => {
    const [ articles, setArticles ] = useState([])

    const fetchArticles = async () => {
        try {
            const response = await axios.get(URL)
            setArticles(response.data.articles)
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
        <FlatList
            data={articles}
            renderItem={({item}) => {
                return(
                    <ListItem 
                        imageUrl={item.urlToImage}
                        title={item.title}
                        author={item.author}
                        key={item.toString()}
                        onPress={() => navigation.navigate("Article", {article: item})}
                    />
                )
            }}
            keyExtractor={(item, index) => index.toString()}
        />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eee",
    },
})