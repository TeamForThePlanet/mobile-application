import { Linking, Alert } from 'react-native';
import { Notification } from '../types/notification';
import { downloadAndSaveImage } from './downloadAndSaveImage';
import Clipboard from '@react-native-clipboard/clipboard';

export const handleLinkedInShare = async (notification: Notification) => {
    try {
        await Clipboard.setString(notification.message);
        
        if (notification.image_url) {
            await downloadAndSaveImage(notification.image_url);
        }
        
        const shareUrl = `https://www.linkedin.com/shareArticle`;
        
        await Linking.openURL(shareUrl);
        Alert.alert('Success', 'Content copied to clipboard for sharing');
    } catch (error) {
        console.error('Error in handleLinkedInShare:', error);
        Alert.alert('Error', 'Failed to process the share action');
    }
};