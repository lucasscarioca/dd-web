// Tipos
interface IMessage {
  id: number;
  text: string;
  isUser: boolean;
}

interface IConversations {
  [key: string]: IMessage[];
}

// Exemplo de Conversas
const mockConversations: IConversations = {
  '1': [
    { id: 1, text: 'Olá, tudo bem?', isUser: false },
    { id: 2, text: 'Tudo ótimo, e você?', isUser: true },
  ],
  '2': [
    { id: 3, text: 'Bom dia! Como vai?', isUser: false },
    { id: 4, text: 'Bom dia! Estou bem, obrigado.', isUser: true },
  ],
};

