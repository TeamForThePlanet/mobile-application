import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../types/notification';

interface NotificationListProps {
  notifications: Notification[];
  onNotificationPress: (notification: Notification) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationPress,
}) => {
  const theme = useTheme();

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: theme.colors.onBackground }]}>
          No notifications yet
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <NotificationItem
          message={item.message}
          imageUrl={item.image_url}
          createdAt={item.created_at}
          onPress={() => onNotificationPress(item)}
        />
      )}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});
