// app/models/RootStore.ts
import { types, Instance, SnapshotOut } from "mobx-state-tree"
import { NewsStoreModel } from "./NewsStore"
import { NavigationStoreModel } from "./NavigationStore"

export const RootStoreModel = types.model("RootStore", {
    newsStore: types.optional(NewsStoreModel, {} as any),
    navigationStore: types.optional(NavigationStoreModel, {} as any),
})

export interface RootStore extends Instance<typeof RootStoreModel> { }
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }