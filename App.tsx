import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SharePreviewScreen } from './src/ui/screens/SharePreviewScreen';
import { RootStackParamList } from './src/types/navigation';
import { HomeScreen } from './src/ui/screens/HomeScreen';
import { theme } from 'ui/theme';

const Stack = createNativeStackNavigator<RootStackParamList>();

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
