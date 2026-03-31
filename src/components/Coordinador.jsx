import React, { useState } from 'react';
import { 
  Search, Settings, Key, UserPlus, 
  Inbox, Edit, Trash2, ArrowRight, 
  Lock, LogOut, Briefcase, Activity, 
  FileText, ShieldCheck, CheckCircle, 
  AlertCircle, X, User, ChevronDown,
  Calendar, BarChart3, Clock, Video, Archive,
  Play, Pause, Volume2, Maximize, Download,
  Save, ToggleRight, Eye, Users 
} from 'lucide-react';

export default function Coordinador() {
  const [appState, setAppState] = useState('landing');

  return (
    <div className="w-full h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {appState === 'landing' && <LandingView onNavigate={() => setAppState('login')} />}
      {appState === 'login' && <LoginView onLogin={() => setAppState('dashboard')} onBack={() => setAppState('landing')} />}
      {appState === 'dashboard' && <DashboardCoordinador onLogout={() => setAppState('landing')} />}
    </div>
  );
}

// ==========================================
// 1. LANDING PAGE
// ==========================================
function LandingView({ onNavigate }) {
  return (
    <div className="h-full flex flex-col bg-white animate-in fade-in duration-500">
      <header className="px-8 py-6 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#005FB8] rounded-lg flex items-center justify-center text-white">
            <Briefcase size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#0A2540] text-xl leading-none">MinTrabajo</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">República de Colombia</span>
          </div>
        </div>
        <button 
          onClick={onNavigate}
          className="px-6 py-2.5 bg-[#0A2540] text-white font-bold rounded-xl hover:bg-[#005FB8] transition-colors shadow-md flex items-center gap-2"
        >
          Ingresar al Sistema <ArrowRight size={16} />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-3xl text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-4">
            <Activity size={14} /> CTLogPlus v1.0
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0A2540] tracking-tight leading-tight">
            Sistema de Audiencias de <span className="text-[#005FB8]">Conciliación</span>
          </h1>
          <p className="text-lg text-slate-600 md:px-12 leading-relaxed">
            Plataforma integral para la gestión, grabación y cierre inmutable de expedientes laborales. Acceso exclusivo para Coordinadores.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={onNavigate}
              className="px-8 py-4 bg-[#005FB8] text-white font-bold rounded-xl hover:bg-[#0A2540] transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 text-lg"
            >
              Iniciar Sesión <Lock size={20} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// ==========================================
// 2. LOGIN PAGE 
// ==========================================
function LoginView({ onLogin, onBack }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="h-full flex items-center justify-center bg-slate-50 relative animate-in zoom-in-95 duration-300">
      <button onClick={onBack} className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 font-semibold transition-colors">
        <ArrowRight size={20} className="rotate-180" /> Volver al inicio
      </button>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#005FB8] rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-900/20">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#0A2540]">Acceso Restringido</h2>
          <p className="text-sm text-slate-500 mt-2">Módulo de Coordinador MinTrabajo</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Correo Institucional</label>
            <input 
              type="email" 
              defaultValue="coordinador.zona@mintrabajo.gov.co"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] transition-all" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contraseña</label>
            <input 
              type="password" 
              defaultValue="********"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] transition-all" 
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-[#005FB8] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#0A2540] transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <span className="animate-pulse">Autenticando...</span> : 'Ingresar a CTLogPlus'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <button 
            onClick={handleLogin}
            type="button" 
            className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <Lock size={18} className="text-[#0A2540]" /> Iniciar Sesión con SSO
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. DASHBOARD MAIN (Coordinador)
// ==========================================
function DashboardCoordinador({ onLogout }) {
  const [activeTab, setActiveTab] = useState('reparticion'); 
  const [selectedReparticionCase, setSelectedReparticionCase] = useState(null);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden animate-in fade-in duration-500">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 bg-[#0A2540] text-slate-300 flex flex-col transition-all duration-300 z-20 shrink-0">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-blue-900/50">
            CO
          </div>
          <div className="hidden lg:flex flex-col ml-3">
            <span className="font-bold text-white text-lg tracking-tight leading-none">CTLogPlus</span>
            <span className="text-[9px] text-blue-400 uppercase tracking-widest font-semibold mt-0.5">Coordinador</span>
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          <NavItem 
            icon={<Search size={20} />} label="Búsqueda" 
            active={activeTab === 'busqueda'} onClick={() => setActiveTab('busqueda')} 
          />
          <NavItem 
            icon={<Settings size={20} />} label="Configuración" 
            active={activeTab === 'configuracion'} onClick={() => setActiveTab('configuracion')} 
          />
          <NavItem 
            icon={<Key size={20} />} label="Módulo Permisos" 
            active={activeTab === 'permisos'} onClick={() => setActiveTab('permisos')} 
          />
          <NavItem 
            icon={<Inbox size={20} />} label="Repartición" 
            active={activeTab === 'reparticion'} onClick={() => setActiveTab('reparticion')} badge="3"
          />
          <NavItem 
            icon={<BarChart3 size={20} />} label="Reportes" 
            active={activeTab === 'reportes'} onClick={() => setActiveTab('reportes')} 
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 lg:px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">MV</span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold text-white truncate">María Vargas</p>
              <p className="text-[10px] text-blue-400 uppercase tracking-wider truncate">Coordinadora Zonal</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center lg:justify-start gap-3 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
            <LogOut size={18} />
            <span className="text-xs font-bold hidden lg:block">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* GLOBAL HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 h-16 shrink-0 shadow-sm flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-[#0A2540] text-xl tracking-tight">
              {activeTab === 'busqueda' && 'Módulo de Búsqueda y Reproducción'}
              {activeTab === 'configuracion' && 'Configuración del Sistema'}
              {activeTab === 'permisos' && 'Administración de Permisos'}
              {activeTab === 'reparticion' && 'Bandeja de Repartición'}
              {activeTab === 'reportes' && 'Centro de Reportes'}
            </h1>
          </div>
        </header>

        {/* VIEWS */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 relative">
          {activeTab === 'busqueda' && <BusquedaView />}
          {activeTab === 'configuracion' && <ConfiguracionView />}
          {activeTab === 'permisos' && <PermisosView />}
          {activeTab === 'reparticion' && <ReparticionView onSelectCase={setSelectedReparticionCase} />}
          {activeTab === 'reportes' && <ReportesView />}
        </div>

        {/* SLIDE-OVER DRAWER (REPARTICIÓN) */}
        {selectedReparticionCase && (
          <ReparticionDrawer 
            radicado={selectedReparticionCase} 
            onClose={() => setSelectedReparticionCase(null)} 
          />
        )}
      </main>
    </div>
  );
}

// ==========================================
// VIEW: BÚSQUEDA Y REPRODUCCIÓN (Módulo 4)
// ==========================================
function BusquedaView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const mockCaseData = {
    id: "SC_2026_0885",
    date: "10 Mar 2026",
    status: "Cerrado", 
    inspector: "Roberto Méndez (T.14)",
    parties: "Ana M. López vs ABC S.A.S",
    resolution: "Acuerdo Total",
    documents: [
      { name: "PoderFelipeBermudez.pdf", size: "1.2 MB", badge: "Validado" },
      { name: "Acta_Conciliacion_Firmada.pdf", size: "3.4 MB", badge: "Firmada" }
    ]
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Ingrese Radicado, Cédula o Nombre para buscar el expediente..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-[#005FB8] text-white font-bold rounded-xl hover:bg-[#0A2540] transition-colors shadow-sm">
            Buscar Expediente
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
          {/* Reproducción (Video Player) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-black text-[#0A2540] flex items-center gap-2">
                  <Video size={18} className="text-[#005FB8]" /> Reproducción
                </h3>
                <span className="text-xs text-slate-500 font-mono">{mockCaseData.id} | {mockCaseData.date}</span>
              </div>
              
              <div className="bg-slate-900 aspect-video relative flex items-center justify-center group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-600 text-sm font-medium">Grabación Centralizada (Azure WORM)</span>
                </div>
                
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-[#005FB8]/90 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#005FB8] transition-all z-10 shadow-lg"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => setIsPlaying(!isPlaying)} className="text-white hover:text-blue-400">
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <div className="text-white text-xs font-mono">14:22 / 45:10</div>
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden cursor-pointer relative">
                    <div className="absolute top-0 left-0 h-full bg-[#005FB8] w-1/3"></div>
                  </div>
                  <button className="text-white hover:text-blue-400"><Volume2 size={20} /></button>
                  <button className="text-white hover:text-blue-400"><Maximize size={20} /></button>
                </div>
              </div>
            </div>
          </div>

          {/* Detalles y Adjuntos */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-[#0A2540] mb-4">Información del Expediente</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-xs font-bold text-slate-500">Inspector Asignado</p>
                  <p className="font-semibold text-slate-900">{mockCaseData.inspector}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Partes Involucradas</p>
                  <p className="font-semibold text-slate-900">{mockCaseData.parties}</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Estado Actual</span>
                  <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-700 border border-slate-200 rounded text-xs font-bold">
                    {mockCaseData.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-[#0A2540] mb-4 flex items-center gap-2">
                <FileText size={18} /> Adjuntos
              </h3>
              <div className="space-y-3">
                {mockCaseData.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 border border-slate-100 bg-slate-50 rounded-xl flex items-center justify-between group hover:border-slate-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-blue-100 text-blue-600 rounded-lg shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500">{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-[#005FB8] p-2 shrink-0">
                      <Download size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// VIEW: CONFIGURACIÓN (Módulo 5)
// ==========================================
function ConfiguracionView() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-[#0A2540] mb-6 flex items-center gap-2">
          <Settings size={24} className="text-[#005FB8]" /> Parámetros del Sistema
        </h2>
        
        <div className="space-y-8">
          {/* Bloque: Tiempos de SLA */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Tiempos de Respuesta (SLA)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-1">Días para Repartición Máxima</label>
                <input type="number" defaultValue="3" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005FB8]" />
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-sm font-bold text-slate-700 mb-1">Días límite para Cierre de Acta</label>
                <input type="number" defaultValue="15" className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#005FB8]" />
              </div>
            </div>
          </div>

          {/* Bloque: Alertas Automáticas */}
          <div>
             <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2 mb-4">Notificaciones y Alertas</h3>
             <div className="space-y-3">
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                 <div>
                   <p className="font-bold text-slate-800 text-sm">Alerta por Vencimiento de Términos</p>
                   <p className="text-xs text-slate-500 mt-0.5">Envía correo al inspector 48h antes del límite.</p>
                 </div>
                 <ToggleRight size={32} className="text-emerald-500" />
               </div>
               <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                 <div>
                   <p className="font-bold text-slate-800 text-sm">Notificar al ciudadano tras reparto</p>
                   <p className="text-xs text-slate-500 mt-0.5">Envía correo y SMS cuando se asigna el radicado.</p>
                 </div>
                 <ToggleRight size={32} className="text-emerald-500" />
               </div>
             </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button className="flex items-center gap-2 px-6 py-3 bg-[#0A2540] text-white font-bold rounded-xl shadow-md hover:bg-[#005FB8] transition-colors">
              <Save size={18} /> Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: REPORTES (Módulo 8)
// ==========================================
function ReportesView() {
  const reports = [
    { title: "Rendimiento Inspectores", desc: "Casos asignados vs cerrados por funcionario.", icon: <Users size={24} /> },
    { title: "Reporte de Reparticiones", desc: "Volumen de radicados y tiempos de asignación.", icon: <Inbox size={24} /> },
    { title: "Consolidado de Devoluciones", desc: "Causales de requerimiento de subsanación.", icon: <AlertCircle size={24} /> },
    { title: "Mora Operativa Zonal", desc: "Expedientes que han superado los tiempos de SLA.", icon: <Clock size={24} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8">
        <h2 className="text-xl font-black text-[#0A2540]">Centro de Reportes Zonales</h2>
        <p className="text-sm text-slate-500 mt-1">Herramientas de exportación para la supervisión del Coordinador.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex gap-5 items-center">
            <div className="w-14 h-14 bg-blue-50 text-[#005FB8] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#005FB8] group-hover:text-white transition-colors">
              {report.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{report.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{report.desc}</p>
              <div className="flex items-center gap-1 text-xs font-bold text-[#005FB8] uppercase tracking-wider mt-3">
                Generar Excel <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// VIEW: PERMISOS (Módulo 6)
// ==========================================
function PermisosView() {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Roles fijos como Inspector
  const [users] = useState([
    { id: '1', name: 'Roberto Méndez', role: 'Inspector', email: 'rmendez@mintrabajo.gov.co', modules: ['Búsqueda', 'Bandeja Audiencias', 'Firma y Cierre'], status: 'Activo' },
    { id: '2', name: 'Claudia Ruiz', role: 'Inspector', email: 'cruiz@mintrabajo.gov.co', modules: ['Bandeja Audiencias', 'Búsqueda'], status: 'Activo' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Key size={20} className="text-[#005FB8]" /> Gestión de Accesos
          </h2>
          <p className="text-sm text-slate-500 mt-1">Administración de permisos y módulos habilitados para los Inspectores.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setShowAddModal(true)}
             className="flex items-center gap-2 px-4 py-2.5 bg-[#005FB8] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0A2540] transition-colors"
           >
            <UserPlus size={16} /> Agregar Permisos
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Funcionario</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Rol Asignado</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Módulos Permitidos</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Estado</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-slate-700">{u.role}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {u.modules.map((m, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${u.status === 'Activo' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-[#005FB8] hover:bg-blue-50 rounded-lg transition-colors" title="Editar Permisos">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Eliminar Permisos">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Agregar Permisos - Enfocado 100% en Inspector */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-black text-[#0A2540] flex items-center gap-2"><UserPlus size={18} /> Asignar Permisos</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:bg-slate-200 p-2 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Buscar Funcionario (Correo institucional)</label>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Ej: perez@mintrabajo.gov.co" className="w-full border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-[#005FB8]" />
                </div>
              </div>
              
              {/* Rol predefinido a Inspector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Rol a Asignar</label>
                <select className="w-full border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-500 bg-slate-50 appearance-none cursor-not-allowed" disabled>
                  <option>Inspector</option>
                </select>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><AlertCircle size={10} /> Sólo puede asignar permisos para el rol de Inspector.</p>
              </div>

              {/* Módulos de Inspector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Módulos Habilitados (Checklist Inspector)</label>
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#005FB8] focus:ring-[#005FB8]" defaultChecked />
                    <span className="text-sm font-medium text-slate-700">Bandeja Audiencias</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#005FB8] focus:ring-[#005FB8]" defaultChecked />
                    <span className="text-sm font-medium text-slate-700">Módulo Búsqueda</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#005FB8] focus:ring-[#005FB8]" defaultChecked />
                    <span className="text-sm font-medium text-slate-700">Firma y Cierre</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#005FB8] focus:ring-[#005FB8]" />
                    <span className="text-sm font-medium text-slate-700">Reportes de Gestión</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
               <button onClick={() => setShowAddModal(false)} className="px-5 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">Cancelar</button>
               <button onClick={() => setShowAddModal(false)} className="px-5 py-2 text-sm font-bold text-white bg-[#0A2540] hover:bg-[#005FB8] rounded-xl shadow-md transition-colors">Guardar Permisos</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// VIEW: REPARTICIÓN (Módulo 7)
// ==========================================
function ReparticionView({ onSelectCase }) {
  const [requests] = useState([
    { id: 'REQ-2026-1020', date: '29 Mar 2026', citizen: 'Ana María Torres', type: 'Despido Injustificado', status: 'Pendiente' },
    { id: 'REQ-2026-1019', date: '29 Mar 2026', citizen: 'Carlos Pineda', type: 'Acoso Laboral', status: 'Pendiente' },
    { id: 'REQ-2026-1015', date: '28 Mar 2026', citizen: 'Sindicato Trabajadores Unidos', type: 'Conflicto Colectivo', status: 'Pendiente' },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Inbox size={20} className="text-[#0A2540]" /> Bandeja de Repartición
          </h2>
          <p className="text-sm text-slate-500 mt-1">Nuevas solicitudes de audiencia pendientes por revisión y asignación a inspectores.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">ID Solicitud</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Fecha Ingreso</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Solicitante</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo de Conflicto</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map(req => (
                <tr key={req.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onSelectCase(req)}>
                  <td className="p-4 border-l-4 border-transparent group-hover:border-[#005FB8]">
                    <span className="font-mono text-sm font-bold text-[#0A2540]">{req.id}</span>
                  </td>
                  <td className="p-4 text-sm text-slate-500">{req.date}</td>
                  <td className="p-4 text-sm font-medium text-slate-800">{req.citizen}</td>
                  <td className="p-4 text-sm text-slate-600">{req.type}</td>
                  <td className="p-4 text-right">
                    <span className="inline-flex items-center gap-1 text-[#005FB8] font-bold text-xs bg-blue-50 px-3 py-1.5 rounded-lg group-hover:bg-[#005FB8] group-hover:text-white transition-colors">
                      Gestionar <ArrowRight size={14} />
                    </span>
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400">
                    <CheckCircle size={32} className="mx-auto mb-3 opacity-50" />
                    <p className="font-bold">Bandeja al día. No hay solicitudes pendientes.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// DRAWER: GESTIÓN DE REPARTICIÓN (Vista Previa Extendida)
// ==========================================
function ReparticionDrawer({ radicado, onClose }) {
  const [action, setAction] = useState('asignar'); // 'asignar' | 'devolver'
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 w-full md:w-[600px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        <div className="h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Repartición / Vista Previa</p>
            <h3 className="text-lg font-black text-[#0A2540]">{radicado.id}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
             <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
                <CheckCircle size={32} />
             </div>
             <h2 className="text-xl font-black text-slate-900 mb-2">
               {action === 'asignar' ? 'Asignación Exitosa' : 'Devolución Registrada'}
             </h2>
             <p className="text-sm text-slate-500">
               {action === 'asignar' ? 'El inspector ha sido notificado del nuevo caso.' : 'Se ha notificado al ciudadano para que subsane la solicitud.'}
             </p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto flex flex-col bg-slate-50">
            <div className="p-6 space-y-6 flex-1">
              
              {/* Sección 1: Formulario Diligenciado por el Ciudadano (Bloque 1) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                 <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                   <User size={18} className="text-[#005FB8]" /> Datos del Ciudadano Solicitante
                 </h4>
                 
                 <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombres y Apellidos</p>
                     <p className="font-bold text-slate-800">{radicado.citizen}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cédula de Ciudadanía</p>
                     <p className="font-semibold text-slate-700">1.020.334.556</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Teléfono de Contacto</p>
                     <p className="font-semibold text-slate-700">300 123 4567</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correo Electrónico</p>
                     <p className="font-semibold text-slate-700">ana.torres@gmail.com</p>
                   </div>
                 </div>

                 <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pretensiones o Conflicto Declarado</p>
                   <p className="text-sm text-slate-600 leading-relaxed italic">
                     "Fui despedida el 15 de marzo sin justa causa y la empresa ABC S.A.S no me ha realizado el pago de la liquidación y prestaciones sociales correspondientes..."
                   </p>
                 </div>
              </div>

              {/* Sección 2: Documentos Anexos */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                   <FileText size={18} className="text-[#005FB8]" /> Documentos Anexos Radicados
                 </h4>
                 <div className="space-y-2">
                   {/* Mock documents */}
                   <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group">
                     <div className="flex items-center gap-3">
                       <FileText size={16} className="text-rose-500" />
                       <span className="text-sm font-semibold text-slate-700">Copia_Cedula_AnaTorres.pdf</span>
                     </div>
                     <div className="flex gap-2">
                       <button className="text-slate-400 hover:text-[#005FB8] transition-colors"><Eye size={16}/></button>
                       <button className="text-slate-400 hover:text-[#005FB8] transition-colors"><Download size={16}/></button>
                     </div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg group">
                     <div className="flex items-center gap-3">
                       <FileText size={16} className="text-rose-500" />
                       <span className="text-sm font-semibold text-slate-700">Carta_Despido_EmpresaABC.pdf</span>
                     </div>
                     <div className="flex gap-2">
                       <button className="text-slate-400 hover:text-[#005FB8] transition-colors"><Eye size={16}/></button>
                       <button className="text-slate-400 hover:text-[#005FB8] transition-colors"><Download size={16}/></button>
                     </div>
                   </div>
                 </div>
              </div>

              {/* Controles de Gestión (Asignar vs Devolver) */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                  <Settings size={18} className="text-[#0A2540]" /> Acción Operativa
                </h4>
                
                <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                  <button 
                    onClick={() => setAction('asignar')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${action === 'asignar' ? 'bg-white text-[#0A2540] shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Asignar Inspector
                  </button>
                  <button 
                    onClick={() => setAction('devolver')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${action === 'devolver' ? 'bg-amber-100 text-amber-800 shadow-sm border border-amber-200' : 'text-slate-500 hover:text-slate-800'}`}
                  >
                    Requerir Subsanación
                  </button>
                </div>

                {action === 'asignar' ? (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Seleccionar Inspector Disponible</label>
                      <div className="relative">
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] appearance-none cursor-pointer">
                          <option value="">-- Seleccione un funcionario --</option>
                          <option value="1">Roberto Méndez (Carga: Baja)</option>
                          <option value="2">Claudia Ruiz (Carga: Media)</option>
                          <option value="3">Andrés Jaramillo (Carga: Alta)</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in">
                    <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2 mb-2">
                      <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 leading-relaxed">
                        Se enviará correo al ciudadano para que subsane. El trámite quedará pausado.
                      </p>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">Motivo de la Devolución</label>
                      <div className="relative mb-3">
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 appearance-none cursor-pointer">
                          <option value="">-- Seleccione un motivo --</option>
                          <option value="docs">Documentos incompletos o ilegibles</option>
                          <option value="competencia">Falta de competencia territorial</option>
                          <option value="redaccion">Pretensiones poco claras</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                      <textarea 
                        placeholder="Observaciones adicionales para el ciudadano..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 resize-none h-24"
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons Footer */}
            <div className="p-6 border-t border-slate-200 bg-white shrink-0">
              <button 
                onClick={handleSubmit}
                disabled={isProcessing}
                className={`w-full py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                  action === 'asignar' 
                    ? 'bg-[#005FB8] text-white hover:bg-[#0A2540]' 
                    : 'bg-amber-600 text-white hover:bg-amber-700'
                }`}
              >
                {isProcessing ? (
                  <><RefreshCw size={18} className="animate-spin" /> Procesando...</>
                ) : (
                  action === 'asignar' ? 'Confirmar Asignación de Expediente' : 'Registrar Devolución al Ciudadano'
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ==========================================
// REUSABLE MICRO-COMPONENTS
// ==========================================
const NavItem = ({ icon, label, active, badge, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all ${active ? 'bg-[#005FB8] text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
  >
    {icon}
    <span className="font-semibold text-sm hidden lg:block">{label}</span>
    {badge && <span className="hidden lg:flex ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
  </button>
);