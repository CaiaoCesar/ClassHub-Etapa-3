import React from "react";
import { View, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style } from "./styles";

import { Button } from "../../components/button/button";

export default function Menu() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
      </View>

      {/* Botão Agendar */}
      <View style={style.boxBotton}>
        <Button
          buttonText={themes.strings.agendar}
          buttonStyle={style.button}
          textStyle={style.textAgendar}
          onPress={() => navigation.navigate("Agendar")}
        />
      </View>

      {/* Botão Agendamentos */}
      <View style={style.boxBotton}>
        <Button
          buttonText={themes.strings.agendamentos}
          buttonStyle={style.button}
          textStyle={style.textAgendamentos}
          onPress={() => navigation.navigate("Agendamentos")}
        />
      </View>

      {/* Botão Logout */}
      <View style={style.boxBotton}>
        <Button
          iconSource={icons.logout}
          buttonText={themes.strings.logout}
          buttonStyle={style.button3}
          textStyle={style.textLogout}
          iconStyle={style.icon}
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}