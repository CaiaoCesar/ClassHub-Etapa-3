import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    Modal,
    Pressable,
    ScrollView,
    Alert,
    FlatList
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../@types/types";

import { themes } from "../../global/themes";
import { style } from "./styles";

import { cancelEvent, getScheduledEvents, getCurrentUser } from "../../../services/calendlyService"; // Importação do serviço

import Logo from "../../../assets/logo.png";
import Linha from "../../../assets/Line.png";
import Voltar from "../../../assets/voltar.png";
import Verificado from "../../../assets/verificacao.png";

// Defina a interface para o objeto de evento
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

export default function Agendamentos() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [pressionadoCancelar, setPressionadoCancelar] = useState<boolean>(false);
    const [pressionadoVoltar, setPressionadoVoltar] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [pressionadoConfirmar, setPressionadoConfirmar] = useState<boolean>(false);
    const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null);
    const [eventos, setEventos] = useState<Evento[]>([]);

    const [userUri, setUserUri] = useState<string | null>(null);

    useEffect(() => {
        async function loadEventos() {
            try {
                // Busque o userUri
                const userData = await getCurrentUser();
                setUserUri(userData.resource.uri);

                // Agora, busque os eventos passando o userUri
                const data = await getScheduledEvents(userData.resource.uri);

                console.log("Dados da API:", data); // Verifique os dados aqui!

                // Supondo que a API retorna os eventos em um array chamado 'collection'
                setEventos(data.collection as Evento[]);

            } catch (error) {
                console.error("Erro ao buscar eventos:", error);
                // Trate o erro adequadamente
                Alert.alert("Erro", "Erro ao buscar eventos. Tente novamente.");
            }
        }

        loadEventos();
    }, []);

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

    const renderItem = ({ item }: { item: Evento }) => (
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>Data e hora de início: {item.start_time}</Text>
            <Text>Data e hora de término: {item.end_time}</Text>
            <Text>Tipo de evento: {item.event_type}</Text>
            <Text>Número de convidados: {item.invitees_counter}</Text>
            <Text>Localização: {item.location.location}</Text>
            <Text>Criado em: {item.created_at}</Text>
            <Text>Atualizado em: {item.updated_at}</Text>
            {/* Adicione outros campos conforme necessário */}
        </View>
    );

    return (
        <View style={style.container}>
            {/* Cabeçalho */}
            <View style={style.boxTop}>
                <Image source={Logo} style={style.logo} resizeMode="contain" />
                <Text style={style.textAgendamentos}>{themes.strings.textAgendamentos}</Text>
                <Image source={Linha} style={style.linhaCima} resizeMode="contain" />
            </View>

            {/* Lista de eventos */}
            <FlatList
                data={eventos}
                keyExtractor={(item) => item.uri}
                renderItem={renderItem}
                contentContainerStyle={style.horariosContainer}
            />

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