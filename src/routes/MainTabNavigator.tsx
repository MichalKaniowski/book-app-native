import { useContext, useLayoutEffect } from "react";
import Catalog from "../screens/Catalog";
import { Text } from "react-native";
import EntypoIcon from "react-native-vector-icons/Entypo";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "../screens/Profile";
import Shelf from "../screens/Shelf";
import { ThemeContext } from "../store/ThemeContext";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import New from "../screens/New";
import { TabsContext } from "../store/TabsContext";
import CatalogNavigator from "./CatalogNavigator";

const InsideTab = createBottomTabNavigator();

export default function MainTabNavigator({ navigation, route }: any) {
  const { theme } = useContext(ThemeContext);
  const { isTabsOpen } = useContext(TabsContext);

  useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);
    if (routeName === "Group") {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);

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
          display: isTabsOpen ? "flex" : "none",
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
        name="CatalogNavigator"
        component={CatalogNavigator}
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
}
