import { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Loader2, Camera } from 'lucide-react';

interface UploadSectionProps {
  onAnalyze: (file: File) => Promise<void>;
  isLoading: boolean;
}

export default function UploadSection({ onAnalyze, isLoading }: UploadSectionProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    setError(null);
    if (!selectedFile.type.startsWith('image/')) {
      setError('Please upload a valid image file. We will convert it automatically if needed.');
      return;
    }
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  return (
    <div className="bg-solar-800 border border-solar-border rounded-2xl p-6 shadow-xl h-full flex flex-col relative">
      {isLoading && (
        <div className="absolute inset-0 bg-solar-900/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-2xl">
           <Loader2 className="w-12 h-12 text-solar-accent animate-spin mb-4" />
           <p className="text-white font-medium text-lg animate-pulse">Running Neural Networks...</p>
        </div>
      )}
      <h3 className="text-2xl font-bold text-white mb-6">Upload Image</h3>
      
      {!file ? (
        <div className="flex flex-col flex-grow gap-4">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all flex-grow
              ${isDragging ? 'border-solar-accent bg-solar-accent/5 scale-[1.02]' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/30'}
            `}
          >
            <div className="w-16 h-16 bg-solar-900 rounded-full flex items-center justify-center mb-4 shadow-inner">
              <UploadCloud className={`w-8 h-8 ${isDragging ? 'text-solar-accent' : 'text-slate-400'}`} />
            </div>
            <p className="text-lg font-medium text-slate-200 mb-1">Drag & drop your panel image</p>
            <p className="text-sm text-slate-400 mb-4">or click to browse files</p>
            
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2 mt-2">
              <p className="text-xs font-semibold text-amber-500 uppercase tracking-wider mb-1">Important Note</p>
              <p className="text-sm text-amber-200/80">Please insert solar panel images only for accurate analysis.</p>
            </div>
            
            {error && <p className="text-red-400 text-sm mt-4 font-medium">{error}</p>}
          </div>

          <button
            onClick={() => cameraInputRef.current?.click()}
            className="lg:hidden w-full py-4 bg-solar-900/50 border border-slate-600 rounded-xl font-bold text-white flex items-center justify-center gap-3 hover:bg-slate-700 transition-colors shadow-lg shadow-black/20"
          >
            <Camera className="w-6 h-6 text-solar-accent" />
            Take Photo with Camera
          </button>
        </div>
      ) : (
        <div className="flex flex-col flex-grow">
          <div className="relative w-full h-64 bg-solar-900 rounded-xl overflow-hidden mb-6 border border-solar-border flex-shrink-0 group">
            <img src={preview!} alt="Preview" className="w-full h-full object-contain" />
            <button 
              onClick={clearFile}
              disabled={isLoading}
              className="absolute top-2 right-2 p-2 bg-solar-900/60 hover:bg-red-500/80 text-white rounded-full transition-colors backdrop-blur-md opacity-0 group-hover:opacity-100 disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-6 p-4 bg-solar-900/50 rounded-lg border border-solar-border flex-shrink-0">
            <ImageIcon className="w-8 h-8 text-solar-accent" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-200 truncate">{file.name}</p>
              <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>

          <button
            onClick={() => onAnalyze(file)}
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg mt-auto
              ${isLoading 
                ? 'bg-solar-800 text-slate-400 border border-slate-600 cursor-not-allowed' 
                : 'bg-solar-accent hover:bg-emerald-400 text-solar-900 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02]'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Analyzing with Deep Learning...
              </>
            ) : (
              'Analyze Image'
            )}
          </button>
        </div>
      )}

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={(e) => e.target.files && handleFile(e.target.files[0])} 
        accept="image/*" 
        className="hidden" 
      />

      <input 
        type="file" 
        ref={cameraInputRef} 
        onChange={(e) => e.target.files && handleFile(e.target.files[0])} 
        accept="image/*" 
        capture="environment"
        className="hidden" 
      />
    </div>
  );
}
