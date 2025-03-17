import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { style } from "./styles";
import { RootStackParamList } from "../../@types/types"; 

import Splash from "../../../assets/Splash.png"; 
import Splash1 from "../../../assets/Splash1.png";
import Splash2 from "../../../assets/Splash2.png"; 
import Splash3 from "../../../assets/Splash3.png"; 
import Splash4 from "../../../assets/Splash4.png"; 
import Splash5 from "../../../assets/Splash5.png"; 
import Splash6 from "../../../assets/Splash6.png"; 
import Splash7 from "../../../assets/Splash7.png"; 
import Splash8 from "../../../assets/Splash8.png"; 
import Splash9 from "../../../assets/Splash9.png"; 
import Splash10 from "../../../assets/Splash10.png"; 
import Splash11 from "../../../assets/Splash11.png"; 
import Splash12 from "../../../assets/Splash12.png"; 
import Splash13 from "../../../assets/Splash13.png"; 

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "Splash">;

export default function TelaSplash() {
    const navigation = useNavigation<SplashScreenNavigationProp>();

    const splashImages = [
        Splash,
        Splash1,
        Splash2,
        Splash3,
        Splash4,
        Splash5,
        Splash6,
        Splash7,
        Splash8,
        Splash9,
        Splash10,
        Splash11,
        Splash12,
        Splash13,
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % splashImages.length);
        }, 250); 

        const navigationTimer = setTimeout(() => {
            navigation.replace("Login");
        }, 3000); 

        return () => {
            clearInterval(imageInterval);
            clearTimeout(navigationTimer);
        };
    }, [navigation]);

    return (
        <View style={style.container}>
            <Image
                source={splashImages[currentImageIndex]}
                style={style.splashImage}
                resizeMode="contain"
            />
        </View>
    );
}