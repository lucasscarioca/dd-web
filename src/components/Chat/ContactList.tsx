import iconeDefault from '../../assets/iconedino.png';

interface Props {
  contacts: { id: number; name: string; avatarUrl?: string }[];
  onContactSelect: (contactId: number) => void;
}

export const ContactList = ({ contacts, onContactSelect }:Props) => {
  return (
    <div className="contact-list bg-gray-800 p-4 rounded-md">
      {contacts.map((contact) => (
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
  );
};

