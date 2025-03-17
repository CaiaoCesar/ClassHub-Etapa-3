import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes"; 

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:`center`, 
        justifyContent:`center`,
        backgroundColor: themes.colors.verdeClaro,
        gap: 25,
    },

    boxTop:{
        width: `100%`,
        alignItems:`center`, 
        justifyContent:`center`
    },

    boxBotton1:{
        width: `100%`,
        alignItems: `center`,
        justifyContent: `center`
    },

    boxBotton2:{
        width: `100%`,
        alignItems: `center`,
        justifyContent: `center`
    },

    boxBotton3:{
        width: `100%`,
        alignItems: `center`,
        justifyContent: `center`
    },

    logo:{
        width: 100,
        height: 100,
    },

    button1: {
        width: 237,
        height: 45, 
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: "row",
        borderRadius: 30,
        elevation: 4,
    },

    button2: {
        width: 237,
        height: 45, 
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: "row", 
        borderRadius: 30,
        elevation: 4,
    },

    button3: {
        width: 163,
        height: 45, 
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: "row", 
        borderRadius: 30,
        paddingHorizontal: 10,
        gap: 5,
        elevation: 4,
        top: 190,
    },

    textAgendar:{
        fontSize: 20,
        width: 141,
        height: 25,
        fontWeight: 400,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
        paddingLeft: 3
    },

    textAgendamentos:{
        fontSize: 20,
        width: 141,
        height: 25,
        fontWeight: 400,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main,
        paddingLeft: 10,
    },

    textLogout:{
        fontSize: 20,
        width: 56,
        height: 25,
        fontWeight: 400,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main
    },
}); 
