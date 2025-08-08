// app/models/NewsArticle.ts
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const NewsArticleModel = types.model("NewsArticle").props({
    id: types.identifier,
    headline: types.string,
    thumbnail: types.string,
    biasRating: types.number,
    factuality: types.enumeration(["low", "medium", "high"]),
    factualityJustification: types.string,
    categories: types.array(types.string),
    source: types.string,
    publishedAt: types.string,
})

export interface NewsArticle extends Instance<typeof NewsArticleModel> { }
export interface NewsArticleSnapshot extends SnapshotOut<typeof NewsArticleModel> { }

export type PoliticalBias = "left" | "center" | "right" | "good"