import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking"
import { View, Image} from "react-native";
import { useRouter } from 'expo-router'; // Importe o useRouter
import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "./styles";
import { Button } from "../../src/components/button/button";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
    const router = useRouter(); // Use o useRouter
    const [isLoading, setIsLoading] = useState(false);
    const googleOAuth = useOAuth({ strategy: "oauth_google" })

    async function onGoogleSignIn() {
        try {
            setIsLoading(true)

            const redirectUrl =  Linking.createURL("/");
            const oAuthFlow = await googleOAuth.startOAuthFlow({redirectUrl});

            if(oAuthFlow.authSessionResult?.type === "success"){
                if(oAuthFlow.setActive){
                    await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId})
                    router.replace('/menu'); // Redireciona para o menu APÓS o login
                }
            }
            else{
                setIsLoading(false);
            }

        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        WebBrowser.warmUpAsync()

        return () => {
            WebBrowser.coolDownAsync()
        }
    }, []);


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
                    onPress={onGoogleSignIn}
                    isLoading={isLoading}
                />
            </View>
            <View style={style.boxBotton}>
                <Button
                    iconSource={icons.apple}
                    buttonText={themes.strings.appleID}
                    buttonStyle={style.button2}
                    textStyle={style.textAppleID}
                    iconStyle={style.icon}
                    onPress={() => console.log("Apple login")}
                />
            </View>
        </View>
    );
}