import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "../../src/storage/tokenCache";
import { ReactNode } from "react";

export function ClerkProviderWrapper({ children, strategy }: {
  children: ReactNode;
  strategy: 'google' | 'apple';
}) {
  const publishableKey = strategy === 'google' 
    ? process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY_GOOGLE
    : process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY_APPLE;

  if (!publishableKey) {
    throw new Error(`Missing Publishable Key for ${strategy}`);
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      {children}
    </ClerkProvider>
  );
}