import { HeartPulse, Languages, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  language: 'en' | 'kn';
  setLanguage: (lang: 'en' | 'kn') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ language, setLanguage, darkMode, setDarkMode }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
          <HeartPulse size={32} strokeWidth={2.5} />
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'en' ? 'First Aid' : 'ಪ್ರಥಮ ಚಿಕಿತ್ಸೆ'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'kn' : 'en')}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Language"
          >
            <Languages size={18} />
            <span className="text-sm font-medium">{language === 'en' ? 'ಕನ್ನಡ' : 'English'}</span>
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
