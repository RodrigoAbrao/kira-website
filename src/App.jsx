import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Filter, Map as MapIcon, ShieldCheck, Plane, FileCheck, MousePointer2, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   A. NAVBAR — "A Ilha Flutuante"
   ================================================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <header className={`pointer-events-auto rounded-full transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-[14px] shadow-sm border border-[rgba(14,30,52,0.08)] py-3 px-6' : 'bg-transparent py-4 px-2'}`}>
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center">
            <img src="/assets/logo-kira-h1-1.png" alt="Kira Engenharia" className="h-[28px] w-auto transition-transform hover:scale-105" />
          </a>
          <nav className={`hidden md:flex items-center gap-6 text-[0.95rem] font-medium transition-colors ${scrolled ? 'text-soft-text' : 'text-white/80'}`}>
            <a href="#solucao" className="hover:text-primary transition-colors">Solução</a>
            <a href="https://www.kiravision.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Plataforma</a>
            <a href="#protocolo" className="hover:text-primary transition-colors">Protocolo</a>
            <a href="#modalidades" className="hover:text-primary transition-colors">Modalidades</a>
          </nav>
          <a href="#contato" className={`btn text-sm min-h-[42px] px-6 ${scrolled ? 'btn-outline' : 'btn-primary'}`}>
            Briefing
          </a>
        </div>
      </header>
    </div>
  );
}

/* ================================================================
   B. HERO SECTION — Sans Bold / Serif Italic contrast
   ================================================================ */
