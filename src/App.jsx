import React, { useState } from 'react';
// IMPORTANTE: Aquí agregué ChevronRight que faltaba
import { Home, ChevronLeft, Layout, MousePointer2, ChevronRight } from 'lucide-react';

// Asegúrate de que estos nombres coincidan con tus archivos en la carpeta components
import PortalCiudadano from './components/PortalCiudadano';
import DashboardInspector from './components/DashboardInspector';
import AdminTerritorial from './components/AdminTerritorial';
import Coordinador from './components/Coordinador';
import SuperAdmin from './components/SuperAdmin';

function App() {
  const [currentMockup, setCurrentMockup] = useState('menu');

  const mockups = [
    { id: 'ciudadano', name: '1. Portal Ciudadano', component: <PortalCiudadano /> },
    { id: 'inspector', name: '2. Dashboard Inspector', component: <DashboardInspector /> },
    { id: 'admin', name: '3. Admin Territorial', component: <AdminTerritorial /> },
    { id: 'coordinador', name: '4. Coordinador', component: <Coordinador /> },
    { id: 'superadmin', name: '5. Super Admin', component: <SuperAdmin /> },
  ];

  const TopFrame = () => (
    <div className="sticky top-0 z-[100] bg-slate-900 text-slate-300 border-b border-slate-700 px-4 py-2 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setCurrentMockup('menu')}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-all border border-slate-600"
        >
          <Home size={16} />
          <span>Menú Principal</span>
        </button>
        <div className="h-4 w-[1px] bg-slate-700"></div>
        <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Visualizando:</span>
        <span className="text-sm font-bold text-blue-400">
          {mockups.find(m => m.id === currentMockup)?.name}
        </span>
      </div>
      <div className="hidden md:flex items-center gap-2">
        <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-bold">
          MODO MOCKUP
        </span>
      </div>
    </div>
  );

  if (currentMockup === 'menu') {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-6 font-sans">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
              <Layout className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">SGAC</h1>
            <p className="text-slate-500 mt-2 text-lg">Sistema de Gestión de Audiencias de Conciliación</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockups.map((m) => (
              <button
                key={m.id}
                onClick={() => setCurrentMockup(m.id)}
                className="group relative bg-white border border-slate-200 p-8 rounded-3xl text-left transition-all hover:shadow-2xl hover:shadow-blue-100 hover:border-blue-400 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <MousePointer2 size={40} className="text-blue-600" />
                </div>
                <h3 className="text-slate-900 font-bold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                  {m.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Haz clic para previsualizar la interfaz de usuario para este rol.
                </p>
                <div className="mt-6 flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                  Abrir prototipo <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <TopFrame />
      <main className="flex-grow overflow-auto">
        {mockups.find(m => m.id === currentMockup).component}
      </main>
    </div>
  );
}

export default App;