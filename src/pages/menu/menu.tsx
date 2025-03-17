import React, { useState } from "react";
import { Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";
import { useAuth } from '../../contexts/authContext'; // Importe o hook useAuth

import { themes } from "../../global/themes";
import { style } from "./styles";

import Logo from "../../../assets/logo.png";
import IconLogout from "../../../assets/iconLogout.png";

export default function Menu() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isAuthenticated, logout } = useAuth(); // Use o hook useAuth

  const [pressionadoAgendar, setPressionadoAgendar] = useState<boolean>(false);
  const [pressionadoAgendamento, setPressionadoAgendamento] = useState<boolean>(false);
  const [pressionadoLogout, setPressionadoLogout] = useState<boolean>(false);

  const handleLogout = () => {
    logout(); // Desautentica o usuário
    navigation.navigate('Login'); // Navega para a tela de Login
  };

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
      </View>

      {/* Botão Agendar */}
      <View style={style.boxBotton1}>
        <Pressable
          style={({ pressed }) => [
            style.button1,
            {
              backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
            },
          ]}
          onPressIn={() => setPressionadoAgendar(true)}
          onPressOut={() => setPressionadoAgendar(false)}
          onPress={() => navigation.navigate('Agendar')}
        >
          {({ pressed }) => (
            <Text
              style={[
                style.textAgendar,
                { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
              ]}
            >
              {themes.strings.textAgendar}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Botão Agendamentos */}
      <View style={style.boxBotton2}>
        <Pressable
          style={({ pressed }) => [
            style.button2,
            {
              backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
            },
          ]}
          onPressIn={() => setPressionadoAgendamento(true)}
          onPressOut={() => setPressionadoAgendamento(false)}
          onPress={() => navigation.navigate('Agendamentos')}
        >
          {({ pressed }) => (
            <Text
              style={[
                style.textAgendamentos,
                { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
              ]}
            >
              {themes.strings.textAgendamentos}
            </Text>
          )}
        </Pressable>
      </View>

      {/* Botão Logout */}
      <View style={style.boxBotton3}>
        <Pressable
          style={({ pressed }) => [
            style.button3,
            {
              backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
            },
          ]}
          onPressIn={() => setPressionadoLogout(true)}
          onPressOut={() => setPressionadoLogout(false)}
          onPress={handleLogout} // Chama a função handleLogout
        >
          {({ pressed }) => (
            <>
              <Image
                source={IconLogout}
                style={{
                  tintColor: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro,
                }}
                resizeMode="contain"
              />
              <Text
                style={[
                  style.textLogout,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.textLogout}
              </Text>
            </>
          )}
        </Pressable>
      </View>
    </View>
  );
}