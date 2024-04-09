
interface Props {
  text: string;
  isUser: boolean;
}

export const Message = ({ text, isUser }:Props) => {
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`
        max-w-half w-fit px-4 py-2 rounded-lg shadow 
        ${isUser ? 'bg-green-500 text-white' : 'bg-white text-black'} 
        m-1`}
      >
        {text}
      </div>
    </div>
  );
};
