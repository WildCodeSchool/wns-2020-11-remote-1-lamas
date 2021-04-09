import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import * as SecureStore from "expo-secure-store";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import LamaReminderScreen from "../screens/LamaReminderScreen";
import LoginScreen from "../screens/LoginScreen";
import LamasToolsScreen from "../screens/LamasToolsScreen";
import LamojiScreen from "../screens/LamojiScreen";
import LamodoroScreen from "../screens/LamodoroScreen";

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();
export const AuthContext: any = React.createContext(null);

function RootNavigator() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: any) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...prevState,
            isLoggedIn: true,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isLoggedIn: false,
          };
      }
    },
    {
      isLoggedIn: true,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");

        if (userToken) {
          dispatch({ type: "SIGN_IN" });
        }
      } catch (e) {
        console.log(e);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        dispatch({ type: "SIGN_IN" });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      // signUp: async (data) => {
      //   dispatch({ type: "SIGN_IN" });
      // },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Root" component={LoginScreen} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />

        {state.isLoggedIn && (
          <>
            <Stack.Screen
              name="LamasToolsScreen"
              component={LamasToolsScreen}
            />
            <Stack.Screen
              name="LamaReminderScreen"
              component={LamaReminderScreen}
            />
            <Stack.Screen name="LamojiScreen" component={LamojiScreen} />
            <Stack.Screen name="LamadoroScreen" component={LamodoroScreen} />
          </>
        )}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}
