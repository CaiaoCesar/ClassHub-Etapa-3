import React, { useState } from "react";
import * as AuthSession from 'expo-auth-session';

import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style } from "./styles";

import { Button } from "../../components/button/button";
import axios from "axios";

export type UserProps = {
  name: string;
  email: string;
  picture: string;
}

type Props = {
  user: UserProps;
}

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
}


export function User({ user }: Props) {
  return (
    <View>
      <Image
        source={{ uri: user.picture }}
      />

      {/*  Ajustar os componentes Name e Email se necessário para usar Text do react-native */}
      {/* <Name>
        {user.name}
      </Name>

      <Email>
        {user.email}
      </Email> */}
    </View>
  );
}



export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userData, setUserData] = useState<UserProps>({} as UserProps);

  {/* Funcao Login*/ }
  async function handleGoogleSignIn() {
    try {
      const CLIENT_ID = process.env.EXPO_PUBLIC_CLIENT_ID;
      const REDIRECT_URI = process.env.EXPO_PUBLIC_REDIRECT_URI;
      const SCOPE = encodeURI(process.env.EXPO_PUBLIC_SCOPE);
      const RESPONSE_TYPE = process.env.EXPO_PUBLIC_RESPONSE_TYPE;

      const authUrl = process.env.EXPO_PUBLIC_AUTHURL;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthResponse;


      if (type === 'success') {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        setUserData(response.data);  // Ajuste aqui: Pegar os dados de dentro do response
        console.log(response.data) // verificar os dados recebidos
      }

    } catch (error) {
      console.log("Erro no login do google:", error); // Imprimir o erro para ajudar na depuração
    }
  }

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
      </View>

      {/* Botão Gmail */}
      <View style={style.boxBotton}>
        <Button
          iconSource={icons.gmail}
          buttonText={themes.strings.gmail}
          buttonStyle={style.button1}
          textStyle={style.textGmail}
          iconStyle={style.icon}
          onPress={handleGoogleSignIn} 
          onPressIn={() => navigation.navigate("Menu")}
        />
      </View>

      {/* Renderização condicional do componente User */}
      {userData.name && userData.email && userData.picture ? (
        <User user={userData} />
      ) : null}


      {/* Botão Apple */}
      <View style={style.boxBotton}>
        <Button
          iconSource={icons.apple}
          buttonText={themes.strings.appleID}
          buttonStyle={style.button2}
          textStyle={style.textAppleID}
          iconStyle={style.icon}
          onPress={() => navigation.navigate("Menu")}
        />
      </View>
    </View>
  );
}