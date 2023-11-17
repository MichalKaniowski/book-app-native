// import "react-native-gesture-handler";
import { useState, useEffect } from "react";
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
import { ThemeContextProvider } from "./src/store/ThemeContext";

const Stack = createNativeStackNavigator();
const InsideTab = createBottomTabNavigator();

const convex = new ConvexReactClient(CONVEX_URL, {
  unsavedChangesWarning: false,
});

export const Layout = () => {
  return (
    <InsideTab.Navigator
      initialRouteName="New"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#000",
          margin: 0,
          padding: 0,
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
          tabBarIcon: () => (
            <>
              <EntypoIcon name="home" size={30} color="grey" />
              <Text style={{ color: "grey" }}>Nowe</Text>
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
              <Text style={{ color: focused ? "green" : "grey" }}>Katalog</Text>
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
              <Text style={{ color: focused ? "green" : "grey" }}>Shelf</Text>
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
              <Text style={{ color: focused ? "green" : "grey" }}>Profile</Text>
            </>
          ),
          headerShown: false,
        }}
      />
    </InsideTab.Navigator>
  );
};

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#000" }}>
      <StatusBar barStyle="light-content" />
      <ConvexProvider client={convex}>
        <ThemeContextProvider>
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
        </ThemeContextProvider>
      </ConvexProvider>
    </SafeAreaView>
  );
}
