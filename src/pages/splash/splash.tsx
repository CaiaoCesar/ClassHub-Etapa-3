import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { style } from "./styles";
import { RootStackParamList } from "../../@types/types"; 

import { icons } from "../../global/icons";

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, "Splash">;

export default function TelaSplash() {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const navigationTimer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000); 

    return () => {
      clearTimeout(navigationTimer);
    };
  }, [navigation]);

  return (
    <View style={style.container}>
      <Image
        source={icons.splash}
        style={style.splashImage}
        resizeMode="contain"
      />
    </View>
  );
}
