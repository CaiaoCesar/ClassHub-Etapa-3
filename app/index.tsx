import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { icons } from '../src/global/icons';
import { themes } from '../src/global/themes';

export default function Splash() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        if (isSignedIn) {
          router.replace('/(app)/menu');
        } else {
          router.replace('/(auth)/login');
        }
      }, 2000); // Reduzi para 2 segundos para testes

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, isLoaded]);

  return (
    <View style={styles.container}>
      <Image source={icons.splash} style={styles.splashImage} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.verdeClaro,
  },
  splashImage: {
    width: 200,
    height: 200,
  },
});