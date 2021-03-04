import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          LamasTools: {
            screens: {
              LamasToolsScreen: 'one',
              LamaReminderScreen:'LamaReminderScreen',
            },
          },
          ProfiLama: {
            screens: {
              ProfiLamaScreen: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
