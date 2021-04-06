import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LamasToolsScreen from "../screens/LamasToolsScreen";
import ProfiLamaScreen from "../screens/ProfiLamaScreen";
import LamaReminderScreen from "../screens/LamaReminderScreen";

import {
  BottomTabParamList,
  LamasToolsParamList,
  ProfiLamaParamList,
} from "../types";
import Icon from "react-native-vector-icons/Feather";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="LamasTools"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="LamasTools"
        component={LamasToolsNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="command" color={color} size={30} />
          ),
        }}
      />
      <BottomTab.Screen
        name="ProfiLama"
        component={ProfiLamaNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LamasToolsStack = createStackNavigator<LamasToolsParamList>();

function LamasToolsNavigator() {
  return (
    // <LamasToolsStack.Navigator>
    <>
      <LamasToolsStack.Screen
        name="LamasToolsScreen"
        component={LamasToolsScreen}
        options={{ headerTitle: "Lamas Tools" }}
      />
      <LamasToolsStack.Screen
        name="LamaReminderScreen"
        component={LamaReminderScreen}
        options={{ headerTitle: "Laminder" }}
      />
    </>
    // </LamasToolsStack.Navigator>
  );
}

const ProfiLamaStack = createStackNavigator<ProfiLamaParamList>();

function ProfiLamaNavigator() {
  return (
    <>
      <ProfiLamaStack.Screen
        name="ProfiLamaScreen"
        component={ProfiLamaScreen}
        options={{ headerTitle: "Profil Lama" }}
      />
    </>
  );
}
