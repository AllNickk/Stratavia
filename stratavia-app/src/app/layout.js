import { Inter } from "next/font/google";
import "./globals.css";

// Trazendo a fonte Inter do Google e configurando pro nosso idioma
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap", // Garante que o texto apareça rápido e depois troque a fonte
});

const IconeIdioma = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 cursor-pointer hover:opacity-70 transition-opacity">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="3.6" y1="9" x2="20.4" y2="9" />
    <line x1="3.6" y1="15" x2="20.4" y2="15" />
    <path d="M11.5 3a17 17 0 0 0 0 18" />
    <path d="M12.5 3a17 17 0 0 1 0 18" />
  </svg>
);

const IconeAjuda = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="text-slate-900 cursor-pointer hover:opacity-70 transition-opacity">
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="17" x2="12" y2="17.01" />
    <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
  </svg>
);

export const metadata = {
  title: "Stratavia",
  description: "Professional Grade Geoeconomic Analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      {/* Injetando a classe da fonte Inter direto no body */}
      <body className={`bg-slate-50 text-slate-900 min-h-screen flex flex-col ${inter.className}`}>
        
        <header className="bg-white w-full top-0 border-b border-slate-200 relative z-50">
          <div className="flex justify-between items-center h-16 px-4 md:px-10 w-full max-w-7xl mx-auto">
            <div className="text-2xl font-bold tracking-tight text-slate-900">
              Stratavia
            </div>
            <div className="flex items-center gap-6">
              <IconeIdioma />
              <IconeAjuda />
            </div>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center relative w-full">
          {children}
        </main>

        <footer className="bg-slate-50 w-full border-t border-slate-200 relative z-50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4 md:px-10 py-8 w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="text-xl font-bold text-slate-900">Stratavia</div>
              <p className="text-[10px] uppercase tracking-wider text-slate-500">
                © 2026 Stratavia.
              </p>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}