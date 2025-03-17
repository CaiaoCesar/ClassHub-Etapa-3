import React, { createContext, useState, useContext, ReactNode } from 'react';

// Definindo o tipo para um agendamento
type Agendamento = {
  id: string;
  eventTypeUri: string;
  inviteeEmail: string;
  date: string;
};

// Definindo o tipo para o contexto
type AgendamentosContextType = {
  agendamentos: Agendamento[];
  adicionarAgendamento: (agendamento: Agendamento) => void;
  removerAgendamento: (id: string) => void;
};

// Criando o contexto
const AgendamentosContext = createContext<AgendamentosContextType | undefined>(undefined);

// Criando o provedor do contexto
export const AgendamentosProvider = ({ children }: { children: ReactNode }) => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const adicionarAgendamento = (agendamento: Agendamento) => {
    setAgendamentos((prev) => [...prev, agendamento]);
  };

  const removerAgendamento = (id: string) => {
    setAgendamentos((prev) => prev.filter((agendamento) => agendamento.id !== id));
  };

  return (
    <AgendamentosContext.Provider value={{ agendamentos, adicionarAgendamento, removerAgendamento }}>
      {children}
    </AgendamentosContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useAgendamentos = () => {
  const context = useContext(AgendamentosContext);
  if (!context) {
    throw new Error('useAgendamentos deve ser usado dentro de um AgendamentosProvider');
  }
  return context;
};