// app/models/NavigationStore.ts
import { types, Instance, SnapshotOut } from "mobx-state-tree"
import { NavigationContainerRef } from "@react-navigation/native"
import { RootParamList } from "../navigators/navigationUtilities"

// Helper type for the navigation ref
type NavigationRefType = NavigationContainerRef<RootParamList>

export const NavigationStoreModel = types
    .model("NavigationStore")
    .props({
        isNavigationReady: types.optional(types.boolean, false),
        // Store only the essential methods we need
        navigationRef: types.optional(
            types.model({
                navigate: types.frozen<(name: string, params?: object) => void>(),
                dispatch: types.frozen<(action: any) => void>(),
                // Add other methods you need
            }),
            {
                navigate: () => console.warn("Navigation ref not ready"),
                dispatch: () => console.warn("Navigation ref not ready"),
            }
        ),
    })
    .actions((self) => ({
        setNavigationRef(ref: NavigationRefType | null) {
            if (ref) {
                self.navigationRef = {
                    navigate: ref.navigate,
                    dispatch: ref.dispatch,
                    // Add other methods you need
                }
                self.isNavigationReady = true
            } else {
                self.navigationRef = {
                    navigate: () => console.warn("Navigation ref not ready"),
                    dispatch: () => console.warn("Navigation ref not ready"),
                }
                self.isNavigationReady = false
            }
        },
        setIsNavigationReady(ready: boolean) {
            self.isNavigationReady = ready
        },
    }))

export interface NavigationStore extends Instance<typeof NavigationStoreModel> { }
