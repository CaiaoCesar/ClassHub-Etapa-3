import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: themes.colors.verdeClaro, 
    },
    splashImage: {
        width: 200, 
        height: 200, 
    },
});