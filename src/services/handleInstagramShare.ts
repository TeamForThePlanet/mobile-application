import { Alert, Platform, Linking } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { Notification } from '../types/notification';

export const handleInstagramShare = async (notification: Notification) => {
    try {
        // Copy message to clipboard for user to paste
        await Clipboard.setStringAsync(notification.message);

        // const canOpenInstagram = await Linking.canOpenURL('instagram://user?username=instagram');

        // if (!canOpenInstagram) {
        //     Alert.alert(
        //         'Instagram Not Found',
        //         'Please install Instagram to share this content.',
        //         [
        //             { text: 'OK' }
        //         ]
        //     );
        //     return;
        // }

        // Download and save the image
        const response = await fetch(notification.image_url);
        const arrayBuffer = await response.arrayBuffer();
        const base64Data = Buffer.from(arrayBuffer).toString('base64');
        const localUri = `${FileSystem.cacheDirectory}temp_share_image.jpg`;
        
        await FileSystem.writeAsStringAsync(localUri, base64Data, {
            encoding: FileSystem.EncodingType.Base64,
        });

        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync();
        
        if (isAvailable) {
            try {
                await Sharing.shareAsync(localUri, {
                    mimeType: 'image/jpeg',
                    dialogTitle: 'Share to Instagram',
                    UTI: 'public.jpeg'  // This is needed for iOS
                });
                
                Alert.alert(
                    'Ready to Share',
                    'The message has been copied to your clipboard. You can paste it when sharing to Instagram.',
                    [{ text: 'OK' }]
                );
            } catch (error) {
                console.error('Error sharing:', error);
                Alert.alert(
                    'Sharing Failed',
                    'Unable to share the image. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        } else {
            Alert.alert(
                'Sharing Not Available',
                'Sharing is not available on this device.',
                [{ text: 'OK' }]
            );
        }

    } catch (error) {
        console.error('Error sharing to Instagram:', error);
        Alert.alert(
            'Sharing Failed',
            'An error occurred while trying to share to Instagram.',
            [
                { text: 'OK' }
            ]
        );
    }
};
