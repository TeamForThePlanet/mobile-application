import React from 'react';
import { StyleSheet, View, Image, ScrollView, Alert, ToastAndroid, Platform } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { downloadAndSaveImage } from '../services/downloadAndSaveImage';
import { handleLinkedInShare } from '../services/handleLinkedInShare';
import { handleBlueskyShare } from '../services/handleBlueskyShare';
import { handleInstagramShare } from '../services/handleInstagramShare';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'SharePreview'>;

export const SharePreviewScreen: React.FC<Props> = ({ route, navigation }) => {
  const { notification } = route.params;

  const handleDownload = async () => {
    try {
      if (notification.image_url) {
        await downloadAndSaveImage(notification.image_url);
      }

      showDownloadedMessage();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const showDownloadedMessage = () => {
    ToastAndroid.show('Image downloaded successfully!', ToastAndroid.SHORT);
  };

  const textPreview = notification.long_message.substring(0, 200);

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.previewCard} elevation={1}>
        {notification.image_url && (
          <Image
            source={{ uri: notification.image_url }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
        <Text style={styles.messageText}>{textPreview}...</Text>
      </Surface>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleDownload}
          style={styles.button}
          icon="download"
        >
          Download Image
        </Button>

        <Button
          mode="contained"
          onPress={() => handleLinkedInShare(notification)}
          style={styles.button}
          icon="linkedin"
        >
          Share on LinkedIn
        </Button>

        <Button
          mode="contained"
          onPress={() => handleBlueskyShare(notification)}
          style={styles.button}
          icon="share"
        >
          Share on Bluesky
        </Button>

        <Button
          mode="contained"
          onPress={() => handleInstagramShare(notification)}
          style={styles.button}
          icon="instagram"
        >
          Share on Instagram
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  previewCard: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 16,
    borderRadius: 8,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    marginBottom: 8,
  },
});
