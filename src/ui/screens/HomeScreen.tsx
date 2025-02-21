import React, { useEffect, useState } from 'react';
import { supabase, subscribeToNotifications } from '../../config/supabase';
import { NotificationList } from '../components/NotificationList';
import { Notification } from '../../types/notification';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { theme } from '../../ui/theme';

export function HomeScreen({ navigation }: any) {
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
      }
    };
  
    const handleNotificationPress = (notification: Notification) => {
      navigation.navigate('SharePreview', { notification });
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
        backgroundColor: theme.colors.background,
        marginTop: 50,
    },
});