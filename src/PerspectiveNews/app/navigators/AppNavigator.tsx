import { createStackNavigator } from "@react-navigation/stack"
import { NewsFeedScreen } from "../screens/NewsFeedScreen"
import { WelcomeScreen } from "../screens/WelcomeScreen" // Keep this if you want it

const Stack = createStackNavigator()

export const AppNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="newsFeed" // Changed from "welcome"
        >
            {/* Optionally keep welcome screen if you want onboarding later */}
            <Stack.Screen name="welcome" component={WelcomeScreen} />

            {/* Make NewsFeed the primary screen */}
            <Stack.Screen
                name="newsFeed"
                component={NewsFeedScreen}
                options={{
                    headerShown: true,
                    title: "Perspective News",
                    headerStyle: {
                        backgroundColor: '#f8f8f8',
                        elevation: 0,
                        shadowOpacity: 0,
                    }
                }}
            />
        </Stack.Navigator>
    )
}