import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "../../src/styles/stylesLogin";
import { Button } from "../../src/components/button/button";

// Tipos atualizados para compatibilidade com a biblioteca
type GoogleUserInfo = {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  givenName?: string;
  familyName?: string;
};

type GoogleSignInResponse = {
  idToken: string | null;
  user: GoogleUserInfo;
};

export default function Login() {
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);
    const [appleLoading, setAppleLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            // 1. Verifica se o Google Play Services está disponível
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // 2. Faz o login - usando type assertion para o tipo correto
            const response = await GoogleSignin.signIn() as unknown as GoogleSignInResponse;
            const { idToken, user } = response;
            
            if (!idToken) {
                throw new Error('No ID token received');
            }

            // 3. Obtém o token de acesso (opcional)
            const { accessToken } = await GoogleSignin.getTokens();

            console.log("Google Login Success:", {
                id: user.id,
                name: user.name,
                email: user.email,
                photo: user.photo,
                idToken,
                accessToken
            });

            // 4. Navega para a tela principal
            router.replace('/(app)/menu');

        } catch (error: any) {
            console.error("Google Sign-In Error:", error);

            if (error.code) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        Alert.alert("Cancelado", "Login com Google cancelado");
                        break;
                    case statusCodes.IN_PROGRESS:
                        Alert.alert("Aguarde", "Login já em progresso");
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        Alert.alert("Erro", "Google Play Services não disponível");
                        break;
                    default:
                        Alert.alert("Erro", `Erro no login: ${error.code}`);
                }
            } else {
                Alert.alert("Erro", error.message || "Erro desconhecido");
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={icons.logo} style={style.logo} resizeMode="contain" />
            </View>

            <View style={style.boxBotton}>
                <Button
                    iconSource={icons.gmail}
                    buttonText={themes.strings.gmail}
                    buttonStyle={style.button1}
                    textStyle={style.textGmail}
                    iconStyle={style.icon}
                    onPress={handleGoogleSignIn}
                    isLoading={googleLoading}
                    disabled={googleLoading}
                />
            </View>

            {/* Botão do Apple ID mantido conforme solicitado */}
            <View style={style.boxBotton}>
                <Button
                    iconSource={icons.apple}
                    buttonText={themes.strings.appleID}
                    buttonStyle={style.button2}
                    textStyle={style.textAppleID}
                    iconStyle={style.icon}
                    onPress={() => {}}
                    isLoading={appleLoading}
                    disabled={appleLoading}
                />
            </View>
        </View>
    );
}