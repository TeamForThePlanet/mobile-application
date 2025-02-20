import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase, subscribeToNotifications } from './src/config/supabase';
import { NotificationList } from './src/components/NotificationList';
import { SharePreviewScreen } from './src/screens/SharePreviewScreen';
import { Notification } from './src/types/notification';
import { RootStackParamList } from './src/types/navigation';
import { handleBlueskyShare } from './src/services/handleBlueskyShare';
import { handleLinkedInShare } from './src/services/handleLinkedInShare';

const Stack = createNativeStackNavigator<RootStackParamList>();

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

function HomeScreen({ navigation }: any) {
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

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ title: 'Notifications' }}
          />
          <Stack.Screen
            name="SharePreview"
            component={SharePreviewScreen}
            options={{ title: 'Share Preview' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
