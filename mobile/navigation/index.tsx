import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";
import { Button } from "react-native-elements";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import LamaReminderScreen from "../screens/LamaReminderScreen";
import LoginScreen from "../screens/LoginScreen";
import LamasToolsScreen from "../screens/LamasToolsScreen";
import LamojiScreen from "../screens/LamojiScreen";
import LamodoroScreen from "../screens/LamodoroScreen";
import { authReducer } from "./authReducer";

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
  const [state, dispatch] = authReducer()

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await SecureStore.getItemAsync("userToken");

        if (userToken) {
          dispatch({ type: "SIGN_IN" });
        }
      } catch (e) {
        console.log(e/*  */);
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
    }),
    []
  );

  console.log(state)
  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator screenOptions={{
        headerShown: state.isLoggedIn,
        headerTransparent: true,
        headerBackTitle: 'Retour',
        headerTintColor:'white',
        headerBackTitleStyle:styles.title,
        headerBackAccessibilityLabel:'Retour',
        headerRight: (props) => {
          if (state.isLoggedIn) {
            return (
              <Button 
                title="Se déconnecter"
                onPress={async() => {
                  await SecureStore.deleteItemAsync("userToken");
                  authContext.signOut();
                }}
                buttonStyle={styles.button}
                titleStyle={styles.title}
              />
            )
          }
        },
        headerTitle: () => null
      }}>
        <Stack.Screen name="Root" component={LoginScreen} options={{headerRight: () => null}} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={{headerBackTitleVisible: false, headerLeft: () => null}}
        />
        {state.isLoggedIn && (
          <>
            <Stack.Screen
              name="LamasToolsScreen"
              component={LamasToolsScreen}
              options={{headerBackTitleVisible: false, headerLeft: () => null}}
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

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#00396A",
    borderRadius: 10,
    marginTop:10,
    marginRight:10
  },
  title: {
    color: 'white',
    fontSize: 12
  }
});