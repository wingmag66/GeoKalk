import { useState } from 'react';

type CalcMode = '2d' | '3d' | 'geodesic' | 'azimuth';

export default function DistanceTab() {
  const [mode, setMode] = useState<CalcMode>('2d');

  // 2D points
  const [x1, setX1] = useState<string>('0');
  const [y1, setY1] = useState<string>('0');
  const [x2, setX2] = useState<string>('3');
  const [y2, setY2] = useState<string>('4');

  // 3D points
  const [x1_3, setX1_3] = useState<string>('0');
  const [y1_3, setY1_3] = useState<string>('0');
  const [z1, setZ1] = useState<string>('0');
  const [x2_3, setX2_3] = useState<string>('1');
  const [y2_3, setY2_3] = useState<string>('2');
  const [z2, setZ2] = useState<string>('2');

  // Geodesic
  const [lat1, setLat1] = useState<string>('55.7558');
  const [lon1, setLon1] = useState<string>('37.6173');
  const [lat2, setLat2] = useState<string>('59.9343');
  const [lon2, setLon2] = useState<string>('30.3351');

  const modes: { id: CalcMode; label: string; icon: string }[] = [
    { id: '2d', label: '2D расстояние', icon: '📐' },
    { id: '3d', label: '3D расстояние', icon: '🧊' },
    { id: 'geodesic', label: 'Геодезическое', icon: '🌍' },
    { id: 'azimuth', label: 'Дирекционный угол', icon: '🧭' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">
          📍 Расчёт расстояний
        </h2>

        <div className="flex flex-wrap gap-2 mb-6">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                mode === m.id
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {mode === '2d' && (
          <Distance2D x1={x1} y1={y1} x2={x2} y2={y2} setX1={setX1} setY1={setY1} setX2={setX2} setY2={setY2} />
        )}
        {mode === '3d' && (
          <Distance3D
            x1={x1_3} y1={y1_3} z1={z1} x2={x2_3} y2={y2_3} z2={z2}
            setX1={setX1_3} setY1={setY1_3} setZ1={setZ1} setX2={setX2_3} setY2={setY2_3} setZ2={setZ2}
          />
        )}
        {mode === 'geodesic' && (
          <GeodesicCalc
            lat1={lat1} lon1={lon1} lat2={lat2} lon2={lon2}
            setLat1={setLat1} setLon1={setLon1} setLat2={setLat2} setLon2={setLon2}
          />
        )}
        {mode === 'azimuth' && (
          <AzimuthCalc x1={x1} y1={y1} x2={x2} y2={y2} setX1={setX1} setY1={setY1} setX2={setX2} setY2={setY2} />
        )}
      </div>

      {/* Формулы */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">
          📖 Формулы
        </h2>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-blue-300 font-semibold">Расстояние 2D:</p>
            <p className="font-mono mt-1">d = √((x₂-x₁)² + (y₂-y₁)²)</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-green-300 font-semibold">Расстояние 3D:</p>
            <p className="font-mono mt-1">d = √((x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²)</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-orange-300 font-semibold">Геодезическое (формула Винсенти / Haversine):</p>
            <p className="font-mono mt-1">a = sin²(Δφ/2) + cos(φ₁)·cos(φ₂)·sin²(Δλ/2)</p>
            <p className="font-mono">d = 2R·arctan2(√a, √(1-a))</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-purple-300 font-semibold">Дирекционный угол:</p>
            <p className="font-mono mt-1">α = arctan(Δy/Δx)</p>
            <p className="text-xs text-gray-500 mt-1">С учётом четверти по знакам Δx, Δy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Distance2D({
  x1, y1, x2, y2, setX1, setY1, setX2, setY2
}: {
  x1: string; y1: string; x2: string; y2: string;
  setX1: (v: string) => void; setY1: (v: string) => void;
  setX2: (v: string) => void; setY2: (v: string) => void;
}) {
  const x1v = parseFloat(x1) || 0;
  const y1v = parseFloat(y1) || 0;
  const x2v = parseFloat(x2) || 0;
  const y2v = parseFloat(y2) || 0;

  const dx = x2v - x1v;
  const dy = y2v - y1v;
  const dist = Math.sqrt(dx ** 2 + dy ** 2);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-xs text-blue-300 mb-2">Точка A</p>
          <InputField label="X₁" value={x1} onChange={setX1} />
          <div className="mt-2">
            <InputField label="Y₁" value={y1} onChange={setY1} />
          </div>
        </div>
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-xs text-green-300 mb-2">Точка B</p>
          <InputField label="X₂" value={x2} onChange={setX2} />
          <div className="mt-2">
            <InputField label="Y₂" value={y2} onChange={setY2} />
          </div>
        </div>
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">ΔX</p>
            <p className="text-lg font-bold text-white mt-1">{dx.toFixed(4)}</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">ΔY</p>
            <p className="text-lg font-bold text-white mt-1">{dy.toFixed(4)}</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Расстояние d</p>
            <p className="text-lg font-bold text-white mt-1">{dist.toFixed(4)}</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Угол α</p>
            <p className="text-lg font-bold text-white mt-1">{angle.toFixed(2)}°</p>
          </div>
        </div>
      </div>

      {/* Визуализация */}
      <div className="flex justify-center">
        <svg viewBox="0 0 200 200" className="w-48 h-48 bg-black/20 rounded-lg">
          {/* Grid */}
          <line x1="0" y1="100" x2="200" y2="100" stroke="#333" strokeWidth="0.5" />
          <line x1="100" y1="0" x2="100" y2="200" stroke="#333" strokeWidth="0.5" />
          {/* Line between points */}
          <line
            x1={100 + x1v * 15}
            y1={100 - y1v * 15}
            x2={100 + x2v * 15}
            y2={100 - y2v * 15}
            stroke="#60a5fa"
            strokeWidth="2"
          />
          {/* Points */}
          <circle cx={100 + x1v * 15} cy={100 - y1v * 15} r="4" fill="#f59e0b" />
          <circle cx={100 + x2v * 15} cy={100 - y2v * 15} r="4" fill="#10b981" />
          <text x={100 + x1v * 15 + 8} y={100 - y1v * 15 - 5} fill="#f59e0b" fontSize="10">A</text>
          <text x={100 + x2v * 15 + 8} y={100 - y2v * 15 - 5} fill="#10b981" fontSize="10">B</text>
        </svg>
      </div>
    </div>
  );
}

function Distance3D({
  x1, y1, z1, x2, y2, z2, setX1, setY1, setZ1, setX2, setY2, setZ2
}: {
  x1: string; y1: string; z1: string; x2: string; y2: string; z2: string;
  setX1: (v: string) => void; setY1: (v: string) => void; setZ1: (v: string) => void;
  setX2: (v: string) => void; setY2: (v: string) => void; setZ2: (v: string) => void;
}) {
  const x1v = parseFloat(x1) || 0;
  const y1v = parseFloat(y1) || 0;
  const z1v = parseFloat(z1) || 0;
  const x2v = parseFloat(x2) || 0;
  const y2v = parseFloat(y2) || 0;
  const z2v = parseFloat(z2) || 0;

  const dx = x2v - x1v;
  const dy = y2v - y1v;
  const dz = z2v - z1v;
  const dist3d = Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
  const dist2d = Math.sqrt(dx ** 2 + dy ** 2);
  const slopeAngle = (Math.atan2(dz, dist2d) * 180) / Math.PI;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-xs text-blue-300 mb-2">Точка A</p>
          <InputField label="X₁" value={x1} onChange={setX1} />
          <div className="mt-2"><InputField label="Y₁" value={y1} onChange={setY1} /></div>
          <div className="mt-2"><InputField label="Z₁ (высота)" value={z1} onChange={setZ1} /></div>
        </div>
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-xs text-green-300 mb-2">Точка B</p>
          <InputField label="X₂" value={x2} onChange={setX2} />
          <div className="mt-2"><InputField label="Y₂" value={y2} onChange={setY2} /></div>
          <div className="mt-2"><InputField label="Z₂ (высота)" value={z2} onChange={setZ2} /></div>
        </div>
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">ΔX, ΔY, ΔZ</p>
            <p className="text-sm font-mono text-white mt-1">{dx.toFixed(2)}, {dy.toFixed(2)}, {dz.toFixed(2)}</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Расстояние 3D</p>
            <p className="text-lg font-bold text-white mt-1">{dist3d.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Угол наклона ν</p>
            <p className="text-lg font-bold text-white mt-1">{slopeAngle.toFixed(2)}°</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          Горизонтальное проложение: {dist2d.toFixed(4)} м
        </p>
      </div>
    </div>
  );
}

function GeodesicCalc({
  lat1, lon1, lat2, lon2, setLat1, setLon1, setLat2, setLon2
}: {
  lat1: string; lon1: string; lat2: string; lon2: string;
  setLat1: (v: string) => void; setLon1: (v: string) => void;
  setLat2: (v: string) => void; setLon2: (v: string) => void;
}) {
  const lat1v = parseFloat(lat1) || 0;
  const lon1v = parseFloat(lon1) || 0;
  const lat2v = parseFloat(lat2) || 0;
  const lon2v = parseFloat(lon2) || 0;

  // Haversine formula
  const R = 6371000; // Earth radius in meters
  const phi1 = (lat1v * Math.PI) / 180;
  const phi2 = (lat2v * Math.PI) / 180;
  const dPhi = ((lat2v - lat1v) * Math.PI) / 180;
  const dLambda = ((lon2v - lon1v) * Math.PI) / 180;

  const a = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLambda / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Forward azimuth
  const y = Math.sin(dLambda) * Math.cos(phi2);
  const x = Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLambda);
  const bearing = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;

  // Midpoint
  const bx = Math.cos(phi2) * Math.cos(dLambda);
  const by = Math.cos(phi2) * Math.sin(dLambda);
  const midLat = (Math.atan2(Math.sin(phi1) + Math.sin(phi2), Math.sqrt((Math.cos(phi1) + bx) ** 2 + by ** 2)) * 180) / Math.PI;
  const midLon = (lon1v + (Math.atan2(by, Math.cos(phi1) + bx) * 180) / Math.PI);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-xs text-blue-300 mb-2">Точка A</p>
          <InputField label="Широта φ₁" value={lat1} onChange={setLat1} />
          <div className="mt-2"><InputField label="Долгота λ₁" value={lon1} onChange={setLon1} /></div>
        </div>
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-xs text-green-300 mb-2">Точка B</p>
          <InputField label="Широта φ₂" value={lat2} onChange={setLat2} />
          <div className="mt-2"><InputField label="Долгота λ₂" value={lon2} onChange={setLon2} /></div>
        </div>
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">Расстояние</p>
            <p className="text-lg font-bold text-white mt-1">{(distance / 1000).toFixed(3)}</p>
            <p className="text-xs text-gray-500">км ({distance.toFixed(1)} м)</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Азимут (дир. угол)</p>
            <p className="text-lg font-bold text-white mt-1">{bearing.toFixed(4)}°</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Средняя точка</p>
            <p className="text-sm font-mono text-white mt-1">{midLat.toFixed(4)}°, {midLon.toFixed(4)}°</p>
          </div>
        </div>
      </div>

      <div className="p-3 bg-black/20 rounded-lg">
        <p className="text-xs text-gray-400">
          💡 По умолчанию: Москва (55.7558°N, 37.6173°E) → Санкт-Петербург (59.9343°N, 30.3351°E)
        </p>
      </div>
    </div>
  );
}

function AzimuthCalc({
  x1, y1, x2, y2, setX1, setY1, setX2, setY2
}: {
  x1: string; y1: string; x2: string; y2: string;
  setX1: (v: string) => void; setY1: (v: string) => void;
  setX2: (v: string) => void; setY2: (v: string) => void;
}) {
  const x1v = parseFloat(x1) || 0;
  const y1v = parseFloat(y1) || 0;
  const x2v = parseFloat(x2) || 0;
  const y2v = parseFloat(y2) || 0;

  const dx = x2v - x1v;
  const dy = y2v - y1v;

  // Дирекционный угол (от северного направления, по часовой стрелке)
  // В геодезии: X - север, Y - восток
  let ruderentAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
  if (ruderentAngle < 0) ruderentAngle += 360;

  // Румб
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const rumb = (Math.atan2(absDy, absDx) * 180) / Math.PI;

  let quadrant = '';
  let rumbName = '';
  if (dx >= 0 && dy >= 0) { quadrant = 'I (СВ)'; rumbName = `СВ: ${rumb.toFixed(2)}°`; }
  else if (dx < 0 && dy >= 0) { quadrant = 'II (ЮВ)'; rumbName = `ЮВ: ${(180 - rumb).toFixed(2)}°`; }
  else if (dx < 0 && dy < 0) { quadrant = 'III (ЮЗ)'; rumbName = `ЮЗ: ${rumb.toFixed(2)}°`; }
  else { quadrant = 'IV (СЗ)'; rumbName = `СЗ: ${(360 - rumb).toFixed(2)}°`; }

  const dist = Math.sqrt(dx ** 2 + dy ** 2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-xs text-blue-300 mb-2">Точка A (станция)</p>
          <InputField label="X₁ (север)" value={x1} onChange={setX1} />
          <div className="mt-2"><InputField label="Y₁ (восток)" value={y1} onChange={setY1} /></div>
        </div>
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-xs text-green-300 mb-2">Точка B (цель)</p>
          <InputField label="X₂ (север)" value={x2} onChange={setX2} />
          <div className="mt-2"><InputField label="Y₂ (восток)" value={y2} onChange={setY2} /></div>
        </div>
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">Дир. угол α</p>
            <p className="text-lg font-bold text-white mt-1">{ruderentAngle.toFixed(4)}°</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Румб</p>
            <p className="text-sm font-bold text-white mt-1">{rumbName}</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Четверть</p>
            <p className="text-sm font-bold text-white mt-1">{quadrant}</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Расстояние</p>
            <p className="text-lg font-bold text-white mt-1">{dist.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
        </div>
      </div>

      {/* Компас */}
      <div className="flex justify-center">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#333" strokeWidth="1" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#222" strokeWidth="0.5" />
          {/* Cardinal directions */}
          <text x="100" y="15" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold">С</text>
          <text x="100" y="195" textAnchor="middle" fill="#9ca3af" fontSize="12">Ю</text>
          <text x="190" y="104" textAnchor="middle" fill="#9ca3af" fontSize="12">В</text>
          <text x="10" y="104" textAnchor="middle" fill="#9ca3af" fontSize="12">З</text>
          {/* Direction line */}
          <line
            x1="100"
            y1="100"
            x2={100 + 70 * Math.sin((ruderentAngle * Math.PI) / 180)}
            y2={100 - 70 * Math.cos((ruderentAngle * Math.PI) / 180)}
            stroke="#60a5fa"
            strokeWidth="2"
          />
          <circle cx="100" cy="100" r="3" fill="#60a5fa" />
          {/* Angle arc */}
          <path
            d={describeArc(100, 100, 30, 0, ruderentAngle)}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
          />
          <text
            x={100 + 40 * Math.sin((ruderentAngle / 2 * Math.PI) / 180)}
            y={100 - 40 * Math.cos((ruderentAngle / 2 * Math.PI) / 180)}
            textAnchor="middle"
            fill="#f59e0b"
            fontSize="9"
          >
            {ruderentAngle.toFixed(1)}°
          </text>
        </svg>
      </div>
    </div>
  );
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx: number, cy: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        step="any"
      />
    </div>
  );
}
