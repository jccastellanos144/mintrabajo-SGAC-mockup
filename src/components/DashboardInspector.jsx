import React, { useState, useEffect } from 'react';
import { 
  Home, Inbox, Calendar, BarChart2, Search, 
  MoreVertical, FileText, Video, Lock, 
  MessageSquare, Clock, CheckCircle, AlertCircle, 
  PlayCircle, FileSignature, Video as VideoIcon,
  ChevronRight, RefreshCw, ChevronLeft,
  ShieldCheck, User, Check, FolderOpen, Activity, History,
  Filter, Plus, TrendingUp, AlertTriangle, Clock4, FileWarning, ArrowRight,
  LogOut, Key, FileBadge, X
} from 'lucide-react';

// --- MAIN APP COMPONENT ---
export default function DashboardInspector() {
  const [authState, setAuthState] = useState('landing'); // 'landing', 'login', 'authenticating', 'dashboard'
  const [mainView, setMainView] = useState('inbox'); // 'inbox', 'calendar', 'reports'
  const [isLoading, setIsLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleGoToLogin = () => {
    setAuthState('login');
  };

  const handleLogin = () => {
    setAuthState('authenticating');
    setTimeout(() => {
      setAuthState('dashboard');
      setTimeout(() => setIsLoading(false), 800);
    }, 1500);
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    setMainView('inbox');
    setAuthState('landing');
  };

  if (authState === 'landing') {
    return <PortalLandingView onLoginClick={handleGoToLogin} />;
  }

  if (authState === 'login' || authState === 'authenticating') {
    return <LoginView onLogin={handleLogin} isAuthenticating={authState === 'authenticating'} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800 overflow-hidden animate-in fade-in duration-500">
      {/* SIDEBAR */}
      <aside className="w-20 lg:w-64 bg-[#0A2540] text-slate-300 flex flex-col transition-all duration-300 z-20 shrink-0 relative">
        <div className="h-16 flex items-center justify-center lg:justify-start lg:px-6 border-b border-white/10 shrink-0">
          <div className="w-8 h-8 bg-[#005FB8] rounded-xl flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-blue-900/50">
            SG
          </div>
          <div className="hidden lg:flex flex-col ml-3">
            <span className="font-bold text-white text-lg tracking-tight leading-none">SGAC</span>
            <span className="text-[9px] text-blue-300 uppercase tracking-widest font-semibold mt-0.5">Inspector Workspace</span>
          </div>
        </div>

        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          <NavItem icon={<Home size={20} />} label="Inicio" onClick={() => setMainView('inbox')} />
          <NavItem 
            icon={<Inbox size={20} />} 
            label="Bandeja de Casos" 
            active={mainView === 'inbox'} 
            onClick={() => setMainView('inbox')} 
            badge="12" 
          />
          <NavItem 
            icon={<Calendar size={20} />} 
            label="Audiencias" 
            active={mainView === 'calendar'} 
            onClick={() => setMainView('calendar')} 
          />
          <NavItem 
            icon={<BarChart2 size={20} />} 
            label="Reportes SGAC" 
            active={mainView === 'reports'} 
            onClick={() => setMainView('reports')} 
          />
        </nav>

        {/* USER PROFILE & LOGOUT MENU */}
        <div className="relative p-4 border-t border-white/10">
          {/* Menú Emergente de Sesión */}
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
              <div className="absolute bottom-[calc(100%-10px)] left-4 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Conectado como</p>
                  <p className="text-sm font-bold text-slate-900 truncate">roberto.mendez@mintrabajo.gov.co</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={handleLogout} 
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-rose-600 rounded-xl hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={16} /> Cerrar Sesión Segura
                  </button>
                </div>
              </div>
            </>
          )}

          <div 
            onClick={() => setShowUserMenu(!showUserMenu)} 
            className={`flex items-center gap-3 lg:px-2 cursor-pointer p-2 rounded-xl transition-colors ${showUserMenu ? 'bg-white/10' : 'hover:bg-white/5'}`}
          >
            <div className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-white">RM</span>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold text-white truncate">Roberto Méndez</p>
              <p className="text-[10px] text-blue-400 uppercase tracking-wider truncate">Inspector T. 14</p>
            </div>
            <MoreVertical size={14} className="ml-auto text-slate-500 hidden lg:block" />
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <RefreshCw className="animate-spin text-[#005FB8]" size={32} />
          </div>
        ) : (
          <>
            {mainView === 'inbox' && <WorkspaceInbox />}
            {mainView === 'calendar' && <WorkspaceCalendar />}
            {mainView === 'reports' && <WorkspaceReports />}
          </>
        )}
      </div>
    </div>
  );
}

// ==========================================
// PORTAL LANDING VIEW
// ==========================================

