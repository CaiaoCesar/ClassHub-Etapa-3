import React, { useState } from "react";
import { Text, View, Image, Modal, Pressable, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { style } from "./styles";

import { cancelEvent } from "../../../services/calendlyService"; // Importação do serviço

import Logo from "../../../assets/logo.png";
import Linha from "../../../assets/Line.png";
import Voltar from "../../../assets/voltar.png";
import Verificado from "../../../assets/verificacao.png";

export default function Agendamentos() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [pressionadoCancelar, setPressionadoCancelar] = useState<boolean>(false);
  const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);

  // Função para cancelar um evento
  const handleCancelarEvento = async () => {
    if (!eventoSelecionado) {
      Alert.alert("Atenção", "Nenhum evento selecionado para cancelar.");
      return;
    }

    try {
      const response = await cancelEvent(eventoSelecionado);
      console.log("Evento cancelado:", response);

      // Fechar o modal e fornecer feedback ao usuário
      setModalVisible(false);
      Alert.alert("Sucesso", "Evento cancelado com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar evento:", error);
      Alert.alert("Erro", "Erro ao cancelar evento. Tente novamente.");
    }
  };

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={Logo} style={style.logo} resizeMode="contain" />
        <Text style={style.textAgendamentos}>{themes.strings.textAgendamentos}</Text>
        <Image source={Linha} style={style.linhaCima} resizeMode="contain" />
      </View>

      {/* Lista de eventos */}
      <ScrollView contentContainerStyle={style.horariosContainer}>
        {/* Aqui você pode listar os eventos reais obtidos da API do Calendly */}
        <Text style={style.textMsgAgendamentos}>Nenhum evento agendado.</Text>
      </ScrollView>

      {/* Rodapé */}
      <View style={style.rodape}>
        <Image source={Linha} style={style.linhaBaixo} resizeMode="contain" />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
          <Pressable
            style={({ pressed }) => [
              style.buttonVoltar,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoVoltar(true)}
            onPressOut={() => setPressionadoVoltar(false)}
            onPress={() => navigation.navigate("Menu")}
          >
            {({ pressed }) => (
              <Image
                source={Voltar}
                resizeMode="contain"
                style={[
                  style.Voltar,
                  { tintColor: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              />
            )}
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              style.buttonCancelar,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoCancelar(true)}
            onPressOut={() => setPressionadoCancelar(false)}
            onPress={() => setModalVisible(true)}
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.textCancelarAgendamento,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.textCancelarAgendamento}
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* Modal de confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.confirmaCancelamento}>{themes.strings.confirmaCancelamento}</Text>

            <Image source={Verificado} style={style.verificado} resizeMode="contain" />
          </View>
          <Pressable
            style={({ pressed }) => [
              style.modalButton,
              {
                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
              },
            ]}
            onPressIn={() => setPressionadoConfirmar(true)}
            onPressOut={() => setPressionadoConfirmar(false)}
            onPress={handleCancelarEvento} // Chamar a função de cancelamento
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.confirma,
                  { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                ]}
              >
                {themes.strings.confirma}
              </Text>
            )}
          </Pressable>
        </View>
      </Modal>
    </View>
  );
}