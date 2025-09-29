import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import  Pie  from "./components/Piechart";
import  Bar  from "./components/Barchart";
import  Line  from "./components/Linechart";
import  Scatter  from "./components/Scatterchart";
import api from './api';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string,
  chartType?: "bar" | "scatter" | "pie" | "line"; 
  data?: unknown; 
}

interface Font {
  id: number;
  name: string;
  description: string;
  link: string;
}

interface Props {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  showSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  setFonts: React.Dispatch<React.SetStateAction<Font[]>>;
}

export default function ChatCentral({ showSidebar, messages, setMessages, setFonts }: Props) {
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [placeholder, setPlaceholder] = useState('Digite uma mensagem...');
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // MONTAR COM PERGUNTAS POSSIVEIS
  const placeholders = [
    "Qual a usina mais ao sul do mundo?",
  ];
  // const question = "Retorne um gráfico de barras com a geração de energia por região em 2025"
  

  useEffect(() => {
    const random = Math.floor(Math.random() * placeholders.length);
    setPlaceholder(placeholders[random]);
  }, []);

  useEffect(() => {
    if (!messagesRef.current) return;
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);

  async function handleSend() {

    const text = input.trim();
    if (!text || isSending) return;

    setIsSending(true);
    const userMessage: Message = { id: Date.now(), from: 'user', text };
    setMessages((m) => [...m, userMessage])
    const arrHist = []
    const context = JSON.stringify(
      messages.map(msg => ({ from: msg.from, text: msg.text, chart: msg.chartType, chartData: msg.data }))
    );
    arrHist.push(context)
    setInput('');

    try {
    //  const req = await api.post("/analyze", { question: text, chat_history: [] });
// const {chart, data_points } = req.data;
       const botMessage: Message = {
  id: Date.now() + 1,
  from: "bot",
  text: "Aqui está a geração de energia por região em 2025",
  chartType: "bar",
  data: {
    seriesNames: [
      "NORDESTE",
      "NORTE",
      "SUDESTE/CENTRO-OESTE",
      "SUL"
    ],
    labels: ["Hidráulica", "Térmica", "Eólica", "Solar"],
    data: [
      // Nordeste
      [
        { x: 0, y: 22192799.99 },
        { x: 1, y: 415154.0 },
        { x: 2, y: 16070653.0 },
        { x: 3, y: 20578010.0 }
      ],
      // Norte
      [
        { x: 0, y: 6818531.99 },
        { x: 1, y: 1576087.0 },
        { x: 2, y: 401685.0 },
        { x: 3, y: 3651023.0 }
      ],
      // Sistema Interligado Nacional
    
      // Sudeste/Centro-Oeste
      [
        { x: 0, y: 23801969.99 },
        { x: 1, y: 4510835.0 },
        { x: 2, y: 5001.0 },
        { x: 3, y: 32165730.0 }
      ],
      // Sul
      [
        { x: 0, y: 7938929.99 },
        { x: 1, y: 333262.0 },
        { x: 2, y: 1185179.99 },
        { x: 3, y: 7699480.0 }
      ]
    ]
  }
};

        setMessages((m) => [...m, botMessage]);
        // setMessages((m) => [...m, botMessage]);
        const datasets_consumed =  [
        {
            "path": "s3://ons-aws-prod-opendata/dataset/balanco_dessem_detalhe/"
        },
        {
            "path": "s3://ons-aws-prod-opendata/dataset/balanco_dessem_geral/"
        },
        {
            "path": "s3://ons-aws-prod-opendata/dataset/geracao_usina_2_ho/"
        }
    ]
        const datasets = datasets_consumed;
        const fontsArray = datasets.map(dataset => ({
          path: dataset.path
        }));
        // console.log(fontsArray)
        setFonts(fontsArray);
        
        showSidebar(true);
  //     if (req.status === 200) {
         

  // //       setFonts([
  // //   { id: 1, name: "Fonte A", description: "Descrição da Fonte A", link:"." },
  // //   { id: 2, name: "Fonte B", description: "Descrição da Fonte B",link:"." },
  // // ])
  //     } else {
  //       const errorMessage: Message = {
  //         id: Date.now() + 2,
  //         from: 'bot',
  //         text: `Houve um problema de comunicação com servidor (status: ${req.status}). Tente novamente mais tarde.`
  //       };
  //       setMessages((m) => [...m, errorMessage]);
  //     }

    } catch (e) {
      // const errorMessage: Message = {
      //   id: Date.now() + 3,
      //   from: 'bot',
      //   text: `Erro ao se comunicar com o servidor: ${e.message || e}`
      // };
      // setMessages((m) => [...m, errorMessage]);
     
      
    } finally {
      setIsSending(false);
    }
  }


  function renderChart(chartType?: string, data?: Array<number>) {
      switch (chartType) {
        case "bar":
          return <Bar data={data} />;
        case "scatter":
          return <Scatter data={data} />;
        case "pie":
          return <Pie data={data} />;
        case "line":
          return <Line data={data} />;
        default:
          return null; 
      }
    }
  

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <main className="flex-1 flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b bg-white">
        <h2 className="text-lg font-semibold text-[#090A59]">
          O que você quer saber dos dados públicos ONS?
        </h2>
      </header>

      {/* Mensagens */}
      <div className="flex-1 overflow-auto p-4 md:p-6 bg-[#F3F7FA]" ref={messagesRef}>
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {messages.map((m) => (
            <div key={m.id} className={m.from === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div
                className="p-3 rounded-lg max-w-[80%] break-words shadow-sm"
                style={{
                  backgroundColor: m.from === 'user' ? '#002A75' : '#FFFFFF',
                  color: m.from === 'user' ? '#FFFFFF' : '#0f172a',
                  border: m.from === 'user' ? '1px solid rgba(0,0,0,0.04)' : '1px solid rgba(2,34,70,0.06)',
                  fontSize: 16,
                }}
              >
                {m.text}
                {m.chartType && (
                  <div className="mt-2">{renderChart(m.chartType, m.data)}</div>
                )}
              </div>
            </div>
          ))}
          
          <div className="flex flex-col items-center justify-center mt-6 text-xs text-gray-500 text-center">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <img src="/assistant.png" className="w-16 h-16 mb-2 mt-[70%]" alt="Logo S.O.N.I.A" />
                <p>Comece a conversa para ver as mensagens aqui.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p>Fim da conversa. Lembre-se de que esse diálogo não fica salvo.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
    <div className="px-4 md:px-6 py-4 border-t bg-white">
    <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-3">
        <textarea
        rows={1}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder} // placeholder dinâmico
        className="flex-1 resize-none rounded-md border px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#002246]"
        style={{ minHeight: 48 }}
        disabled={isSending}
        />
        <button
        onClick={handleSend}
        disabled={isSending}
        className={`w-full md:w-auto px-4 py-2 rounded-md text-white font-semibold transition ${
            isSending ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#F94300] hover:opacity-95'
        }`}
        >
        {isSending ? 'Enviando...' : 'Enviar'}
        </button>
    </div>
    </div>

    </main>
  );
}
