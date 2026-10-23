import { useState } from 'react';

type ShapeType = 'rectangle' | 'parallelogram' | 'rhombus' | 'trapezoid' | 'polygon';

export default function DiagonalsTab() {
  const [shape, setShape] = useState<ShapeType>('rectangle');

  // Rectangle
  const [rectA, setRectA] = useState<string>('3');
  const [rectB, setRectB] = useState<string>('4');

  // Parallelogram
  const [paraA, setParaA] = useState<string>('5');
  const [paraB, setParaB] = useState<string>('7');
  const [paraAngle, setParaAngle] = useState<string>('60');

  // Rhombus
  const [rhombD1, setRhombD1] = useState<string>('6');
  const [rhombD2, setRhombD2] = useState<string>('8');

  // Trapezoid
  const [trapA, setTrapA] = useState<string>('10');
  const [trapB, setTrapB] = useState<string>('6');
  const [trapC, setTrapC] = useState<string>('5');
  const [trapD, setTrapD] = useState<string>('4');

  // Regular polygon
  const [polySides, setPolySides] = useState<string>('6');
  const [polySide, setPolySide] = useState<string>('5');

  const shapes: { id: ShapeType; label: string; icon: string }[] = [
    { id: 'rectangle', label: 'Прямоугольник', icon: '▬' },
    { id: 'parallelogram', label: 'Параллелограмм', icon: '◇' },
    { id: 'rhombus', label: 'Ромб', icon: '◆' },
    { id: 'trapezoid', label: 'Трапеция', icon: '⏢' },
    { id: 'polygon', label: 'Многоугольник', icon: '⬡' },
  ];

  return (
    <div className="space-y-6">
      {/* Выбор фигуры */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">
          📏 Расчёт диагоналей фигур
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {shapes.map((s) => (
            <button
              key={s.id}
              onClick={() => setShape(s.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                shape === s.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Rectangle */}
        {shape === 'rectangle' && (
          <RectangleCalc a={rectA} b={rectB} setA={setRectA} setB={setRectB} />
        )}

        {/* Parallelogram */}
        {shape === 'parallelogram' && (
          <ParallelogramCalc
            a={paraA}
            b={paraB}
            angle={paraAngle}
            setA={setParaA}
            setB={setParaB}
            setAngle={setParaAngle}
          />
        )}

        {/* Rhombus */}
        {shape === 'rhombus' && (
          <RhombusCalc d1={rhombD1} d2={rhombD2} setD1={setRhombD1} setD2={setRhombD2} />
        )}

        {/* Trapezoid */}
        {shape === 'trapezoid' && (
          <TrapezoidCalc
            a={trapA}
            b={trapB}
            c={trapC}
            d={trapD}
            setA={setTrapA}
            setB={setTrapB}
            setC={setTrapC}
            setD={setTrapD}
          />
        )}

        {/* Regular Polygon */}
        {shape === 'polygon' && (
          <PolygonCalc sides={polySides} side={polySide} setSides={setPolySides} setSide={setPolySide} />
        )}
      </div>

      {/* Формулы */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">
          📖 Формулы диагоналей
        </h2>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-blue-300 font-semibold">Прямоугольник:</p>
            <p className="font-mono mt-1">d = √(a² + b²)</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-green-300 font-semibold">Параллелограмм:</p>
            <p className="font-mono mt-1">d₁ = √(a² + b² - 2ab·cos(α))</p>
            <p className="font-mono">d₂ = √(a² + b² + 2ab·cos(α))</p>
            <p className="text-xs text-gray-500 mt-1">или d₁² + d₂² = 2(a² + b²)</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-orange-300 font-semibold">Ромб:</p>
            <p className="font-mono mt-1">d₁² + d₂² = 4a²</p>
            <p className="font-mono">a = √((d₁/2)² + (d₂/2)²)</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-purple-300 font-semibold">Правильный n-угольник:</p>
            <p className="font-mono mt-1">dₖ = a · sin(k·π/n) / sin(π/n)</p>
            <p className="text-xs text-gray-500 mt-1">где k = 2, 3, ..., ⌊n/2⌋</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RectangleCalc({
  a, b, setA, setB
}: { a: string; b: string; setA: (v: string) => void; setB: (v: string) => void }) {
  const aVal = parseFloat(a) || 0;
  const bVal = parseFloat(b) || 0;
  const diagonal = Math.sqrt(aVal ** 2 + bVal ** 2);
  const area = aVal * bVal;
  const perimeter = 2 * (aVal + bVal);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Сторона a" value={a} onChange={setA} unit="м" />
        <InputField label="Сторона b" value={b} onChange={setB} unit="м" />
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Результат:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Диагональ d</p>
            <p className="text-xl font-bold text-white mt-1">{diagonal.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Площадь S</p>
            <p className="text-xl font-bold text-white mt-1">{area.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м²</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Периметр P</p>
            <p className="text-xl font-bold text-white mt-1">{perimeter.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
        </div>
      </div>

      {/* Визуализация */}
      <div className="flex justify-center">
        <svg viewBox="0 0 200 150" className="w-48 h-36">
          <rect
            x={50 - (aVal / (aVal + bVal)) * 30}
            y={75 - (bVal / (aVal + bVal)) * 30}
            width={(aVal / (aVal + bVal)) * 100}
            height={(bVal / (aVal + bVal)) * 60}
            fill="none"
            stroke="#60a5fa"
            strokeWidth="2"
          />
          <line
            x1={50 - (aVal / (aVal + bVal)) * 30}
            y1={75 - (bVal / (aVal + bVal)) * 30}
            x2={50 - (aVal / (aVal + bVal)) * 30 + (aVal / (aVal + bVal)) * 100}
            y2={75 - (bVal / (aVal + bVal)) * 30 + (bVal / (aVal + bVal)) * 60}
            stroke="#f59e0b"
            strokeWidth="2"
            strokeDasharray="5,3"
          />
          <text x="100" y="140" textAnchor="middle" fill="#9ca3af" fontSize="10">
            d = {diagonal.toFixed(2)} м
          </text>
        </svg>
      </div>
    </div>
  );
}

function ParallelogramCalc({
  a, b, angle, setA, setB, setAngle
}: {
  a: string; b: string; angle: string;
  setA: (v: string) => void; setB: (v: string) => void; setAngle: (v: string) => void;
}) {
  const aVal = parseFloat(a) || 0;
  const bVal = parseFloat(b) || 0;
  const angleVal = parseFloat(angle) || 0;
  const angleRad = (angleVal * Math.PI) / 180;

  const d1 = Math.sqrt(aVal ** 2 + bVal ** 2 - 2 * aVal * bVal * Math.cos(angleRad));
  const d2 = Math.sqrt(aVal ** 2 + bVal ** 2 + 2 * aVal * bVal * Math.cos(angleRad));
  const area = aVal * bVal * Math.sin(angleRad);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <InputField label="Сторона a" value={a} onChange={setA} unit="м" />
        <InputField label="Сторона b" value={b} onChange={setB} unit="м" />
        <InputField label="Угол α" value={angle} onChange={setAngle} unit="°" />
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Результат:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">Диагональ d₁</p>
            <p className="text-xl font-bold text-white mt-1">{d1.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Диагональ d₂</p>
            <p className="text-xl font-bold text-white mt-1">{d2.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Площадь S</p>
            <p className="text-xl font-bold text-white mt-1">{area.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м²</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Проверка: d₁² + d₂₂ = {(d1 ** 2 + d2 ** 2).toFixed(4)} = 2(a² + b²) = {(2 * (aVal ** 2 + bVal ** 2)).toFixed(4)}
        </p>
      </div>
    </div>
  );
}

function RhombusCalc({
  d1, d2, setD1, setD2
}: { d1: string; d2: string; setD1: (v: string) => void; setD2: (v: string) => void }) {
  const d1Val = parseFloat(d1) || 0;
  const d2Val = parseFloat(d2) || 0;
  const side = Math.sqrt((d1Val / 2) ** 2 + (d2Val / 2) ** 2);
  const area = (d1Val * d2Val) / 2;
  const perimeter = 4 * side;
  const angle1 = (2 * Math.atan(d2Val / d1Val) * 180) / Math.PI;
  const angle2 = 180 - angle1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Диагональ d₁" value={d1} onChange={setD1} unit="м" />
        <InputField label="Диагональ d₂" value={d2} onChange={setD2} unit="м" />
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Результат:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Сторона a</p>
            <p className="text-lg font-bold text-white mt-1">{side.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Площадь S</p>
            <p className="text-lg font-bold text-white mt-1">{area.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м²</p>
          </div>
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">Угол α</p>
            <p className="text-lg font-bold text-white mt-1">{angle1.toFixed(2)}</p>
            <p className="text-xs text-gray-500">°</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Периметр P</p>
            <p className="text-lg font-bold text-white mt-1">{perimeter.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
        </div>
      </div>

      {/* Визуализация ромба */}
      <div className="flex justify-center">
        <svg viewBox="0 0 200 150" className="w-48 h-36">
          <polygon
            points={`100,${75 - d2Val * 3} ${100 + d1Val * 5},75 100,${75 + d2Val * 3} ${100 - d1Val * 5},75`}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2"
          />
          <line x1={100 - d1Val * 5} y1="75" x2={100 + d1Val * 5} y2="75" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
          <line x1="100" y1={75 - d2Val * 3} x2="100" y2={75 + d2Val * 3} stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />
        </svg>
      </div>
    </div>
  );
}

function TrapezoidCalc({
  a, b, c, d, setA, setB, setC, setD
}: {
  a: string; b: string; c: string; d: string;
  setA: (v: string) => void; setB: (v: string) => void; setC: (v: string) => void; setD: (v: string) => void;
}) {
  const aVal = parseFloat(a) || 0; // нижнее основание
  const bVal = parseFloat(b) || 0; // верхнее основание
  const cVal = parseFloat(c) || 0; // левая боковая
  const dVal = parseFloat(d) || 0; // правая боковая

  // Диагонали трапеции по формулам
  // d1² = c² + a² - 2*a*c*cos(B) где B - угол при нижнем основании
  // Используем формулу через стороны
  const diff = aVal - bVal;
  const cosAngle = (cVal ** 2 + diff ** 2 - dVal ** 2) / (2 * cVal * diff || 1);
  const sinAngle = Math.sqrt(Math.max(0, 1 - cosAngle ** 2));
  const height = cVal * sinAngle;

  // Диагонали
  const d1 = Math.sqrt(cVal ** 2 + aVal ** 2 - 2 * aVal * cVal * cosAngle);
  const d2 = Math.sqrt(dVal ** 2 + aVal ** 2 - 2 * aVal * dVal * (diff * cosAngle - cVal * sinAngle ** 2) / (dVal || 1));

  // Площадь
  const area = ((aVal + bVal) / 2) * height;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Основание a (нижн.)" value={a} onChange={setA} unit="м" />
        <InputField label="Основание b (верхн.)" value={b} onChange={setB} unit="м" />
        <InputField label="Боковая c (лев.)" value={c} onChange={setC} unit="м" />
        <InputField label="Боковая d (прав.)" value={d} onChange={setD} unit="м" />
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Результат:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">Диагональ d₁</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(d1) ? d1.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Диагональ d₂</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(d2) ? d2.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Высота h</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(height) ? height.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Площадь S</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(area) ? area.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м²</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolygonCalc({
  sides, side, setSides, setSide
}: {
  sides: string; side: string;
  setSides: (v: string) => void; setSide: (v: string) => void;
}) {
  const n = parseInt(sides) || 3;
  const a = parseFloat(side) || 0;

  // Все диагонали правильного n-угольника
  const diagonals: { k: number; length: number; label: string }[] = [];
  for (let k = 2; k <= Math.floor(n / 2); k++) {
    const d = (a * Math.sin((k * Math.PI) / n)) / Math.sin(Math.PI / n);
    diagonals.push({
      k,
      length: d,
      label: k === 2 ? 'Короткая' : k === Math.floor(n / 2) && n % 2 === 0 ? 'Длинная (главная)' : `d${k}`,
    });
  }

  const area = (n * a ** 2) / (4 * Math.tan(Math.PI / n));
  const perimeter = n * a;
  const totalDiagonals = (n * (n - 3)) / 2;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <InputField label="Кол-во сторон n" value={sides} onChange={setSides} unit="" min={3} />
        <InputField label="Длина стороны a" value={side} onChange={setSide} unit="м" />
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <p className="text-xs text-gray-400 mb-2">Общие данные:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Площадь S</p>
            <p className="text-lg font-bold text-white mt-1">{area.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м²</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Периметр P</p>
            <p className="text-lg font-bold text-white mt-1">{perimeter.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Всего диагоналей</p>
            <p className="text-lg font-bold text-white mt-1">{totalDiagonals}</p>
            <p className="text-xs text-gray-500">шт</p>
          </div>
        </div>

        {diagonals.length > 0 && (
          <>
            <p className="text-xs text-gray-400 mb-2">Длины диагоналей:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {diagonals.map((d) => (
                <div key={d.k} className="p-2 bg-orange-500/10 rounded-lg border border-orange-500/20 flex justify-between items-center">
                  <span className="text-xs text-orange-300">{d.label} (k={d.k})</span>
                  <span className="font-mono text-white">{d.length.toFixed(4)} м</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function InputField({
  label, value, onChange, unit, min
}: {
  label: string; value: string; onChange: (v: string) => void; unit: string; min?: number;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="relative">
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 pr-8"
          step="any"
          min={min}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
