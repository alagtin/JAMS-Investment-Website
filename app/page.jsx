'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- Utils: Animation Reveal ---
const ScrollReveal = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setTimeout(() => setIsVisible(true), delay);
                observer.unobserve(entry.target);
            }
        }, { threshold: 0.4 });
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay]);
    return <div ref={ref} className={`reveal-up ${isVisible ? 'active' : ''} w-full flex flex-col items-center`}>{children}</div>;
};

// --- Data ---
const schoolsData = [
    { id: "1j9Cph2RqeHURiBENRFUAe53EUVakrPAg", h: "75px" },
    { id: "1AiX6DX6pxNdID0CpzS6ldcJHuWFHIpD6", h: "70px" },
    { id: "1yrBkP5JdIruq3FcCe_fY3ifJ8wgBmIWQ", h: "60px" },
    { id: "1taYfqGVmoHNrKj4CcrCC2l6o_5Ja6y54", h: "95px" }, 
    { id: "1LLKAIAt2T7iDojbcCFtTEScDgWqmmNUP", h: "125px" }, 
    { id: "1QSDDs6SyBofuhHRwAG90iHkswgY-Q2jJ", h: "75px" },
    { id: "1KHdo0CETi275C4poc_UziKEYerQ6EWQc", h: "75px" },
    { id: "16YI6BRFrV1UmCcY6n02Q474OfI1Xqr7n", h: "115px" }, 
    { id: "1mdQlMRSqNKF0qQO9_9BOdrk9PRD1qfqq", h: "140px" }, 
    { id: "1SJGvkoULgLd0-0fCykEL55cZ9qslmLM6", h: "125px" }   
];

const timelineData = [
    { label: "IP 1: ER", type: "ip", start: 0, end: 2.3, row: 0 },
    { label: "IP 2: LBO / ECM DCM", type: "ip", start: 3.1, end: 4.8, row: 0 },
    { label: "GP 1: LBO PJ", type: "gp", start: 1.8, end: 7, row: 1 },
    { label: "IP 3: Project Finance / M&A", type: "ip", start: 5.5, end: 7.2, row: 2 },
    { label: "GP 2: M&A", type: "gp", start: 4.5, end: 9.2, row: 3 }
];

