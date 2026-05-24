import { useState, useEffect } from 'react';

export default function WeatherDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi waktu tunggu fetch API 2.5 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-4 md:p-8 font-sans overflow-hidden">
      <div className="max-w-[1440px] mx-auto h-full flex flex-col">
        
        {/* NAVBAR */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-10 gap-4">
          <div>
            <p className="text-slate-400 text-sm">Welcome</p>
            {isLoading ? (
              <div className="h-6 w-32 bg-white/10 animate-pulse rounded mt-1"></div>
            ) : (
              <h1 className="text-xl font-semibold tracking-wide">Tamam</h1>
            )}
          </div>
          
          <nav className="flex items-center gap-6 bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Analytics</button>
            <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Location</button>
            <div className="w-px h-5 bg-white/20"></div>
            <img 
              src="https://ui-avatars.com/api/?name=Tamam&background=0D8ABC&color=fff" 
              alt="Profile" 
              className="w-8 h-8 rounded-full border border-white/30"
            />
          </nav>
        </header>

        {/* MAIN LAYOUT GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-grow">
          
          {/* LEFT SECTION (8 Columns) */}
          <section className="lg:col-span-8 flex flex-col justify-between h-full min-h-[600px]">
            {isLoading ? <SkeletonLeft /> : <ActualLeftContent />}
          </section>

          {/* RIGHT SECTION (4 Columns - Cards) */}
          <section className="lg:col-span-4 flex flex-col gap-4">
            {isLoading ? <SkeletonRight /> : <ActualRightContent />}
          </section>

        </main>
      </div>
    </div>
  );
}

// --- KOMPONEN KONTEN AKTIF ---

function ActualLeftContent() {
  return (
    <>
      <div className="max-w-2xl">
        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium mb-6">
          Weather Forecast
        </span>
        <h2 className="text-7xl lg:text-[5.5rem] font-bold leading-[1.1] tracking-tight mb-6">
          Storm<br />with Heavy Rain
        </h2>
        <p className="text-slate-300 text-base lg:text-lg leading-relaxed max-w-lg">
          Partly cloudy with occasional heavy showers. High around 30°C. 
          Wind from the east 11 to 21 km/h. Rain chance is 80%, with 
          rainfall expected to be significant.
        </p>
      </div>

      {/* Area Grafik Bawah Kiri */}
      <div className="mt-12 w-full">
        {/* Deretan Suhu */}
        <div className="flex justify-between items-center text-xl font-medium mb-4 px-2">
          <div className="flex items-center gap-2">11° <span className="text-slate-400 text-sm">☁️</span></div>
          <div className="flex items-center gap-2">13° <span className="text-slate-400 text-sm">☁️</span></div>
          <div className="flex items-center gap-2">14° <span className="text-slate-400 text-sm">☁️</span></div>
          <div className="flex items-center gap-2 text-2xl font-bold">10° <span className="text-white text-base">⛈️</span></div>
          <div className="flex items-center gap-2">19° <span className="text-slate-400 text-sm">☀️</span></div>
          <div className="flex items-center gap-2">12° <span className="text-slate-400 text-sm">☁️</span></div>
        </div>
        
        {/* Dummy Chart Line menggunakan SVG */}
        <div className="w-full h-24 relative mb-4">
          <svg viewBox="0 0 1000 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <path 
              d="M0,50 Q166,20 333,60 T666,80 T1000,30" 
              fill="none" 
              stroke="rgba(255,255,255,0.4)" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            {/* Titik indikator pada posisi 10 derajat (Rabu) */}
            <circle cx="500" cy="70" r="6" fill="#fff" className="shadow-[0_0_15px_#fff]" />
            <line x1="500" y1="70" x2="500" y2="100" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Deretan Hari */}
        <div className="flex justify-between items-center text-sm text-slate-400 px-2 font-medium">
          <span>Sunday</span>
          <span>Monday</span>
          <span>Tuesday</span>
          <span className="text-white font-bold border-b-2 border-white pb-1">Wednesday</span>
          <span>Thursday</span>
          <span>Friday</span>
        </div>
      </div>
    </>
  );
}

function ActualRightContent() {
  return (
    <>
      {/* Kartu Utama */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 flex flex-col shadow-2xl">
        <div className="flex items-center gap-2 mb-2 text-slate-300">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="font-medium tracking-wide">Central Jakarta</span>
        </div>
        <div className="text-[6rem] leading-none font-bold mb-6 tracking-tighter">
          10°<span className="text-[4rem] font-normal">C</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-300">
          <div className="flex items-center gap-1"><span className="text-white">🌬️</span> 19 km/h</div>
          <div className="flex items-center gap-1"><span className="text-white">💧</span> 40%</div>
          <div className="flex items-center gap-1"><span className="text-white">👁️</span> 15 km</div>
        </div>
      </div>

      {/* Kartu List Lokasi */}
      <LocationCard city="North Jakarta" status="Mostly Sunny" temp="12°" icon="⛅" />
      <LocationCard city="Bandung" status="Cloudy" temp="10°" icon="☁️" />
      <LocationCard city="South Jakarta" status="Sunny" temp="14°" icon="☀️" />
    </>
  );
}

function LocationCard({ city, status, temp, icon }) {
  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6 flex justify-between items-center hover:bg-white/10 transition-colors cursor-pointer">
      <div>
        <p className="text-xs text-slate-400 mb-1">Indonesia</p>
        <h3 className="text-lg font-semibold">{city}</h3>
        <p className="text-sm text-slate-400">{status}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-4xl font-light">{temp}</span>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

// --- KOMPONEN SKELETON (DOM SHADOWING) ---

function SkeletonLeft() {
  return (
    <div className="animate-pulse flex flex-col justify-between h-full">
      <div>
        <div className="h-8 w-40 bg-white/10 rounded-full mb-6"></div>
        <div className="h-24 w-3/4 bg-white/10 rounded-2xl mb-4"></div>
        <div className="h-24 w-1/2 bg-white/10 rounded-2xl mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-white/10 rounded"></div>
          <div className="h-4 w-5/6 bg-white/10 rounded"></div>
          <div className="h-4 w-4/6 bg-white/10 rounded"></div>
        </div>
      </div>
      <div className="mt-auto pt-12">
        <div className="h-8 w-full bg-white/10 rounded mb-4"></div>
        <div className="h-24 w-full bg-white/5 rounded mb-4"></div>
        <div className="h-6 w-full bg-white/10 rounded"></div>
      </div>
    </div>
  );
}

function SkeletonRight() {
  return (
    <div className="animate-pulse flex flex-col gap-4">
      <div className="h-[300px] w-full bg-white/5 border border-white/5 rounded-[2rem]"></div>
      <div className="h-[120px] w-full bg-white/5 border border-white/5 rounded-3xl"></div>
      <div className="h-[120px] w-full bg-white/5 border border-white/5 rounded-3xl"></div>
      <div className="h-[120px] w-full bg-white/5 border border-white/5 rounded-3xl"></div>
    </div>
  );
}