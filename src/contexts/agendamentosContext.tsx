import React, { createContext, useState, useContext, ReactNode } from 'react';

type Agendamento = {
  id: string;
  eventTypeUri: string;
  inviteeEmail: string;
  date: string;
};

type AgendamentosContextType = {
  agendamentos: Agendamento[];
  adicionarAgendamento: (agendamento: Agendamento) => void;
  removerAgendamento: (id: string) => void;
};

const AgendamentosContext = createContext<AgendamentosContextType | undefined>(undefined);

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

export const useAgendamentos = () => {
  const context = useContext(AgendamentosContext);
  if (!context) {
    throw new Error('useAgendamentos deve ser usado dentro de um AgendamentosProvider');
  }
  return context;
};