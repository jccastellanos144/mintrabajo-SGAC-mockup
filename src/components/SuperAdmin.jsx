import React, { useState } from 'react';
import { 
  Search, Settings, Key, UserPlus, 
  Inbox, Edit, Trash2, ArrowRight, 
  Lock, LogOut, Briefcase, Activity, 
  FileText, ShieldCheck, CheckCircle, 
  AlertCircle, X, User, ChevronDown,
  Calendar, BarChart3, Clock, Video, Archive,
  Play, Pause, Volume2, Maximize, Download,
  Save, ToggleRight, Eye, Users, FileType, 
  Mail, Database, Terminal, Plus, Shield,
  Share2, HardDrive, History, UploadCloud,
  ToggleLeft, Check
} from 'lucide-react';

export default function AdminTerritorial() {
  const [appState, setAppState] = useState('landing');

  return (
    <div className="w-full h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden">
      {appState === 'landing' && <LandingView onNavigate={() => setAppState('login')} />}
      {appState === 'login' && <LoginView onLogin={() => setAppState('dashboard')} onBack={() => setAppState('landing')} />}
      {appState === 'dashboard' && <DashboardSuperAdmin onLogout={() => setAppState('landing')} />}
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
          <div className="w-10 h-10 bg-[#0F172A] rounded-lg flex items-center justify-center text-white shadow-md">
            <Shield size={24} className="text-emerald-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-[#0F172A] text-xl leading-none tracking-tight">CTLogPlus</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">SaaS Core System</span>
          </div>
        </div>
        <button 
          onClick={onNavigate}
          className="px-6 py-2.5 bg-[#0F172A] text-white font-bold rounded-lg hover:bg-[#1E293B] transition-colors shadow-sm flex items-center gap-2 text-sm"
        >
          Acceso Administrativo <ArrowRight size={16} />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center px-8 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-3xl text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold mb-4 uppercase tracking-widest">
            <Terminal size={14} /> Entorno de Producción v1.0
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#0F172A] tracking-tight leading-tight">
            Configuración Maestra <br/><span className="text-[#005FB8]">SuperAdmin</span>
          </h1>
          <p className="text-lg text-slate-600 md:px-12 leading-relaxed">
            Consola de administración global. Gestión de formatos, plantillas de notificaciones y directorio maestro de usuarios de la plataforma MinTrabajo.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <button 
              onClick={onNavigate}
              className="px-8 py-4 bg-[#005FB8] text-white font-bold rounded-xl hover:bg-[#0A2540] transition-colors shadow-lg hover:shadow-xl flex items-center gap-2 text-lg"
            >
              Autenticación Root <Lock size={20} />
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
    <div className="h-full flex items-center justify-center bg-[#0F172A] relative animate-in zoom-in-95 duration-300">
      <button onClick={onBack} className="absolute top-8 left-8 text-slate-400 hover:text-white flex items-center gap-2 font-mono text-sm transition-colors">
        <ArrowRight size={16} className="rotate-180" /> returnToHome()
      </button>

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl border border-slate-800">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center text-emerald-400 mx-auto mb-4 border border-slate-700">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Acceso SuperAdmin</h2>
          <p className="text-xs font-mono text-slate-500 mt-2 uppercase tracking-widest">Nivel 0 - Control Total</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Root Email</label>
            <input 
              type="email" 
              defaultValue="sysadmin@mintrabajo.gov.co"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all" 
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 uppercase tracking-wider">Master Password</label>
            <input 
              type="password" 
              defaultValue="********"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all" 
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full py-3.5 bg-[#0F172A] text-white rounded-lg text-sm font-bold shadow-md hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <span className="animate-pulse font-mono">Verifying Hash...</span> : <><Terminal size={16}/> Iniciar Sesión</>}
          </button>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 3. DASHBOARD MAIN (SuperAdmin)
// ==========================================
function DashboardSuperAdmin({ onLogout }) {
  const [activeTab, setActiveTab] = useState('configuracion'); 

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-800 overflow-hidden animate-in fade-in duration-500">
      
      {/* SIDEBAR TECH STYLE */}
      <aside className="w-20 lg:w-64 bg-[#0F172A] text-slate-300 flex flex-col transition-all duration-300 z-20 shrink-0 border-r border-slate-800">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-slate-800 shrink-0 bg-[#0B1120]">
          <div className="w-8 h-8 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">
            SA
          </div>
          <div className="hidden lg:flex flex-col ml-3">
            <span className="font-bold text-white text-sm tracking-tight leading-none">CTLogPlus</span>
            <span className="text-[9px] text-emerald-400 font-mono uppercase tracking-widest mt-1">SuperAdmin</span>
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-1 px-3 overflow-y-auto">
          <NavItem 
            icon={<Search size={18} />} label="Búsqueda Global" 
            active={activeTab === 'busqueda'} onClick={() => setActiveTab('busqueda')} 
          />
          <NavItem 
            icon={<Settings size={18} />} label="Configuración Maestra" 
            active={activeTab === 'configuracion'} onClick={() => setActiveTab('configuracion')} 
          />
          <NavItem 
            icon={<History size={18} />} label="Logs de Auditoría" 
            active={activeTab === 'logs'} onClick={() => setActiveTab('logs')} 
          />
          <NavItem 
            icon={<BarChart3 size={18} />} label="Reportes de Sistema" 
            active={activeTab === 'reportes'} onClick={() => setActiveTab('reportes')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-800 bg-[#0B1120]">
          <div className="flex items-center gap-3 lg:px-2 mb-4">
            <div className="w-8 h-8 rounded-md bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <User size={14} className="text-slate-400" />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-xs font-bold text-white truncate font-mono">root@sys</p>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest truncate">Admin ID: 001</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center justify-center lg:justify-start gap-3 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors">
            <LogOut size={16} />
            <span className="text-xs font-bold hidden lg:block uppercase tracking-wider">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        
        {/* GLOBAL HEADER */}
        <header className="bg-white border-b border-slate-200 px-6 h-16 shrink-0 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <h1 className="font-black text-[#0F172A] text-lg tracking-tight flex items-center gap-2">
              <Terminal size={18} className="text-slate-400" />
              {activeTab === 'busqueda' && 'Módulo de Búsqueda y Reproducción'}
              {activeTab === 'configuracion' && 'Configuración de Plataforma (Módulo 4)'}
              {activeTab === 'logs' && 'Consola de Auditoría y Seguridad'}
              {activeTab === 'reportes' && 'Centro de Reportes Globales'}
            </h1>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-500">
            <span className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> DB_CONNECTED
            </span>
          </div>
        </header>

        {/* VIEWS */}
        <div className="flex-1 overflow-y-auto bg-[#F8FAFC] p-6 md:p-8">
          {activeTab === 'busqueda' && <BusquedaView />}
          {activeTab === 'configuracion' && <ConfiguracionMaestraView />}
          {activeTab === 'logs' && <LogsAuditoriaView />}
          {activeTab === 'reportes' && <ReportesView />}
        </div>
      </main>
    </div>
  );
}

// ==========================================
// VIEW: BÚSQUEDA Y REPRODUCCIÓN (Con Compartir)
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
              placeholder="Ingrese Radicado, Cédula o Nombre para buscar el expediente global..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-[#0F172A] text-white font-bold rounded-xl hover:bg-black transition-colors shadow-sm">
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
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-mono hidden sm:inline">{mockCaseData.id} | {mockCaseData.date}</span>
                  {/* Nuevos botones según manual: Compartir / Exportar */}
                  <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                    <button className="flex items-center gap-1.5 text-xs font-bold text-[#005FB8] hover:text-[#0A2540] bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                      <Share2 size={14} /> Compartir
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors">
                      <Download size={14} /> Exportar
                    </button>
                  </div>
                </div>
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
// VIEW: CONFIGURACIÓN MAESTRA (Formatos, Plantillas, Usuarios)
// ==========================================
function ConfiguracionMaestraView() {
  const [subTab, setSubTab] = useState('formatos'); 

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full animate-in fade-in slide-in-from-bottom-4">
      {/* Sub-Navegación Técnica */}
      <div className="flex bg-white border border-slate-200 rounded-lg p-1 mb-6 w-fit shadow-sm">
        <SubTabButton 
          icon={<FileType size={16} />} label="4.1 Formatos" 
          active={subTab === 'formatos'} onClick={() => setSubTab('formatos')} 
        />
        <SubTabButton 
          icon={<Mail size={16} />} label="4.2 Plantillas de Correo" 
          active={subTab === 'plantillas'} onClick={() => setSubTab('plantillas')} 
        />
        <SubTabButton 
          icon={<Users size={16} />} label="4.3 Usuarios" 
          active={subTab === 'usuarios'} onClick={() => setSubTab('usuarios')} 
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm flex-1 overflow-hidden flex flex-col">
        {subTab === 'formatos' && <ModuloFormatos />}
        {subTab === 'plantillas' && <ModuloPlantillas />}
        {subTab === 'usuarios' && <ModuloUsuarios />}
      </div>
    </div>
  );
}

// --- SUBMÓDULO 4.1: FORMATOS ---
function ModuloFormatos() {
  const [showAddModal, setShowAddModal] = useState(false);
  const formatos = [
    { id: 'FMT-001', name: 'Acta_Conciliacion_Acuerdo_Total.docx', version: 'v1.2', date: '2026-03-15', status: 'Activo' },
    { id: 'FMT-002', name: 'Acta_Conciliacion_Sin_Acuerdo.docx', version: 'v1.0', date: '2026-02-28', status: 'Activo' },
    { id: 'FMT-003', name: 'Constancia_Inasistencia.docx', version: 'v2.1', date: '2026-03-20', status: 'Activo' },
  ];

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Gestión de Formatos del Sistema</h3>
          <p className="text-xs text-slate-500 mt-0.5">Plantillas documentales utilizadas por los inspectores.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors shadow-sm"
        >
          <Plus size={14} /> Agregar Formato
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">ID / Nombre</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Versión</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Última Modificación</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Estado</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {formatos.map(f => (
              <tr key={f.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[#005FB8]" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{f.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{f.id}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs font-mono text-slate-600">{f.version}</td>
                <td className="p-4 text-xs text-slate-500">{f.date}</td>
                <td className="p-4">
                   <span className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold uppercase tracking-wider">{f.status}</span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-400 hover:text-[#005FB8] bg-white border border-slate-200 hover:border-[#005FB8] rounded transition-colors" title="Descargar"><Download size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-amber-600 bg-white border border-slate-200 hover:border-amber-600 rounded transition-colors" title="Editar/Actualizar"><Edit size={14} /></button>
                    <button className="p-1.5 text-slate-400 hover:text-rose-600 bg-white border border-slate-200 hover:border-rose-600 rounded transition-colors" title="Eliminar"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Agregar Formato */}
      {showAddModal && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2"><FileType size={16} /> Cargar Nuevo Formato</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Nombre del Formato (Documento)</label>
                <input type="text" placeholder="Ej: Acta_Audiencia_General" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A]" />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Archivo Base (.docx, .pdf)</label>
                <div className="w-full border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-[#005FB8] transition-colors cursor-pointer">
                  <UploadCloud size={32} className="text-slate-400 mb-3" />
                  <p className="text-sm font-bold text-[#0F172A]">Arrastra el archivo aquí o haz clic para explorar</p>
                  <p className="text-xs text-slate-500 mt-1">Tamaño máximo: 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Versión</label>
                  <input type="text" defaultValue="v1.0" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A] font-mono" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Estado Inicial</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A] bg-white">
                    <option>Activo</option>
                    <option>Borrador</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
               <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
               <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-black rounded-lg shadow-sm transition-colors flex items-center gap-2"><Save size={14} /> Guardar Formato</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- SUBMÓDULO 4.2: PLANTILLAS DE CORREO ---
function ModuloPlantillas() {
  const plantillas = [
    { id: 'TPL-EMAIL-01', trigger: 'Creación de Usuario', subject: 'Bienvenido a CTLogPlus - Credenciales', vars: '{{nombre}}, {{password_temp}}' },
    { id: 'TPL-EMAIL-02', trigger: 'Reparto Asignado (Ciudadano)', subject: 'Asignación de Inspector - Radicado {{radicado}}', vars: '{{nombre}}, {{radicado}}, {{inspector}}' },
    { id: 'TPL-EMAIL-03', trigger: 'Requerimiento Subsanación', subject: 'Acción Requerida: Subsanación Solicitud {{radicado}}', vars: '{{nombre}}, {{radicado}}, {{motivo}}' },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-bold text-slate-800 text-sm">Plantillas de Correo Electrónico</h3>
        <p className="text-xs text-slate-500 mt-0.5">Configuración de notificaciones transaccionales del sistema.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50">
        {plantillas.map(p => (
          <div key={p.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-slate-100 rounded text-slate-500 shrink-0 mt-1">
                <Mail size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-slate-800 text-sm">{p.trigger}</h4>
                  <span className="text-[9px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{p.id}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium">Asunto: <span className="font-normal text-slate-500">{p.subject}</span></p>
                <p className="text-[10px] text-slate-400 font-mono mt-2">Variables: {p.vars}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
               <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded hover:bg-slate-50 transition-colors">
                 <Edit size={14} /> Editar Contenido
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- SUBMÓDULO 4.3: USUARIOS ---
function ModuloUsuarios() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const usuarios = [
    { id: 'USR-890', name: 'María Vargas', email: 'mvargas@mintrabajo.gov.co', role: 'Coordinador', region: 'Bogotá D.C.', status: 'Activo' },
    { id: 'USR-891', name: 'Carlos Peña', email: 'cpena@mintrabajo.gov.co', role: 'Admin Territorial', region: 'Antioquia', status: 'Inactivo' },
    { id: 'USR-892', name: 'Roberto Méndez', email: 'rmendez@mintrabajo.gov.co', role: 'Inspector', region: 'Bogotá D.C.', status: 'Activo' },
  ];

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  return (
    <div className="flex flex-col h-full relative">
      <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Directorio Maestro de Usuarios</h3>
          <p className="text-xs text-slate-500 mt-0.5">Creación y gestión global de cuentas de acceso.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0F172A] text-white text-xs font-bold rounded-lg hover:bg-black transition-colors shadow-sm"
        >
          <UserPlus size={14} /> Crear Nuevo Usuario
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Usuario / Correo</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Rol de Sistema</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Territorial</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono">Estado</th>
              <th className="p-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest font-mono text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">{u.name}</span>
                    <span className="text-xs text-slate-500">{u.email}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">{u.role}</span>
                </td>
                <td className="p-4 text-xs text-slate-600">{u.region}</td>
                <td className="p-4">
                   <div className="flex items-center gap-1.5">
                     <div className={`w-2 h-2 rounded-full ${u.status === 'Activo' ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                     <span className="text-xs font-medium text-slate-600">{u.status}</span>
                   </div>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEditClick(u)} className="p-1.5 text-slate-400 hover:text-[#005FB8] bg-white border border-slate-200 hover:border-[#005FB8] rounded transition-colors" title="Editar Propiedades">
                    <Settings size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL: Crear Usuario */}
      {showCreateModal && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2"><UserPlus size={16} /> Alta de Usuario Global</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Nombres</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A]" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Apellidos</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A]" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Correo Institucional</label>
                <input type="email" placeholder="@mintrabajo.gov.co" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Rol de Sistema</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A] bg-white">
                    <option>Super Administrador</option>
                    <option>Administrador Territorial</option>
                    <option>Coordinador</option>
                    <option>Inspector</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Dirección Territorial</label>
                  <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A] bg-white">
                    <option>Bogotá D.C.</option>
                    <option>Antioquia</option>
                    <option>Valle del Cauca</option>
                    <option>Cundinamarca</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
               <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
               <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-black rounded-lg shadow-sm transition-colors">Crear y Notificar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Editar Usuario */}
      {showEditModal && selectedUser && (
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-[#0F172A] text-sm flex items-center gap-2"><Settings size={16} /> Propiedades del Usuario</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-700 transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="text-center pb-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 mx-auto mb-2">
                  <User size={20} />
                </div>
                <h4 className="font-bold text-slate-900">{selectedUser.name}</h4>
                <p className="text-xs font-mono text-slate-500">{selectedUser.email}</p>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Modificar Rol de Sistema</label>
                <select defaultValue={selectedUser.role} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#0F172A] bg-white">
                  <option>Super Administrador</option>
                  <option>Administrador Territorial</option>
                  <option>Coordinador</option>
                  <option>Inspector</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 font-mono">Estado de Cuenta</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors ${selectedUser.status === 'Activo' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Check size={14} /> Activa
                  </button>
                  <button className={`flex-1 py-1.5 text-xs font-bold rounded flex items-center justify-center gap-1.5 transition-colors ${selectedUser.status === 'Inactivo' ? 'bg-white shadow-sm text-slate-800' : 'text-slate-500 hover:text-slate-700'}`}>
                    <Lock size={14} /> Suspendida
                  </button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
               <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">Cancelar</button>
               <button onClick={() => setShowEditModal(false)} className="px-4 py-2 text-xs font-bold text-white bg-[#005FB8] hover:bg-[#0A2540] rounded-lg shadow-sm transition-colors">Guardar Cambios</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// VIEW: LOGS DE AUDITORÍA (Añadido)
// ==========================================
function LogsAuditoriaView() {
  const logs = [
    { id: 'log-01', time: '2026-03-30 14:22:15', user: 'cpena@mintrabajo', action: 'EXPORT_REPORT', ip: '190.24.55.12', status: 'SUCCESS' },
    { id: 'log-02', time: '2026-03-30 13:10:05', user: 'sysadmin@mintrabajo', action: 'EDIT_USER_ROLE', ip: '10.0.0.5', status: 'SUCCESS' },
    { id: 'log-03', time: '2026-03-30 09:45:00', user: 'rmendez@mintrabajo', action: 'LOGIN_ATTEMPT', ip: '201.21.3.44', status: 'FAILED' },
    { id: 'log-04', time: '2026-03-29 18:30:22', user: 'system_cron', action: 'WORM_SYNC', ip: 'localhost', status: 'SUCCESS' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-[#0F172A] p-6 rounded-3xl border border-slate-800 shadow-xl text-slate-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <Terminal size={20} className="text-emerald-400" /> Consola de Logs (System Events)
          </h2>
          <button className="text-xs font-mono bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded transition-colors border border-slate-700">
            Exportar CSV
          </button>
        </div>
        
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-[#0B1120]">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead className="bg-slate-900 border-b border-slate-800">
              <tr>
                <th className="p-3 text-slate-500 uppercase tracking-widest">Timestamp</th>
                <th className="p-3 text-slate-500 uppercase tracking-widest">Usuario / Actor</th>
                <th className="p-3 text-slate-500 uppercase tracking-widest">Acción (Event)</th>
                <th className="p-3 text-slate-500 uppercase tracking-widest">IP Origen</th>
                <th className="p-3 text-slate-500 uppercase tracking-widest">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {logs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-3 text-slate-400">{log.time}</td>
                  <td className="p-3 text-emerald-400">{log.user}</td>
                  <td className="p-3 text-blue-400">{log.action}</td>
                  <td className="p-3 text-slate-500">{log.ip}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW: REPORTES (Globales)
// ==========================================
function ReportesView() {
  const reports = [
    { title: "Métricas de Almacenamiento (WORM)", desc: "Consumo de Terabytes en Azure por grabaciones de audiencias globales.", icon: <HardDrive size={24} />, tag: "Infraestructura" },
    { title: "Auditoría Transaccional", desc: "Volumen de firmas criptográficas generadas y validadas por mes.", icon: <Activity size={24} />, tag: "Seguridad" },
    { title: "Actividad de Usuarios (Logins)", desc: "Sesiones concurrentes y control de acceso nacional.", icon: <Users size={24} />, tag: "Plataforma" },
    { title: "Consolidado de Actas", desc: "Total de expedientes cerrados a nivel nacional (Exportación Legal).", icon: <Archive size={24} />, tag: "Operativa" },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8">
        <h2 className="text-xl font-black text-[#0F172A]">Centro de Reportes Globales</h2>
        <p className="text-sm text-slate-500 mt-1">Exportación de métricas de alto nivel para supervisión del SaaS.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between">
            <div className="flex gap-5 items-start">
              <div className="w-14 h-14 bg-slate-100 text-[#0F172A] rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#0F172A] group-hover:text-white transition-colors">
                {report.icon}
              </div>
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">{report.tag}</span>
                <h3 className="font-bold text-slate-800 text-lg leading-tight mt-1">{report.title}</h3>
                <p className="text-sm text-slate-500 mt-2">{report.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-[#005FB8] uppercase tracking-wider mt-5 ml-19">
              <Download size={14} /> Exportar CSV <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// REUSABLE MICRO-COMPONENTS
// ==========================================
const NavItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-center lg:justify-start gap-3 p-2.5 rounded-lg transition-all ${active ? 'bg-slate-800 text-white shadow-inner border border-slate-700' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'}`}
  >
    {icon}
    <span className="font-semibold text-xs hidden lg:block tracking-wide">{label}</span>
  </button>
);

const SubTabButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-md transition-all ${active ? 'bg-[#0F172A] text-white shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'}`}
  >
    {icon} {label}
  </button>
);