function PortalLandingView({ onLoginClick }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 animate-in fade-in duration-500">
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0A2540] flex items-center justify-center text-white font-black rounded-xl shadow-md text-xs">
              SG
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none text-[#0A2540]">Portal Interno</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Ministerio del Trabajo</span>
            </div>
          </div>
          <button 
            onClick={onLoginClick}
            className="px-5 py-2 bg-[#005FB8] text-white rounded-lg text-sm font-bold hover:bg-[#004a94] transition-colors flex items-center gap-2"
          >
            Iniciar Sesión <ArrowRight size={16} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-6">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#005FB8] rounded-full mix-blend-multiply filter blur-[120px] opacity-5"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#0A2540] rounded-full mix-blend-multiply filter blur-[120px] opacity-5"></div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#005FB8] text-xs font-bold border border-blue-100 rounded-full mb-6">
            <ShieldCheck size={14} /> Acceso Restringido a Funcionarios
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-[#0A2540] tracking-tight mb-6 leading-[1.15]">
            Sistema de Gestión de <br className="hidden md:block" />
            <span className="text-[#005FB8]">Audiencias de Conciliación</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Plataforma centralizada para la gestión, agendamiento y resolución de conflictos laborales. Entorno de trabajo para Inspectores y Coordinadores.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2540] mb-4">
                <Inbox size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Bandeja Centralizada</h3>
              <p className="text-xs text-slate-500">Gestione sus expedientes asignados con control estricto de SLAs y términos legales.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2540] mb-4">
                <Video size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Audiencias Virtuales</h3>
              <p className="text-xs text-slate-500">Integración nativa con Microsoft Teams y generación automática de actas y relatorías.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-[#0A2540] mb-4">
                <Lock size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-2">Seguridad Jurídica</h3>
              <p className="text-xs text-slate-500">Firmas criptográficas y resguardo de documentos en almacenamiento inmutable.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-xs text-slate-400 border-t border-slate-200">
        &copy; {new Date().getFullYear()} Ministerio del Trabajo de Colombia. CTLogPlus.
      </footer>
    </div>
  );
}

// ==========================================
// WORKSPACES (THE 3 MAIN VIEWS)
// ==========================================

function WorkspaceInbox() {
  const [selectedCase, setSelectedCase] = useState('SC_2026_0892');
  const [viewMode, setViewMode] = useState('360');
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  return (
    <>
      <section className={`bg-white border-r border-slate-200 w-full md:w-80 lg:w-96 flex flex-col shrink-0 transition-all duration-300 z-10 ${selectedCase ? 'hidden md:flex' : 'flex'}`}>
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 shrink-0">
          <h2 className="font-bold text-slate-900 text-lg">Bandeja de Entrada</h2>
          <button className="text-slate-400 hover:text-[#005FB8] transition-colors"><RefreshCw size={18} /></button>
        </div>
        
        <div className="p-4 border-b border-slate-100 shrink-0">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
            <input type="text" placeholder="Buscar radicado o CC..." className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#005FB8] focus:ring-1 focus:ring-[#005FB8] transition-all" />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 hide-scrollbar">
            <BadgeFilter label="Todos" active />
            <BadgeFilter label="Subsanación" />
            <BadgeFilter label="Por Confirmar" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="divide-y divide-slate-100">
            <CaseRow 
              radicado="SC_2026_0892" solicitante="Ana María López" estado="Para Agendar" time="Hace 2h" 
              active={selectedCase === 'SC_2026_0892'} onClick={() => { setSelectedCase('SC_2026_0892'); setViewMode('360'); }}
            />
            <CaseRow 
              radicado="SC_2026_0891" solicitante="Carlos Ruiz vs XYZ S.A.S" estado="Por Confirmar" time="Activa" 
              active={selectedCase === 'SC_2026_0891'} onClick={() => { setSelectedCase('SC_2026_0891'); setViewMode('360'); }}
            />
            <CaseRow 
              radicado="SC_2026_0885" solicitante="Sindicato Trabajadores Sur" estado="Verificación Cierre" time="Ayer" 
              active={selectedCase === 'SC_2026_0885'} onClick={() => { setSelectedCase('SC_2026_0885'); setViewMode('360'); }}
            />
             <CaseRow radicado="SC_2026_0870" solicitante="María Fernanda Gómez" estado="Subsanación" time="Ayer" />
          </div>
        </div>
      </section>

      <main className={`flex-1 flex flex-col bg-white min-w-0 transition-all ${!selectedCase ? 'hidden md:flex items-center justify-center bg-slate-50' : 'flex'}`}>
        {!selectedCase ? (
          <div className="text-center text-slate-400 flex flex-col items-center">
            <Inbox size={48} className="mb-4 opacity-20" />
            <p>Seleccione un expediente de la bandeja para ver sus detalles.</p>
          </div>
        ) : (
          <>
            <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 shrink-0 shadow-sm z-10 flex flex-col gap-4 md:flex-row md:items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="md:hidden text-slate-500 bg-slate-100 p-2 rounded-lg" onClick={() => setSelectedCase(null)}>
                  <ChevronLeft size={20} />
                </button>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="font-black text-[#0A2540] text-xl md:text-2xl tracking-tight">{selectedCase}</h1>
                    <span className="px-2.5 py-1 bg-blue-50 text-[#005FB8] text-[10px] font-bold uppercase tracking-wider rounded border border-blue-200">En Reparto</span>
                  </div>
                  <p className="text-sm font-medium text-slate-500 truncate max-w-[250px] sm:max-w-md">Ana María López vs Industrias ABC S.A.S</p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <ActionTooltip text="Dispara Azure Logic App para crear evento en O365">
                  <button className="px-4 py-2 bg-[#5B5FC7]/10 text-[#5B5FC7] border border-[#5B5FC7]/20 rounded-xl text-sm font-bold hover:bg-[#5B5FC7] hover:text-white transition-colors flex items-center gap-2">
                    <VideoIcon size={16} /> Teams
                  </button>
                </ActionTooltip>

                {/* BOTÓN DE FIRMA ACTUALIZADO */}
                <button 
                  onClick={() => setShowSignatureModal(true)} 
                  className="px-4 py-2 bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#005FB8] transition-colors flex items-center gap-2"
                >
                  <Lock size={14} /> Firmar Acta
                </button>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-100 transition-colors">
                    Estado <ChevronRight size={14} className="text-slate-400 rotate-90" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded-xl overflow-hidden hidden group-hover:block z-50">
                    <div className="p-1">
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-lg font-medium">Por Confirmar</button>
                      <button className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-lg font-medium">Requerido (Subsanación)</button>
                      <button className="w-full text-left px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 rounded-lg font-bold border-t border-slate-100 mt-1 pt-2">Verificación de Cierre</button>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            <div className="bg-slate-50 border-b border-slate-200 px-4 md:px-8 py-2 flex items-center gap-2 shrink-0 overflow-x-auto hide-scrollbar">
               <button onClick={() => setViewMode('360')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${viewMode === '360' ? 'bg-white shadow-sm border border-slate-200 text-[#0A2540]' : 'text-slate-500 hover:bg-slate-200/50'}`}>
                 <Activity size={16} /> Vista de Expediente
               </button>
               <button onClick={() => setViewMode('relatoria')} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all flex items-center gap-2 whitespace-nowrap ${viewMode === 'relatoria' ? 'bg-[#005FB8] shadow-sm border border-[#005FB8] text-white' : 'text-slate-500 hover:bg-slate-200/50'}`}>
                 <VideoIcon size={16} /> Sala de Relatoría (IA)
               </button>
            </div>

            <div className="flex-1 overflow-hidden relative">
              {viewMode === '360' ? <View360Tabbed /> : <ViewRelatoria />}
            </div>

            {/* SIGNATURE MODAL */}
            {showSignatureModal && <SignatureModal onClose={() => setShowSignatureModal(false)} radicado={selectedCase} />}
          </>
        )}
      </main>
    </>
  );
}

