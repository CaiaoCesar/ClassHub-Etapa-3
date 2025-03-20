// agendamentos.tsx
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    Pressable,
    Alert,
    FlatList,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { style } from "./styles";

import { cancelEvent, getScheduledEvents, getCurrentUser } from "../../../services/calendlyService";

import Logo from "../../../assets/logo.png";
import Linha from "../../../assets/Line.png";
import Voltar from "../../../assets/voltar.png";
import Verificado from "../../../assets/verificacao.png";

interface Evento {
    uri: string;
    name: string;
    start_time: string;
    end_time: string;
    event_type: string;
    invitees_counter: number;
    location: {
        type: string;
        location: string;
    };
    created_at: string;
    updated_at: string;
}

const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export default function Agendamentos() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [pressionadoCancelar, setPressionadoCancelar] = useState<boolean>(false);
    const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
    const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);
    const [eventos, setEventos] = useState<Evento[]>([]);

    const [userUri, setUserUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            setError(null);
            try {
                const userData = await getCurrentUser();
                setUserUri(userData.resource.uri);

                const data = await getScheduledEvents(userData.resource.uri);
                console.log("Dados da API:", data);
                setEventos(data.collection as Evento[]);
            } catch (error: any) {
                console.error("Erro ao buscar eventos:", error.response?.data || error.message);
                setError("Erro ao buscar eventos. Tente novamente.");
                Alert.alert("Erro", "Erro ao buscar eventos. Tente novamente.");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    const handleCancelarEvento = async () => {
        if (!eventoSelecionado) {
            Alert.alert("Atenção", "Nenhum evento selecionado para cancelar.");
            return;
        }

        try {
            // Extrair o UUID do evento do eventUri
            const eventUuid = eventoSelecionado.substring(eventoSelecionado.lastIndexOf('/') + 1).trim();

            // Adicionar um log para exibir o UUID
            console.log("UUID do evento:", eventUuid);

            const response = await cancelEvent(eventUuid, "Cancelado pelo usuário"); // Motivo opcional
            console.log("Evento cancelado:", response);

            // Atualizar a lista de eventos após o cancelamento
            setEventos(prevEventos => prevEventos.filter(evento => evento.uri !== eventoSelecionado));

            // Exibir o modal de sucesso
            setModalVisible(true);

        } catch (error: any) {
            console.error("Erro ao cancelar evento:", error.response?.data || error.message);
            Alert.alert("Erro", "Erro ao cancelar evento. Tente novamente.");
            // Não exibir o modal em caso de erro
            setModalVisible(false);

        }
    };

    const renderItem = ({ item }: { item: Evento }) => {
        const startTime = new Date(item.start_time);
        const formattedDate = startTime.toLocaleDateString('pt-BR');
        const formattedTime = startTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        return (
            <Pressable
                style={[
                    style.eventItem,
                    eventoSelecionado === item.uri && style.selectedEventItem,
                ]}
                onPress={() => setEventoSelecionado(item.uri)}
            >
                <Text style={style.eventName}>{item.name}</Text>
                <View style={style.eventInfo}>
                    <Text style={style.eventDate}>{formattedDate}</Text>
                    <Text style={style.eventTime}>{formattedTime}</Text>
                </View>
            </Pressable>
        );
    };

    const isCancelarButtonDisabled = !eventoSelecionado;

    return (
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
                <Text style={style.textAgendamentos}>{themes.strings.textAgendamentos}</Text>
                <Image source={Linha} style={style.linhaCima} resizeMode="contain" />
            </View>

            {isLoading ? (
                <Text style={style.loadingText}>Carregando eventos...</Text>
            ) : error ? (
                <Text style={style.errorText}>{error}</Text>
            ) : eventos.length > 0 ? (
                <FlatList
                    data={eventos}
                    keyExtractor={(item) => item.uri}
                    renderItem={renderItem}
                    contentContainerStyle={style.horariosContainer}
                />
            ) : (
                <Text style={style.noEventsText}>Nenhum evento agendado.</Text>
            )}

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
                                backgroundColor: pressed || isCancelarButtonDisabled ? themes.colors.verdeEscuro : themes.colors.branco8,
                                opacity: isCancelarButtonDisabled ? 0.5 : 1,
                            },
                        ]}
                        onPressIn={() => !isCancelarButtonDisabled && setPressionadoCancelar(true)}
                        onPressOut={() => setPressionadoCancelar(false)}
                        onPress={() => setModalVisible(true)}
                        disabled={isCancelarButtonDisabled}
                    >
                        {({ pressed }) => (
                            <Text
                                style={[
                                    style.textCancelarAgendamento,
                                    { color: themes.colors.branco8 },
                                ]}
                            >
                                {themes.strings.textCancelarAgendamento}
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
                        onPress={handleCancelarEvento}
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
    eventItem: {
        padding: 15,
        width: 300,
        borderBottomWidth: 1,
        backgroundColor: themes.colors.branco8, // Cor de fundo dos botões
        borderRadius: 10, // Bordas arredondadas
        marginVertical: 5, // Espaçamento vertical entre os botões
    },
    eventName: {
        fontSize: 20,
        textAlign: 'center',
        color: themes.colors.verdeEscuro, // Cor do texto
        fontFamily: themes.fonts.main, // Fonte
    },
    eventInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    eventDate: {
        fontSize: 20,
        color: themes.colors.verdeEscuro, // Cor do texto
        fontFamily: themes.fonts.main, // Fonte
    },
    eventTime: {
        fontSize: 20,
        color: themes.colors.verdeEscuro, // Cor do texto
        fontFamily: themes.fonts.main, // Fonte
        textAlign: 'right',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: 'red',
    },
    noEventsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    }
});