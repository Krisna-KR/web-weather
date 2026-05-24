import { useState, useEffect } from 'react';

// 1. Import statis semua aset
import logoALV from './assets/Logo ALV.png';
import bgCloudy from './assets/cloudy.jpg';
import bgPartlyCloudy from './assets/Partly Cloudy.jpg';
import bgRain from './assets/Rain.jpg';
import bgSunny from './assets/sunny.jpg';

// 2. Petakan gambar ke dalam struktur data
const weeklyForecast = [
  {
    day: "Sunday",
    temp: "11°",
    icon: "☁️",
    status: "Cloudy",
    heading: "Overcast\n& Calm",
    desc: "Thick cloud cover with stable temperatures. Minimal direct sunlight. Wind speeds are negligible. High around 15°C.",
    chartPoint: 166,
    bgImage: bgCloudy // Mapping aset
  },
  {
    day: "Monday",
    temp: "13°",
    icon: "⛅",
    status: "Partly Cloudy",
    heading: "Breezy\n& Partly Cloudy",
    desc: "A mix of sun and clouds throughout the day. High around 18°C. Wind from the north at 15 km/h.",
    chartPoint: 333,
    bgImage: bgPartlyCloudy
  },
  {
    day: "Tuesday",
    temp: "14°",
    icon: "⛅",
    status: "Partly Cloudy",
    heading: "Mild\nTemperatures",
    desc: "Pleasant weather expected. Humidity remains moderate. Great for outdoor activities before evening.",
    chartPoint: 500,
    bgImage: bgPartlyCloudy
  },
  {
    day: "Wednesday",
    temp: "10°",
    icon: "⛈️",
    status: "Rain",
    heading: "Storm\nwith Heavy Rain",
    desc: "Partly cloudy with occasional heavy showers. High around 30°C. Wind from the east 11 to 21 km/h. Rain chance is 80%.",
    chartPoint: 666,
    bgImage: bgRain
  },
  {
    day: "Thursday",
    temp: "19°",
    icon: "☀️",
    status: "Sunny",
    heading: "Clear\n& Radiant Skies",
    desc: "Not a cloud in sight. High UV index expected during peak hours. Wind is gentle from the south. Temperatures peaking at 25°C.",
    chartPoint: 833,
    bgImage: bgSunny
  },
  {
    day: "Friday",
    temp: "12°",
    icon: "☁️",
    status: "Cloudy",
    heading: "Dropping\nTemperatures",
    desc: "Cloud cover returns, bringing cooler temperatures heading into the weekend. Low chance of precipitation.",
    chartPoint: 1000,
    bgImage: bgCloudy
  }
];

export default function WeatherDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(3); 
  const activeData = weeklyForecast[activeIndex];

  useEffect(() => {
    // PRELOADER: Mengunduh semua gambar ke cache browser secara diam-diam
    weeklyForecast.forEach((day) => {
      const img = new Image();
      img.src = day.bgImage;
    });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="min-h-screen text-slate-50 px-4 pb-4 pt-4 md:px-8 md:pb-8 md:pt-4 font-sans overflow-hidden bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out relative"
      style={{ backgroundImage: `url("${activeData.bgImage}")` }}
    >
      <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] z-0 transition-all duration-700"></div>

      <div className="max-w-[1440px] mx-auto h-full flex flex-col relative z-10">
        
        {/* NAVBAR */}
        <header className="flex justify-between items-center w-full mb-8">
          <img 
            src={logoALV} 
            alt="ALV Logo" 
            className="h-14 w-auto object-contain" 
            style={{ 
              filter: "drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 1px 0 white) drop-shadow(0 -1px 0 white)" 
            }}
          />
          
          <nav className="flex items-center gap-6 bg-black/20 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md">
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
          <section className="lg:col-span-8 flex flex-col justify-between h-full min-h-[600px]">
            {isLoading ? (
              <SkeletonLeft />
            ) : (
              <ActualLeftContent 
                activeData={activeData} 
                activeIndex={activeIndex} 
                setActiveIndex={setActiveIndex} 
              />
            )}
          </section>

          <section className="lg:col-span-4 flex flex-col gap-4">
            {isLoading ? <SkeletonRight /> : <ActualRightContent />}
          </section>
        </main>
      </div>
    </div>
  );
}

// --- KOMPONEN KONTEN AKTIF ---

