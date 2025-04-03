import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
// Removido: import { useOAuth } from "@clerk/clerk-expo";
import { GoogleSignin, statusCodes, isErrorWithCode } from '@react-native-google-signin/google-signin'; // Importações necessárias
import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "./stylesLogin";
import { Button } from "../../src/components/button/button";

export default function Login() {
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);
    // Removido: const [appleLoading, setAppleLoading] = useState(false);

    // Removida a configuração do useOAuth

    // Nova função para o Google Sign-In
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            // Verifica se o Google Play Services está disponível (apenas Android)
            await GoogleSignin.hasPlayServices();

            // Inicia o fluxo de login
            const userInfoResponse = await GoogleSignin.signIn(); // userInfoResponse agora tem idToken e user
            console.log("Login bem-sucedido!");
            console.log("ID Token:", userInfoResponse.idToken);
            console.log("User Info:", userInfoResponse.user); // Acessa user diretamente

            // A resposta contém userInfoResponse.user com nome, email, foto, etc.
            // e userInfoResponse.idToken que você pode enviar ao seu backend

            // Exemplo de como usar os dados:
            const { name, email, photo } = userInfoResponse.user;
            console.log(`Nome: ${name}, Email: ${email}, Foto: ${photo}`);

            // Navega para a tela principal após o login
            // Você pode querer passar dados do usuário para a próxima tela ou salvá-los globalmente
            router.replace('/(app)/menu');

        } catch (error: any) {
            // ... (o resto do catch permanece igual)
            console.error("Erro no Google Sign-In:", error);
            console.error("Código do erro:", error.code); // Loga o código para debug

            if (isErrorWithCode(error)) { // Verifica se é um erro conhecido do Google Sign-In
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        // Usuário cancelou o fluxo de login
                        Alert.alert("Login Cancelado", "Você cancelou o login com o Google.");
                        break;
                    case statusCodes.IN_PROGRESS:
                        // Operação (ex: login) já está em andamento
                        Alert.alert("Aguarde", "O login com o Google já está em andamento.");
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Google Play Services não disponível ou desatualizado (apenas Android)
                        Alert.alert("Erro de Serviço", "O Google Play Services não está disponível ou está desatualizado no seu dispositivo.");
                        break;
                    default:
                        // Algum outro erro aconteceu
                        Alert.alert("Erro no Login", `Ocorreu um erro inesperado durante o login com o Google. Código: ${error.code}`);
                }
            } else {
                // Um erro não relacionado ao Google Sign-In aconteceu
                Alert.alert("Erro Desconhecido", "Ocorreu um erro inesperado durante o login.");
            }
        } finally {
            setGoogleLoading(false);
        }
    };

    // Removida a função handleOAuthSignIn antiga

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
                    onPress={handleGoogleSignIn} // Chama a nova função
                    isLoading={googleLoading}
                    disabled={googleLoading} // Desabilita enquanto carrega
                />
            </View>

            {/*Foco no Google mas o botao da apple ainda vai permanecer aqui*/}
            {/* <View style={style.boxBotton}>
                <Button
                    iconSource={icons.apple}
                    buttonText={themes.strings.appleID}
                    buttonStyle={style.button2}
                    textStyle={style.textAppleID}
                    iconStyle={style.icon}
                    onPress={() => {}} // Lógica do Apple Sign In aqui se necessário
                    isLoading={appleLoading}
                    disabled={appleLoading}
                />
            </View> */}
        </View>
    );
}