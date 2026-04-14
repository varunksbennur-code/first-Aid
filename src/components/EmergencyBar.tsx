import { Phone } from 'lucide-react';

interface EmergencyBarProps {
  language: 'en' | 'kn';
}

export default function EmergencyBar({ language }: EmergencyBarProps) {
  const t = {
    en: {
      emergency: 'Emergency Quick Access',
      ambulance: 'Ambulance',
      police: 'Police/Emergency',
    },
    kn: {
      emergency: 'ತುರ್ತು ತ್ವರಿತ ಪ್ರವೇಶ',
      ambulance: 'ಆಂಬ್ಯುಲೆನ್ಸ್',
      police: 'ಪೊಲೀಸ್/ತುರ್ತು',
    },
  };

  return (
    <div className="bg-red-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg">
          <Phone className="animate-pulse" />
          <span>{t[language].emergency}</span>
        </div>
        <div className="flex gap-4">
          <a
            href="tel:108"
            className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-50 transition-colors"
          >
            <Phone size={18} />
            108 ({t[language].ambulance})
          </a>
          <a
            href="tel:112"
            className="flex items-center gap-2 bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-50 transition-colors"
          >
            <Phone size={18} />
            112 ({t[language].police})
          </a>
        </div>
      </div>
    </div>
  );
}
