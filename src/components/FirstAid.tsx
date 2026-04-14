import { useState } from 'react';
import { Search, Flame, Droplet, Bone, HeartPulse, AlertCircle, Activity, CheckCircle2, XCircle, Volume2 } from 'lucide-react';
import { firstAidData } from '../data/firstAidData';

interface FirstAidProps {
  language: 'en' | 'kn';
}

const iconMap: Record<string, React.ReactNode> = {
  Flame: <Flame className="text-orange-500" size={24} />,
  Droplet: <Droplet className="text-red-500" size={24} />,
  Bone: <Bone className="text-slate-500 dark:text-slate-300" size={24} />,
  HeartPulse: <HeartPulse className="text-rose-500" size={24} />,
  AlertCircle: <AlertCircle className="text-yellow-500" size={24} />,
  Activity: <Activity className="text-green-500" size={24} />,
};

export default function FirstAid({ language }: FirstAidProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const t = {
    en: {
      title: 'First Aid Guide',
      search: 'Search emergencies...',
      instructions: 'Instructions',
      dos: "Do's",
      donts: "Don'ts",
      back: 'Back to topics',
      readAloud: 'Read Aloud',
      stopReading: 'Stop Reading',
    },
    kn: {
      title: 'ಪ್ರಥಮ ಚಿಕಿತ್ಸಾ ಮಾರ್ಗದರ್ಶಿ',
      search: 'ತುರ್ತು ಪರಿಸ್ಥಿತಿಗಳನ್ನು ಹುಡುಕಿ...',
      instructions: 'ಸೂಚನೆಗಳು',
      dos: 'ಮಾಡಬೇಕಾದದ್ದು',
      donts: 'ಮಾಡಬಾರದದ್ದು',
      back: 'ವಿಷಯಗಳಿಗೆ ಹಿಂತಿರುಗಿ',
      readAloud: 'ಗಟ್ಟಿಯಾಗಿ ಓದಿ',
      stopReading: 'ಓದುವುದನ್ನು ನಿಲ್ಲಿಸಿ',
    },
  };

  const filteredData = firstAidData.filter((topic) =>
    topic.title[language].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeTopic = firstAidData.find((t) => t.id === selectedTopic);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language === 'en' ? 'en-US' : 'kn-IN';
        utterance.onend = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-200">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <HeartPulse className="text-red-500" />
          {t[language].title}
        </h2>

        {!selectedTopic ? (
          <>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg leading-5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 sm:text-sm transition-colors"
                placeholder={t[language].search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredData.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic.id)}
                  className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-red-500 dark:hover:border-red-500 hover:shadow-md transition-all group"
                >
                  <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                    {iconMap[topic.icon]}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-center">
                    {topic.title[language]}
                  </h3>
                </button>
              ))}
              {filteredData.length === 0 && (
                <div className="col-span-full text-center py-8 text-slate-500 dark:text-slate-400">
                  No topics found.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <button
              onClick={() => {
                setSelectedTopic(null);
                if (isSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              className="text-red-600 dark:text-red-400 font-medium hover:underline mb-6 flex items-center gap-1"
            >
              &larr; {t[language].back}
            </button>

            {activeTopic && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-full">
                      {iconMap[activeTopic.icon]}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                      {activeTopic.title[language]}
                    </h3>
                  </div>
                  <button
                    onClick={() => handleSpeak(activeTopic.instructions[language].join('. '))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      isSpeaking
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    <Volume2 size={20} className={isSpeaking ? 'animate-pulse' : ''} />
                    <span className="hidden sm:inline">
                      {isSpeaking ? t[language].stopReading : t[language].readAloud}
                    </span>
                  </button>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 w-8 h-8 rounded-full flex items-center justify-center">
                        1
                      </span>
                      {t[language].instructions}
                    </h4>
                    <ul className="space-y-3">
                      {activeTopic.instructions[language].map((instruction, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-500 shrink-0" />
                          <span className="leading-relaxed">{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <section className="bg-green-50 dark:bg-green-900/10 p-5 rounded-xl border border-green-100 dark:border-green-900/30">
                      <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="text-green-600 dark:text-green-500" />
                        {t[language].dos}
                      </h4>
                      <ul className="space-y-2">
                        {activeTopic.dos[language].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-green-700 dark:text-green-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="bg-red-50 dark:bg-red-900/10 p-5 rounded-xl border border-red-100 dark:border-red-900/30">
                      <h4 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2">
                        <XCircle className="text-red-600 dark:text-red-500" />
                        {t[language].donts}
                      </h4>
                      <ul className="space-y-2">
                        {activeTopic.donts[language].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-red-700 dark:text-red-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
