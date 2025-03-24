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
  },

  linhaCima: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
    top: 54, 
  },

  boxCalendar: {
    width: '100%',
    alignItems: 'center',
  },

  calendar: {
    width: 375,
  },

  arrowContainer: {
    backgroundColor: themes.colors.branco, 
    borderRadius: 15, 
    width: 40, 
    height: 40, 
    justifyContent: 'center', 
    alignItems: 'center', 
    elevation: 4,
  },

  linhaMeio: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
  },

  horariosContainer: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    top: 20,
  },

  horariosTitle: {
    fontSize: themes.font_size.g,
    fontWeight: '500',
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
    marginTop: 15,
  },

  buttonHorarios: {
    width: '48%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginBottom: 25,
    elevation: 4,
  },
  
  buttonHorariosDisabled: {
    backgroundColor: themes.colors.branco,
    opacity: 0.5, 
  },
  textMsgHorariosDisabled: {
    color: themes.colors.verdeEscuro, 
  },

  textMsgHorarios: {
    fontSize: themes.font_size.m,
    fontFamily: themes.fonts.jaro,
    color: themes.colors.verdeEscuro,
  },

  buttonHorariosSelected: {
    backgroundColor: themes.colors.verdeEscuro, 
  },

  textMsgHorariosSelected: {
    color: themes.colors.branco, 
  },

  rodape: {
    position: 'absolute', 
    bottom: 50, 
    width: '100%',
    alignItems: 'center',
    paddingBottom: 5, 
    backgroundColor: themes.colors.verdeClaro, 
  },

  linhaBaixo: {
    width: '90%',
    height: 1,
    backgroundColor: themes.colors.verdeEscuro,
    marginTop: 10,
  },

  buttonVoltar: {
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.branco,
    borderRadius: 30,
    marginRight: 10,
    elevation: 4,
  },

  Voltar: {
    width: 25,
    height: 38,
  },

  buttonAgendar: {
    width: 279,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themes.colors.branco,
    borderRadius: 30,
    elevation: 4,
  },

  agendarText: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themes.colors.verdeClaro75,
  },

  modalContent: {
    width: '80%',
    backgroundColor: themes.colors.branco,
    borderRadius: 30,
    padding: 20,
    alignItems: 'center',
  },

  confirmaAgendamento: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
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
    backgroundColor: themes.colors.branco,
    borderRadius: 30,
    marginTop: 120, 
  },

  confirma: {
    fontSize: themes.font_size.m,
    color: themes.colors.verdeEscuro,
    fontFamily: themes.fonts.jaro,
  },

  eventTypeContainer:{},
  eventTypeTitle:{},
  eventTypeButton:{},
  eventTypeButtonSelected:{},
  eventTypeText:{},
  eventTypeTextSelected:{},
  
});

export const calendarTheme = {
  calendarBackground: "transparent",
  textSectionTitleColor: themes.colors.verdeEscuro5,
  selectedDayBackgroundColor: themes.colors.verdeEscuro,
  selectedDayTextColor: themes.colors.branco,
  todayTextColor: themes.colors.verdeEscuro,
  dayTextColor: themes.colors.verdeEscuro,
  arrowColor: themes.colors.verdeEscuro,
  monthTextColor: themes.colors.verdeEscuro,
  indicatorColor: themes.colors.verdeEscuro,
  textDayStyle: { color: themes.colors.verdeEscuro},
  textDisabledColor: themes.colors.verdeEscuro5,
  arrowStyle: {
    margin: 0,
    padding: 0,
  },
  textDayFontFamily: themes.fonts.podkova,
  textMonthFontFamily: themes.fonts.jaro,
  textDayHeaderFontFamily: themes.fonts.podkova,
  textDayFontSize: themes.font_size.p,
  textMonthFontSize: themes.font_size.m,
  textDayHeaderFontSize: 15, 
};
