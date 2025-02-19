import React from 'react';
import { StyleSheet } from 'react-native';
import { Surface, Text, Avatar, TouchableRipple, useTheme } from 'react-native-paper';

interface NotificationItemProps {
  message: string;
  imageUrl: string;
  createdAt: string;
  onPress: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  message,
  imageUrl,
  createdAt,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <TouchableRipple onPress={onPress}>
      <Surface style={styles.container} elevation={1}>
        <Avatar.Image size={60} source={{ uri: imageUrl }} style={styles.image} />
        <Surface style={styles.content}>
          <Text style={styles.message}>{message}</Text>
          <Text style={[styles.timestamp, { color: theme.colors.backdrop }]}>
            {new Date(createdAt).toLocaleString()}
          </Text>
        </Surface>
      </Surface>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  image: {
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  message: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
  },
});
