import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { icons } from '../src/global/icons';
import { style} from "../src/styles/stylesIndex";

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
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [isSignedIn, isLoaded]);

  return (
    <View style={style.container}>
      <Image source={icons.splash} style={style.splashImage} resizeMode="contain" />
    </View>
  );
}