function ActualLeftContent({ activeData, activeIndex, setActiveIndex }) {
  return (
    // Fragment diganti dengan flex-col dan gap pasti untuk membunuh sifat justify-between dari parent
    <div className="flex flex-col gap-12 lg:gap-16">
      
      {/* Bagian Teks */}
      <div className="max-w-2xl transition-all duration-300">
        <h2 className="text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 whitespace-pre-line drop-shadow-lg">
          {activeData.heading}
        </h2>
        
        {/* min-h-[80px] dihapus agar jarak dengan elemen bawah murni ditentukan oleh gap parent */}
        <p className="text-sm lg:text-base text-slate-200 leading-relaxed max-w-lg drop-shadow-md">
          {activeData.desc}
        </p>
      </div>

      {/* Bagian Grafik & Deretan Suhu */}
      <div className="w-full">
        <div className="flex justify-between items-center text-xl font-medium mb-4 px-2">
          {weeklyForecast.map((item, index) => (
            <div key={`temp-${index}`} className={`flex items-center gap-2 transition-all duration-300 ${index === activeIndex ? 'text-2xl font-bold drop-shadow-md' : 'opacity-70'}`}>
              {item.temp} <span className={index === activeIndex ? "text-white text-base drop-shadow-md" : "text-slate-300 text-sm"}>{item.icon}</span>
            </div>
          ))}
        </div>
        
        <div className="w-full h-24 relative mb-4">
          <svg viewBox="0 0 1166 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <path 
              d="M166,50 Q333,20 500,60 T833,80 T1166,30" 
              fill="none" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="3" 
              strokeLinecap="round"
            />
            <circle cx={activeData.chartPoint} cy="70" r="6" fill="#fff" className="shadow-[0_0_20px_#fff] transition-all duration-500 ease-in-out" />
            <line x1={activeData.chartPoint} y1="70" x2={activeData.chartPoint} y2="100" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="4 4" className="transition-all duration-500 ease-in-out" />
          </svg>
        </div>

        <div className="flex justify-between items-center text-sm px-2 font-medium">
          {weeklyForecast.map((item, index) => (
            <button 
              key={`day-${index}`}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer transition-all duration-300 pb-1 hover:text-white drop-shadow-md ${index === activeIndex ? 'text-white font-bold border-b-2 border-white' : 'text-slate-300 border-b-2 border-transparent'}`}
            >
              {item.day}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

function ActualRightContent() {
  return (
    <>
      {/* Kartu Utama - Diubah menjadi flex-row dengan justify-between */}
      <div className="bg-black/20 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden flex justify-between items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        
        {/* Kolom Kiri: Lokasi & Metrik */}
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex items-center gap-2 text-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <span className="font-semibold tracking-wide text-lg">Central Jakarta</span>
          </div>
          
          <div className="flex flex-col gap-3 text-sm text-slate-200 font-medium">
            <div className="flex items-center gap-3 drop-shadow-md"><span className="text-white text-base">🌬️</span> 19 km/h Wind</div>
            <div className="flex items-center gap-3 drop-shadow-md"><span className="text-white text-base">💧</span> 40% Rain</div>
            <div className="flex items-center gap-3 drop-shadow-md"><span className="text-white text-base">👁️</span> 15 km Vis</div>
          </div>
        </div>

        {/* Kolom Kanan: Suhu (Di-resize sedikit agar proporsional) */}
        <div className="text-[5.5rem] leading-none font-bold tracking-tighter drop-shadow-lg relative z-10 text-right">
          10°<span className="text-[3rem] font-normal">C</span>
        </div>
      </div>

      <LocationCard city="North Jakarta" status="Mostly Sunny" temp="12°" icon="⛅" />
      <LocationCard city="Bandung" status="Cloudy" temp="10°" icon="☁️" />
      <LocationCard city="South Jakarta" status="Sunny" temp="14°" icon="☀️" />
    </>
  );
}

function LocationCard({ city, status, temp, icon }) {
  return (
    <div className="bg-black/10 backdrop-blur-lg border border-white/10 rounded-3xl p-6 flex justify-between items-center hover:bg-white/10 transition-colors cursor-pointer shadow-lg">
      <div>
        <p className="text-xs text-slate-300 mb-1">Indonesia</p>
        <h3 className="text-lg font-semibold drop-shadow-md">{city}</h3>
        <p className="text-sm text-slate-300 drop-shadow-md">{status}</p>
      </div>
      <div className="flex items-center gap-3 drop-shadow-lg">
        <span className="text-4xl font-light">{temp}</span>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

// --- KOMPONEN SKELETON ---

function SkeletonLeft() {
  return (
    <div className="animate-pulse flex flex-col justify-between h-full relative z-10">
      <div>
        <div className="h-8 w-40 bg-white/20 rounded-full mb-6"></div>
        <div className="h-24 w-3/4 bg-white/20 rounded-2xl mb-4"></div>
        <div className="h-24 w-1/2 bg-white/20 rounded-2xl mb-8"></div>
        <div className="space-y-3">
          <div className="h-4 w-full bg-white/20 rounded"></div>
          <div className="h-4 w-5/6 bg-white/20 rounded"></div>
          <div className="h-4 w-4/6 bg-white/20 rounded"></div>
        </div>
      </div>
      <div className="mt-auto pt-12">
        <div className="h-8 w-full bg-white/20 rounded mb-4"></div>
        <div className="h-24 w-full bg-white/10 rounded mb-4"></div>
        <div className="h-6 w-full bg-white/20 rounded"></div>
      </div>
    </div>
  );
}

function SkeletonRight() {
  return (
    <div className="animate-pulse flex flex-col gap-4 relative z-10">
      <div className="h-[300px] w-full bg-white/10 border border-white/10 rounded-[2rem]"></div>
      <div className="h-[120px] w-full bg-white/10 border border-white/10 rounded-3xl"></div>
      <div className="h-[120px] w-full bg-white/10 border border-white/10 rounded-3xl"></div>
      <div className="h-[120px] w-full bg-white/10 border border-white/10 rounded-3xl"></div>
    </div>
  );
}