function Hero() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-anim',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative h-[100dvh] min-h-[700px] flex items-end pb-24 overflow-hidden">
      {/* Background (industrial texture from preset C but with brand overlay) */}
      <div className="absolute inset-0 z-0">
        <img src="/assets/chrome_tfhd4oGKKy.png" alt="Planta solar" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111f] via-[#07111f]/80 to-transparent mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-[#07111f]/40"></div>
      </div>

      <div className="container relative z-10 w-full pl-4 md:pl-12">
        <div className="max-w-[800px]">
          <span className="hero-anim text-accent font-bold tracking-widest uppercase text-sm mb-6 block">Kira Engenharia • Inspeção Aérea</span>
          
          <h1 className="hero-anim text-white leading-[0.9] flex flex-col items-start">
            <span className="font-sans font-bold text-[clamp(2.5rem,4vw,4rem)] tracking-tight">Mapeie o risco real da</span>
            <span className="font-serif italic text-[clamp(4.5rem,8vw,8.5rem)] text-primary font-normal translate-x-[-4px]">operação.</span>
          </h1>
          
          <p className="hero-anim text-[#ecf3ff]/80 text-lg md:text-xl mt-6 max-w-2xl leading-relaxed">
            Termografia aérea com laudo técnico executivo para reduzir o risco operacional e priorizar a manutenção em usinas solares.
          </p>

          <div className="hero-anim mt-10">
            <a href="#contato" className="btn btn-primary min-h-[60px] text-lg px-8">Solicitar proposta técnica</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   C. FEATURES — 3 Interactive Artifacts (Gemini.md strict rules)
   ================================================================ */
function Features() {
  // Card 1: Embaralhador
  const [shuffler, setShuffler] = useState(['Captura radiométrica com drones', 'Voo calibrado a 20m de altura', 'Sobreposição pericial geométrica']);
  useEffect(() => {
    const interval = setInterval(() => {
      setShuffler(prev => {
        const next = [...prev];
        next.unshift(next.pop());
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Card 2: Máquina de Escrever
  const telemetryLines = [
    "> ANALISANDO STRING 14A...",
    "> HOTSPOT DETECTADO: MOD. 04",
    "> DELTA T: 42.5°C",
    "> CLASSIFICAÇÃO: CLASSE 3 (CRÍTICO)"
  ];
  const [typedText, setTypedText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex < telemetryLines.length) {
      if (charIndex < telemetryLines[lineIndex].length) {
        const timer = setTimeout(() => {
          setTypedText(prev => prev + telemetryLines[lineIndex][charIndex]);
          setCharIndex(prev => prev + 1);
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setTypedText(prev => prev + '\n');
          setLineIndex(prev => prev + 1);
          setCharIndex(0);
        }, 800);
        return () => clearTimeout(timer);
      }
    } else {
      const timer = setTimeout(() => {
        setTypedText('');
        setLineIndex(0);
        setCharIndex(0);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, charIndex, telemetryLines]);

  return (
    <section id="solucao" className="py-24 bg-[var(--color-surface-alt)]">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="eyebrow justify-center">Artefatos de Análise</span>
          <h2 className="mt-4 text-[2.5rem] font-bold leading-tight tracking-tight text-dark-text">Não entregamos apenas imagens. Entregamos dados de O&M.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Embaralhador Diagnóstico (Coleta Radiométrica) */}
          <article className="glass-card p-8 flex flex-col h-[420px] bg-white/95 group hover:border-[var(--color-primary)] transition-colors">
            <div className="mb-6 flex items-center justify-between">
              <Plane className="text-primary w-8 h-8" />
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-1 rounded font-bold">ALT: 20M</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Coleta Radiométrica</h3>
            <p className="text-soft-text text-sm mb-8">Captura térmica aérea de alta precisão com calibração radiométrica e correção paramétrica.</p>
            
            <div className="mt-auto relative h-[120px] w-full bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-border)] p-4">
              {shuffler.map((item, i) => (
                <div 
                  key={item}
                  className="absolute left-4 right-4 bg-white border border-[var(--color-border)] rounded-lg p-3 text-xs font-medium shadow-sm flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  style={{ 
                    transform: `translateY(${i * 44}px) scale(${1 - i * 0.05})`, 
                    opacity: 1 - i * 0.3,
                    zIndex: 10 - i 
                  }}
                >
                  <Activity className="w-3 h-3 text-accent" />
                  {item}
                </div>
              ))}
            </div>
          </article>

          {/* Card 2: Máquina de Escrever Telemetria (Filtro Normativo) */}
          <article className="glass-card p-8 flex flex-col h-[420px] bg-[#07111f]/95 text-white">
            <div className="mb-6 flex items-center justify-between">
              <Filter className="text-accent w-8 h-8" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="text-[10px] font-mono text-accent font-bold">LIVE FEED</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Filtro Normativo</h3>
            <p className="text-[#ecf3ff]/70 text-sm mb-8">Priorização cirúrgica de anomalias seguindo estritamente a norma IEC TS 62446-3.</p>
            
            <div className="mt-auto h-[140px] w-full bg-[#030811] rounded-[var(--radius-md)] p-4 font-mono text-[11px] text-accent/90 border border-accent/20 flex flex-col justify-end overflow-hidden">
              <pre className="whitespace-pre-wrap flex-1">{typedText}<span className="inline-block w-[6px] h-[12px] bg-accent ml-1 animate-pulse"></span></pre>
            </div>
          </article>

          {/* Card 3: Agendador Protocolo Cursor (Kira Vision) */}
          <article className="glass-card p-8 flex flex-col h-[420px] bg-white/95 group hover:border-[var(--color-primary)] transition-colors">
            <div className="mb-6 flex items-center justify-between">
              <MapIcon className="text-primary w-8 h-8" />
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2 py-1 rounded font-bold">PLATAFORMA</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Kira Vision</h3>
            <p className="text-soft-text text-sm mb-8">Acesso web interativo ao mapa georreferenciado, fichas de anomalia e exportação KMZ.</p>
            
            <div className="mt-auto h-[120px] w-full rounded-[var(--radius-md)] overflow-hidden relative border border-[var(--color-border)]">
              {/* Fake visual map of Kira Vision */}
               <img src="/assets/chrome_mWFXiOCFhs.png" alt="Map" className="w-full h-full object-cover opacity-60 grayscale blur-[1px]" />
               
               {/* SVG Animated Cursor */}
               <div className="absolute top-[30%] left-[30%] animate-[cursor-move_4s_infinite_ease-in-out]">
                  <MousePointer2 className="w-5 h-5 text-accent drop-shadow-md fill-white" />
                  <div className="absolute top-0 left-0 w-full h-full animate-ping pointer-events-none rounded-full border border-accent"></div>
               </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   D. FILOSOFIA — "O Manifesto" Parallax
   ================================================================ */
function Philosophy() {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.phil-text',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.3, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 60%' }
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative py-40 bg-[#07111f] overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img src="/assets/AcroRd32_kJJkxGB4YR.png" alt="Módulo Trincado" className="w-full h-full object-cover opacity-[0.15] scale-110" style={{ transform: 'translateY(-10%)' }} />
      </div>
      
      <div className="container relative z-10 max-w-4xl text-center">
        <p className="phil-text text-[#ecf3ff]/60 text-lg md:text-2xl font-medium mb-4">
          A maioria do setor foca em: apenas vender o voo de drone.
        </p>
        <h2 className="phil-text text-white font-serif italic text-4xl md:text-[5rem] leading-[1.1] mt-0">
          Nós focamos na <span className="text-primary not-italic font-sans font-bold uppercase tracking-tight ml-2">evidência técnica</span> para decisão de O&M.
        </h2>
      </div>
    </section>
  );
}

/* ================================================================
   E. PROTOCOLO — "Arquivo Empilhável Sticky"
   ================================================================ */
function Protocol() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.sticky-card');
      
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return; // don't animate the last card out
        
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(10px)',
          scrollTrigger: {
            trigger: cards[i + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Mapeamento Base & DSM', desc: 'Voo base com sensor RGB de alta definição. Processamos o Modelo Digital de Superfície (DSM) em nuvem de pontos densa para calibração altimétrica.' },
    { num: '02', title: 'Voo Terrain Follow 20m', desc: 'A captura termográfica segue o relevo cravada a 20m. A distância fixa garante integridade métrica rigorosa para cada pixel térmico (POP-001).' },
    { num: '03', title: 'Kira Vision: Panorama', desc: 'Ortomosaico completo da usina na plataforma, exibindo as anomalias de longe em forma pontilhada para compreensão geral do estado do ativo.' },
    { num: '04', title: 'Termogramas Essenciais', desc: 'Relatório termográfico mostrando a variação de temperatura em múltiplos pontos do equipamento, permitindo classificação técnica exata.' },
    { num: '05', title: 'Relatório de Embasamento', desc: 'Exemplo real: Página em PDF documentando evento extremo (ΔT=146°C no Issue HOT-017), provando risco de incêndio e perda produtiva.' }
  ];

  return (
    <section id="protocolo" ref={containerRef} className="py-24 bg-[var(--color-surface)] relative">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="eyebrow justify-center">O Protocolo</span>
          <h2 className="mt-4 text-[2.5rem] font-bold leading-tight tracking-tight text-dark-text">Processo operacional blindado.</h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {steps.map((step, i) => (
            <article key={i} className="sticky-card sticky top-[20vh] w-full min-h-[40vh] mb-[15vh] glass-card bg-white/95 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 rounded-[var(--radius-lg)] shadow-[0_30px_60px_rgba(7,17,31,0.06)] border border-[var(--color-border)] transform-origin-top">
              
              <div className="flex-1">
                <span className="font-mono text-primary font-bold text-lg mb-4 block">PASSO {step.num}</span>
                <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                <p className="text-soft-text text-lg leading-relaxed">{step.desc}</p>
              </div>

              <div className="w-[180px] h-[180px] md:w-[240px] md:h-[240px] flex-shrink-0 bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] flex items-center justify-center overflow-hidden border border-[var(--color-border)] relative">
                {i === 0 && (
                  <img src="/assets/chrome_tfhd4oGKKy.png" alt="Mapeamento Base" className="w-full h-full object-cover object-center mix-blend-multiply opacity-90" />
                )}
                {i === 1 && (
                  <div className="w-full h-full relative bg-[#07111f]">
                     <div className="absolute top-0 bottom-0 left-0 w-full overflow-hidden">
                       <div className="w-[200%] h-px bg-accent absolute top-1/2 -translate-y-1/2 animate-[pulse_1s_infinite]"></div>
                       <svg className="absolute w-full h-full bottom-0 opacity-30 text-primary" viewBox="0 0 100 100" preserveAspectRatio="none">
                         <path d="M0,50 Q25,20 50,50 T100,50 L100,100 L0,100 Z" fill="currentColor"></path>
                       </svg>
                       <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(0,210,232,0.2)_50%,transparent_100%)] animate-[scan_2s_linear_infinite]"></div>
                     </div>
                  </div>
                )}
                {i === 2 && (
                  <img src="/assets/chrome_mWFXiOCFhs.png" alt="Kira Vision Panorama" className="w-full h-full object-cover object-center mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700" />
                )}
                {i === 3 && (
                  <img src="/assets/chrome_y9qfpsPiXS.png" alt="Inspeção Térmica" className="w-full h-full object-cover object-center mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700" />
                )}
                {i === 4 && (
                  <img src="/assets/5rpAV2Z2Yp.png" alt="Report em PDF" className="w-full h-full object-cover object-left-top mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700" />
                )}
              </div>

            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   F. MODALIDADES (Planos/Preços)
   ================================================================ */
function Services() {
  return (
    <section id="modalidades" className="section-dark py-32 rounded-t-[3rem] mt-12 relative z-10">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="eyebrow !text-accent justify-center">Modalidades</span>
          <h2 className="mt-4 text-[2.5rem] font-bold leading-tight tracking-tight text-white">
            O escopo certo para seu ativo.
          </h2>
          <p className="text-[#ecf3ff]/70 mt-4 leading-[1.75]">
            Da coleta enxuta à auditoria técnica executiva com classificação normativa completa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Só Termografia */}
          <article className="glass-card bg-white/95 border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 flex flex-col pt-12">
            <h3 className="text-2xl font-bold text-dark-text mb-2">Só Termografia</h3>
            <p className="text-soft-text text-sm mb-8 h-[60px]">Coleta enxuta ideal para usinas com equipe técnica interna.</p>
            
            <ul className="grid gap-4 mb-10 flex-1">
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Voo radiométrico 20m alta res.</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Entrega de imagens brutas (Tiff/JPG)</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-soft-text/30 shrink-0" /><span className="text-sm text-soft-text/50 line-through">Plataforma Kira Vision</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-soft-text/30 shrink-0" /><span className="text-sm text-soft-text/50 line-through">Laudo Normativo IEC</span></li>
            </ul>
            <a href="#contato" className="btn btn-ghost w-full">Montar escopo</a>
          </article>

          {/* Destaque (Principal) */}
          <article className="glass-card bg-[linear-gradient(180deg,var(--color-primary),#0702b8)] border-[var(--color-primary)] rounded-[var(--radius-lg)] p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-primary/30 z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-accent text-[#07111f] text-xs font-bold rounded-full uppercase tracking-widest">
              Recomendado
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2 mt-4">Termologia c/ Laudo</h3>
            <p className="text-white/80 text-sm mb-8 h-[60px]">Auditoria executiva focada em risco operacional e priorização de manutenção.</p>
            
            <ul className="grid gap-4 mb-10 flex-1">
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-white font-medium">Tudo do pacote básico</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-white/90">Análise termográfica de 100% da usina</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-white/90">Filtro Normativo IEC TS 62446-3</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-white/90">Acesso plataforma Kira Vision (12m)</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-white/90">Laudo Executivo em PDF</span></li>
            </ul>
            <a href="#contato" className="btn btn-white w-full">Solicitar Proposta Técnica</a>
          </article>

          {/* Comissionamento */}
          <article className="glass-card bg-white/95 border-[var(--color-border)] rounded-[var(--radius-lg)] p-8 flex flex-col pt-12">
            <h3 className="text-2xl font-bold text-dark-text mb-2">Comissionamento</h3>
            <p className="text-soft-text text-sm mb-8 h-[60px]">Para EPCs, investidores, obra nova e aceite técnico final de comissionamento.</p>
            
            <ul className="grid gap-4 mb-10 flex-1">
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Termografia por drone (NBR 16274)</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Inspeção Categoria 1 e Categoria 2</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Mapeamento para Punch List oficial</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Evidência técnica contra fornecedor</span></li>
              <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-accent shrink-0" /><span className="text-sm text-dark-text font-medium">Laudo de Liberação de Obra</span></li>
            </ul>
            <a href="#contato" className="btn btn-ghost w-full">Agendar Alinhamento</a>
          </article>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   G. BRIEFING / CONTATO
   ================================================================ */
function Briefing() {
  return (
    <section id="contato" className="py-24 bg-[var(--color-surface)] border-t border-[var(--color-border)] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2">
            <span className="eyebrow mb-4 block">Montar Escopo</span>
            <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold leading-tight tracking-tight text-dark-text mb-6">
              Agende um <span className="font-serif italic text-primary font-normal">briefing</span> técnico.
            </h2>
            <p className="text-soft-text text-lg mb-8 leading-relaxed max-w-lg">
              Deixe nossa engenharia avaliar o risco do seu ativo. Preencha seus dados e nossa equipe entrará em contato para apresentar a plataforma Kira Vision e desenhar a proposta ideal.
            </p>

            <form action="https://formsubmit.co/rodrigo.abrao@kiravision.com.br" method="POST" className="glass-card bg-white p-8 max-w-lg shadow-xl relative z-20">
              <input type="hidden" name="_subject" value="Novo Lead Kira Energia - Briefing Técnico!" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid gap-5">
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">Nome Completo</label>
                  <input type="text" name="Nome" required className="w-full bg-[var(--color-surface-alt)] border border-[rgba(14,30,52,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Ex: João Silva" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">E-mail Corporativo</label>
                  <input type="email" name="Email" required className="w-full bg-[var(--color-surface-alt)] border border-[rgba(14,30,52,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="joao@empresa.com.br" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">Potência da Usina (MWp)</label>
                  <input type="text" name="Potência" required className="w-full bg-[var(--color-surface-alt)] border border-[rgba(14,30,52,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Ex: 50 MWp" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-dark-text mb-2">Fale mais sobre sua necessidade (Opcional)</label>
                  <textarea rows="3" name="Necessidade" className="w-full bg-[var(--color-surface-alt)] border border-[rgba(14,30,52,0.1)] rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Ex: Precisamos de laudo IEC para troca em garantia de 5 mil módulos..."></textarea>
                </div>
                <div className="flex flex-col gap-3 mt-2">
                  <button type="submit" className="btn btn-primary w-full">Enviar Solicitação</button>
                  <a href="https://wa.me/5531999999999?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20a%20inspe%C3%A7%C3%A3o%20termogr%C3%A1fica%20da%20Kira%20Energia." target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white w-full flex items-center justify-center gap-2 hover:bg-[#128C7E] border-none">
                    <MessageCircle className="w-5 h-5" /> Falar no WhatsApp
                  </a>
                </div>
              </div>
            </form>
          </div>

          <div className="lg:w-1/2 relative flex justify-center">
            {/* Kira Vision App Showcase */}
            <div className="relative w-full max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-500">
               <div className="absolute inset-0 bg-primary/10 rounded-[2rem] blur-2xl transform translate-x-4 translate-y-4"></div>
               <img src="/assets/chrome_lcuYks27bU.png" alt="Kira Vision App" className="relative z-10 rounded-[1.5rem] border border-[var(--color-border)] shadow-2xl bg-white" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ================================================================
   H. FOOTER
   ================================================================ */
function Footer() {
  return (
    <footer className="bg-[#030811] text-[#ecf3ff]/60 pt-20 pb-10">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-white/10 pb-16">
        <div>
          <img src="/assets/logo-kira-v1-1.png" alt="Kira Engenharia" className="h-[48px] w-auto mb-6 opacity-80" />
          <p className="text-sm max-w-[280px]">Engenharia Termográfica de precisão. Insight • Inovação • Organização • Minimalismo</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <strong className="text-white">Navegação</strong>
          <a href="#solucao" className="hover:text-primary transition-colors w-fit">Solução Metodológica</a>
          <a href="https://www.kiravision.com.br/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors w-fit">Kira Vision (Plataforma)</a>
          <a href="#protocolo" className="hover:text-primary transition-colors w-fit">Processo Operacional</a>
          <a href="#modalidades" className="hover:text-primary transition-colors w-fit">Tabela de Preços</a>
        </div>
        
        <div className="flex flex-col gap-4">
          <strong className="text-white">Contato</strong>
          <span>rodrigo.abrao@kiravision.com.br</span>
          <span>kiravision.com.br</span>
          
          <div className="mt-6 flex items-center gap-3 bg-white/5 p-3 rounded-lg border border-white/10 w-fit">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-mono text-xs font-bold text-white tracking-widest uppercase">Kira OS v2.4 On-line</span>
          </div>
        </div>
      </div>
      
      <div className="container text-center text-xs opacity-50 flex flex-col gap-2">
        <p>KIRA ENGENHARIA | CNPJ: 34.154.045/0001-32 | Registro CREA-MG: 0001529773</p>
        <p>O engenheiro responsável é associado e conselheiro da ABINVI - ASSOCIAÇÃO BRASILEIRA DOS INVESTIGADORES DE INCÊNDIO</p>
        <p className="mt-4">&copy; {new Date().getFullYear()} Kira Engenharia. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

/* ================================================================
   MAIN APP INCORPORATING GLOBAL NOISE
   ================================================================ */
function App() {
  return (
    <>
      <div className="noise-overlay pointer-events-none"></div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <Services />
        <Briefing />
      </main>
      <Footer />
    </>
  );
}

export default App;
