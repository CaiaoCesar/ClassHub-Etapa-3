import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: themes.colors.verdeClaro,
    gap: 25,
  },

  boxTop: {
    alignItems: "center",
    justifyContent: "center",
  },

  boxBotton: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 100,
    height: 100,
  },

  button: {
    width: 237,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 4,
  },

  button3: {
    width: 163,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    gap: 10,
    elevation: 4,
    top: 140,
  },

  textAgendar: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  textAgendamentos: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  textLogout: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  icon: {
    width: 24,
    height: 24,
  },
});
