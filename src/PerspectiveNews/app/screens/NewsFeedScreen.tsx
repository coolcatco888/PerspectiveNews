// app/screens/NewsFeedScreen.tsx
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native"
import { useStores } from "../models"
import { NewsArticle, PoliticalBias } from "../models/NewsArticle"
import { color } from "../theme"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
    flex: 1,
    paddingTop: 20,
}
const ARTICLE_CARD: ViewStyle = {
    backgroundColor: color.palette.white,
    borderRadius: 8,
    marginHorizontal: 15,
    marginVertical: 8,
    overflow: "hidden",
    shadowColor: color.palette.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
}
const THUMBNAIL: ImageStyle = {
    width: "100%",
    height: 180,
}
const ARTICLE_CONTENT: ViewStyle = {
    padding: 15,
}
const HEADLINE: TextStyle = {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
}
const META_CONTAINER: ViewStyle = {
    flexDirection: "row",
    marginBottom: 8,
}
const BIAS_INDICATOR = (rating: number): TextStyle => ({
    fontWeight: "bold",
    marginRight: 15,
    color: rating > 0 ? color.palette.blue : rating < 0 ? color.palette.red : color.palette.black,
})
const FACTUALITY = (level: string): TextStyle => ({
    fontWeight: "bold",
    color: level === "high" ? color.palette.green : level === "medium" ? color.palette.orange : color.palette.red,
})
const JUSTIFICATION: TextStyle = {
    fontSize: 12,
    color: color.palette.grey,
    marginBottom: 8,
}
const TAGS_CONTAINER: ViewStyle = {
    flexDirection: "row",
    flexWrap: "wrap",
}
const TAG: ViewStyle = {
    fontSize: 12,
    backgroundColor: color.palette.lighterGrey,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
}

export const NewsFeedScreen = observer(function NewsFeedScreen() {
    const { newsStore } = useStores()
    const [bias, setBias] = useState<PoliticalBias>("center")
    const [category, setCategory] = useState("top")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        loadNews()
    }, [bias, category])

    const loadNews = async () => {
        setLoading(true)
        await newsStore.fetchNews(bias, category)
        setLoading(false)
    }

    const getBackgroundColor = () => {
        switch (bias) {
            case "left": return color.palette.lightBlue
            case "right": return color.palette.lightRed
            case "good": return color.palette.lightGreen
            default: return color.palette.white
        }
    }

    const renderItem = ({ item }: { item: NewsArticle }) => (
        <View style={ARTICLE_CARD}>
            <Image source={{ uri: item.thumbnail }} style={THUMBNAIL} />
            <View style={ARTICLE_CONTENT}>
                <Text style={HEADLINE}>{item.headline}</Text>
                <View style={META_CONTAINER}>
                    <Text style={BIAS_INDICATOR(item.biasRating)}>
                        {item.biasRating > 0 ? "Left" : item.biasRating < 0 ? "Right" : "Center"}
                    </Text>
                    <Text style={FACTUALITY(item.factuality)}>
                        {item.factuality.toUpperCase()}
                    </Text>
                </View>
                <Text style={JUSTIFICATION}>{item.factualityJustification}</Text>
                <View style={TAGS_CONTAINER}>
                    {item.categories.map((tag, index) => (
                        <Text key={index} style={TAG}>{tag}</Text>
                    ))}
                </View>
            </View>
        </View>
    )

    return (
        <View style={[FULL, CONTAINER, { backgroundColor: getBackgroundColor() }]}>
            {loading ? (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                <FlatList
                    data={newsStore.articles}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    refreshing={loading}
                    onRefresh={loadNews}
                />
            )}
        </View>
    )
})