const HomeView = ({ scrollY, windowHeight }) => {
    const progress = Math.min(1, scrollY / windowHeight);
    const logoScale = 1 - (progress * 0.82); 
    const logoY = -(progress * 14);

    return (
        <div className="w-full">
            <div className="relative w-full z-10">
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <div className="sticky top-0 h-screen w-full bg-[#0a0a0a]">
                        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('https://drive.google.com/thumbnail?id=1bF-GwJQpgupCHzX2cNal9KAYgDdvsea1&sz=w3000')" }} />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                </div>
                <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <div className="sticky top-0 h-screen w-full flex items-center justify-center">
                        <img src="https://drive.google.com/thumbnail?id=1_AfeQO-hhZyAh-KkzHYYLpkA7FmGbA9z&sz=w2000" alt="JAMS" style={{ transform: `translateY(${logoY}vh) scale(${logoScale})`, transition: 'transform 0.1s ease-out' }} className="w-[70%] md:w-[40%] lg:w-[26%] max-w-[420px] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.12)]" />
                    </div>
                </div>
                <div className="relative z-30">
                    <section className="h-screen bg-transparent"></section>
                    <section className="h-screen flex flex-col items-center justify-center px-6 bg-transparent text-center">
                        <div className="font-inter text-sm md:text-base leading-relaxed font-light max-w-xl text-white/80 drop-shadow-md translate-y-16 tracking-wide">
                            JAMS Investment is a small-but-elite, mentorship-driven finance talent platform. Through high-touch mentorship supported by solid technical training, we build stronger connections.
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const TeamsView = () => (
    <div className="w-full">
        <section className="relative w-full h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
            <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-fixed" style={{ backgroundImage: "url('https://drive.google.com/thumbnail?id=1bF-GwJQpgupCHzX2cNal9KAYgDdvsea1&sz=w3000')" }} />
            <div className="absolute inset-0 bg-black/80 z-10" />
            <div className="relative z-20 text-center px-6">
                <span className="font-spartan text-xs tracking-[0.5em] text-[#ff3b3b] uppercase mb-4 font-bold">The People</span>
                <h1 className="font-spartan font-bold text-4xl md:text-6xl uppercase text-white tracking-tighter leading-none">MEET THE <br/>TEAM</h1>
                <p className="mt-12 font-inter text-xs md:text-sm font-light text-white/40 uppercase tracking-[0.4em]">Structure coming soon...</p>
            </div>
        </section>
    </div>
);

const DipView = ({ scrollY, windowHeight }) => {
    const dipProgress = Math.min(1, scrollY / windowHeight);
    const dipLogoScale = 1 - (dipProgress * 0.82); 
    const dipLogoY = -(dipProgress * 14);
    const months = ["2026/3", "2026/4", "2026/5", "2026/6", "2026/7", "2026/8", "2026/9", "2026/10", "2026/11", "2026/12", "2027/1"];

    return (
        <div className="w-full">
            <div className="relative w-full z-10">
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    <div className="sticky top-0 h-screen w-full bg-[#0a0a0a]"></div>
                </div>
                <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
                    <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4">
                        <img src="https://drive.google.com/thumbnail?id=1WOS-DsLJesu97SGWafm-W_SVH46RNaLq&sz=w3000" alt="DIP" style={{ transform: `translateY(${dipLogoY}vh) scale(${dipLogoScale})`, transition: 'transform 0.1s ease-out' }} className="w-[85%] md:w-[60%] lg:w-[38%] max-w-[800px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]" />
                    </div>
                </div>
                <div className="relative z-30">
                    <section className="h-screen bg-transparent"></section>
                    <section className="h-screen flex flex-col items-center justify-center px-6 bg-transparent">
                        <div className="font-inter text-xs md:text-sm leading-relaxed font-light max-w-lg text-justify text-white/80 drop-shadow-md translate-y-16 tracking-wide">
                            JAMS Direct Industry Program (DIP) is an exclusive, high-density training platform designed to bridge the gap between top Asian talent and global financial hubs.
                        </div>
                    </section>
                </div>
            </div>

            <section className="min-h-screen bg-[#f7f9fc] flex flex-col items-center justify-center py-24 px-6 relative z-40">
                <ScrollReveal>
                    <div className="px-5 py-2 border-2 border-[#191c1e] font-spartan text-[10px] font-bold tracking-[0.5em] uppercase mb-10">Cohort Selection Results</div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-x-12 gap-y-10 lg:gap-x-16 lg:gap-y-12 px-8 mt-12">
                        {schoolsData.map((s, i) => (
                            <div key={i} className="flex items-center justify-center h-[130px]">
                                <img src={`https://drive.google.com/thumbnail?id=${s.id}&sz=w1000`} alt="School" style={{ height: s.h }} className="object-contain max-w-full" />
                            </div>
                        ))}
                    </div>
                </ScrollReveal>
            </section>

            {/* Additional DIP sections follow same pattern... */}
            <section className="min-h-screen bg-[#1e455e] text-white flex flex-col items-center justify-center py-24 px-6 relative z-40">
                 <ScrollReveal>
                    <h2 className="font-spartan font-bold text-3xl md:text-5xl uppercase tracking-tighter mb-20 text-center uppercase leading-none">PROGRAM <br/> OVERVIEW</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-6xl border border-white/10 bg-white/5 backdrop-blur-lg">
                        {["Guest Speaker", "Mentorship", "Technical Training"].map((title, i) => (
                            <div key={i} className={`flex flex-col p-10 lg:p-14 ${i !== 2 ? 'md:border-r border-white/10' : ''}`}>
                                <h3 className="font-spartan font-bold text-xs mb-10 border-b border-white/5 pb-4 text-center tracking-[0.3em] uppercase">{title}</h3>
                                <div className="text-[11px] opacity-60 text-center font-inter uppercase tracking-widest leading-relaxed">Details listed in curriculum...</div>
                            </div>
                        ))}
                    </div>
                 </ScrollReveal>
            </section>
        </div>
    );
};

export default function App() {
    const [currentPage, setCurrentPage] = useState('home'); 
    const [scrollY, setScrollY] = useState(0);
    const [windowHeight, setWindowHeight] = useState(800);
    const containerRef = useRef(null);

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const container = containerRef.current;
        const handleScroll = () => { if (container) setScrollY(container.scrollTop); };
        if (container) container.addEventListener('scroll', handleScroll);
        return () => container && container.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = (page) => {
        setCurrentPage(page);
        if (containerRef.current) containerRef.current.scrollTop = 0;
    };

    return (
        <div ref={containerRef} className="h-screen overflow-y-auto no-scrollbar relative bg-[#0a0a0a]">
            <nav className={`fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-12 py-7 transition-all duration-700 ${scrollY > 100 ? 'bg-black/90 backdrop-blur-xl py-4 shadow-2xl' : 'bg-transparent text-white'}`}>
                <button onClick={() => navigate('home')} className="font-libre font-bold text-xl lg:text-2xl uppercase tracking-tighter hover:text-[#ff3b3b] transition-all duration-300">
                    JAMS INVESTMENT
                </button>
                <div className="flex gap-10 font-inter text-[11px] font-bold tracking-[0.3em] uppercase">
                    <button onClick={() => navigate('home')} className={`transition-all duration-500 relative pb-1 ${currentPage === 'home' ? 'text-[#ff3b3b]' : 'hover:text-[#ff3b3b]'}`}>
                        ABOUT {currentPage === 'home' && <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ff3b3b]"></div>}
                    </button>
                    <button onClick={() => navigate('teams')} className={`transition-all duration-500 relative pb-1 ${currentPage === 'teams' ? 'text-[#ff3b3b]' : 'hover:text-[#ff3b3b]'}`}>
                        TEAMS {currentPage === 'teams' && <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ff3b3b]"></div>}
                    </button>
                    <button onClick={() => navigate('dip')} className={`transition-all duration-500 relative pb-1 ${currentPage === 'dip' ? 'text-[#ff3b3b]' : 'hover:text-[#ff3b3b]'}`}>
                        DIP {currentPage === 'dip' && <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#ff3b3b]"></div>}
                    </button>
                </div>
            </nav>

            {currentPage === 'home' && <HomeView scrollY={scrollY} windowHeight={windowHeight} />}
            {currentPage === 'teams' && <TeamsView />}
            {currentPage === 'dip' && <DipView scrollY={scrollY} windowHeight={windowHeight} />}

            <footer className="bg-[#0a0a0a] text-white px-8 md:px-12 py-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 relative z-50">
                <div className="flex flex-col items-center md:items-start">
                    <span className="font-libre font-bold text-2xl uppercase tracking-tighter mb-2">JAMS INVESTMENT</span>
                    <span className="font-spartan text-[10px] tracking-[0.5em] font-bold opacity-30 uppercase">Elite Society of Finance</span>
                </div>
                <span className="font-spartan text-[9px] tracking-[0.2em] font-bold opacity-30 uppercase">© 2026 JAMS INVESTMENT. All Rights Reserved.</span>
            </footer>
        </div>
    );
}
