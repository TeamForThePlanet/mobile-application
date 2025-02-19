import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

type MessageResponse = [string, string];

export const downloadAndSaveImage = async (imageUrl: string): Promise<MessageResponse> => {
  const [permissionStatus, permissionMessage] = await checkMediaPermissions();

  if (permissionStatus !== 'Success') {
    return [permissionStatus, permissionMessage];
  }

  const localUri = getLocalUri(imageUrl);

  const [downloadStatus, downloadMessage] = await downloadToCache(imageUrl, localUri);
  if (downloadStatus !== 'Success') {
    return [downloadStatus, downloadMessage];
  }

  return saveToGallery(localUri);
};

const checkMediaPermissions = async (): Promise<MessageResponse> => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted'
      ? ['Success', '']
      : ['Permission needed', 'Please grant permission to save images'];
  };
  
  const getLocalUri = (imageUrl: string): string => {
    console.log(imageUrl);
    const filename = imageUrl.split('/').pop() || 'image.jpg';
    return `${FileSystem.documentDirectory}${filename}.jpg`;
  };
  
  const downloadToCache = async (imageUrl: string, localUri: string): Promise<MessageResponse> => {
    try {
      await FileSystem.downloadAsync(imageUrl, localUri);
      return ['Success', ''];
    } catch (error) {
      console.error('Error downloading image:', error);
      return ['Error', 'Failed to download the image'];
    }
  };
  
  const saveToGallery = async (localUri: string): Promise<MessageResponse> => {
    try {
      await MediaLibrary.saveToLibraryAsync(localUri);
      return ['Success', 'Image saved to your gallery. You can now add it to your Bluesky post.'];
    } catch (error) {
      console.error('Error saving to gallery:', error);
      return ['Error', 'Failed to save the image to gallery'];
    }
  };