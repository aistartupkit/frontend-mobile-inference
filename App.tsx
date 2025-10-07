/**
 * AI Inference App
 * React Native Mobile Front-End with Local AI Inference
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import authService from './src/services/authService';
import { User } from './src/types';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    // You could show a splash screen here
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppNavigator isAuthenticated={!!user} />
    </SafeAreaProvider>
  );
}

export default App;
