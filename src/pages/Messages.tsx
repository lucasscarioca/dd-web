
import { ChatInput } from '@/components/Chat/ChatInput';
import { ContactList } from '@/components/Chat/ContactList';
import { Message } from '@/components/Chat/Message';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from 'react';
import { MdArrowBack } from "react-icons/md";
import DinoBg from '../assets/dinobackground.png';

interface IMessage {
  id: number;
  text: string;
  isUser: boolean;
}

interface IConversations {
  [key: string]: IMessage[];
}

const mockConversations: IConversations = {
  '1': [
    { id: 1, text: 'Oi, como você está?', isUser: false },
    { id: 2, text: 'Estou bem, e você?', isUser: true },
  ],
  '2': [
    { id: 3, text: 'Bom dia! Preparado para o trabalho?', isUser: false },
    { id: 4, text: 'Sim, vamos nessa!', isUser: true },
  ],
};

const contacts = [
  { id: 1, name: 'Cristiano Ronaldo' },
  { id: 2, name: 'Conceição Evaristo' },
];



const useWindowSize = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isSmallScreen;
};

export const MessagesPage = () => {
	const [activeContact, setActiveContact] = useState<number | null>(null);
  const [conversations, setConversations] = useState<IConversations>(mockConversations);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isSmallScreen = useWindowSize();

  const handleSend = (text: string) => {
    if (activeContact !== null) {
      const newMessage: IMessage = { id: Date.now(), text, isUser: true };
      const updatedConversations = { ...conversations };
      const contactMessages = updatedConversations[activeContact.toString()] || [];
      updatedConversations[activeContact.toString()] = [...contactMessages, newMessage];

      setConversations(updatedConversations);
    }
  };

  const handleContactSelect = (contactId: number) => {
    setActiveContact(contactId);
  };
  const activeContactName = contacts.find(contact => contact.id === activeContact)?.name;

  const handleBackToContacts = () => setActiveContact(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations]);

  return (
    <div className="flex flex-col sm:flex-row h-full max-h-[85vh] overflow-hidden  ">
      {(isSmallScreen && activeContact === null) || !isSmallScreen ? (
        <div className='w-full sm:w-1/4 overflow-auto'>
          <ScrollArea>
            <ContactList contacts={contacts} onContactSelect={handleContactSelect} />
          </ScrollArea>
        </div>
      ) : null}
      {(isSmallScreen && activeContact !== null) || !isSmallScreen ? (
       
        <div className="flex-1 flex flex-col relative">
          <ScrollArea className="flex-1  sticky z-10">
            <img
              src={DinoBg}
              alt="Dinosaur background"
              className='absolute inset-0 w-full h-full object-cover z-0 rounded-md'
            />
            {activeContact === null ? (
            <div className="flex justify-center items-center h-full relative z-10">
              <span className="text-lg">Por favor, selecione um contato para iniciar a conversa.</span>
            </div>
          ) : (
            <div className="messages-list space-y-2 relative z-0">
              {activeContact !== null && (
                <div className='w-full flex justify-center sticky top-0 z-10'>
                  <div className="contact-name w-64 items-center flex text-center justify-center font-bold mt-4 mb-2 py-1 bg-gray-800 text-white rounded-md">
                  {isSmallScreen && (
                  <Button
                    onClick={handleBackToContacts}
                    className="z-10 p-0 mr-2 items-center"
                    variant='ghost'
                  > 
                    <MdArrowBack className='h-5 w-5' />
                  </Button>             
                    )}
                    {activeContactName}
                  </div>
                </div>
              )}
              {conversations[activeContact?.toString()]?.map((message) => (
                <Message key={message.id} text={message.text} isUser={message.isUser} />
              ))}
              <div ref={messagesEndRef} />
            </div>

          )}
          </ScrollArea>
          {activeContact !== null && (
            <div className='mt-auto sticky bottom-0 z-10'>
              <ChatInput onSend={handleSend} />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};