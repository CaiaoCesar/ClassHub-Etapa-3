import axios from 'axios';

const BASE_URL = 'https://api.calendly.com'; // URL base correta

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getCurrentUser = async () => {
    try {
        const response = await api.get('/users/me', {
            headers: {
                'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}` // Define o cabeçalho aqui
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        throw error;
    }
};

// Função para buscar tipos de eventos
export const getEventTypes = async () => {
    try {
        const response = await api.get('/event_types', {
            headers: {
                'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}` // Define o cabeçalho aqui
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar tipos de eventos:', error);
        throw error;
    }
};

// Função para criar uma URL de agendamento
export const createSchedulingUrl = async (event_type: string) => {
    try {
        const response = await api.post('/scheduling_urls', {
            max_event_count: 1,
            owner: event_type,
            owner_type: "EventType",
            routing_type: "location"
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}` // Define o cabeçalho aqui
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar URL de agendamento:', error);
        throw error;
    }
};

// Função para cancelar um evento (se precisar)
export const cancelEvent = async (eventUri: string) => {
    try {
        const response = await api.delete(`/scheduled_events/${eventUri}`, {
            headers: {
                'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}` // Define o cabeçalho aqui
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao cancelar evento:', error);
        throw error;
    }
};

// Função para listar eventos agendados
export const getScheduledEvents = async (userUri: string) => {
    try {
        const response = await api.get('/scheduled_events', {
            params: {
                user: userUri, // Use o user URI
                count: 10
            },
            headers: {
                'Authorization': `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}` // Define o cabeçalho aqui
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar eventos agendados:', error);
        throw error;
    }
};