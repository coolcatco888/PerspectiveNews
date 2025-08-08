// app/models/NewsStore.ts
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { NewsArticleModel, PoliticalBias } from "./NewsArticle"
import { fetchMockNews } from "../services/mockApi"

export const NewsStoreModel = types
    .model("NewsStore")
    .props({
        articles: types.array(NewsArticleModel),
    })
    .actions((store) => ({
        fetchNews: flow(function* fetchNews(bias: PoliticalBias, category: string) {
            const articles = yield fetchMockNews(bias, category)
            store.articles.replace(articles)
        }),
    }))

export interface NewsStore extends Instance<typeof NewsStoreModel> { }
export interface NewsStoreSnapshot extends SnapshotOut<typeof NewsStoreModel> { }