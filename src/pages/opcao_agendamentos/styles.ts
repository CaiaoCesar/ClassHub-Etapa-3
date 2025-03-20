import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: themes.colors.verdeClaro,
    },

    boxTop: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },

    logo: {
        width: 45,
        height: 45,
        marginBottom: 15,
    },

    textAgendamentos: {
        fontSize: 24,
        fontWeight: '400',
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
    },

    linhaCima: {
        width: '90%',
        height: 1,
        backgroundColor: themes.colors.verdeEscuro,
        marginTop: 10,
        marginBottom: 10,
    },

    horariosContainer: {
        width: '100%',
    },

    buttonAgendamento: {
        width: '90%',
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 10,
        marginVertical: 5,
        paddingHorizontal: 10,
    },

    textAgendamento: {
        fontSize: 16,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
        textAlign: 'center',
    },

    textMsgAgendamentos: {
        fontSize: 20,
        fontFamily: themes.fonts.main,
        color: themes.colors.verdeEscuro,
        textAlign: 'center',
        marginTop: 20,
    },

    linhaBaixo: {
        width: '90%',
        height: 1,
        backgroundColor: themes.colors.verdeEscuro,
        marginTop: 20,
    },

    rodape: {
        width: '100%',
        alignItems: 'center',
        paddingBottom: 55,
    },

    buttonVoltar: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30,
        marginRight: 10,
        elevation: 4,
    },

    Voltar: {
        width: 25,
        height: 38,
    },

    buttonCancelar: {
        width: 279,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30,
        elevation: 4,
    },

    textCancelarAgendamento: {
        fontSize: 20,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themes.colors.verdeClaro75,
    },

    modalContent: {
        width: '80%',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30,
        padding: 20,
        alignItems: 'center',
    },

    confirmaCancelamento: {
        fontSize: 20,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
        marginBottom: 20,
        textAlign: 'center',
    },

    verificado: {
        width: 50,
        height: 50,
        marginBottom: 20,
    },

    modalButton: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.branco8,
        borderRadius: 30,
        marginTop: 120,
    },

    confirma: {
        fontSize: 20,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
    },
    eventItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: themes.colors.branco8, // Cor de fundo dos botões
        borderRadius: 10, // Bordas arredondadas
        marginVertical: 5, // Espaçamento vertical entre os botões
    },
    selectedEventItem: {
        backgroundColor: '#e0e0e0', // Cor diferente para o evento selecionado
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
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
        fontSize: 16,
        color: themes.colors.verdeEscuro, // Cor do texto
        fontFamily: themes.fonts.main, // Fonte
    },
    eventTime: {
        fontSize: 16,
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