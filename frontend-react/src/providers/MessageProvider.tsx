import { createContext, useState, useRef,useContext } from "react";
import { CircleCheck,CircleX,Info,CircleAlert,X } from "lucide-react";

type Message = {
    status: "success" | "error" | "info" | "warning";
    text: string;
} | null;

type MessageContextType = {
  messages: Message,
  setMessage: (newMessage: Message) => void;
};

export const MessageContext = createContext<MessageContextType>({
  messages: null,
  setMessage: () => {},
});

export const useMessage = () => useContext(MessageContext);

type Props = {
  children: React.ReactNode;
};

const MessageProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState<Message>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setMessage = (new_message: Message) => {
    // Kasujemy poprzedni timer jeśli istnieje
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setMessages(new_message);

    // Nowy timer tylko jeśli jest message
    if (new_message) {
      timerRef.current = setTimeout(() => {
        setMessages(null);
        timerRef.current = null;
      }, 5000);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, setMessage }}>
        {messages && (
            <div className={`m-2 p-4 rounded-md flex flex-row justify-between items-center border
                ${messages.status === "success" ? " bg-green-100 text-green-950 border-green-300" : "" }
                ${messages.status === "error" ? " bg-red-100 text-red-950 border-red-300" : "" }
                ${messages.status === "info" ? " bg-blue-100 text-blue-950 border-blue-300" : "" }
                ${messages.status === "warning" ? " bg-yellow-100 text-yellow-950 border-yellow-300" : "" }  `}>
                <div className="flex flex-row items-center">
                    {messages.status === "success" && (<CircleCheck className="text-green-950 font-bold" size={20} strokeWidth={3} />)}
                    {messages.status === "error" && (<CircleX className="text-red-950 font-bold" size={20} strokeWidth={3} />)}
                    {messages.status === "info" && (<Info className="text-blue-950 font-bold" size={20} strokeWidth={3} />)}
                    {messages.status === "warning" && (<CircleAlert className="text-yellow-950 font-bold" size={20} strokeWidth={3} />)}
                    <span className="ps-2">{messages.text}</span>
                </div>
                <X size={20}
                className={`cursor-pointer
                ${messages.status === "success" ? " text-green-950 hover:text-green-600" : "" }
                ${messages.status === "error" ? " text-red-950 hover:text-red-600" : "" }
                ${messages.status === "info" ? " text-blue-950 hover:text-blue-600" : "" }
                ${messages.status === "warning" ? " text-yellow-950 hover:text-yellow-600" : "" }  `}
                onClick={() => setMessage(null)}/>
            </div>
        )}
        {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;
