import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { supabase, subscribeToNotifications } from './src/config/supabase';
import { NotificationList } from './src/components/NotificationList';
import { Notification } from './src/types/notification';

export default function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
        { text: 'LinkedIn', onPress: () => console.log('LinkedIn selected') },
        { text: 'Instagram', onPress: () => console.log('Instagram selected') },
        { text: 'Facebook', onPress: () => console.log('Facebook selected') },
        { text: 'Bluesky', onPress: () => console.log('Bluesky selected') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <NotificationList
        notifications={notifications}
        onNotificationPress={handleNotificationPress}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
});
