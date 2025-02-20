import { Linking, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Notification } from '../types/notification';

const shareUrl = `https://www.linkedin.com/shareArticle`;

export const handleLinkedInShare = async (notification: Notification) => {
    try {
        await Clipboard.setStringAsync(notification.message);
        await Linking.openURL(shareUrl);

        Alert.alert('Success', 'Content copied to clipboard for sharing');
    } catch (error) {
        console.error('Error in handleLinkedInShare:', error);
        Alert.alert('Error', 'Failed to process the share action');
    }
};