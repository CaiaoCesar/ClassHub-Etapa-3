import { Dimensions, StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:`center`, 
        justifyContent:`center`,
        backgroundColor: themes.colors.verdeClaro,
        gap: 25   
    },

    boxTop:{
        alignItems:`center`, 
        justifyContent:`center`
    },

    boxBotton1:{
        alignItems: `center`,
        justifyContent: `center`
    }, 

    boxBotton2:{
        width: `100%`,
        alignItems: `center`,
        justifyContent: `center`
    },

    logo:{
        width: 100,
        height: 100
    },
    
    button1: {
        width: 237,
        height: 45, 
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: "row",
        borderRadius: 30,
        gap: 10,
        elevation: 4,
    },

    button2: {
        width: 237,
        height: 45, 
        alignItems: `center`,
        justifyContent: `center`,
        flexDirection: "row", 
        borderRadius: 30,
        paddingHorizontal: 10,
        gap: 5,
        elevation: 4,
    },

    textGmail:{
        fontSize: 20,
        width: 139,
        height: 25,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main
    },

    textAppleID:{
        fontSize: 20,
        width: 159,
        height: 25,
        color: themes.colors.verdeEscuro,
        fontFamily: themes.fonts.main
    }
}); 