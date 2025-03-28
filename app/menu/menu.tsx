import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { useAuth, useUser } from "@clerk/clerk-expo";

import { themes } from "../../src/global/themes";
import { icons } from "../../src/global/icons";
import { style } from "./styles";

import { Button } from "../../src/components/button/button";

export default function Menu() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
        {user?.imageUrl && (
          <Image source={{ uri: user.imageUrl }} style={styles.image} />
        )}
        <Text style={styles.text}>{user?.username}</Text>
      </View>

      {/* Botão Agendar */}
      <View style={style.boxBotton}>
        <Button
          buttonText={themes.strings.agendar}
          buttonStyle={style.button}
          textStyle={style.textAgendar}
          onPress={() => router.push("/agendar")}
        />
      </View>

      {/* Botão Agendamentos */}
      <View style={style.boxBotton}>
        <Button
          buttonText={themes.strings.agendamentos}
          buttonStyle={style.button}
          textStyle={style.textAgendamentos}
          onPress={() => router.push("/agendamentos")}
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
          onPress={async () => {
            await signOut();
            router.replace('/login'); // Redireciona para a tela de login após o logout
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  image: {
    width: 92,
    height: 92,
    borderRadius: 24,
  }
})