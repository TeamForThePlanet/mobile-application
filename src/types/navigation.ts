import { Notification } from './notification';

export type RootStackParamList = {
  Home: undefined;
  SharePreview: {
    notification: Notification;
  };
};
