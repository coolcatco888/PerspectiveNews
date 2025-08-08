// app/navigators/navigationUtilities.ts
import { NavigationContainerRef } from "@react-navigation/native"

export type RootParamList = {
    newsFeed: undefined
    welcome: undefined
    // Add other screens here
}

// Strongly typed navigation ref
export let navigationRef: NavigationContainerRef<RootParamList> | null = null

export function setTopLevelNavigator(ref: NavigationContainerRef<RootParamList> | null) {
    navigationRef = ref
}