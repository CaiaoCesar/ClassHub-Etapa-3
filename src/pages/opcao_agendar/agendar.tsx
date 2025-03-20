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
    ScrollView, // Importe ScrollView
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
    getEventTypeAvailableTimes, // Importe a nova função
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
    return new Date(dateTimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

interface CalendlyEvent {
    start_time: string;
    end_time: string;
}

interface EventType {
    uri: string;
    name: string;
    // Adicione outras propriedades relevantes do tipo de evento aqui
}

export default function Agendar() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [pressionadoAgendar, setPressionadoAgendar] = useState<boolean>(false);
    const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
    const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [horarioSelecionado, setHorarioSelecionado] = useState<string | null>(null);
    const [day, setDay] = useState<DateData>();

    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
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
                const userData = await getCurrentUser();
                const currentUserUri = userData.resource.uri;
                setUserUri(currentUserUri);

                const eventTypesData = await getEventTypes(currentUserUri); // Passa o userUri
                setEventTypes(eventTypesData);
                console.log("Event Types:", eventTypesData);
            } catch (error: any) {
                console.error("Erro ao carregar dados:", error.response?.data || error.message);
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
            if (!userUri || !selectedEventType) {
                setError("Erro: User URI ou Tipo de Evento não selecionado.");
                setAvailableTimes([]);
                return;
            }

            const selectedDate = new Date(date);
            const selectedDateString = selectedDate.toISOString().split("T")[0];

            // Define o startTime para o início do dia e o endTime para o final do dia
            const startTime = `${selectedDateString}T00:00:00Z`;
            const endTime = `${selectedDateString}T23:59:59Z`;

            const availableTimesData = await getEventTypeAvailableTimes(selectedEventType, startTime, endTime);

            // Adapte a resposta da API para o formato que você está usando
            const availableTimes = availableTimesData.collection.map((item: any) => {
                const time = new Date(item.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return time;
            });

            setAvailableTimes(availableTimes);

        } catch (error: any) {
            console.error("Erro ao buscar horários disponíveis:", error.response?.data || error.message);
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
    };

    const handlePressOut = () => {
        // Não precisa fazer nada aqui, já que o estado é controlado por onPressIn
    };

    const handleAgendarEvento = async () => {
        if (day && horarioSelecionado && selectedEventType) {
            try {
                const response = await createSchedulingUrl(selectedEventType);

                if (response && response.resource && response.resource.booking_url) {
                    const schedulingUrl = response.resource.booking_url; // Use booking_url
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
            Alert.alert("Atenção", "Selecione uma data, um horário e um tipo de evento.");
        }
    };

    const isAgendarButtonDisabled = !day || !horarioSelecionado || !selectedEventType;

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
                {/* Envolva com ScrollView */}
                <ScrollView style={{ width: "100%" }}>
                    <View style={style.horariosGrid}>
                        {isLoading ? (
                            <Text style={style.textMsgHorarios}>Carregando horários...</Text>
                        ) : error ? (
                            <Text style={[style.textMsgHorarios, styles.errorText]}>{error}</Text>
                        ) : availableTimes.length > 0 ? (
                            availableTimes.map((horario) => (
                                <Pressable
                                    key={horario}
                                    style={[
                                        style.buttonHorarios,
                                        horarioSelecionado === horario && style.buttonHorariosSelected,
                                        {
                                            backgroundColor:
                                                horarioSelecionado === horario
                                                    ? themes.colors.verdeEscuro
                                                    : themes.colors.branco8,
                                        },
                                    ]}
                                    onPressIn={() => handlePressIn(horario)}
                                    onPressOut={() => handlePressOut()}
                                >
                                    <Text
                                        style={[
                                            style.textMsgHorarios,
                                            horarioSelecionado === horario && style.textMsgHorariosSelected,
                                            {
                                                color:
                                                    horarioSelecionado === horario
                                                        ? themes.colors.branco8
                                                        : themes.colors.verdeEscuro,
                                        },
                                    ]}
                                >
                                    {horario}
                                </Text>
                            </Pressable>
                        ))
                    ) : (
                        <Text style={style.textMsgHorarios}>
                            Nenhum horário disponível para este dia.
                        </Text>
                    )}
                    </View>
                </ScrollView>
                {/* Fim do ScrollView */}
            </View>

            <View>
                <Text>Evento Encontrado:</Text>
                {isLoading ? (
                    <Text>Carregando tipos de evento...</Text>
                ) : eventTypes.length > 0 ? (
                    eventTypes.map((eventType: EventType) => (
                        <Pressable key={eventType.uri} onPress={() => setSelectedEventType(eventType.uri)}>
                            <Text>{eventType.name}</Text>
                        </Pressable>
                    ))
                ) : (
                    <Text>Nenhum tipo de evento encontrado.</Text>
                )}
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
                                backgroundColor: pressed || isAgendarButtonDisabled ? themes.colors.verdeEscuro : themes.colors.branco8,
                                opacity: isAgendarButtonDisabled ? 0.5 : 1,
                            },
                        ]}
                        onPressIn={() => !isAgendarButtonDisabled && setPressionadoAgendar(true)}
                        onPressOut={() => setPressionadoAgendar(false)}
                        onPress={() => !isAgendarButtonDisabled && setModalVisible(true)}
                        disabled={isAgendarButtonDisabled}
                    >
                        <Text
                            style={[
                                style.agendarText,
                                { color: themes.colors.branco8 },
                            ]}
                        >
                            {themes.strings.agendarText}
                        </Text>
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