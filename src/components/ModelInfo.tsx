
import { Layers, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ModelInfo() {
  return (
    <section id="about" className="py-24 bg-solar-900/50 relative border-y border-solar-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Behind the AI</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Our dual-pipeline architecture ensures high accuracy classification alongside precise object localization to determine condition severity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-solar-800/80 border border-solar-border p-8 rounded-2xl shadow-xl backdrop-blur-sm group"
          >
            <div className="w-14 h-14 bg-solar-blue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-solar-blue/20 transition-colors">
              <Layers className="w-8 h-8 text-solar-blue" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Keras CNN Classifier</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              A deeply layered Convolutional Neural Network trained to perform global condition classification. It computes detailed probability distributions predicting whether a panel is Clean, Dusty, or covered in Snow.
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-solar-blue"/> Primary Feature Extraction</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-solar-blue"/> Condition Probabilities (p_clean, p_dust, p_snow)</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-solar-blue"/> Lightweight & Optimized Architecture</li>
            </ul>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-solar-800/80 border border-solar-border p-8 rounded-2xl shadow-xl backdrop-blur-sm group"
          >
            <div className="w-14 h-14 bg-solar-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-solar-accent/20 transition-colors">
              <Cpu className="w-8 h-8 text-solar-accent" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">YOLOv8 Detection</h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              State-of-the-art YOLO object detection isolates specific regions of occlusion. By measuring bounding box areas against the panel surface, it accurately calculates the severity level (Low, Medium, Heavy).
            </p>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-solar-accent"/> Real-time Object Localization</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-solar-accent"/> Severity Level Computation</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-solar-accent"/> High Precision Bounding Boxes</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
