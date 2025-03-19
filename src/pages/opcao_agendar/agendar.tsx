import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    Pressable,
    Modal,
    Alert,
    Linking,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { ptBR } from "../../utils/localeCalendarConfig";
import { themes } from "../../global/themes";
import { style, calendarTheme } from "./styles";
import {
    createSchedulingUrl,
    getEventTypes,
    getCurrentUser,
    getScheduledEvents,
} from "../../../services/calendlyService";

LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

import Logo from "../../../assets/logo.png";
import LinhaMeio from "../../../assets/Line.png";
import LinhaBaixo from "../../../assets/Line.png";
import LinhaCima from "../../../assets/Line.png";
import Voltar from "../../../assets/voltar.png";
import Verificado from "../../../assets/verificacao.png";

const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
};

interface CalendlyEvent {
    start_time: string;
    end_time: string;
}

export default function Agendar() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [pressionadoAgendar, setPressionadoAgendar] = useState<boolean>(false);
    const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
    const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [pressionadoHorarios, setPressionadoHorarios] = useState<{ [key: string]: boolean }>({});
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
    const [day, setDay] = useState<DateData>();

    const [eventTypes, setEventTypes] = useState<any[]>([]);
    const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
    const [userUri, setUserUri] = useState<string | null>(null);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function loadData() {
          setIsLoading(true);
          setError(null);
          try {
              // Carregar informações do usuário
              const userData = await getCurrentUser();
              const currentUserUri = userData.resource.uri; // Armazena o user URI
              setUserUri(currentUserUri);
  
              // Carregar tipos de evento
              const eventTypesData = await getEventTypes(); // Passa o user URI
              setEventTypes(eventTypesData.collection);
              console.log("Event Types:", eventTypesData.collection);
          } catch (error) {
              console.error("Erro ao carregar dados:", error);
              Alert.alert("Erro", "Erro ao carregar dados. Tente novamente.");
              setError("Erro ao carregar dados. Tente novamente.");
          } finally {
              setIsLoading(false);
          }
        }
    
        if (day) {
            loadData();
        }
    }, [day]);

    const fetchAvailableTimes = async (date: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const selectedDate = new Date(date);
            const selectedDateString = selectedDate.toISOString().split("T")[0];

            if (userUri) {
                const eventsData = await getScheduledEvents(userUri);
                console.log("Eventos Agendados:", eventsData);

                const eventsOnSelectedDate = (eventsData.collection as CalendlyEvent[]).filter((event) => {
                    const eventStartDate = new Date(event.start_time);
                    const eventDateString = eventStartDate.toISOString().split("T")[0];
                    return eventDateString === selectedDateString;
                });

                // Se não houver eventos para o dia selecionado, defina availableTimes como vazio
                if (eventsOnSelectedDate.length === 0) {
                    setAvailableTimes([]);
                    return; // Retorna para evitar a geração dos horários padrão
                }

                const bookedTimes = eventsOnSelectedDate.map(event => ({
                    start: formatTime(event.start_time),
                    end: formatTime(event.end_time)
                }));

                // Geração dos horários disponíveis
                let availableTimes = [];
                let currentTime = 8 * 60; // 8:00 AM em minutos
                const endTime = 18 * 60;   // 6:00 PM em minutos

                while (currentTime < endTime) {
                    const hours = Math.floor(currentTime / 60).toString().padStart(2, "0");
                    const minutes = (currentTime % 60).toString().padStart(2, "0");
                    const time = `${hours}:${minutes}`;

                    // Verifique se o horário está bloqueado
                    const isBooked = bookedTimes.some(bookedTime => time >= bookedTime.start && time < bookedTime.end);

                    if (!isBooked) {
                        availableTimes.push(time);
                    }

                    currentTime += 30; // Intervalos de 30 minutos
                }

                setAvailableTimes(availableTimes);
            } else {
                setAvailableTimes([]);
                setError("Erro: User URI não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao buscar horários disponíveis:", error);
            Alert.alert("Erro", "Erro ao buscar horários disponíveis. Tente novamente.");
            setError("Erro ao buscar horários disponíveis. Tente novamente.");
            setAvailableTimes([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (day && userUri) {
            fetchAvailableTimes(day.dateString);
        }
    }, [day, userUri]);

    const handlePressIn = (horario: string) => {
        setHorarioSelecionado(horario);
        setPressionadoHorarios((prev) => ({ ...prev, [horario]: true }));
    };

    const handlePressOut = (horario: string) => {
        setPressionadoHorarios((prev) => ({ ...prev, [horario]: false }));
    };

    const handleAgendarEvento = async () => {
        if (day && horarioSelecionado && selectedEventType) {
            try {
                const response = await createSchedulingUrl(selectedEventType);
                console.log("URL de agendamento criada:", response.resource.scheduling_url);
                Linking.openURL(response.resource.scheduling_url);
                console.log("Evento agendado:", response);
                setModalVisible(false);
                Alert.alert("Sucesso", "Evento agendado com sucesso!");
            } catch (error) {
                console.error("Erro ao criar URL de agendamento:", error);
                console.error("Erro ao agendar evento:", error);
                Alert.alert("Erro", "Erro ao agendar evento. Tente novamente.");
            }
        } else {
            Alert.alert("Atenção", "Selecione uma data, um horário e um tipo de evento.");
        }
    };

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
            </View>
            <Image source={LinhaCima} style={style.linhaCima} resizeMode="contain" />

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

            <View style={style.horariosContainer}>
                <Image source={LinhaMeio} style={style.linhaMeio} resizeMode="contain" />
                <Text style={style.horariosTitle}>{themes.strings.textHorarios}</Text>
                <View style={style.horariosGrid}>
                    {isLoading ? (
                        <Text style={style.textMsgHorarios}>Carregando horários...</Text>
                    ) : error ? (
                        <Text style={[style.textMsgHorarios, styles.errorText]}>{error}</Text>
                    ) : availableTimes.length > 0 ? (
                        availableTimes.map((horario) => (
                            <Pressable
                                key={horario}
                                style={({ pressed }) => [
                                    style.buttonHorarios,
                                    horarioSelecionado === horario && style.buttonHorariosSelected,
                                    {
                                        backgroundColor:
                                            pressed || horarioSelecionado === horario
                                                ? themes.colors.verdeEscuro
                                                : themes.colors.branco8,
                                    },
                                ]}
                                onPressIn={() => handlePressIn(horario)}
                                onPressOut={() => handlePressOut(horario)}
                            >
                                {({ pressed }) => (
                                    <Text
                                        style={[
                                            style.textMsgHorarios,
                                            horarioSelecionado === horario && style.textMsgHorariosSelected,
                                            {
                                                color:
                                                    pressed || horarioSelecionado === horario
                                                        ? themes.colors.branco8
                                                        : themes.colors.verdeEscuro,
                                            },
                                        ]}
                                    >
                                        {horario}
                                    </Text>
                                )}
                            </Pressable>
                        ))
                    ) : (
                        <Text style={style.textMsgHorarios}>Nenhum horário disponível para este dia.</Text>
                    )}
                </View>
            </View>

            <View>
                <Text>Selecione o tipo de evento:</Text>
                {eventTypes.map((eventType: any) => (
                    <Pressable key={eventType.uri} onPress={() => setSelectedEventType(eventType.uri)}>
                        <Text>{eventType.name}</Text>
                    </Pressable>
                ))}
            </View>

            <View style={style.rodape}>
                <Image source={LinhaBaixo} style={style.linhaBaixo} resizeMode="contain" />
                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}>
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
                            style.buttonAgendar,
                            {
                                backgroundColor: pressed ? themes.colors.verdeEscuro : themes.colors.branco8,
                            },
                        ]}
                        onPressIn={() => setPressionadoAgendar(true)}
                        onPressOut={() => setPressionadoAgendar(false)}
                        onPress={() => setModalVisible(true)}
                    >
                        {({ pressed }) => (
                            <Text
                                style={[
                                    style.agendarText,
                                    { color: pressed ? themes.colors.branco8 : themes.colors.verdeEscuro },
                                ]}
                            >
                                {themes.strings.agendarText}
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={style.modalOverlay}>
                    <View style={style.modalContent}>
                        <Text style={style.confirmaAgendamento}>{themes.strings.confirmaAgendamento}</Text>
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
                        onPress={handleAgendarEvento}
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

const styles = StyleSheet.create({
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginTop: 10,
    },
});