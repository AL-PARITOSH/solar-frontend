
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 -left-1/4 md:left-1/4 w-96 h-96 bg-solar-blue/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 -right-1/4 md:right-1/4 w-96 h-96 bg-solar-accent/20 rounded-full blur-[100px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-solar-800/80 border border-solar-border text-solar-accent mb-8 shadow-lg shadow-solar-accent/5">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide">Deep Learning Powered Analysis</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-solar-accent to-solar-blue tracking-tight mb-6">
            Intelligent Solar Panel <br className="hidden md:block"/> Condition Detection
          </h1>
          
          <p className="mt-4 text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            Instantly detect <span className="text-white font-medium">Dust</span>, <span className="text-white font-medium">Snow</span>, and <span className="text-white font-medium">Anomalies</span> on your solar infrastructure using state-of-the-art CNNs and YOLOv8 computer vision.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => document.getElementById('detector')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative flex items-center justify-center gap-2 bg-solar-accent text-solar-900 font-bold text-lg px-8 py-4 rounded-xl overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <Zap className="w-5 h-5 group-hover:animate-pulse" />
              Try the Detector
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a 
              href="#about"
              className="flex items-center justify-center px-8 py-4 rounded-xl border border-solar-border bg-solar-800/50 text-slate-200 font-medium hover:bg-solar-800 transition-colors backdrop-blur-sm"
            >
              Learn How It Works
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
