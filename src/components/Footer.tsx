import { Terminal, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-solar-900 border-t border-solar-border py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-2">Solar Panel Dust & Snow Detection</h3>
            <p className="text-slate-400">Powered by Keras CNN + YOLOv8</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-slate-300 font-medium text-lg">Developed by A Paritosh</p>
            <p className="text-slate-500 text-sm mb-4">Bhubaneswar, India</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-solar-accent transition-colors p-2 bg-solar-800 rounded-full hover:bg-solar-900">
                <Terminal className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-solar-accent transition-colors p-2 bg-solar-800 rounded-full hover:bg-solar-900">
                <Globe className="h-5 w-5" />
              </a>
              <a href="mailto:contact@example.com" className="text-slate-400 hover:text-solar-accent transition-colors p-2 bg-solar-800 rounded-full hover:bg-solar-900">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-solar-border text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} A Paritosh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
