import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import { useRouter } from 'expo-router';
import { useOAuth } from "@clerk/clerk-expo";
import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "./stylesLogin";
import { Button } from "../../src/components/button/button";

export default function Login() {
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);
    const [appleLoading, setAppleLoading] = useState(false);
    
    // Configuração para OAuth
    const { startOAuthFlow: startGoogleOAuth } = useOAuth({ strategy: "oauth_google" });
    const { startOAuthFlow: startAppleOAuth } = useOAuth({ strategy: "oauth_apple" });

    const handleOAuthSignIn = async (strategy: "google" | "apple") => {
        const setLoading = strategy === "google" ? setGoogleLoading : setAppleLoading;
        const startOAuth = strategy === "google" ? startGoogleOAuth : startAppleOAuth;
        
        try {
            setLoading(true);
            
            const { createdSessionId, setActive } = await startOAuth({
                redirectUrl: "classhub://oauth-callback"
            });

            if (createdSessionId) {
                await setActive?.({ session: createdSessionId });
                router.replace('/(app)/menu');
            } else {
                Alert.alert("Erro", `Não foi possível realizar login com ${strategy === "google" ? "Google" : "Apple"}`);
            }
        } catch (err) {
            console.error(`Erro no login ${strategy}:`, err);
            Alert.alert("Erro", "Ocorreu um erro durante o login");
        } finally {
            setLoading(false);
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
                    onPress={() => handleOAuthSignIn("google")}
                    isLoading={googleLoading}
                />
            </View>
            
            <View style={style.boxBotton}>
                <Button
                    iconSource={icons.apple}
                    buttonText={themes.strings.appleID}
                    buttonStyle={style.button2}
                    textStyle={style.textAppleID}
                    iconStyle={style.icon}
                    onPress={() => handleOAuthSignIn("apple")}
                    isLoading={appleLoading}
                />
            </View>
        </View>
    );
}