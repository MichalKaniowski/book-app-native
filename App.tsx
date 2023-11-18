// import "react-native-gesture-handler";
import { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { User, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig";
import Login from "./src/screens/Login";
import New from "./src/screens/New";
import Catalog from "./src/screens/Catalog";
import { Text, StatusBar, SafeAreaView } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./src/screens/Profile";
import Shelf from "./src/screens/Shelf";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CONVEX_URL } from "@env";
import { ThemeContext, ThemeContextProvider } from "./src/store/ThemeContext";
import { Appearance } from "react-native";

const Stack = createNativeStackNavigator();
const InsideTab = createBottomTabNavigator();

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <InsideTab.Navigator
      initialRouteName="New"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.background,
          margin: 0,
          padding: 0,
          borderTopWidth: 0.3,
          borderTopColor: theme.secondary,
        },
        headerShown: false,
      }}
    >
      <InsideTab.Screen
        name="New"
        component={New}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <>
              <EntypoIcon name="home" size={30} color="grey" />
              <Text style={{ color: focused ? theme.accent : "grey" }}>
                Nowe
              </Text>
            </>
          ),
        }}
      />
      <InsideTab.Screen
        name="Catalog"
        component={Catalog}
        options={{
          tabBarLabel: "Catalog",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <>
              <EntypoIcon name="grid" size={30} color="grey" />
              <Text style={{ color: focused ? theme.accent : "grey" }}>
                Katalog
              </Text>
            </>
          ),
          headerShown: false,
        }}
      />
      <InsideTab.Screen
        name="Shelf"
        component={Shelf}
        options={{
          tabBarLabel: "Shelf",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialIcon name="bookshelf" size={30} color="grey" />
              <Text style={{ color: focused ? theme.accent : "grey" }}>
                Shelf
              </Text>
            </>
          ),
          headerShown: false,
        }}
      />
      <InsideTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <>
              <MaterialIcon name="account-circle" size={30} color="grey" />
              <Text style={{ color: focused ? theme.accent : "grey" }}>
                Profile
              </Text>
            </>
          ),
          headerShown: false,
        }}
      />
    </InsideTab.Navigator>
  );
};

function AppContent() {
  const [user, setUser] = useState<User | null>(null);

  const { theme, actualTheme } = useContext(ThemeContext);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
        <StatusBar
          barStyle={actualTheme === "light" ? "dark-content" : "light-content"}
          backgroundColor={theme.background}
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Auth">
            {user ? (
              <Stack.Screen
                name="Inside"
                component={Layout}
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
    </>
  );
}

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <ThemeContextProvider>
        <AppContent />
      </ThemeContextProvider>
    </ConvexProvider>
  );
}
