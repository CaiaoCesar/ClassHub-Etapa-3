import axios from 'axios';


const API_TOKEN = process.env.EXPO_PUBLIC_API_TOKEN;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

// Função para buscar tipos de eventos
export const getEventTypes = async () => {
  try {
    const response = await api.get('/event_types');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tipos de eventos:', error);
    throw error;
  }
};

// Função para agendar um evento
export const scheduleEvent = async (eventTypeUri: string, inviteeEmail: string, date: string) => {
  try {
    const response = await api.post('/scheduled_events', {
      event_type_uri: eventTypeUri,
      invitee_email: inviteeEmail,
      start_time: date,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao agendar evento:', error);
    throw error;
  }
};

// Função para cancelar um evento
export const cancelEvent = async (eventUri: string) => {
  try {
    const response = await api.delete(`/scheduled_events/${eventUri}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao cancelar evento:', error);
    throw error;
  }
};

// Função para listar eventos agendados
export const getScheduledEvents = async () => {
  try {
    const response = await api.get('/scheduled_events');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar eventos agendados:', error);
    throw error;
  }
};