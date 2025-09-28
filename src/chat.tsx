import { useState } from "react";
import SidebarEsquerda from './SidebarEsquera';
import ChatCentral from './ChatCentral';
import SidebarDireita from './SidebarDireita';

interface Font {
  id: number;
  name: string;
  description: string;
  link: string;
}

export default function ChatUI() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isShowSidebarDireita, setIsShowSidebarDireita] = useState(false);

  // estado das fontes
  const [fonts, setFonts] = useState<Font[]>([
    { id: 1, name: "Fonte A", description: "Descrição da Fonte A", link:"." },
    { id: 2, name: "Fonte B", description: "Descrição da Fonte B", link:"." },
  ]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-montserrat bg-[#F7F6F6]">
      {/* Sidebar esquerda */}
      <SidebarEsquerda messages={messages}/>

      {/* Chat central */}
      <div className="flex-1 flex">
        <ChatCentral
          showSidebar={setIsShowSidebarDireita}
          messages={messages}
          setMessages={setMessages}
          setFonts={setFonts}
        />
      </div>

      {/* Sidebar direita controlada pelo estado */}
      <SidebarDireita
        isShow={isShowSidebarDireita}
        setIsShow={setIsShowSidebarDireita}
        fonts={fonts}
      />
    </div>
  );
}
