import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          LamasTools: {
            screens: {
              LamasToolsScreen: 'Home',
              LamaReminderScreen: 'Todo-List'
            },
          },
          ProfiLama: {
            screens: {
              ProfiLamaScreen: 'Profile',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
