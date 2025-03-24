import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes'; 

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

  button1: {
    width: 237,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    gap: 10,
    elevation: 4,
  },

  button2: {
    width: 237,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    paddingHorizontal: 10,
    gap: 5,
    elevation: 4,
  },

  textGmail: {
    fontSize: themes.font_size.m,
    width: 139,
    height: 25,
    fontFamily: themes.fonts.jaro,
  },

  textAppleID: {
    fontSize: themes.font_size.m,
    width: 159,
    height: 25,
    fontFamily: themes.fonts.jaro,
  },

  icon: {
    width: 25,
    height: 25,
  },
});
