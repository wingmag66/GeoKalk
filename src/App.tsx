import { useState } from 'react';
import TrigonometryTab from './components/TrigonometryTab';
import DiagonalsTab from './components/DiagonalsTab';
import DistanceTab from './components/DistanceTab';
import CoordinatesTab from './components/CoordinatesTab';

type TabType = 'trigonometry' | 'diagonals' | 'distance' | 'coordinates';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('trigonometry');

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'trigonometry', label: 'Тригонометрия', icon: '📐' },
    { id: 'diagonals', label: 'Диагонали', icon: '📏' },
    { id: 'distance', label: 'Расстояния', icon: '📍' },
    { id: 'coordinates', label: 'Координаты', icon: '🌐' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center">
            <span className="text-blue-400">🌍</span> Геодезический Калькулятор
          </h1>
          <p className="text-center text-sm text-gray-400 mt-1">
            Тригонометрия • Диагонали • Расстояния • Координаты
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-10 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-2">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-400 text-blue-400 bg-blue-400/10'
                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'trigonometry' && <TrigonometryTab />}
        {activeTab === 'diagonals' && <DiagonalsTab />}
        {activeTab === 'distance' && <DistanceTab />}
        {activeTab === 'coordinates' && <CoordinatesTab />}
      </main>

      {/* Footer */}
      <footer className="bg-black/30 border-t border-white/10 py-4 mt-8">
        <p className="text-center text-xs text-gray-500">
          Геодезический Калькулятор © 2026 | Все расчёты выполняются локально
        </p>
      </footer>
    </div>
  );
}

export default App;