// ==========================================
// NEW COMPONENT: SECURE SIGNATURE MODAL
// ==========================================
function SignatureModal({ onClose, radicado }) {
  const [pin, setPin] = useState('');
  const [signStatus, setSignStatus] = useState('idle'); // idle, signing, success

  const handleSign = () => {
    if (pin.length < 4) return;
    setSignStatus('signing');
    
    // Simular llamada a Azure KeyVault
    setTimeout(() => {
      setSignStatus('success');
      setTimeout(onClose, 2500); // Cerrar después de mostrar éxito
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-6xl h-[90vh] md:h-[80vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
        
        {/* PANEL IZQUIERDO: Previsualización Obligatoria del Acta */}
        <div className="flex-1 bg-slate-100 flex flex-col border-r border-slate-200">
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <FileBadge size={16} className="text-[#0A2540]" /> Vista Previa del Acta de Conciliación
            </h3>
            <span className="text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
              <AlertCircle size={12} /> Revisión Obligatoria
            </span>
          </div>
          <div className="flex-1 p-6 md:p-10 overflow-y-auto">
            {/* Simulación visual de un documento oficial */}
            <div className="bg-white w-full max-w-2xl mx-auto min-h-full shadow-lg border border-slate-200 p-10 font-serif text-sm text-slate-800 space-y-6">
              <div className="text-center border-b-2 border-slate-900 pb-4 mb-8">
                <h2 className="font-black text-lg">MINISTERIO DEL TRABAJO</h2>
                <p className="font-bold">INSPECCIÓN DE TRABAJO Y SEGURIDAD SOCIAL</p>
                <p>ACTA DE CONCILIACIÓN NO. {radicado}</p>
              </div>
              <p className="text-justify leading-relaxed">
                En la ciudad de Bogotá D.C., a los 12 días del mes de Marzo de 2026, ante el despacho del Inspector de Trabajo asignado, comparecieron de una parte <strong>ANA MARÍA LÓPEZ</strong> en calidad de parte convocante, y de otra parte la entidad <strong>INDUSTRIAS ABC S.A.S.</strong> representada legalmente.
              </p>
              <p className="text-justify leading-relaxed">
                <strong>ACUERDO:</strong> Las partes de manera libre y voluntaria manifiestan que han llegado a un acuerdo conciliatorio total respecto de las pretensiones planteadas, obligándose el convocante al pago de la suma de QUINCE MILLONES DE PESOS ($15.000.000 COP) por concepto de...
              </p>
              <div className="pt-12 mt-12 border-t border-slate-300 flex justify-between">
                <div className="text-center">
                  <div className="w-40 border-b border-slate-400 mb-2"></div>
                  <p className="font-bold text-xs">FIRMA CONVOCANTE</p>
                </div>
                <div className="text-center">
                  <div className="w-40 border-b border-slate-400 mb-2"></div>
                  <p className="font-bold text-xs">FIRMA INSPECTOR</p>
                  <p className="text-[10px] text-rose-600 font-bold mt-1">(Pendiente Estampado Digital)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL DERECHO: Pasarela de Firma Criptográfica */}
        <div className="w-full md:w-[400px] bg-white flex flex-col shrink-0">
          <div className="p-4 border-b border-slate-100 flex justify-end">
            <button onClick={onClose} disabled={signStatus !== 'idle'} className="text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 p-2 rounded-full transition-colors disabled:opacity-50">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-8 flex-1 flex flex-col justify-center">
            {signStatus === 'success' ? (
              <div className="text-center animate-in zoom-in">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-emerald-100">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Acta Firmada Legalmente</h3>
                <p className="text-sm text-slate-500">El hash criptográfico ha sido estampado en el documento PDF y asegurado en Azure Blob Storage.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="w-12 h-12 bg-[#0A2540] text-white rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <Key size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Autorización de Firma</h3>
                  <p className="text-sm text-slate-500">Debe ingresar su PIN del Token PKI para autorizar el sellado digital de este documento.</p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Certificado Detectado</p>
                  <p className="text-sm font-bold text-[#005FB8] truncate">Token ONAC - Roberto Méndez</p>
                  <p className="text-xs text-slate-500">Expira: 24/11/2027</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest">PIN de Seguridad Criptográfica</label>
                    <input 
                      type="password" 
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} // Solo números
                      disabled={signStatus === 'signing'}
                      className="w-full text-center text-3xl tracking-[0.5em] font-mono p-4 border border-slate-200 rounded-2xl focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none bg-slate-50 transition-all" 
                      placeholder="••••"
                      autoFocus
                    />
                  </div>
                  <button 
                    onClick={handleSign}
                    disabled={pin.length < 4 || signStatus === 'signing'}
                    className="w-full py-4 bg-[#0A2540] text-white font-bold text-sm rounded-xl hover:bg-[#005FB8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md relative overflow-hidden"
                  >
                    {signStatus === 'signing' ? (
                      <><RefreshCw size={16} className="animate-spin" /> Conectando con KeyVault...</>
                    ) : (
                      <><FileSignature size={16} /> Estampar Firma Digital</>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-4 leading-relaxed">
                    Al firmar, usted certifica la validez jurídica de esta actuación en el SGAC de acuerdo a la Ley 527 de 1999.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// OTHER WORKSPACES (CALENDAR / REPORTS)
// ==========================================

function WorkspaceCalendar() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden animate-in fade-in">
      <header className="bg-white border-b border-slate-200 px-8 py-6 shrink-0 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="font-black text-[#0A2540] text-2xl tracking-tight">Agenda de Audiencias</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Gestión de salas virtuales y presenciales (CTLogPlus)</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button className="px-4 py-2 text-sm font-bold bg-white shadow-sm text-slate-900 rounded-lg">Semana</button>
            <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 rounded-lg">Mes</button>
          </div>
          <button className="px-4 py-2 bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#005FB8] transition-colors flex items-center gap-2">
            <Plus size={16} /> Nueva Reserva
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden flex flex-col">
          <div className="grid grid-cols-5 border-b border-slate-200 bg-slate-50/50">
            {['Lunes 25', 'Martes 26', 'Miércoles 27', 'Jueves 28', 'Viernes 29'].map((day, i) => (
              <div key={day} className={`p-4 text-center border-slate-200 ${i !== 4 ? 'border-r' : ''}`}>
                <span className={`text-sm font-bold ${i === 2 ? 'text-[#005FB8]' : 'text-slate-600'}`}>{day}</span>
              </div>
            ))}
          </div>
          
          <div className="flex-1 grid grid-cols-5 min-h-[600px] relative">
            <div className="absolute inset-0 grid grid-rows-4 divide-y divide-slate-100 pointer-events-none">
              <div></div><div></div><div></div><div></div>
            </div>

            <div className="border-r border-slate-200 p-2 relative">
              <CalendarEvent id="SC_2026_0800" type="VIRTUAL" time="08:00 AM - 10:00 AM" color="bg-indigo-50 border-indigo-200 text-indigo-800" icon={<VideoIcon size={14} className="text-indigo-600"/>} top="10%" height="20%" />
            </div>
            <div className="border-r border-slate-200 p-2 relative">
              <CalendarEvent id="SC_2026_0815" type="PRESENCIAL" time="10:30 AM - 12:30 PM" color="bg-emerald-50 border-emerald-200 text-emerald-800" icon={<User size={14} className="text-emerald-600"/>} top="30%" height="20%" />
            </div>
            <div className="border-r border-slate-200 p-2 relative bg-blue-50/20">
              <CalendarEvent id="SC_2026_0891" type="VIRTUAL" time="02:00 PM - 04:00 PM" color="bg-[#5B5FC7]/10 border-[#5B5FC7]/30 text-[#5B5FC7]" icon={<VideoIcon size={14} className="text-[#5B5FC7]"/>} top="60%" height="20%" active />
            </div>
            <div className="border-r border-slate-200 p-2 relative"></div>
            <div className="p-2 relative">
              <CalendarEvent id="SC_2026_0905" type="VIRTUAL" time="09:00 AM - 11:00 AM" color="bg-slate-100 border-slate-300 text-slate-700" icon={<VideoIcon size={14} className="text-slate-500"/>} top="15%" height="20%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkspaceReports() {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden animate-in fade-in">
      <header className="bg-white border-b border-slate-200 px-8 py-6 shrink-0 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="font-black text-[#0A2540] text-2xl tracking-tight">Reportes y Analítica</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Métricas de gestión y estados procesales SGAC</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <Filter size={16} /> Filtros
          </button>
          <button className="px-4 py-2 bg-[#0A2540] text-white rounded-xl text-sm font-bold shadow-sm hover:bg-[#005FB8] transition-colors flex items-center gap-2">
            Exportar Informe
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard title="Para Agendar" value="42" trend="+5 esta semana" trendUp={false} icon={<Clock4 size={24} className="text-blue-600" />} color="bg-blue-50 border-blue-100" />
            <StatCard title="Requerido (Subsanación)" value="18" trend="-2 desde ayer" trendUp={true} icon={<FileWarning size={24} className="text-amber-600" />} color="bg-amber-50 border-amber-100" />
            <StatCard title="Verificación de Cierre" value="24" trend="Pendiente revisión Adm." trendUp={null} icon={<ShieldCheck size={24} className="text-[#0A2540]" />} color="bg-slate-100 border-slate-200" />
            <StatCard title="Tasa de Conciliación" value="68%" trend="+12% vs mes anterior" trendUp={true} icon={<TrendingUp size={24} className="text-emerald-600" />} color="bg-emerald-50 border-emerald-100" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Volumen de Audiencias por Estado</h3>
              <div className="flex-1 flex items-end gap-4 h-64 border-b border-slate-100 pb-4 relative">
                 <div className="absolute left-0 top-0 bottom-4 flex flex-col justify-between text-[10px] font-bold text-slate-400">
                    <span>100</span><span>75</span><span>50</span><span>25</span>
                 </div>
                 <div className="w-full flex justify-around items-end pl-6 h-full">
                    <div className="w-16 bg-blue-400 rounded-t-xl h-[80%] relative group cursor-pointer hover:bg-blue-500 transition-colors"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded">80</div></div>
                    <div className="w-16 bg-amber-400 rounded-t-xl h-[40%] relative group cursor-pointer hover:bg-amber-500 transition-colors"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded">40</div></div>
                    <div className="w-16 bg-emerald-400 rounded-t-xl h-[65%] relative group cursor-pointer hover:bg-emerald-500 transition-colors"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded">65</div></div>
                    <div className="w-16 bg-slate-300 rounded-t-xl h-[15%] relative group cursor-pointer hover:bg-slate-400 transition-colors"><div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded">15</div></div>
                 </div>
              </div>
              <div className="flex justify-around pl-6 pt-4 text-xs font-bold text-slate-500">
                <span>Finalizado</span>
                <span>Por Confirmar</span>
                <span>En Reparto</span>
                <span>Devolución</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" /> Alertas de SLA
              </h3>
              <div className="space-y-4">
                <SlaAlert radicado="SC_2026_0102" desc="Vencimiento de términos (Subsanación)" days="1 día" critical />
                <SlaAlert radicado="SC_2026_0334" desc="Falta firma del inspector (Acta Final)" days="2 días" />
                <SlaAlert radicado="SC_2026_0445" desc="Audiencia sin abrir en MS Teams" days="Hoy" critical />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-VIEWS (LOGIN / TABS / RELATORIA)
// ==========================================

function LoginView({ onLogin, isAuthenticating }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#005FB8] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#0A2540] rounded-full mix-blend-multiply filter blur-[100px] opacity-10"></div>

      <div className="w-full max-w-md bg-white border border-slate-200 shadow-2xl rounded-3xl p-8 md:p-10 relative z-10 animate-in zoom-in-95 duration-500">
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#0A2540] rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-6 shadow-lg shadow-blue-900/20">
            SG
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Acceso a Funcionarios</h1>
          <p className="text-sm text-slate-500">Sistema de Gestión de Audiencias de Conciliación</p>
        </div>

        <div className="space-y-6">
          <button 
            onClick={onLogin}
            disabled={isAuthenticating}
            className="w-full py-4 px-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3 relative disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {isAuthenticating ? (
              <><RefreshCw className="animate-spin text-[#005FB8]" size={20} /> Autenticando en Azure...</>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-0.5 w-5 h-5 shrink-0 group-hover:scale-110 transition-transform">
                  <div className="bg-[#F25022]"></div><div className="bg-[#7FBA00]"></div>
                  <div className="bg-[#00A4EF]"></div><div className="bg-[#FFB900]"></div>
                </div>
                Ingresar con Microsoft Entra ID
              </>
            )}
          </button>

          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-[#0A2540]">
            <ShieldCheck className="shrink-0 text-[#005FB8]" size={20} />
            <div className="text-xs font-medium leading-relaxed">
              El acceso a esta plataforma está restringido a funcionarios autorizados del Ministerio del Trabajo. Todo acceso es auditado.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function View360Tabbed() {
  const [detailTab, setDetailTab] = useState('feed'); 

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <div className="flex border-b border-slate-200 px-4 md:px-8 shrink-0 overflow-x-auto hide-scrollbar">
        <button 
          onClick={() => setDetailTab('feed')} 
          className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${detailTab === 'feed' ? 'border-[#005FB8] text-[#005FB8]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <History size={16} /> Historial y Actividad
        </button>
        <button 
          onClick={() => setDetailTab('docs')} 
          className={`px-6 py-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${detailTab === 'docs' ? 'border-[#005FB8] text-[#005FB8]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
        >
          <FolderOpen size={16} /> Expediente Digital
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {detailTab === 'feed' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Registro de Actuaciones</h3>
                <p className="text-xs text-slate-500">Historial inmutable del expediente.</p>
              </div>
              <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2 shadow-sm">
                <MessageSquare size={14} /> Añadir Nota Interna
              </button>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
              <FeedItem 
                type="system" icon={<ShieldCheck size={16} className="text-emerald-600" />} iconBg="bg-emerald-100 border-emerald-200"
                title="Radicación Completada (Validación Automática)" desc="El sistema verificó la integridad de los documentos subidos." time="12 Mar, 09:30 AM"
              />
              <FeedItem 
                type="user" icon={<User size={16} className="text-slate-600" />} iconBg="bg-slate-100 border-slate-300"
                title="Solicitud ingresada por ciudadano" desc="Ana María López inició el trámite desde Portal Web SGAC." time="12 Mar, 09:25 AM"
              />
              <FeedItem 
                type="note" icon={<MessageSquare size={16} className="text-[#0A2540]" />} iconBg="bg-blue-50 border-blue-200"
                title="Nota Interna: Asignación" desc="Expediente revisado preliminarmente. Cumple requisitos, pendiente agendar citación con la empresa." author="Roberto Méndez" time="12 Mar, 11:15 AM"
              />
            </div>
          </div>
        )}

        {detailTab === 'docs' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <User size={16} className="text-[#005FB8]"/> Documentos Aportados
                </h3>
                <div className="space-y-3">
                  <FileItem name="CC_Solicitante.pdf" type="pdf" isWORM date="12/03/2026" size="2.1 MB" />
                  <FileItem name="Contrato_Laboral_Firmado.pdf" type="pdf" isWORM date="12/03/2026" size="5.4 MB" />
                  <FileItem name="Comprobantes_Pago.pdf" type="pdf" isWORM date="12/03/2026" size="1.1 MB" />
                </div>
              </div>
              <div>
                 <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-200 pb-2">
                  <ShieldCheck size={16} className="text-[#0A2540]"/> Actuaciones de Inspección
                </h3>
                <div className="space-y-3">
                  <FileItem name="Auto_Admisorio_01.pdf" type="pdf" isSystem date="12/03/2026" size="120 KB" />
                  <div className="p-6 bg-slate-50 border border-slate-200 border-dashed rounded-xl flex flex-col items-center text-center">
                    <FileSignature size={24} className="text-slate-300 mb-2" />
                    <p className="text-xs font-bold text-slate-500 mb-1">Aún no hay actas generadas</p>
                    <p className="text-[10px] text-slate-400">Use el botón "Firmar Acta" en la barra superior para generar una.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ViewRelatoria() {
  return (
    <div className="flex h-full overflow-hidden flex-col md:flex-row bg-[#050B14]"> 
      <div className="flex-1 flex flex-col relative">
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-4xl aspect-video bg-black rounded-2xl shadow-2xl border border-slate-800 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMxMTEiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM1NTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BenVyZSBNZWRpYSBTZXJ2aWNlcyBTdHJlYW08L3RleHQ+PC9zdmc+')] bg-cover bg-center opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="text-white/80 hover:text-white hover:scale-110 transition-all bg-black/50 rounded-full backdrop-blur-sm">
                <PlayCircle size={64} strokeWidth={1} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="h-1.5 w-full bg-slate-700 rounded-full mb-3 cursor-pointer relative">
                <div className="h-full bg-blue-500 rounded-full w-1/3 relative">
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
                </div>
              </div>
              <div className="flex items-center justify-between text-white text-xs font-mono">
                <span>12:30 / 45:00</span>
                <div className="flex gap-4"><button>CC</button><button>⚙️</button><button>🔲</button></div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-24 bg-[#0A1628] border-t border-slate-800 p-4 flex items-center gap-3 overflow-x-auto hide-scrollbar shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 shrink-0">Hitos:</span>
          <TimestampButton time="00:15" label="Apertura y Reglas" active />
          <TimestampButton time="12:30" label="Intervención Solicitante" />
          <TimestampButton time="28:45" label="Acuerdo Parcial" color="text-emerald-400 border-emerald-900 bg-emerald-900/20" />
          <TimestampButton time="44:00" label="Cierre de Audiencia" />
        </div>
      </div>
      <div className="w-full md:w-80 lg:w-96 bg-[#0A1628] border-l border-slate-800 flex flex-col shrink-0">
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 shrink-0">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            Transcripción AI <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
          </h3>
          <ActionTooltip text="Azure Cognitive Services: Speech-to-Text en tiempo real">
            <span className="text-[10px] bg-blue-900/30 text-blue-400 px-2 py-1 rounded border border-blue-800">Powered by Azure</span>
          </ActionTooltip>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <TranscriptLine speaker="Inspector" time="12:28" text="Tiene la palabra la parte convocante, por favor exponga sus pretensiones de manera concisa." />
          <TranscriptLine speaker="Solicitante" time="12:30" text="Gracias señor inspector. Como consta en los documentos aportados, laboré para la empresa desde enero..." active />
          <TranscriptLine speaker="Representante" time="13:10" text="Si me permite la palabra. La empresa reconoce el vínculo, sin embargo, hubo un error contable que..." />
        </div>
        <div className="p-4 border-t border-slate-800 bg-[#050B14]">
           <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-slate-500" />
            <input type="text" placeholder="Buscar en la transcripción..." className="w-full bg-[#0A1628] border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// REUSABLE MICRO-COMPONENTS
// ==========================================

const NavItem = ({ icon, label, active, badge, tooltip, onClick }) => (
  <div className="group relative">
    <button onClick={onClick} className={`w-full flex items-center justify-center lg:justify-start gap-3 p-3 rounded-xl transition-all ${active ? 'bg-[#005FB8] text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
      {icon}
      <span className="font-semibold text-sm hidden lg:block">{label}</span>
      {badge && <span className="hidden lg:flex ml-auto bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-slate-800 text-xs text-white rounded hidden group-hover:block z-50 whitespace-nowrap shadow-xl border border-slate-700">
      {tooltip || label}
    </div>
  </div>
);

const BadgeFilter = ({ label, active }) => (
  <button className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${active ? 'bg-[#0A2540] text-white border-[#0A2540] shadow-sm' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}>
    {label}
  </button>
);

const CaseRow = ({ radicado, solicitante, estado, time, active, onClick }) => {
  const statusColors = {
    'Para Agendar': 'bg-blue-50 text-[#005FB8] border-blue-200',
    'En Audiencia': 'bg-amber-50 text-amber-700 border-amber-200',
    'Verificación Cierre': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Subsanación': 'bg-rose-50 text-rose-700 border-rose-200',
    'Por Confirmar': 'bg-slate-100 text-slate-700 border-slate-300'
  };

  return (
    <div onClick={onClick} className={`p-4 cursor-pointer border-l-4 transition-all hover:bg-white ${active ? 'border-l-[#0A2540] bg-white shadow-sm' : 'border-l-transparent'}`}>
      <div className="flex justify-between items-start mb-1">
        <span className="font-mono text-sm font-bold text-slate-900">{radicado}</span>
        <span className="text-[10px] text-slate-400 font-medium">{time}</span>
      </div>
      <p className="text-xs text-slate-600 truncate mb-3">{solicitante}</p>
      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${statusColors[estado] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
        {estado}
      </span>
    </div>
  );
};

const FileItem = ({ name, type, isWORM, isSystem, date, size }) => (
  <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-[#005FB8] hover:shadow-md transition-all cursor-pointer group">
    <div className="flex items-center gap-3 overflow-hidden">
      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors">
        {type === 'pdf' ? <FileText size={18} className="text-red-500" /> : <Video size={18} className="text-blue-500" />}
      </div>
      <div className="flex flex-col">
        <span className="text-sm text-slate-900 truncate font-bold group-hover:text-[#005FB8] transition-colors">{name}</span>
        <span className="text-[10px] text-slate-500 font-medium mt-0.5">{date} • {size}</span>
      </div>
    </div>
    <div className="flex items-center gap-2">
      {isWORM && (
        <ActionTooltip text="Archivo en estado WORM (Inmutable en Azure Blob)">
          <div className="bg-emerald-50 p-1.5 rounded-md border border-emerald-100">
            <Lock size={14} className="text-emerald-600" />
          </div>
        </ActionTooltip>
      )}
      {isSystem && (
        <ActionTooltip text="Generado automáticamente por el SGAC">
          <div className="bg-slate-100 p-1.5 rounded-md border border-slate-200">
            <ShieldCheck size={14} className="text-[#0A2540]" />
          </div>
        </ActionTooltip>
      )}
    </div>
  </div>
);

const FeedItem = ({ icon, iconBg, title, desc, time, author }) => (
  <div className="relative z-10 md:flex items-start gap-4 mb-6 group">
    <div className="hidden md:flex flex-col items-end w-24 shrink-0 pt-1">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{time.split(',')[0]}</span>
      <span className="text-[10px] text-slate-400">{time.split(',')[1]}</span>
    </div>
    
    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 z-10 mx-auto md:mx-0 mb-2 md:mb-0 ${iconBg}`}>
      {icon}
    </div>

    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex-1 ml-4 md:ml-0 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-1.5">
        <h4 className="font-bold text-slate-900 text-sm">{title}</h4>
        <span className="text-[10px] font-bold text-slate-400 md:hidden bg-slate-50 px-2 py-1 rounded">{time}</span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
      {author && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
          <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-600">RM</div>
          <span className="text-xs text-slate-500 font-bold">{author}</span>
        </div>
      )}
    </div>
  </div>
);

const TimestampButton = ({ time, label, active, color }) => (
  <button className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border shrink-0 transition-colors text-xs font-semibold ${active ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/50' : color || 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}>
    <span className="opacity-70 font-mono">{time}</span>
    {label}
  </button>
);

const TranscriptLine = ({ speaker, time, text, active }) => (
  <div className={`p-3 rounded-xl transition-colors cursor-pointer border ${active ? 'bg-blue-900/20 border-blue-800/50' : 'bg-transparent border-transparent hover:bg-slate-800/50'}`}>
    <div className="flex items-center gap-2 mb-1">
      <span className={`text-[10px] font-bold uppercase tracking-wider ${speaker === 'Inspector' ? 'text-blue-400' : 'text-slate-400'}`}>{speaker}</span>
      <span className="text-[10px] font-mono text-slate-600">{time}</span>
    </div>
    <p className={`text-sm leading-relaxed ${active ? 'text-white font-medium' : 'text-slate-300'}`}>{text}</p>
  </div>
);

const ActionTooltip = ({ children, text }) => {
  if (!text) return <>{children}</>;
  return (
    <div className="relative group inline-block w-full sm:w-auto">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-[10px] font-bold rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 shadow-xl border border-slate-700 pointer-events-none">
        {text}
        <svg className="absolute text-slate-900 h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
      </div>
    </div>
  );
};

const CalendarEvent = ({ id, type, time, color, icon, top, height, active }) => (
  <div 
    className={`absolute left-2 right-2 rounded-xl p-3 shadow-sm border flex flex-col gap-1 cursor-pointer transition-all hover:scale-[1.02] ${color} ${active ? 'ring-2 ring-blue-500 shadow-md' : ''}`}
    style={{ top, height }}
  >
    <div className="flex items-center justify-between">
      <span className="font-mono text-xs font-bold">{id}</span>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">{type}</span>
    <span className="text-[10px] font-medium mt-auto">{time}</span>
  </div>
);

const StatCard = ({ title, value, trend, trendUp, icon, color }) => (
  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
    <div className="flex items-start justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${color}`}>
        {icon}
      </div>
    </div>
    <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
    <p className="text-3xl font-black text-slate-900 mb-2">{value}</p>
    <div className="flex items-center gap-1 text-xs font-medium">
      {trendUp === true && <TrendingUp size={14} className="text-emerald-500" />}
      {trendUp === false && <TrendingUp size={14} className="text-rose-500 rotate-180" />}
      <span className={trendUp === true ? 'text-emerald-600' : trendUp === false ? 'text-rose-600' : 'text-slate-500'}>{trend}</span>
    </div>
  </div>
);

const SlaAlert = ({ radicado, desc, days, critical }) => (
  <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${critical ? 'bg-rose-500 animate-pulse' : 'bg-amber-400'}`}></div>
    <div>
      <div className="flex justify-between items-center mb-1 w-full gap-4">
        <span className="font-mono text-xs font-bold text-slate-900">{radicado}</span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${critical ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{days}</span>
      </div>
      <p className="text-xs text-slate-600">{desc}</p>
    </div>
  </div>
);

