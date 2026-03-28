import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ModelInfo from './components/ModelInfo';
import UploadSection from './components/UploadSection';
import ResultsCard from './components/ResultsCard';
import Footer from './components/Footer';
import { predictSolarCondition, type PredictionResponse } from './api/predict';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await predictSolarCondition(file);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "An error occurred during prediction.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-solar-900 min-h-screen selection:bg-solar-accent/30 selection:text-white">
      <Navbar />
      <Hero />
      <ModelInfo />

      <section id="detector" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Try the Detector</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              Upload an image of a solar panel to instantly see prediction results from the YOLOv8 and CNN models.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Upload Area */}
            <div className="h-[600px]">
              <UploadSection onAnalyze={handleAnalyze} isLoading={isLoading} />
            </div>

            {/* Results Area */}
            <div className="h-[600px]">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-6 text-red-500 mb-6 flex items-start gap-3">
                  <span className="font-bold">Error:</span> {error}
                </div>
              )}

              <AnimatePresence mode="wait">
                {result ? (
                  <ResultsCard key="result" data={result} />
                ) : (
                  <motion.div 
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-solar-800/50 border border-solar-border border-dashed rounded-2xl p-6 h-full flex items-center justify-center text-center text-slate-500"
                  >
                    <div>
                      <div className="w-16 h-16 border-2 border-slate-600 rounded-full mx-auto mb-4 border-dashed animate-pulse" />
                      <p className="text-lg">Waiting for image analysis...</p>
                      <p className="text-sm mt-2">Prediction results will appear here.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default App;
