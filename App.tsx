import "react-native-gesture-handler";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { User, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
import Login from "./src/screens/Login";
import { StatusBar, SafeAreaView, AppStateStatus } from "react-native";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL, DOMAIN } from "@env";
import { ThemeContext, ThemeContextProvider } from "./src/store/ThemeContext";
import MainTabNavigator from "./src/routes/MainTabNavigator";
import { TabsContextProvider } from "./src/store/TabsContext";
import { BookContextProvider } from "./src/store/BookContext";
import { AppState } from "react-native";
import axios from "axios";

const Stack = createNativeStackNavigator();

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const { theme, actualTheme } = useContext(ThemeContext);

  let appStartTime = new Date();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });

    AppState.addEventListener("change", handleAppStateChange);
  }, []);

  const handleAppStateChange = useCallback(async(nextAppState: AppStateStatus) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      const viewSessionDuration = Math.round(((new Date()).getTime() / 1000) - (appStartTime.getTime()/1000));

      await axios.post(`${DOMAIN}/api/users/addSpentTime`, {userFirebaseId: firebaseAuth.currentUser?.uid, spentTimeInSeconds: viewSessionDuration})

    } else {
      appStartTime = new Date();
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        barStyle={actualTheme === "light" ? "dark-content" : "light-content"}
        backgroundColor={theme.background}
      />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          {user ? (
            <Stack.Screen
              name="MainTabNavigator"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="Auth"
              component={Login}
              options={{ headerShown: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <ThemeContextProvider>
        <BookContextProvider>
          <TabsContextProvider>
            <AppContent />
          </TabsContextProvider>
        </BookContextProvider>
      </ThemeContextProvider>
    </ConvexProvider>
  );
}
