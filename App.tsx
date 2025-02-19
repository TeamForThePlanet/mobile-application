import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { supabase, subscribeToNotifications } from './src/config/supabase';
import { NotificationList } from './src/components/NotificationList';
import { Notification } from './src/types/notification';
import 'react-native-url-polyfill/auto';
import { handleBlueskyShare } from './src/services/handleBlueskyShare';
import { handleLinkedInShare } from './src/services/handleLinkedInShare';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2196F3',
    accent: '#f1c40f',
    background: '#f5f5f5',
    placeholder: '#666',
  },
};

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  useEffect(() => {
    // Fetch existing notifications
    fetchNotifications();

    // Subscribe to new notifications
    const unsubscribe = subscribeToNotifications((notification) => {
      setNotifications(prev => [notification, ...prev]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNotifications(data || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      Alert.alert('Error', 'Failed to fetch notifications');
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    Alert.alert(
      'Choose Platform',
      'Select a platform to share this content:',
      [
        { 
          text: 'LinkedIn', 
          onPress: () => handleLinkedInShare(notification),
        },
        { text: 'Facebook', onPress: () => console.log('Facebook selected') },
        {
          text: 'Bluesky',
          onPress: () => handleBlueskyShare(notification),
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <NotificationList
          notifications={notifications}
          onNotificationPress={handleNotificationPress}
        />
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    marginTop: 50,
  },
});
