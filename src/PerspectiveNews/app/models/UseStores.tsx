// app/models/use-stores.ts
import React from "react"
import { RootStore } from "./RootStore"

// Create context with proper typing
const StoreContext = React.createContext<RootStore | undefined>(undefined)

// Create provider component
export const StoreProvider: React.FC<{ store: RootStore }> = ({ store, children }) => (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)

// Create custom hook with proper type checking
export const useStores = (): RootStore => {
    const context = React.useContext(StoreContext)
    if (context === undefined) {
        throw new Error("useStores must be used within a StoreProvider")
    }
    return context
}