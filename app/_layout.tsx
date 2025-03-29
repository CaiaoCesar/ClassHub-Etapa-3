import { useAuth } from "@clerk/clerk-expo";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ClerkProviderWrapper } from "../src/components/clerkProviderWrapper";

export default function RootLayout() {
  return (
    <ClerkProviderWrapper strategy="google">
      <AuthLayout />
    </ClerkProviderWrapper>
  );
}

function AuthLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inAppGroup = segments[0] === '(app)';

    if (isSignedIn && !inAppGroup) {
      router.replace('/(app)/menu');
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)/login');
    }
  }, [segments, isLoaded, isSignedIn]);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A7EA9D" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
      <Stack.Screen name="(app)/menu" options={{ title: 'Menu', headerShown: false }} />
      <Stack.Screen name="(app)/agendar" options={{ title: 'Agendar', headerShown: false }} />
      <Stack.Screen name="(app)/agendamentos" options={{ title: 'Agendamentos', headerShown: false }} />
    </Stack>
  );
}