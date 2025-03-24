import axios from 'axios';

const BASE_URL = 'https://api.calendly.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = process.env.EXPO_PUBLIC_API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token adicionado ao header:", token);
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar informações do usuário:', error.response?.data || error.message);
    throw error;
  }
};

interface EventType {
  uri: string;
  name: string;
}

let cachedEventTypes: EventType[] | null = null;

export const getEventTypes = async (userUri: string): Promise<EventType[]> => {
  try {
    if (cachedEventTypes) {
      console.log("Usando eventos armazenados em cache.");
      return cachedEventTypes;
    }
    const response = await api.get('/event_types', {
      params: {
        user: userUri, 
      }
    });
    cachedEventTypes = response.data.collection as EventType[];
    return response.data.collection as EventType[];
  } catch (error: any) {
    console.error('Erro ao buscar tipos de eventos:', error.response?.data || error.message);
    return [];
  }
};

export const createSchedulingUrl = async (event_type: string) => {
  try {
    const response = await api.post('/scheduling_links', {
      max_event_count: 1,
      owner: event_type,
      owner_type: "EventType",
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao criar URL de agendamento:', error.response?.data || error.message);
    throw error;
  }
};

export const getScheduledEvents = async (userUri: string, options: { count?: number } = {}) => {
  const { count = 10 } = options;
  const response = await api.get(`/scheduled_events`, {
    params: {
      user: userUri,
      count: count,
    },
  });
  
  console.log("Resposta da API:", response.data); 
  return response.data;
};

export const getEventTypeAvailableTimes = async (eventTypeId: string, startTime: string, endTime: string) => {
  try {
    const response = await api.get('/event_type_available_times', {
      params: {
        event_type: eventTypeId,
        start_time: startTime,
        end_time: endTime
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Erro ao buscar horários disponíveis do tipo de evento:', error.response?.data || error.message);
    throw error;
  }
};

export const cancelEvent = async (eventUuid: string, reason?: string) => {
    try {
        console.log("UUID:", eventUuid);

        const response = await api.post(`/scheduled_events/${eventUuid}/cancellation`, {
            reason: reason || "Cancelado pelo usuário" 
        });

        console.log("Resposta do cancelamento:", response.data); 
        return response.data;
    } catch (error: any) {
        console.error('Erro ao cancelar evento:', error.response?.data || error.message);
        throw error;
    }
};