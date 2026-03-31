import React, { useState } from 'react';
import { 
  LayoutDashboard, CheckSquare, Settings, 
  Calendar, ChevronDown, TrendingUp, 
  Clock, Search, Filter, ShieldCheck, 
  Archive, X, Activity, FileSignature, 
  CheckCircle, AlertCircle, RefreshCw, 
  BarChart3, ArrowRight, Lock, 
  LogOut, Briefcase, Video, MonitorSmartphone,
  Play, Pause, Volume2, Maximize, FileText, Download,
  Eye, Users
} from 'lucide-react';

export default function AdminTerritorial() {
  const [appState, setAppState] = useState('landing');

  return (
    <div className="w-full h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {appState === 'landing' && <LandingView onNavigate={() => setAppState('login')} />}
      {appState === 'login' && <LoginView onLogin={() => setAppState('dashboard')} onBack={() => setAppState('landing')} />}
      {appState === 'dashboard' && <DashboardAdmin onLogout={() => setAppState('landing')} />}
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
            Una conciliación transparente, conectada y sin barreras. Plataforma integral para la gestión, grabación y cierre inmutable de expedientes laborales.
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
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-black text-[#0A2540]">Acceso Restringido</h2>
          <p className="text-sm text-slate-500 mt-2">Módulo de Administración Territorial</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Correo Electrónico Institucional</label>
            <input 
              type="email" 
              defaultValue="admin.territorial@mintrabajo.gov.co"
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
            {isLoading ? <RefreshCw size={18} className="animate-spin" /> : 'Ingresar a CTLogPlus'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100">
          <button 
            onClick={handleLogin}
            type="button" 
            className="w-full py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2"
          >
            <ShieldCheck size={18} className="text-emerald-600" /> Iniciar Sesión con SSO (Single Sign-On)
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. DASHBOARD MAIN (Admin Territorial)
// ==========================================
function DashboardAdmin({ onLogout }) {
  // Tabs: 'analytics', 'search', 'audit', 'reports'
  const [activeTab, setActiveTab] = useState('analytics'); 
  const [selectedAuditCase, setSelectedAuditCase] = useState(null);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  const handleQuickSearch = (e) => {
    if (e.key === 'Enter' && globalSearchTerm.trim() !== '') {
      setActiveTab('search');
    }
  };

  const handleOpenClosure = (radicado) => {
    setSelectedAuditCase(radicado);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden animate-in fade-in duration-500">
      
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 bg-[#0A2540] text-slate-300 flex flex-col transition-all duration-300 z-20 shrink-0">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-emerald-900/50">
            AT
          </div>
          <div className="hidden lg:flex flex-col ml-3">
            <span className="font-bold text-white text-lg tracking-tight leading-none">CTLogPlus</span>
            <span className="text-[9px] text-emerald-400 uppercase tracking-widest font-semibold mt-0.5">Admin Territorial</span>
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          <NavItem 
            icon={<LayoutDashboard size={20} />} label="Control de Mando" 
            active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} 
          />
          <NavItem 
            icon={<Search size={20} />} label="Búsqueda Expedientes" 
            active={activeTab === 'search'} onClick={() => setActiveTab('search')} 
          />
          <NavItem 
            icon={<CheckSquare size={20} />} label="Gestión Cierres" 
            active={activeTab === 'audit'} onClick={() => setActiveTab('audit')} badge="24"
          />
          <NavItem 
            icon={<BarChart3 size={20} />} label="Reportes" 
            active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} 
          />
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 lg:px-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">CP</span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Carlos Peña</p>
              <p className="text-[10px] text-emerald-400 uppercase tracking-wider truncate">Dir. Territorial</p>
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
              {activeTab === 'analytics' && 'Control de Mando'}
              {activeTab === 'search' && 'Módulo de Búsqueda y Reproducción'}
              {activeTab === 'audit' && 'Gestión Cierres'}
              {activeTab === 'reports' && 'Módulo de Reportes'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Buscador Rápido */}
            <div className="hidden md:flex relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar radicado y presiona Enter..." 
                className="bg-slate-50 border border-slate-200 text-sm rounded-full pl-9 pr-4 py-1.5 focus:outline-none focus:border-[#005FB8] w-64 transition-all" 
                value={globalSearchTerm}
                onChange={(e) => setGlobalSearchTerm(e.target.value)}
                onKeyDown={handleQuickSearch}
              />
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors">
              <Calendar size={14} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-700 hidden sm:block">Este Mes (Mar 2026)</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
          </div>
        </header>

        {/* VIEWS */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8">
          {activeTab === 'analytics' && <AnalyticsView />}
          {activeTab === 'search' && <SearchView initialSearch={globalSearchTerm} onOpenClosure={handleOpenClosure} />}
          {activeTab === 'audit' && <AuditView onSelectCase={setSelectedAuditCase} />}
          {activeTab === 'reports' && <ReportsView />}
        </div>

        {/* SLIDE-OVER DRAWER (AUDIT CHECKLIST) */}
        {selectedAuditCase && (
          <AuditDrawer 
            radicado={selectedAuditCase} 
            onClose={() => setSelectedAuditCase(null)} 
            onSuccess={() => setActiveTab('audit')}
          />
        )}
      </main>
    </div>
  );
}

// ==========================================
// VIEW 1: CONTROL DE MANDO (Analytics)
// ==========================================
function AnalyticsView() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Volumen Operativo</p>
              <h3 className="text-sm font-bold text-slate-700">Total Audiencias</h3>
            </div>
            <div className="p-2 bg-blue-50 text-[#005FB8] rounded-lg"><Activity size={18} /></div>
          </div>
          <div className="flex items-end justify-between z-10">
            <p className="text-4xl font-black text-slate-900">4,892</p>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mb-1">
              <TrendingUp size={14} /> 12%
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-all">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efectividad</p>
            <h3 className="text-sm font-bold text-slate-700 mb-2">Tasa de Conciliación</h3>
            <p className="text-3xl font-black text-slate-900">68.4<span className="text-xl text-slate-500">%</span></p>
            <p className="text-xs text-slate-500 mt-1">Meta MinTrabajo: 60%</p>
          </div>
          <div className="relative w-20 h-20 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
              <path className="text-emerald-500 animate-[dash_1.5s_ease-out_forwards]" strokeDasharray="68.4, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
              <CheckCircle size={20} />
            </div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-3xl p-6 border border-rose-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Riesgo Legal</p>
              <h3 className="text-sm font-bold text-rose-900">Mora Admin. (Promedio)</h3>
            </div>
            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><Clock size={18} /></div>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <p className="text-4xl font-black text-rose-700">18</p>
            <span className="text-sm font-bold text-rose-600">Días</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-rose-600 mt-2 bg-rose-100/50 w-fit px-2 py-1 rounded">
            <AlertCircle size={12} /> Supera límite legal de 15 días
          </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
          <MonitorSmartphone size={20} className="text-[#005FB8]" /> Distribución por Modalidad de Audiencia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Video className="text-[#005FB8]" size={24} />
              <span className="font-bold text-slate-700">Virtual (Teams)</span>
            </div>
            <p className="text-3xl font-black text-slate-900">75%</p>
            <p className="text-xs text-slate-500 mt-1">3,669 audiencias</p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-emerald-600" size={24} />
              <span className="font-bold text-slate-700">Presencial</span>
            </div>
            <p className="text-3xl font-black text-slate-900">15%</p>
            <p className="text-xs text-slate-500 mt-1">733 audiencias</p>
          </div>
          <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="text-amber-500" size={24} />
              <span className="font-bold text-slate-700">Mixta</span>
            </div>
            <p className="text-3xl font-black text-slate-900">10%</p>
            <p className="text-xs text-slate-500 mt-1">490 audiencias</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW 2: MÓDULO BÚSQUEDA Y REPRODUCCIÓN
// ==========================================
function SearchView({ initialSearch, onOpenClosure }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch || 'SC_2026_0885');
  const [hasSearched, setHasSearched] = useState(!!initialSearch);
  const [isPlaying, setIsPlaying] = useState(false);

  // Mock data for the searched case
  const mockCaseData = {
    id: "SC_2026_0885",
    date: "10 Mar 2026",
    status: "Pendiente Cierre", // Esto condiciona la aparición del botón de Cierre
    inspector: "Roberto Méndez (T.14)",
    parties: "Ana M. López vs ABC S.A.S",
    resolution: "Acuerdo Total",
    documents: [
      { name: "PoderFelipeBermudez.pdf", size: "1.2 MB" },
      { name: "Acta_Conciliacion_Firmada.pdf", size: "3.4 MB", badge: "Firmada" },
      { name: "Anexos_Pruebas.zip", size: "15 MB" }
    ]
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      {/* Search Bar Area */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Ingrese Radicado, Cédula o Nombre..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] transition-all" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="px-6 py-3 bg-[#005FB8] text-white font-bold rounded-xl hover:bg-[#0A2540] transition-colors shadow-sm">
            Buscar
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4">
          
          {/* LEFT COL: Reproducción (Video Player) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="font-black text-[#0A2540] flex items-center gap-2">
                  <Video size={18} className="text-[#005FB8]" /> Reproducción: {mockCaseData.id}
                </h3>
                <span className="text-xs text-slate-500 font-mono">{mockCaseData.date}</span>
              </div>
              
              {/* Fake Video Player Wrapper */}
              <div className="bg-slate-900 aspect-video relative flex items-center justify-center group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-slate-600 text-sm font-medium">Grabación Centralizada (Azure WORM)</span>
                </div>
                
                {/* Play Button Overlay */}
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-16 h-16 bg-[#005FB8]/90 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#005FB8] transition-all z-10 shadow-lg"
                >
                  {isPlaying ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>

                {/* Player Controls Bottom Bar */}
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

            {/* Metadatos Auditoría */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
               <h4 className="font-bold text-slate-800 text-sm mb-4">Metadatos de Auditoría</h4>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Plataforma</p>
                    <p className="text-sm font-semibold text-slate-700 mt-1">MS Teams</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Duración</p>
                    <p className="text-sm font-semibold text-slate-700 mt-1">45m 10s</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Hash SHA-256</p>
                    <p className="text-[10px] font-mono text-slate-600 mt-1 truncate">a8f5f167f44f...</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Integridad</p>
                    <p className="text-sm font-semibold text-emerald-600 mt-1 flex items-center gap-1"><CheckCircle size={14} /> Válida</p>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COL: Detalles y Documentos */}
          <div className="space-y-6">
            
            {/* Tarjeta de Resumen Expediente */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-[#0A2540] mb-4">Información del Expediente</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-500">Inspector Asignado</p>
                  <p className="font-semibold text-slate-900">{mockCaseData.inspector}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">Partes Involucradas</p>
                  <p className="font-semibold text-slate-900">{mockCaseData.parties}</p>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-bold text-slate-500">Resultado</p>
                    <span className="inline-flex mt-1 items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded text-xs font-bold">
                      <CheckCircle size={14} /> {mockCaseData.resolution}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500">Estado Actual</p>
                    <span className="inline-flex mt-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs font-bold">
                      {mockCaseData.status}
                    </span>
                  </div>
                </div>

                {/* ACCIÓN CONDICIONAL: Solo si está "Pendiente Cierre" */}
                {mockCaseData.status === 'Pendiente Cierre' && (
                  <button 
                    onClick={() => onOpenClosure(mockCaseData.id)}
                    className="w-full py-3 bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-md hover:bg-[#005FB8] transition-colors flex items-center justify-center gap-2"
                  >
                    <Archive size={16} /> Ir a Gestión de Cierres
                  </button>
                )}
              </div>
            </div>

            {/* Tarjeta de Adjuntos (Documentos) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-black text-[#0A2540] mb-4 flex items-center gap-2">
                <FileText size={18} /> Adjuntos
              </h3>
              
              <div className="space-y-3">
                {mockCaseData.documents.map((doc, idx) => (
                  <div key={idx} className="p-3 border border-slate-100 bg-slate-50 rounded-xl flex items-center justify-between group hover:border-slate-300 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-rose-100 text-rose-600 rounded-lg shrink-0">
                        <FileText size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-700 truncate">{doc.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[10px] text-slate-500">{doc.size}</span>
                          {doc.badge && (
                            <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                              {doc.badge}
                            </span>
                          )}
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
// VIEW 3: GESTIÓN CIERRES 
// ==========================================
function AuditView({ onSelectCase }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-600" /> Bandeja: Solicitudes de Cierre
          </h2>
          <p className="text-sm text-slate-500 mt-1">Expedientes que requieren revisión antes del archivo inmutable (Gestión Cierres).</p>
        </div>
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg hover:bg-slate-100 transition-colors">
            <Filter size={14} /> Filtrar por Estado
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">ID Radicado</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Inspector Solicitante</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Fecha Audiencia</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Estado Sistema</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <AuditTableRow 
                id="SC_2026_0885" inspector="Roberto Méndez (T.14)" date="10 Mar 2026" 
                status="ready" onClick={() => onSelectCase('SC_2026_0885')}
              />
              <AuditTableRow 
                id="SC_2026_0872" inspector="Claudia Ruiz (T.02)" date="09 Mar 2026" 
                status="warning" onClick={() => onSelectCase('SC_2026_0872')}
              />
              <AuditTableRow 
                id="SC_2026_0860" inspector="Roberto Méndez (T.14)" date="08 Mar 2026" 
                status="ready" onClick={() => onSelectCase('SC_2026_0860')}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// VIEW 4: REPORTES 
// ==========================================
function ReportsView() {
  const reports = [
    { title: "Reporte Personalizado", desc: "Genera cruces de variables específicos.", icon: <Settings size={24} /> },
    { title: "Modalidad de Audiencia", desc: "Métricas de atención Virtual, Presencial y Mixta.", icon: <Video size={24} /> },
    { title: "Audiencias Pendientes", desc: "Expedientes agendados y en proceso.", icon: <Clock size={24} /> },
    { title: "Audiencias Celebradas", desc: "Histórico de actas generadas y acuerdos.", icon: <CheckSquare size={24} /> },
    { title: "Pendientes de Cierre", desc: "Casos a la espera de validación de calidad.", icon: <Archive size={24} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4">
      <div className="mb-8">
        <h2 className="text-xl font-black text-[#0A2540]">Centro de Reportes</h2>
        <p className="text-sm text-slate-500 mt-1">Exportación y análisis de datos del sistema CTLogPlus.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-12 h-12 bg-blue-50 text-[#005FB8] rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#005FB8] group-hover:text-white transition-colors">
              {report.icon}
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-2">{report.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{report.desc}</p>
            <div className="flex items-center gap-1 text-xs font-bold text-[#005FB8] uppercase tracking-wider">
              Generar Reporte <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 5. SLIDE-OVER DRAWER (AUDIT CHECKLIST)
// ==========================================
function AuditDrawer({ radicado, onClose, onSuccess }) {
  const [isClosing, setIsClosing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFinalClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        if(onSuccess) onSuccess();
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity animate-in fade-in"
        onClick={onClose}
      ></div>

      <div className="fixed inset-y-0 right-0 w-full md:w-[500px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
        
        <div className="h-20 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Vista Previa - Cierre</p>
            <h3 className="text-lg font-black text-[#0A2540]">{radicado}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        {success ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in-95">
             <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
                <Archive size={40} />
             </div>
             <h2 className="text-2xl font-black text-slate-900 mb-2">Cerrado Exitosamente</h2>
             <p className="text-sm text-slate-500">El expediente ha sido sellado y enviado al archivo inmutable (WORM).</p>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4 border-b border-blue-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs shrink-0">RM</div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase">Inspector Solicitante</p>
                  <p className="font-bold text-slate-900">Roberto Méndez (T.14)</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Partes:</span>
                <span className="font-semibold text-slate-900">Ana M. López vs ABC S.A.S</span>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-slate-600">Resolución:</span>
                <span className="font-semibold text-emerald-600">Acuerdo Total</span>
              </div>
            </div>

            <div>
              <h4 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                <CheckSquare size={18} className="text-[#0A2540]" /> Checklist de Integridad
              </h4>
              <div className="space-y-3">
                <ChecklistItem 
                  title="Grabación de Video (MS Teams)" 
                  desc="Archivo MP4 sincronizado y resguardado en Azure Blob (WORM)." 
                  checked={true} 
                />
                <ChecklistItem 
                  title="Acta Firmada Criptográficamente" 
                  desc="Firma del inspector validada contra la pasarela PKI." 
                  checked={true} 
                />
                <ChecklistItem 
                  title="Log de Auditoría Válido" 
                  desc="Registro de IPs y OTP del ciudadano consistentes." 
                  checked={true} 
                />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Advertencia Legal:</strong> Al ejecutar el <em>Cierre definitivo</em>, el expediente pasa a estado inmutable. Para rechazar la solicitud, use <em>Devolución Inspector</em>.
              </p>
            </div>
          </div>
        )}

        {!success && (
          <div className="p-6 border-t border-slate-200 bg-slate-50 shrink-0 flex flex-col gap-3">
            <button 
              onClick={handleFinalClose}
              disabled={isClosing}
              className="w-full py-3.5 bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-lg hover:bg-[#005FB8] hover:shadow-blue-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isClosing ? (
                <><RefreshCw size={18} className="animate-spin" /> Procesando Cierre...</>
              ) : (
                <><Archive size={18} /> Aprobar Cierre (Inmutable)</>
              )}
            </button>
            <button onClick={onClose} className="w-full py-3 bg-white border border-slate-300 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
               <ArrowRight size={16} className="rotate-180" /> Devolución a Inspector
            </button>
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

const AuditTableRow = ({ id, inspector, date, status, onClick }) => {
  const statusConfig = {
    ready: { label: 'Completo', icon: <CheckCircle size={14} />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    warning: { label: 'Falta Firma', icon: <FileSignature size={14} />, color: 'bg-amber-50 text-amber-700 border-amber-200' },
  };
  const conf = statusConfig[status];

  return (
    <tr className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={onClick}>
      <td className="p-4 border-l-4 border-transparent group-hover:border-[#0A2540]">
        <span className="font-mono text-sm font-bold text-slate-900">{id}</span>
      </td>
      <td className="p-4 text-sm text-slate-600 font-medium">{inspector}</td>
      <td className="p-4 text-sm text-slate-500">{date}</td>
      <td className="p-4">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${conf.color}`}>
          {conf.icon} {conf.label}
        </span>
      </td>
      <td className="p-4 text-right">
        <span className="text-[#005FB8] font-bold text-xs group-hover:underline">Revisar</span>
      </td>
    </tr>
  );
};

const ChecklistItem = ({ title, desc, checked }) => (
  <div className={`p-4 rounded-xl border flex gap-4 transition-colors ${checked ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200'}`}>
    <div className={`mt-0.5 shrink-0 ${checked ? 'text-emerald-500' : 'text-slate-300'}`}>
      <CheckCircle size={20} className={checked ? 'fill-emerald-100' : ''} />
    </div>
    <div>
      <h5 className={`text-sm font-bold ${checked ? 'text-emerald-900' : 'text-slate-700'}`}>{title}</h5>
      <p className={`text-xs mt-1 ${checked ? 'text-emerald-700/80' : 'text-slate-500'}`}>{desc}</p>
    </div>
  </div>
);