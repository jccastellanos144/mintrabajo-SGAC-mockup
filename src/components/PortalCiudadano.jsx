import React, { useState, useEffect } from 'react';
import { 
  FileText, Search, UploadCloud, CheckCircle, 
  Clock, ShieldCheck, Loader2, ArrowRight, 
  X, Check, AlertCircle, FileSignature, ChevronRight, Upload, MessageSquare,
  Download, FileCheck, Building2, User, HelpCircle, XCircle, Monitor, Info
} from 'lucide-react';

const PortalCiudadano = () => {
  const [view, setView] = useState('landing'); // landing, wizard, dashboard
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigateTo = (targetView) => {
    setIsLoading(true);
    setTimeout(() => {
      setView(targetView);
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 relative overflow-hidden font-sans">
      {/* Header Corporativo */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-10 h-10 bg-[#0A2540] flex items-center justify-center text-white font-black rounded-xl shadow-md text-xs tracking-tighter">
              SGAC
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none">SGAC</span>
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Sistema Gestión de Audiencias</span>
            </div>
          </div>
          <div className="hidden md:flex text-sm font-semibold text-slate-600 items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
            <ShieldCheck size={16} className="text-[#005FB8]" />
            Ministerio del Trabajo
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        {isLoading && view !== 'landing' ? (
          <SkeletonScreen />
        ) : (
          <>
            {view === 'landing' && <LandingView onNew={() => navigateTo('wizard')} onCheck={() => setShowOTP(true)} />}
            {view === 'wizard' && <WizardView onComplete={() => navigateTo('dashboard')} onCancel={() => setView('landing')} />}
            {view === 'dashboard' && <DashboardView />}
          </>
        )}
      </main>

      {/* OTP Modal */}
      {showOTP && (
        <OTPModal 
          onClose={() => setShowOTP(false)} 
          onSuccess={() => {
            setShowOTP(false);
            navigateTo('dashboard');
          }} 
        />
      )}

      {/* Chatbot flotante */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#0A2540] text-white p-4 rounded-full shadow-2xl hover:bg-[#005FB8] hover:-translate-y-1 transition-all flex items-center justify-center group ring-4 ring-slate-900/5">
          <MessageSquare size={24} />
          <span className="absolute -top-12 right-0 bg-[#0A2540] text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Asistencia SGAC
            <svg className="absolute text-[#0A2540] h-2 w-full left-0 top-full" x="0px" y="0px" viewBox="0 0 255 255"><polygon className="fill-current" points="0,0 127.5,127.5 255,0"/></svg>
          </span>
        </button>
      </div>
    </div>
  );
};

/* =========================================
   1. LANDING PAGE
   ========================================= */
const LandingView = ({ onNew, onCheck }) => (
  <div className="flex flex-col animate-in fade-in duration-700 w-full relative pt-10">
    <div className="flex flex-col md:flex-row items-center justify-between gap-16 w-full mb-24 relative z-10">
      
      {/* Hero Text */}
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-[#005FB8] text-sm font-bold border border-blue-100 rounded-full mb-8 shadow-sm">
          PLATAFORMA OFICIAL
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#0A2540] mb-6 leading-[1.15]">
          Sistema Gestión de <br />
          <span className="text-[#005FB8]">Audiencias de Conciliación.</span>
        </h1>
        <p className="text-lg text-slate-500 mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed font-medium">
          Radique y haga seguimiento a sus solicitudes de conciliación laboral (SGAC). Proceso estrictamente digital, gratuito y con validez jurídica.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
           <button onClick={onNew} className="px-8 py-4 bg-[#0A2540] text-white rounded-2xl font-bold shadow-lg shadow-[#0A2540]/20 hover:bg-[#005FB8] hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
             Iniciar Radicación <ArrowRight size={18} />
           </button>
           <button onClick={onCheck} className="px-8 py-4 bg-white text-[#0A2540] border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
             Consultar Caso
           </button>
        </div>
      </div>

      {/* Hero Overlapping Cards */}
      <div className="flex-1 relative w-full flex justify-center md:justify-end">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 rounded-[3rem] transform rotate-3 scale-105 shadow-inner"></div>
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl relative z-10 border border-slate-100 flex flex-col gap-4">
            
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl hover:-translate-y-1 transition-transform border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#0A2540]">
                 <FileText size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Trámite Digital</h4>
                <p className="text-xs text-slate-500 font-medium">Carga segura de documentos</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl ml-8 hover:-translate-y-1 transition-transform border border-slate-100">
              <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-[#005FB8]">
                 <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Seguimiento Real</h4>
                <p className="text-xs text-slate-500 font-medium">Trazabilidad del proceso</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#0A2540] p-4 rounded-2xl hover:-translate-y-1 transition-transform shadow-md">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-white">
                 <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm uppercase tracking-wide">Validez Jurídica</h4>
                <p className="text-xs text-slate-300 font-medium">Actas con mérito ejecutivo</p>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg z-20 flex items-center gap-3 border border-slate-100">
            <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-[#005FB8] font-bold">
              <Check size={20} />
            </div>
            <div className="text-sm font-bold text-slate-800 leading-tight">Servicio<br/><span className="text-xs text-slate-500 font-medium">100% Gratuito</span></div>
          </div>
        </div>
      </div>
    </div>

    {/* Features section */}
    <div className="grid md:grid-cols-3 gap-8 w-full relative z-10 text-center">
       <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-20 h-20 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-[#0A2540] mb-6 border border-slate-100">
            <User size={32} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-3 uppercase tracking-wide">Acceso Ciudadano</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Autogestión de solicitudes sin intermediarios ni desplazamientos a sedes físicas.</p>
       </div>
       
       <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-20 h-20 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-[#005FB8] mb-6 border border-slate-100">
            <UploadCloud size={32} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-3 uppercase tracking-wide">Carga Documental</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Sistema de validación de pruebas y anexos con escaneo de seguridad en la nube.</p>
       </div>

       <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div className="w-20 h-20 mx-auto bg-[#0A2540] rounded-2xl flex items-center justify-center text-white mb-6 shadow-md">
            <FileSignature size={32} strokeWidth={1.5} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-3 uppercase tracking-wide">Trazabilidad</h3>
          <p className="text-slate-500 text-sm leading-relaxed">Seguimiento de estados procesales y generación automática de constancias oficiales.</p>
       </div>
    </div>
  </div>
);

/* =========================================
   2. WIZARD DE RADICACIÓN
   ========================================= */
const WizardView = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(0); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados específicos
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedNotif, setAgreedNotif] = useState(false);
  const [hasLawyer, setHasLawyer] = useState(false);
  const [convocadoType, setConvocadoType] = useState('empresa');
  
  // Novedad: Cuantía y Reglas
  const [cuantiaIndeterminada, setCuantiaIndeterminada] = useState(false);
  const [showRules, setShowRules] = useState(false);

  // Novedad: Simulación Azure Upload
  const [uploadState, setUploadState] = useState({
    id: { status: 'idle', progress: 0 },
    pruebas: { status: 'idle', progress: 0 },
    poder: { status: 'idle', progress: 0 }
  });

  const handleUpload = (docKey) => {
    setUploadState(prev => ({ ...prev, [docKey]: { status: 'uploading', progress: 0 } }));
    
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 25;
      if (p >= 100) {
        clearInterval(interval);
        setUploadState(prev => ({ ...prev, [docKey]: { status: 'scanning', progress: 100 } }));
        
        setTimeout(() => {
          setUploadState(prev => ({ ...prev, [docKey]: { status: 'success', progress: 100 } }));
        }, 1500);
      } else {
        setUploadState(prev => ({ ...prev, [docKey]: { status: 'uploading', progress: Math.min(p, 99) } }));
      }
    }, 400);
  };

  const nextStep = () => setStep(s => Math.min(6, s + 1));
  const prevStep = () => setStep(s => Math.max(0, s - 1));

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(6);
    }, 2000);
  };

  const stepTitles = ['Autorización', 'Solicitante', 'Convocado', 'Pretensiones', 'Documentos', 'Resumen'];

  if (step === 6) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-slate-200 shadow-xl rounded-3xl p-12 text-center animate-in zoom-in-95">
        <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-emerald-100">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Radicación Exitosa</h2>
        <p className="text-slate-600 mb-8 border-b border-slate-100 pb-8 text-sm">
          Su solicitud ha sido registrada en el SGAC. Se ha enviado un correo electrónico con su número de radicado y las instrucciones para el seguimiento.
        </p>
        
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-10 w-full inline-block">
          <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Número de Radicado Oficial</span>
          <span className="block text-3xl font-mono font-bold text-[#0A2540] tracking-wider">SC_2026_0892</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="py-4 px-6 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm">
            <Download size={18} /> Descargar PDF
          </button>
          <button onClick={onComplete} className="py-4 px-6 bg-[#0A2540] text-white rounded-xl font-bold hover:bg-[#005FB8] transition-colors flex items-center justify-center gap-2 shadow-md text-sm">
            Ir a mi Tablero <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden animate-in fade-in">
      
      {/* HEADER: Stepper */}
      <div className="bg-slate-50 border-b border-slate-200 p-8 hidden md:block">
        <div className="flex items-center justify-between relative max-w-4xl mx-auto">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 z-0 rounded-full"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#0A2540] z-0 transition-all duration-500 rounded-full" style={{ width: `${(step / 5) * 100}%` }}></div>
          
          {stepTitles.map((label, idx) => {
            const isActive = step === idx;
            const isPast = step > idx;
            return (
              <div key={label} className="relative z-10 flex flex-col items-center bg-slate-50 px-4">
                <div className={`w-10 h-10 flex items-center justify-center text-sm font-bold border-[3px] rounded-full transition-all duration-300 ${
                  isActive ? 'border-[#0A2540] bg-[#0A2540] text-white scale-110' : 
                  isPast ? 'border-[#0A2540] bg-white text-[#0A2540]' : 
                  'border-slate-300 bg-white text-slate-400'
                }`}>
                  {isPast ? <Check size={18} strokeWidth={3} /> : (idx + 1)}
                </div>
                <span className={`text-[10px] font-bold tracking-widest uppercase mt-4 absolute -bottom-6 whitespace-nowrap ${isActive ? 'text-[#0A2540]' : isPast ? 'text-slate-600' : 'text-slate-400'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* BODY: Step Content */}
      <div className="p-6 md:p-10 min-h-[400px]">
        
        {/* Paso 0: Autorización Ley 1581 (Solo Privacidad, sin reglas técnicas) */}
        {step === 0 && (
          <div className="space-y-6 animate-in slide-in-from-right-4">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-black mb-2 text-slate-900">Autorización de Tratamiento de Datos</h2>
              <p className="text-slate-500 text-sm">Sección 3.1 - Por favor lea y acepte las políticas de privacidad para continuar.</p>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-[#005FB8]" size={20} />
                  <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">Ley Estatutaria 1581 de 2012</h3>
                </div>
              </div>
              
              <div className="p-6 text-sm text-slate-700 space-y-4 leading-relaxed">
                <p>El Ministerio del Trabajo le informa que sus datos personales serán tratados exclusivamente para las siguientes finalidades:</p>
                <ul className="list-disc pl-6 space-y-2 marker:text-slate-400">
                  <li>Adelantar los trámites y servicios de conciliación solicitados.</li>
                  <li>Notificarle sobre el estado de su proceso y remitir citaciones oficiales.</li>
                  <li>Fines estadísticos gubernamentales (SGAC y SISPRO).</li>
                </ul>
                <p className="text-xs text-slate-500 mt-4">Usted tiene derecho a conocer, actualizar, rectificar y solicitar prueba de esta autorización a través de los canales de atención del Ministerio.</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-4 p-4 cursor-pointer hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 border-slate-300 rounded text-[#005FB8] focus:ring-[#005FB8]" checked={agreedTerms} onChange={(e) => setAgreedTerms(e.target.checked)} />
                <span className="text-slate-800 font-medium text-sm">
                  Autorizo expresa e irrevocablemente el tratamiento de mis datos personales según la normatividad vigente.
                </span>
              </label>
              <label className="flex items-start gap-4 p-4 cursor-pointer hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 border-slate-300 rounded text-[#005FB8] focus:ring-[#005FB8]" checked={agreedNotif} onChange={(e) => setAgreedNotif(e.target.checked)} />
                <span className="text-slate-800 font-medium text-sm">
                  Acepto recibir notificaciones, citaciones y alertas sobre este trámite vía correo electrónico y/o SMS.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Paso 1: Solicitante */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-black mb-2 text-slate-900">Identificación del Convocante</h2>
              <p className="text-slate-500 text-sm">Datos de la persona que inicia la solicitud (Usted).</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo de Persona</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all bg-white">
                    <option value="natural">Persona Natural (Trabajador)</option>
                    <option value="juridica">Persona Jurídica (Empleador)</option>
                  </select>
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tipo de Documento</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all bg-white">
                    <option>Cédula de Ciudadanía (CC)</option>
                    <option>Cédula de Extranjería (CE)</option>
                    <option>Permiso de Protección Temporal (PPT)</option>
                  </select>
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Número de Documento</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all" placeholder="Ej. 1020304050" />
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fecha de Expedición</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all text-slate-700" />
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nombres</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all" placeholder="Nombres" />
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Apellidos</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all" placeholder="Apellidos" />
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Teléfono Móvil</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all" placeholder="300 000 0000" />
                </div>

                <div className="col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Correo Electrónico</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none transition-all" placeholder="correo@ejemplo.com" />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Representación Legal</p>
                  <p className="text-sm text-slate-500">¿Actúa a través de abogado o apoderado?</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button onClick={() => setHasLawyer(false)} className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${!hasLawyer ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>NO</button>
                  <button onClick={() => setHasLawyer(true)} className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${hasLawyer ? 'bg-[#0A2540] text-white shadow-sm' : 'text-slate-500'}`}>SÍ</button>
                </div>
              </div>

              {hasLawyer && (
                <div className="mt-6 p-6 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-2 gap-6 animate-in fade-in">
                   <div className="col-span-2 md:col-span-1 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Nombre del Abogado</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none" placeholder="Nombre completo" />
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tarjeta Profesional</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none" placeholder="Número TP" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Paso 2: Convocado (Con campos de Representante y Dirección) */}
        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="border-b border-slate-100 pb-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h2 className="text-2xl font-black mb-2 text-slate-900">Identificación del Convocado</h2>
                <p className="text-slate-500 text-sm">Información de la contraparte a citar.</p>
              </div>
              <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button onClick={() => setConvocadoType('empresa')} className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${convocadoType === 'empresa' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Empresa</button>
                  <button onClick={() => setConvocadoType('persona')} className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${convocadoType === 'persona' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'}`}>Persona Natural</button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-6">
                
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{convocadoType === 'empresa' ? 'Razón Social' : 'Nombre Completo'}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none transition-colors" placeholder={convocadoType === 'empresa' ? "Ej. Industrias ABC S.A.S" : "Nombre completo"} />
                </div>
                
                <div className="col-span-2 md:col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">{convocadoType === 'empresa' ? 'NIT' : 'Cédula de Ciudadanía'}</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none" placeholder={convocadoType === 'empresa' ? "Sin dígito de verificación" : "Documento de identidad"} />
                </div>

                <div className="col-span-2 md:col-span-1 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Correo Electrónico (Notificación)</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none" placeholder="correo@empresa.com" />
                </div>

                {/* Campos Críticos: Representante Legal y Dirección Física (Si es empresa) */}
                {convocadoType === 'empresa' && (
                  <>
                    <div className="col-span-2 space-y-2 pt-4 border-t border-slate-100">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                        Representante Legal <span className="text-xs font-normal text-slate-400 normal-case">(Requerido para citación)</span>
                      </label>
                      <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none" placeholder="Nombre de quien representa la empresa" />
                    </div>
                  </>
                )}

                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dirección Física de Notificación</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none" placeholder="Ej. Calle 100 # 15-20 Edificio Empresarial" />
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Paso 3: Detalles y Pretensiones (Con Reglas Contextuales) */}
        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            
            <div className="border-b border-slate-100 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black mb-2 text-slate-900">Detalles del Caso</h2>
                <p className="text-slate-500 text-sm">Redacte sus pretensiones de forma clara.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Dirección Territorial</label>
                <select className="w-full px-4 py-3.5 rounded-xl border border-slate-300 focus:border-[#0A2540] outline-none bg-white">
                  <option value="">Seleccionar jurisdicción...</option>
                  <option>Bogotá D.C.</option>
                  <option>Antioquia</option>
                  <option>Valle del Cauca</option>
                </select>
              </div>

              {/* Ajuste de Cuantía */}
              <div className="col-span-2 md:col-span-1 space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estimación de Cuantía (COP)</label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[#005FB8] focus:ring-[#005FB8]" checked={cuantiaIndeterminada} onChange={(e) => setCuantiaIndeterminada(e.target.checked)} />
                    <span className="text-[10px] uppercase font-bold text-slate-500">Aún por determinar</span>
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 text-slate-500 font-bold">$</span>
                  <input type="number" disabled={cuantiaIndeterminada} className={`w-full pl-8 pr-4 py-3.5 rounded-xl border outline-none transition-colors ${cuantiaIndeterminada ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed' : 'bg-white border-slate-300 focus:border-[#0A2540]'}`} placeholder={cuantiaIndeterminada ? "0" : "Ingrese valor estimado"} />
                </div>
              </div>

              {/* Botón para ver Reglas de Negocio (Derechos Conciliables) */}
              <div className="col-span-2">
                <button onClick={() => setShowRules(!showRules)} className="w-full bg-blue-50 border border-blue-200 text-[#005FB8] p-4 rounded-xl flex items-center justify-between hover:bg-blue-100 transition-colors">
                  <span className="font-bold text-sm flex items-center gap-2"><Info size={18} /> ¿Qué derechos puedo reclamar legalmente?</span>
                  <ChevronRight size={20} className={`transform transition-transform ${showRules ? 'rotate-90' : ''}`} />
                </button>
                
                {/* Reglas de Negocio Colapsables */}
                {showRules && (
                  <div className="mt-4 p-6 bg-white border border-slate-200 rounded-xl space-y-6 animate-in slide-in-from-top-2">
                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm"><CheckCircle className="text-emerald-500" size={16}/> SÍ se pueden conciliar:</h4>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-slate-600">
                        <li>Indemnización por despido sin justa causa.</li>
                        <li>Horas extras, bonificaciones o primas extralegales.</li>
                        <li>Diferencias salariales discutidas.</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-2 text-sm"><XCircle className="text-red-500" size={16}/> NO se pueden conciliar (irrenunciables):</h4>
                      <ul className="list-disc pl-6 space-y-1 text-xs text-slate-600">
                        <li>Salario mínimo legal.</li>
                        <li>Aportes al sistema de seguridad social (salud, pensión).</li>
                        <li>Cesantías y vacaciones adquiridas indiscutibles.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Editor de Pretensiones Ajustado */}
              <div className="col-span-2 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Hechos y Pretensiones</label>
                <div className="border border-slate-300 rounded-xl overflow-hidden focus-within:border-[#0A2540] focus-within:ring-2 focus-within:ring-[#0A2540]/10 transition-all bg-white">
                  <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Editor de Texto Plano</span>
                    <span className="text-[10px] text-slate-500"><AlertCircle size={10} className="inline mr-1" />Si requiere formato complejo o tablas, adjunte documento en el Paso 4.</span>
                  </div>
                  <textarea rows={8} className="w-full p-4 outline-none resize-y text-slate-800 bg-white" placeholder="Describa formalmente los hechos... Ej: Laboré desde el DD/MM/AAAA hasta el DD/MM/AAAA. Reclamo el pago de..."></textarea>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Paso 4: Documentos con Simulación Azure */}
        {step === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
             <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-black mb-2 text-slate-900">Aportes Documentales</h2>
              <p className="text-slate-500 text-sm">Carga en Storage Inmutable. Formatos válidos: PDF/JPG. Límite: 10MB.</p>
            </div>

            <div className="grid gap-4">
              {/* Documento de Identidad */}
              <div className="border-2 border-dashed border-slate-300 bg-white p-6 rounded-2xl flex flex-col gap-4 transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${uploadState.id.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {uploadState.id.status === 'success' ? <CheckCircle size={24} /> : <User size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Documento de Identidad</h4>
                      <p className="text-slate-500 text-xs mt-1">Requerido</p>
                    </div>
                  </div>
                  
                  {uploadState.id.status === 'idle' && (
                    <button onClick={() => handleUpload('id')} className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:border-[#005FB8] hover:text-[#005FB8] text-xs shadow-sm transition-colors flex items-center justify-center gap-2">
                      <Upload size={14} /> Subir
                    </button>
                  )}
                  {uploadState.id.status === 'success' && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">Verificado</span>
                  )}
                </div>

                {/* Progress Bar UI */}
                {(uploadState.id.status === 'uploading' || uploadState.id.status === 'scanning') && (
                  <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 animate-in fade-in">
                    <div className="flex justify-between text-xs mb-2 font-semibold">
                      <span className="text-[#005FB8] flex items-center gap-2">
                        <Loader2 size={12} className="animate-spin" />
                        {uploadState.id.status === 'uploading' ? 'Asegurando documento en Storage inmutable...' : 'Escaneando integridad (Azure Security)...'}
                      </span>
                      <span className="text-slate-500">{Math.round(uploadState.id.progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005FB8] transition-all duration-300" style={{ width: `${uploadState.id.progress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pruebas Documentales */}
              <div className="border-2 border-dashed border-slate-300 bg-white p-6 rounded-2xl flex flex-col gap-4 transition-all">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${uploadState.pruebas.status === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {uploadState.pruebas.status === 'success' ? <CheckCircle size={24} /> : <FileCheck size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Pruebas (y/o Documento de Pretensiones)</h4>
                      <p className="text-slate-500 text-xs mt-1">Opcional. Adjunte aquí cuadros, tablas o pruebas.</p>
                    </div>
                  </div>
                  
                  {uploadState.pruebas.status === 'idle' && (
                    <button onClick={() => handleUpload('pruebas')} className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-200 rounded-lg font-bold text-slate-700 hover:border-[#005FB8] hover:text-[#005FB8] text-xs shadow-sm transition-colors flex items-center justify-center gap-2">
                      <Upload size={14} /> Subir
                    </button>
                  )}
                  {uploadState.pruebas.status === 'success' && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">Verificado</span>
                  )}
                </div>

                {(uploadState.pruebas.status === 'uploading' || uploadState.pruebas.status === 'scanning') && (
                  <div className="w-full bg-slate-50 rounded-xl p-4 border border-slate-100 animate-in fade-in">
                    <div className="flex justify-between text-xs mb-2 font-semibold">
                      <span className="text-[#005FB8] flex items-center gap-2">
                        <Loader2 size={12} className="animate-spin" />
                        {uploadState.pruebas.status === 'uploading' ? 'Asegurando documento en Storage inmutable...' : 'Escaneando integridad (Azure Security)...'}
                      </span>
                      <span className="text-slate-500">{Math.round(uploadState.pruebas.progress)}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-[#005FB8] transition-all duration-300" style={{ width: `${uploadState.pruebas.progress}%` }}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Paso 5: Resumen Final */}
        {step === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right-4">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-2xl font-black mb-2 text-slate-900">Revisión Final</h2>
              <p className="text-slate-500 text-sm">Verifique la información antes del envío oficial al SGAC.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-[#0A2540] px-6 py-4 text-white">
                <h3 className="font-bold flex items-center gap-2 text-sm"><FileText size={16}/> Resumen de Radicación</h3>
              </div>
              
              <div className="p-6 md:p-8 space-y-6 divide-y divide-slate-100">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Solicitante</p>
                    <p className="font-bold text-slate-900">Ana María López</p>
                    <p className="text-sm text-slate-600">CC. 1029384756</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Convocado</p>
                    <p className="font-bold text-slate-900">Industrias ABC S.A.S</p>
                    <p className="text-sm text-slate-600">Empresa</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Jurisdicción</p>
                    <p className="font-bold text-slate-900">Bogotá D.C.</p>
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Cuantía Estimada</p>
                  <p className="font-bold text-emerald-600">{cuantiaIndeterminada ? "Indeterminada" : "$ 15.000.000"}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 text-[#0A2540]">
              <AlertCircle className="shrink-0 text-[#005FB8] mt-0.5" />
              <div className="text-sm">
                <p className="font-bold mb-1">Declaración Juramentada</p>
                <p>Al procesar esta solicitud, asume responsabilidad legal sobre la veracidad de la información y garantiza que sus peticiones corresponden a la lista de derechos conciliables.</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-slate-50 border-t border-slate-200 p-6 md:px-10 flex flex-col sm:flex-row gap-4 justify-between items-center">
        {step > 0 ? (
          <button onClick={prevStep} className="w-full sm:w-auto px-6 py-3.5 text-slate-600 font-bold text-sm border border-slate-200 rounded-xl bg-white hover:bg-slate-100 transition-colors shadow-sm">
            Volver
          </button>
        ) : (
          <button onClick={onCancel} className="w-full sm:w-auto px-6 py-3.5 text-slate-500 font-bold text-sm hover:text-slate-800 transition-colors">
            Cancelar
          </button>
        )}
        
        {step < 5 ? (
          <button 
            onClick={nextStep} 
            disabled={step === 0 && (!agreedTerms || !agreedNotif)}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0A2540] text-white font-bold text-sm rounded-xl hover:bg-[#005FB8] transition-colors flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            Siguiente Paso <ChevronRight size={16} />
          </button>
        ) : (
          <button 
            onClick={handleFinish} 
            disabled={isSubmitting || uploadState.id.status === 'uploading' || uploadState.pruebas.status === 'uploading'}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0A2540] text-white font-bold text-sm rounded-xl hover:bg-[#005FB8] transition-colors flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
          >
            {isSubmitting ? (
              <><Loader2 size={16} className="animate-spin" /> Procesando...</>
            ) : (
              <><CheckCircle size={16} /> Enviar a SGAC</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

/* =========================================
   3. DASHBOARD
   ========================================= */
const DashboardView = () => {
  const [showLogicalBanner, setShowLogicalBanner] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-slate-200 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">Tablero SGAC</h1>
          <p className="text-slate-500 text-sm">Radicado Oficial: <span className="font-mono font-bold bg-slate-200 px-2 py-0.5 rounded-md text-slate-800">SC_2026_0892</span></p>
        </div>
        <button 
          onClick={() => setShowLogicalBanner(!showLogicalBanner)}
          className="text-xs font-bold border border-slate-200 rounded-lg bg-white text-slate-600 px-4 py-2 hover:bg-slate-50 transition-colors shadow-sm"
        >
          {showLogicalBanner ? "Ver: Reparto" : "Ver: Auditoría / Finalizado"}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm">
          <h3 className="font-bold text-lg mb-8 border-b border-slate-100 pb-4 text-slate-800">Trazabilidad Procesal</h3>
          
          <div className="relative border-l-2 border-slate-100 ml-4 space-y-10">
            
            <div className="relative pl-8">
              <div className="absolute -left-[11px] top-1 w-5 h-5 bg-[#005FB8] rounded-full flex items-center justify-center ring-4 ring-white">
                <Check size={12} className="text-white" strokeWidth={3} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Radicación SGAC Recibida</h4>
                <p className="text-sm text-slate-500 mt-1">Validación técnica completada.</p>
                <span className="text-[10px] font-bold text-slate-400 mt-2 block uppercase tracking-wider">12-MAR-2026 09:30</span>
              </div>
            </div>

            <div className="relative pl-8">
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${showLogicalBanner ? 'bg-[#005FB8]' : 'bg-white border-2 border-[#0A2540]'}`}>
                {showLogicalBanner && <Check size={12} className="text-white" strokeWidth={3} />}
                {!showLogicalBanner && <div className="w-2 h-2 bg-[#0A2540] rounded-full"></div>}
              </div>
              <div>
                <h4 className={`font-bold text-sm ${!showLogicalBanner ? 'text-[#0A2540]' : 'text-slate-900'}`}>Expediente en Reparto Territorial</h4>
                <p className="text-sm text-slate-500 mt-1">Asignación a despacho de Inspector Laboral.</p>
                {!showLogicalBanner && <div className="mt-3 inline-block px-3 py-1 bg-blue-50 text-[#005FB8] rounded-full text-[10px] font-bold uppercase tracking-wider">Estado Actual</div>}
              </div>
            </div>

            <div className={`relative pl-8 ${!showLogicalBanner ? 'opacity-40' : ''}`}>
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${showLogicalBanner ? 'bg-[#0A2540]' : 'bg-slate-200'}`}>
                 {showLogicalBanner && <div className="w-2 h-2 bg-white rounded-full"></div>}
              </div>
              <div>
                <h4 className={`font-bold text-sm ${showLogicalBanner ? 'text-[#0A2540]' : 'text-slate-900'}`}>En Auditoría de Cierre</h4>
                <p className="text-sm text-slate-500 mt-1">Revisión por Administrador Territorial.</p>
                {showLogicalBanner && <div className="mt-3 inline-block px-3 py-1 bg-blue-50 text-[#005FB8] rounded-full text-[10px] font-bold uppercase tracking-wider">Proceso Interno</div>}
              </div>
            </div>

             <div className={`relative pl-8 ${!showLogicalBanner ? 'opacity-40' : ''}`}>
              <div className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${showLogicalBanner ? 'bg-white border-2 border-emerald-500' : 'bg-slate-200'}`}>
                 {showLogicalBanner && <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>}
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Acta Oficial Generada</h4>
                <p className="text-sm text-slate-500 mt-1">Documento con fuerza vinculante emitido.</p>
                {showLogicalBanner && <div className="mt-3 inline-block px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Resolución Final</div>}
              </div>
            </div>

          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#0A2540] p-6 md:p-8 rounded-3xl text-white relative shadow-lg overflow-hidden">
             <div className="absolute -right-8 -top-8 text-white/10">
              <FileSignature size={140} strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-bold mb-4 uppercase tracking-widest border border-white/20">
                Requerimiento
              </div>
              <h3 className="text-xl font-bold mb-3">Acta Oficial SGAC</h3>
              <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                Descargue el documento resolutivo de su caso.
              </p>
              <button className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm ${showLogicalBanner ? 'bg-white text-[#0A2540] hover:bg-slate-50' : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'}`}>
                Descargar Documento <Download size={16} />
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-widest border-b border-slate-100 pb-3">Expediente</h4>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:border-[#005FB8] hover:bg-blue-50 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-slate-400 group-hover:text-[#005FB8]" />
                  <span className="text-sm font-bold text-slate-700">Solicitud.pdf</span>
                </div>
                <Download size={16} className="text-slate-400 group-hover:text-[#005FB8]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================
   UTILITIES
   ========================================= */
const OTPModal = ({ onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(onSuccess, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 w-full max-w-sm flex flex-col animate-in zoom-in-95 duration-200 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="font-black text-lg">Validación SGAC</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800 bg-slate-50 p-1.5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-widest text-center">Código OTP Temporal</label>
              <input 
                type="text" 
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-center text-3xl tracking-[0.5em] font-mono p-4 border border-slate-200 rounded-2xl focus:border-[#0A2540] focus:ring-2 focus:ring-[#0A2540]/10 outline-none bg-slate-50 transition-all" 
                placeholder="------"
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              disabled={code.length < 4 || loading}
              className="w-full py-4 bg-[#0A2540] text-white font-bold text-sm rounded-xl hover:bg-[#005FB8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-md"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Verificando...</> : 'Acceder'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SkeletonScreen = () => (
  <div className="w-full max-w-5xl mx-auto space-y-8 animate-pulse">
    <div className="h-10 bg-slate-200 w-1/4 rounded-xl"></div>
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 bg-white border border-slate-100 rounded-3xl p-10 space-y-8">
        <div className="h-6 bg-slate-200 w-1/3 mb-10 rounded-lg"></div>
        {[1,2,3].map(i => (
          <div key={i} className="flex gap-4">
            <div className="w-8 h-8 bg-slate-200 rounded-full shrink-0"></div>
            <div className="space-y-3 w-full">
              <div className="h-4 bg-slate-200 w-1/4 rounded"></div>
              <div className="h-3 bg-slate-100 w-2/4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-8">
        <div className="h-64 bg-slate-200 rounded-3xl"></div>
        <div className="h-40 bg-slate-200 rounded-3xl"></div>
      </div>
    </div>
  </div>
);

export default PortalCiudadano;