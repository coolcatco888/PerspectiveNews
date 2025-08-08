// app/app.tsx
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { useStores } from "./models/UseStores"
import { RootParamList } from "./navigators/navigationUtilities"
import { NewsFeedScreen } from "./screens/NewsFeedScreen"

const InitialNavigation: React.FC = observer(() => {
    const { navigationStore } = useStores()

    const setNavigationRef = (ref: NavigationContainerRef<RootParamList> | null) => {
        navigationStore.setNavigationRef(ref)
    }

    return (
        <NavigationContainer
            ref={setNavigationRef}
            onReady={() => navigationStore.setIsNavigationReady(true)}
        >
            {/* Your main app screen goes here */}
            <NewsFeedScreen />
        </NavigationContainer>
    )
})