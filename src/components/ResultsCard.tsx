import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import type { PredictionResponse } from '../api/predict';

export default function ResultsCard({ data }: { data: PredictionResponse }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-solar-800 border border-solar-border rounded-2xl p-6 shadow-2xl relative overflow-hidden h-full flex flex-col"
    >
      <div className={`absolute top-0 left-0 w-1 h-full ${
        data.condition === 'Clean' ? 'bg-solar-accent' : 
        data.condition === 'Snow' ? 'bg-blue-300' : 'bg-orange-500'
      }`} />

      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Camera className="w-5 h-5 text-slate-400" /> Detection Output
      </h3>

      <div className="flex-1 w-full flex items-center justify-center bg-solar-900 rounded-xl border border-solar-border overflow-hidden">
        {data.annotated_image ? (
          <img 
            src={data.annotated_image.startsWith("data:image") ? data.annotated_image : `data:image/jpeg;base64,${data.annotated_image}`} 
            alt="Annotated Inference Result" 
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-slate-500 text-center p-6">
            <p className="font-semibold text-lg text-slate-400 mb-2">No Image Found</p>
            <p className="text-sm">The backend successfully analyzed the image ({data.condition}), but did not return the annotated image.</p>
          </div>
        )}
      </div>
      
    </motion.div>
  );
}
