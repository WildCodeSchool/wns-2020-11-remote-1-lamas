export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  LamaReminderScreen: undefined;
  LamasToolsScreen: LoginScreenParam;
  LoginScreen: undefined;
  BottomTabNavigator: undefined;
  LamadoroScreen: undefined;
  LamojiScreen: LamojiScreenParam;
};

export type BottomTabParamList = {
  LamasTools: undefined;
  ProfiLama: undefined;
};

export type LamasToolsParamList = {
  LamasToolsScreen: LoginScreenParam;
  LamaReminderScreen: undefined;
  LoginScreen: undefined;
};

export type LamasReminderParamList = {
  LamaRemindersScreen: undefined;
};

export type ProfiLamaParamList = {
  ProfiLamaScreen: undefined;
};

export type LamojiScreenParam = {
  roomId: string;
  userId: string;
}

export type LoginScreenParam = {
  userId: string
}