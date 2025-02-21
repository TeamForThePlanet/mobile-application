import { Linking, Alert } from 'react-native';
import { Notification } from '../types/notification';

export const handleBlueskyShare = async (notification: Notification) => {
  try {
    const encodedText = encodeURIComponent(notification.short_message);
    const mobileUrl = `bluesky://intent/compose?text=${encodedText}`;
    
    try {
      const canOpenMobile = await Linking.canOpenURL(mobileUrl);
      if (canOpenMobile) {
        await Linking.openURL(mobileUrl);
        return;
      }
    } catch (mobileError) {
      console.error('Error with mobile URL:', mobileError);
    }
    
  } catch (error) {
    console.error('Error opening Bluesky:', error);
    Alert.alert('Error', 'Could not open Bluesky app');
  }
};