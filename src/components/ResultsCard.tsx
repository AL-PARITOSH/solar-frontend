import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Snowflake, BarChart3, Camera } from 'lucide-react';
import type { PredictionResponse } from '../api/predict';

export default function ResultsCard({ data }: { data: PredictionResponse }) {
  const isClean = data.condition === "Clean";
  
  const getSeverityColor = (level: string) => {
    switch(level) {
      case 'Low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'Heavy': return 'bg-red-500/20 text-red-500 border-red-500/30';
      default: return 'bg-slate-700/50 text-slate-400 border-slate-600';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-solar-800 border border-solar-border rounded-2xl p-6 shadow-2xl relative overflow-hidden flex flex-col h-full"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${
        data.condition === 'Clean' ? 'bg-solar-accent' : 
        data.condition === 'Snow' ? 'bg-blue-300' : 'bg-orange-500'
      }`} />

      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-slate-400" /> Analysis Results
      </h3>
      
      {data.annotated_image && (
        <div className="w-full bg-black/40 rounded-xl border border-solar-border overflow-hidden mb-8 max-h-[250px] flex items-center justify-center relative">
            <img 
              src={data.annotated_image.startsWith("data:image") ? data.annotated_image : `data:image/jpeg;base64,${data.annotated_image}`} 
              alt="Annotated Inference Result" 
              className="w-full h-full object-contain p-2"
            />
            <div className="absolute top-2 right-2 bg-solar-900/80 px-2 py-1 rounded text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1 backdrop-blur-sm">
                <Camera className="w-3 h-3" /> Live Detection
            </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-solar-border">
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Primary Condition</p>
            <div className="flex items-center gap-3">
              {data.condition === 'Clean' && <CheckCircle2 className="w-8 h-8 text-solar-accent" />}
              {(data.condition === 'Dusty' || data.condition === 'Dust') && <AlertTriangle className="w-8 h-8 text-orange-500" />}
              {data.condition === 'Snow' && <Snowflake className="w-8 h-8 text-blue-300" />}
              <span className="text-3xl font-extrabold text-white">{data.condition}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-1">Confidence</p>
            <span className="text-3xl font-bold text-slate-200">
              {(data.condition_confidence * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">Class Probabilities</p>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Clean</span>
              <span className="text-slate-300">{(data.p_clean * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-solar-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${data.p_clean * 100}%` }}
                transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                className="h-full bg-solar-accent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Dust & Dirt</span>
              <span className="text-slate-300">{(data.p_dust * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-solar-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${data.p_dust * 100}%` }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="h-full bg-orange-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-300">Snow</span>
              <span className="text-slate-300">{(data.p_snow * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 w-full bg-solar-900 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${data.p_snow * 100}%` }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                className="h-full bg-blue-300"
              />
            </div>
          </div>
        </div>

        {!isClean && (
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">Severity Level Detected</p>
            <div className="flex gap-4">
              {(data.condition === 'Dusty' || data.condition === 'Dust') && (
                <div className={`px-4 py-2 rounded-lg border font-semibold ${getSeverityColor(data.dust_level)}`}>
                  Dust: {data.dust_level}
                </div>
              )}
              {data.condition === 'Snow' && (
                <div className={`px-4 py-2 rounded-lg border font-semibold ${getSeverityColor(data.snow_level)}`}>
                  Snow: {data.snow_level}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

