import React, { useState } from 'react';

interface Props {
  onSend: (text: string) => void;
}

export const ChatInput = ({ onSend }:Props) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!text.trim()) {
      return; 
    }
    onSend(text);
    setText(''); 
  };

  const buttonClasses = text.trim()
  ? "w-32 ml-2 send-button bg-green-500 hover:bg-green-600 rounded-md"
  : "w-32 ml-2 send-button bg-green-700 rounded-md opacity-50 cursor-not-allowed";

  return (
    <form onSubmit={handleSubmit} className="chat-input mt-3 flex w-full">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input rounded-md p-2 w-full text-black"
        placeholder="Digite sua menssagem "
      />
      <button type="submit" className={buttonClasses}>Send</button>
    </form>
  );
};
