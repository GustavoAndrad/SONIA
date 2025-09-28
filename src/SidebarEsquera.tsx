import { useState } from "react";

interface Props {
  messages: object[];
}

export default function SidebarEsquerda({ messages }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      const data = JSON.stringify(messages, null, 2);

      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "conversa.json";
      a.click();

      URL.revokeObjectURL(url);
    } finally {
      // MUDAR DEPOISSS --> PDF???? :) 
      setTimeout(() => setIsExporting(false), 800);
    }
  };

  return (
    <aside className="w-full md:w-72 border-r flex flex-col bg-white h-fit md:h-screen ">
      {/* Cabeçalho */}
      <div className="px-4 py-6 flex items-center gap-3 border-b">
        <div className="w-fit h-fit rounded flex items-center justify-center text-white font-bold">
          <img src="/assistant.png"></img>
        </div>
        <div>
          <div className="text-[#090A59] font-bold">S.O.N.I.A</div>
          <div className="text-xs text-[#002246]">
            Sistema do Operador Nacional para Informação Acessível
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="p-4 flex-1"></div>

      {/* Botão exportar */}
      <div className="px-4 pb-4">
        <button
          className="w-full cursor-pointer py-2 rounded-md text-white font-semibold shadow-sm 
                     bg-[#F94300] hover:bg-[#d43400] 
                     disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={messages.length === 0 || isExporting}
          onClick={handleExport}
        >
          {isExporting ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Exportando...
            </>
          ) : (
            "Exportar Conversa"
          )}
        </button>
      </div>

      {/* Rodapé */}
      <div className="px-4 py-2 border-t text-xs text-gray-500">
        Agente S.O.N.I.A • v1.0.0 • Protótipo
      </div>
    </aside>
  );
}
