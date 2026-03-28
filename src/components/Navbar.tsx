import { useState } from 'react';
import { Sun, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-solar-900/80 backdrop-blur-md border-b border-solar-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <Sun className="h-8 w-8 text-solar-accent animate-pulse" />
            <span className="font-bold text-xl tracking-tight text-white">SolarVision ML</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#hero" className="text-slate-300 hover:text-solar-accent transition-colors font-medium">Home</a>
            <a href="#about" className="text-slate-300 hover:text-solar-accent transition-colors font-medium">Model Info</a>
            <a href="#detector" className="text-slate-300 hover:text-solar-accent transition-colors font-medium">Detector</a>
            <button 
              onClick={() => document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-solar-accent hover:bg-emerald-400 text-solar-900 font-semibold px-4 py-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
            >
              Try Detector
            </button>
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-solar-800 border-b border-solar-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#hero" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-solar-accent hover:bg-solar-900 rounded-md">Home</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-solar-accent hover:bg-solar-900 rounded-md">Model Info</a>
            <a href="#detector" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-slate-300 hover:text-solar-accent hover:bg-solar-900 rounded-md">Detector</a>
          </div>
        </div>
      )}
    </nav>
  );
}
