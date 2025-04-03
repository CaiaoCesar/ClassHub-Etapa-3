import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native'; // Adicionado Text para mensagens de erro
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin'; // Importado statusCodes aqui também

// Variáveis lidas do ambiente
const IOS_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID;
const WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID;

export default function RootLayout() {
  return <AuthLayout />;
}

function AuthLayout() {
  const segments = useSegments();
  const router = useRouter();
  const [isAppReady, setIsAppReady] = React.useState(false);
  const [errorConfiguring, setErrorConfiguring] = React.useState<string | null>(null); // Estado para erro de config

  useEffect(() => {
    async function configureGoogleSignIn() {
      // Verificar se as variáveis de ambiente foram carregadas
      if (!WEB_CLIENT_ID || !IOS_CLIENT_ID) {
         const errorMessage = "Erro Crítico: Client IDs do Google não encontrados nas variáveis de ambiente (.env). Verifique se elas começam com EXPO_PUBLIC_";
         console.error(errorMessage);
         setErrorConfiguring(errorMessage);
         setIsAppReady(true); // Marca como pronto, mas com erro
         return; // Impede a configuração de continuar
      }

      try {
        console.log("Configurando Google Sign-In com:");
        console.log("Web Client ID:", WEB_CLIENT_ID ? '*** Carregado ***' : 'NÃO CARREGADO!');
        console.log("iOS Client ID:", IOS_CLIENT_ID ? '*** Carregado ***' : 'NÃO CARREGADO!');

        await GoogleSignin.configure({
          webClientId: WEB_CLIENT_ID,
          iosClientId: IOS_CLIENT_ID,
          profileImageSize: 150,
        });
        console.log("Google Sign-In Configurado com Sucesso!");
        setIsAppReady(true); // Marca como pronto após configuração bem-sucedida

      } catch (error: any) {
        console.error("Erro detalhado ao configurar Google Sign-In:", error);
        setErrorConfiguring(`Erro ao configurar Google Sign-In: ${error.message || 'Erro desconhecido'}`);
        setIsAppReady(true); // Mesmo com erro, permite que o app continue para mostrar o erro ou login
      }
    }

    configureGoogleSignIn();
  }, []);


  // Lógica de redirecionamento automático pode ser adicionada aqui
  // verificando o estado global de autenticação (não implementado neste exemplo)
  // useEffect(() => { ... });


  if (!isAppReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#A7EA9D" />
      </View>
    );
  }

  // Se houve erro na configuração, mostra a mensagem de erro em vez do app
  if (errorConfiguring) {
     return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
           <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>Erro na Configuração</Text>
           <Text style={{ color: 'red', textAlign: 'center' }}>{errorConfiguring}</Text>
           <Text style={{ color: 'gray', textAlign: 'center', marginTop: 15 }}>Verifique seu arquivo .env e reinicie o app/build.</Text>
        </View>
     )
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