import { useState, useEffect } from 'react';
import Header from './components/Header';
import EmergencyBar from './components/EmergencyBar';
import FirstAid from './components/FirstAid';
import HospitalFinder from './components/HospitalFinder';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'kn'>('en');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-200 font-sans">
      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <EmergencyBar language={language} />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <FirstAid language={language} />
        <HospitalFinder language={language} />
      </main>

      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-6 mt-12 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>
            {language === 'en'
              ? 'Disclaimer: This application provides basic first aid information and should not replace professional medical advice. Always call emergency services in life-threatening situations.'
              : 'ಹಕ್ಕು ನಿರಾಕರಣೆ: ಈ ಅಪ್ಲಿಕೇಶನ್ ಮೂಲಭೂತ ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಮಾಹಿತಿಯನ್ನು ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ವೃತ್ತಿಪರ ವೈದ್ಯಕೀಯ ಸಲಹೆಯನ್ನು ಬದಲಿಸಬಾರದು. ಜೀವಕ್ಕೆ ಅಪಾಯವಿರುವ ಸಂದರ್ಭಗಳಲ್ಲಿ ಯಾವಾಗಲೂ ತುರ್ತು ಸೇವೆಗಳಿಗೆ ಕರೆ ಮಾಡಿ.'}
          </p>
        </div>
      </footer>
    </div>
  );
}
