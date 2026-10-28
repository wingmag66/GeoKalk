import { useState } from 'react';

type AngleUnit = 'degrees' | 'radians';

export default function TrigonometryTab() {
  const [angleInput, setAngleInput] = useState<string>('45');
  const [unit, setUnit] = useState<AngleUnit>('degrees');

  const angle = parseFloat(angleInput) || 0;
  const angleRad = unit === 'degrees' ? (angle * Math.PI) / 180 : angle;
  const angleDeg = unit === 'degrees' ? angle : (angle * 180) / Math.PI;

  const sinVal = Math.sin(angleRad);
  const cosVal = Math.cos(angleRad);
  const tanVal = Math.tan(angleRad);
  const cotVal = Math.cos(angleRad) / Math.sin(angleRad);

  const isTanUndefined = Math.abs(cosVal) < 1e-10;
  const isCotUndefined = Math.abs(sinVal) < 1e-10;

  const formatResult = (val: number, isUndefined: boolean): string => {
    if (isUndefined) return '∞ (не определено)';
    if (!isFinite(val)) return '∞';
    return val.toFixed(10).replace(/\.?0+$/, '');
  };

  // Обратные функции
  const [inverseInput, setInverseInput] = useState<string>('0.5');
  const invVal = parseFloat(inverseInput) || 0;

  const asinResult = Math.abs(invVal) <= 1 ? (Math.asin(invVal) * 180) / Math.PI : null;
  const acosResult = Math.abs(invVal) <= 1 ? (Math.acos(invVal) * 180) / Math.PI : null;
  const atanResult = (Math.atan(invVal) * 180) / Math.PI;
  const acotResult = (Math.atan(1 / invVal) * 180) / Math.PI;

  // Быстрые значения
  const quickAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 270, 360];

  return (
    <div className="space-y-6">
      {/* Прямые тригонометрические функции */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">
          📐 Тригонометрические функции
        </h2>

        {/* Ввод угла */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-sm text-gray-400 mb-1">Угол</label>
            <input
              type="number"
              value={angleInput}
              onChange={(e) => setAngleInput(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white text-lg focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
              placeholder="Введите угол"
              step="any"
            />
          </div>
          <div className="flex items-end">
            <div className="flex bg-black/30 rounded-lg border border-white/20 overflow-hidden">
              <button
                onClick={() => setUnit('degrees')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  unit === 'degrees' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Градусы (°)
              </button>
              <button
                onClick={() => setUnit('radians')}
                className={`px-4 py-3 text-sm font-medium transition-colors ${
                  unit === 'radians' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Радианы (rad)
              </button>
            </div>
          </div>
        </div>

        {/* Быстрый выбор углов */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-2">Быстрый выбор:</p>
          <div className="flex flex-wrap gap-2">
            {quickAngles.map((a) => (
              <button
                key={a}
                onClick={() => {
                  setAngleInput(String(a));
                  setUnit('degrees');
                }}
                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 transition-colors"
              >
                {a}°
              </button>
            ))}
          </div>
        </div>

        {/* Результаты */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ResultCard
            label="Синус"
            formula="sin(α)"
            value={formatResult(sinVal, false)}
            color="green"
          />
          <ResultCard
            label="Косинус"
            formula="cos(α)"
            value={formatResult(cosVal, false)}
            color="blue"
          />
          <ResultCard
            label="Тангенс"
            formula="tan(α) = sin(α)/cos(α)"
            value={formatResult(tanVal, isTanUndefined)}
            color="orange"
          />
          <ResultCard
            label="Котангенс"
            formula="cot(α) = cos(α)/sin(α)"
            value={formatResult(cotVal, isCotUndefined)}
            color="purple"
          />
        </div>

        {/* Дополнительная информация */}
        <div className="mt-4 p-3 bg-black/20 rounded-lg border border-white/5">
          <p className="text-xs text-gray-400">
            <span className="text-blue-300">α</span> = {angleDeg.toFixed(4)}° ={' '}
            {angleRad.toFixed(6)} рад
          </p>
          <p className="text-xs text-gray-400 mt-1">
            sin²(α) + cos²(α) = {(sinVal ** 2 + cosVal ** 2).toFixed(10)}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            tan(α) × cot(α) = {!isTanUndefined && !isCotUndefined ? (tanVal * cotVal).toFixed(10) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Обратные тригонометрические функции */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-green-300">
          🔄 Обратные тригонометрические функции
        </h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Значение</label>
          <input
            type="number"
            value={inverseInput}
            onChange={(e) => setInverseInput(e.target.value)}
            className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white text-lg focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400"
            placeholder="Введите значение"
            step="any"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ResultCard
            label="Арксинус"
            formula="arcsin(x)"
            value={asinResult !== null ? `${asinResult.toFixed(6)}°` : 'Не определено (|x| > 1)'}
            color="green"
          />
          <ResultCard
            label="Арккосинус"
            formula="arccos(x)"
            value={acosResult !== null ? `${acosResult.toFixed(6)}°` : 'Не определено (|x| > 1)'}
            color="blue"
          />
          <ResultCard
            label="Арктангенс"
            formula="arctan(x)"
            value={`${atanResult.toFixed(6)}°`}
            color="orange"
          />
          <ResultCard
            label="Арккотангенс"
            formula="arccot(x)"
            value={invVal !== 0 ? `${acotResult.toFixed(6)}°` : '90°'}
            color="purple"
          />
        </div>
      </div>

      {/* Таблица значений */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">
          📊 Таблица значений
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-2 px-3 text-left text-gray-400">Угол</th>
                <th className="py-2 px-3 text-center text-green-400">sin</th>
                <th className="py-2 px-3 text-center text-blue-400">cos</th>
                <th className="py-2 px-3 text-center text-orange-400">tan</th>
                <th className="py-2 px-3 text-center text-purple-400">cot</th>
              </tr>
            </thead>
            <tbody>
              {[0, 15, 30, 45, 60, 75, 90].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const s = Math.sin(rad);
                const c = Math.cos(rad);
                const t = Math.tan(rad);
                const ct = c / s;
                return (
                  <tr key={deg} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-2 px-3 text-gray-300">{deg}°</td>
                    <td className="py-2 px-3 text-center text-green-300">{s.toFixed(6)}</td>
                    <td className="py-2 px-3 text-center text-blue-300">{c.toFixed(6)}</td>
                    <td className="py-2 px-3 text-center text-orange-300">
                      {Math.abs(c) < 1e-10 ? '∞' : t.toFixed(6)}
                    </td>
                    <td className="py-2 px-3 text-center text-purple-300">
                      {Math.abs(s) < 1e-10 ? '∞' : ct.toFixed(6)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ResultCard({
  label,
  formula,
  value,
  color,
}: {
  label: string;
  formula: string;
  value: string;
  color: 'green' | 'blue' | 'orange' | 'purple';
}) {
  const colorClasses = {
    green: 'border-green-500/30 bg-green-500/5',
    blue: 'border-blue-500/30 bg-blue-500/5',
    orange: 'border-orange-500/30 bg-orange-500/5',
    purple: 'border-purple-500/30 bg-purple-500/5',
  };

  const textColor = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    purple: 'text-purple-400',
  };

  return (
    <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`font-semibold ${textColor[color]}`}>{label}</p>
          <p className="text-xs text-gray-500 mt-0.5">{formula}</p>
        </div>
      </div>
      <p className="text-lg font-mono mt-2 text-white break-all">{value}</p>
    </div>
  );
}
