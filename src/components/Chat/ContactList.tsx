import { useEffect, useState } from 'react';
import iconeDefault from '../../assets/iconedino.png';
import { Input } from '../ui/input';

interface Props {
  contacts: { id: number; name: string; avatarUrl?: string }[];
  onContactSelect: (contactId: number) => void;
}

export const ContactList = ({ contacts, onContactSelect }: Props) => {
  // Estado para o texto de pesquisa
  const [searchText, setSearchText] = useState('');

  // Estado para os contatos filtrados
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  // Atualiza os contatos filtrados sempre que os contatos ou o texto de pesquisa mudar
  useEffect(() => {
    if (searchText === '') {
      setFilteredContacts(contacts);
    } else {
      setFilteredContacts(contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchText.toLowerCase())
      ));
    }
  }, [contacts, searchText]);

  return (
    <div className="contact-list-container lg:mr-4 mr-0">
      {/* Input de pesquisa */}
      <Input
        type="text"
        placeholder="Pesquisar contatos..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input p-2 mb-2   w-full"
      />

      <div className="contact-list bg-gray-800 p-2 rounded-md ">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact.id)}
            className="contact-item flex items-center cursor-pointer p-2 hover:bg-gray-700 rounded-lg"
          >
            <img
              src={contact.avatarUrl || iconeDefault}
              alt="Avatar"
              className="mr-2 rounded-full h-12 w-12"
            />
            {contact.name}
          </div>
        ))}
      </div>
    </div>
  );
};
