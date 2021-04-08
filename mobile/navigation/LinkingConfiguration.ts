import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Login: {
            screens: {
              LoginScreen: "Home",
            },
          },
          LamasTools: {
            screens: {
              LamasToolsScreen: "tools",
              LamaReminderScreen: "Todo-List",
            },
          },
          ProfiLama: {
            screens: {
              ProfiLamaScreen: "Profile",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
