import React, { useState, useEffect } from "react";
import { Text, View, Image, Modal, ScrollView, Alert, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "../../utils/localeCalendarConfig";

import { themes } from "../../global/themes";
import { icons } from "../../global/icons";
import { style, calendarTheme } from "./styles";

import { Button } from "../../components/button/button";
import {
  createSchedulingUrl,
  getEventTypes,
  getCurrentUser,
  getEventTypeAvailableTimes,
} from "../../../services/calendlyService";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

interface EventType {
  uri: string;
  name: string;
}

export default function Agendar() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
  const [day, setDay] = useState<DateData>();

  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      setError(null);
      try {
        const userData = await getCurrentUser();
        const eventTypesData = await getEventTypes(userData.resource.uri);
        setEventTypes(eventTypesData);
        if (eventTypesData.length > 0) {
          setSelectedEventType(eventTypesData[0].uri); 
        }
      } catch (error: any) {
        console.error("Erro ao carregar dados:", error.response?.data || error.message);
        Alert.alert("Erro", "Erro ao carregar dados. Tente novamente.");
        setError("Erro ao carregar dados. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (day && selectedEventType) {
      fetchAvailableTimes(day.dateString);
    }
  }, [day, selectedEventType]);

  const fetchAvailableTimes = async (date: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const selectedDate = new Date(date);
      const startTime = `${selectedDate.toISOString().split("T")[0]}T00:00:00Z`;
      const endTime = `${selectedDate.toISOString().split("T")[0]}T23:59:59Z`;

      const availableTimesData = await getEventTypeAvailableTimes(selectedEventType!, startTime, endTime);
      const times = availableTimesData.collection.map((item: any) =>
        new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
      setAvailableTimes(times);
    } catch (error: any) {
      console.error("Erro ao buscar horários disponíveis:", error.response?.data || error.message);
      Alert.alert("Erro", "Erro ao buscar horários disponíveis. Tente novamente.");
      setError("Erro ao buscar horários disponíveis. Tente novamente.");
      setAvailableTimes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressIn = (horario: string) => {
    if (horarioSelecionado === horario) {
      setHorarioSelecionado(null);
    } else {
      setHorarioSelecionado(horario);
    }
  };

  const handleAgendarEvento = async () => {
    if (day && horarioSelecionado && selectedEventType) {
      try {
        const response = await createSchedulingUrl(selectedEventType);

        if (response && response.resource && response.resource.booking_url) {
          const schedulingUrl = response.resource.booking_url;
          console.log("URL de agendamento criada:", schedulingUrl);
          Linking.openURL(schedulingUrl);
          setModalVisible(false);
          Alert.alert("Sucesso", "Evento agendado com sucesso!");
        } else {
          console.error("Erro: URL de agendamento não encontrada na resposta:", response);
          Alert.alert("Erro", "Erro: URL de agendamento não encontrada. Tente novamente.");
        }
      } catch (error: any) {
        console.error("Erro ao criar URL de agendamento:", error.response?.data || error.message);
        Alert.alert("Erro", "Erro ao agendar evento. Tente novamente.");
      }
    } else {
      Alert.alert("Atenção", "Selecione uma data e um horário.");
    }
  };

  const isAgendarButtonDisabled = !day || !horarioSelecionado;

  return (
    <View style={style.container}>
      {/* Cabeçalho */}
      <View style={style.boxTop}>
        <Image source={icons.logo} style={style.logo} resizeMode="contain" />
      </View>

      <Image source={icons.linha} style={style.linhaCima} resizeMode="contain" />

      {/* Calendário */}
      <View style={style.boxCalendar}>
        <Calendar
          style={style.calendar}
          renderArrow={(direction: "right" | "left") => (
            <View style={style.arrowContainer}>
              <Feather size={35} color="#00350E" name={`chevron-${direction}`} />
            </View>
          )}
          theme={calendarTheme}
          minDate={new Date().toDateString()}
          onDayPress={setDay}
          markedDates={day ? { [day.dateString]: { selected: true } } : {}}
        />
      </View>

      <Image source={icons.linha} style={style.linhaMeio} resizeMode="contain" />
      <Text style={style.horariosTitle}>{themes.strings.textHorarios}</Text>

      {/* Horários */}
      <ScrollView style={{ maxHeight: 200 }} contentContainerStyle={style.horariosContainer} showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <Text style={style.textMsgHorarios}>{themes.strings.carregandoHora}</Text>
        ) : error ? (
          <Text style={[style.textMsgHorarios, { color: themes.colors.verdeEscuro }]}>{error}</Text>
        ) : availableTimes.length === 0 ? (
          <Text style={style.textMsgHorarios}>Nenhum horário disponível para esta data</Text>
        ) : (
          availableTimes.map((horario) => (
            <Button
              key={horario}
              buttonText={horario}
              buttonStyle={[
                style.buttonHorarios,
                horarioSelecionado === horario && style.buttonHorariosSelected,
              ]}
              textStyle={[
                style.textMsgHorarios,
                horarioSelecionado === horario && style.textMsgHorariosSelected,
              ]}
              isSelected={horarioSelecionado === horario}
              onPress={() => handlePressIn(horario)}
            />
          ))
        )}
      </ScrollView>

      {/* Rodapé */}
      <View style={style.rodape}>
        <Image source={icons.linha} style={style.linhaBaixo} resizeMode="contain" />
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
          <Button
            iconSource={icons.voltar}
            buttonStyle={style.buttonVoltar}
            iconStyle={style.Voltar}
            onPress={() => navigation.navigate("Menu")}
          />

          <Button
            buttonText={themes.strings.agendar}
            buttonStyle={[
              style.buttonAgendar,
              { opacity: isAgendarButtonDisabled ? 0.5 : 1 },
            ]}
            textStyle={style.agendarText}
            onPress={() => setModalVisible(true)}
            disabled={isAgendarButtonDisabled}
          />
        </View>
      </View>

      {/* Modal de Confirmação */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={style.modalOverlay}>
          <View style={style.modalContent}>
            <Text style={style.confirmaAgendamento}>{themes.strings.redirecionamento}</Text>
            <Image source={icons.verificado} style={style.verificado} resizeMode="contain" />
          </View>

          <Button
            buttonText={themes.strings.confirmar}
            buttonStyle={style.modalButton}
            textStyle={style.confirma}
            onPress={handleAgendarEvento}
          />
        </View>
      </Modal>
    </View>
  );
}