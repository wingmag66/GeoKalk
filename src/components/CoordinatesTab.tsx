import { useState } from 'react';

type ConvMode = 'dms' | 'polar' | 'cartesian' | 'height';

export default function CoordinatesTab() {
  const [mode, setMode] = useState<ConvMode>('dms');

  const modes: { id: ConvMode; label: string; icon: string }[] = [
    { id: 'dms', label: 'Градусы ↔ DMS', icon: '🔄' },
    { id: 'polar', label: 'Полярные ↔ Декартовы', icon: '📊' },
    { id: 'cartesian', label: 'Прямая засечка', icon: '📌' },
    { id: 'height', label: 'Превышения', icon: '⛰️' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">
          🌐 Координатные преобразования
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

        {mode === 'dms' && <DMSConverter />}
        {mode === 'polar' && <PolarConverter />}
        {mode === 'cartesian' && <ForwardIntersection />}
        {mode === 'height' && <HeightCalc />}
      </div>

      {/* Справочная информация */}
      <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5">
        <h2 className="text-xl font-semibold mb-4 text-purple-300">
          📖 Справочник геодезиста
        </h2>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-blue-300 font-semibold">Формат DMS (Градусы/Минуты/Секунды):</p>
            <p className="mt-1">° ′ ″ — 1° = 60′ = 3600″</p>
            <p className="text-xs text-gray-500 mt-1">Пример: 55° 45′ 20.88″ = 55.7558°</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-green-300 font-semibold">Полярные → Декартовы:</p>
            <p className="font-mono mt-1">x = r · cos(θ)</p>
            <p className="font-mono">y = r · sin(θ)</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-orange-300 font-semibold">Прямая геодезическая засечка:</p>
            <p className="mt-1">Определение координат точки по двум известным точкам и измеренным углам</p>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <p className="text-purple-300 font-semibold">Превышения:</p>
            <p className="font-mono mt-1">h = D · tan(ν) + i - l</p>
            <p className="text-xs text-gray-500 mt-1">D — расстояние, ν — угол наклона, i — высота прибора, l — высота визирования</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DMSConverter() {
  const [decimalInput, setDecimalInput] = useState<string>('55.7558');
  const [dmsDeg, setDmsDeg] = useState<string>('55');
  const [dmsMin, setDmsMin] = useState<string>('45');
  const [dmsSec, setDmsSec] = useState<string>('20.88');

  // Decimal to DMS
  const decVal = parseFloat(decimalInput) || 0;
  const absDec = Math.abs(decVal);
  const d = Math.floor(absDec);
  const mFloat = (absDec - d) * 60;
  const m = Math.floor(mFloat);
  const s = (mFloat - m) * 60;

  // DMS to Decimal
  const dmsD = parseFloat(dmsDeg) || 0;
  const dmsM = parseFloat(dmsMin) || 0;
  const dmsS = parseFloat(dmsSec) || 0;
  const decimalResult = dmsD + dmsM / 60 + dmsS / 3600;

  // Радианы
  const radFromDec = (decVal * Math.PI) / 180;
  const grad = decVal * (10 / 9);

  return (
    <div className="space-y-6">
      {/* Decimal to DMS */}
      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Десятичные градусы → DMS</h3>
        <div className="mb-3">
          <label className="block text-xs text-gray-400 mb-1">Десятичные градусы</label>
          <input
            type="number"
            value={decimalInput}
            onChange={(e) => setDecimalInput(e.target.value)}
            className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none"
            step="any"
          />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">Градусы</p>
            <p className="text-xl font-bold text-blue-300 mt-1">{decVal < 0 ? '-' : ''}{d}°</p>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">Минуты</p>
            <p className="text-xl font-bold text-green-300 mt-1">{m}′</p>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">Секунды</p>
            <p className="text-xl font-bold text-orange-300 mt-1">{s.toFixed(4)}″</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Результат: {decVal < 0 ? '-' : ''}{d}° {m}′ {s.toFixed(2)}″
        </p>
        <p className="text-xs text-gray-500">
          В радианах: {radFromDec.toFixed(8)} рад | В градах: {grad.toFixed(6)} gon
        </p>
      </div>

      {/* DMS to Decimal */}
      <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
        <h3 className="text-sm font-semibold text-green-300 mb-3">DMS → Десятичные градусы</h3>
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Градусы °</label>
            <input
              type="number"
              value={dmsDeg}
              onChange={(e) => setDmsDeg(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-green-400 focus:outline-none"
              step="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Минуты ′</label>
            <input
              type="number"
              value={dmsMin}
              onChange={(e) => setDmsMin(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-green-400 focus:outline-none"
              step="1"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Секунды ″</label>
            <input
              type="number"
              value={dmsSec}
              onChange={(e) => setDmsSec(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-green-400 focus:outline-none"
              step="any"
            />
          </div>
        </div>
        <div className="text-center p-3 bg-black/20 rounded-lg">
          <p className="text-xs text-gray-400">Десятичные градусы</p>
          <p className="text-2xl font-bold text-green-300 mt-1">{decimalResult.toFixed(8)}°</p>
          <p className="text-xs text-gray-500 mt-1">
            Радианы: {((decimalResult * Math.PI) / 180).toFixed(8)} рад
          </p>
        </div>
      </div>
    </div>
  );
}

function PolarConverter() {
  const [r, setR] = useState<string>('5');
  const [theta, setTheta] = useState<string>('30');
  const [x, setX] = useState<string>('3');
  const [y, setY] = useState<string>('4');

  const rVal = parseFloat(r) || 0;
  const thetaVal = parseFloat(theta) || 0;
  const thetaRad = (thetaVal * Math.PI) / 180;

  const xFromPolar = rVal * Math.cos(thetaRad);
  const yFromPolar = rVal * Math.sin(thetaRad);

  const xVal = parseFloat(x) || 0;
  const yVal = parseFloat(y) || 0;
  const rFromCart = Math.sqrt(xVal ** 2 + yVal ** 2);
  const thetaFromCart = (Math.atan2(yVal, xVal) * 180) / Math.PI;
  const thetaFromCartPos = thetaFromCart < 0 ? thetaFromCart + 360 : thetaFromCart;

  return (
    <div className="space-y-6">
      {/* Polar to Cartesian */}
      <div className="p-4 bg-blue-500/5 rounded-lg border border-blue-500/20">
        <h3 className="text-sm font-semibold text-blue-300 mb-3">Полярные → Декартовы</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Радиус r</label>
            <input
              type="number"
              value={r}
              onChange={(e) => setR(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none"
              step="any"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Угол θ (градусы)</label>
            <input
              type="number"
              value={theta}
              onChange={(e) => setTheta(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-blue-400 focus:outline-none"
              step="any"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">X</p>
            <p className="text-xl font-bold text-blue-300 mt-1">{xFromPolar.toFixed(6)}</p>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">Y</p>
            <p className="text-xl font-bold text-green-300 mt-1">{yFromPolar.toFixed(6)}</p>
          </div>
        </div>
      </div>

      {/* Cartesian to Polar */}
      <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
        <h3 className="text-sm font-semibold text-green-300 mb-3">Декартовы → Полярные</h3>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Координата X</label>
            <input
              type="number"
              value={x}
              onChange={(e) => setX(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-green-400 focus:outline-none"
              step="any"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Координата Y</label>
            <input
              type="number"
              value={y}
              onChange={(e) => setY(e.target.value)}
              className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white focus:border-green-400 focus:outline-none"
              step="any"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">Радиус r</p>
            <p className="text-xl font-bold text-green-300 mt-1">{rFromCart.toFixed(6)}</p>
          </div>
          <div className="text-center p-3 bg-black/20 rounded-lg">
            <p className="text-xs text-gray-400">Угол θ</p>
            <p className="text-xl font-bold text-blue-300 mt-1">{thetaFromCartPos.toFixed(4)}°</p>
            <p className="text-xs text-gray-500 mt-1">{thetaFromCart.toFixed(4)}° (от +X)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForwardIntersection() {
  const [xA, setXA] = useState<string>('1000');
  const [yA, setYA] = useState<string>('1000');
  const [xB, setXB] = useState<string>('1100');
  const [yB, setYB] = useState<string>('1000');
  const [alphaA, setAlphaA] = useState<string>('45');
  const [alphaB, setAlphaB] = useState<string>('135');

  const xAv = parseFloat(xA) || 0;
  const yAv = parseFloat(yA) || 0;
  const xBv = parseFloat(xB) || 0;
  const yBv = parseFloat(yB) || 0;
  const alphaAv = parseFloat(alphaA) || 0;
  const alphaBv = parseFloat(alphaB) || 0;

  const alphaARad = (alphaAv * Math.PI) / 180;
  const alphaBRad = (alphaBv * Math.PI) / 180;

  // Прямая засечка - пересечение двух направлений
  const tanA = Math.tan(alphaARad);
  const tanB = Math.tan(alphaBRad);

  // Уравнения прямых: y - yA = tan(αA) * (x - xA)
  // x = (yA - yB + tanB*xB - tanA*xA) / (tanB - tanA)
  const denominator = tanB - tanA;
  let xP = 0;
  let yP = 0;

  if (Math.abs(denominator) > 1e-10) {
    xP = (yAv - yBv + tanB * xBv - tanA * xAv) / denominator;
    yP = yAv + tanA * (xP - xAv);
  }

  const distAP = Math.sqrt((xP - xAv) ** 2 + (yP - yAv) ** 2);
  const distBP = Math.sqrt((xP - xBv) ** 2 + (yP - yBv) ** 2);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-xs text-blue-300 mb-2">Пункт A</p>
          <InputField label="X_A" value={xA} onChange={setXA} />
          <div className="mt-2"><InputField label="Y_A" value={yA} onChange={setYA} /></div>
          <div className="mt-2"><InputField label="Дир. угол α_A" value={alphaA} onChange={setAlphaA} /></div>
        </div>
        <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
          <p className="text-xs text-green-300 mb-2">Пункт B</p>
          <InputField label="X_B" value={xB} onChange={setXB} />
          <div className="mt-2"><InputField label="Y_B" value={yB} onChange={setYB} /></div>
          <div className="mt-2"><InputField label="Дир. угол α_B" value={alphaB} onChange={setAlphaB} /></div>
        </div>
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">X_P</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(xP) ? xP.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Y_P</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(yP) ? yP.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Расст. A→P</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(distAP) ? distAP.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Расст. B→P</p>
            <p className="text-lg font-bold text-white mt-1">{isFinite(distBP) ? distBP.toFixed(4) : '—'}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HeightCalc() {
  const [dist, setDist] = useState<string>('100');
  const [angle, setAngle] = useState<string>('5');
  const [instrH, setInstrH] = useState<string>('1.5');
  const [targetH, setTargetH] = useState<string>('1.5');
  const [stationH, setStationH] = useState<string>('150.0');

  const distVal = parseFloat(dist) || 0;
  const angleVal = parseFloat(angle) || 0;
  const instrHVal = parseFloat(instrH) || 0;
  const targetHVal = parseFloat(targetH) || 0;
  const stationHVal = parseFloat(stationH) || 0;

  const angleRad = (angleVal * Math.PI) / 180;
  const h = distVal * Math.tan(angleRad) + instrHVal - targetHVal;
  const targetElev = stationHVal + h;

  // Горизонтальное проложение
  const horizDist = distVal * Math.cos(angleRad);
  // Наклонное расстояние
  const slopeDist = distVal;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <InputField label="Расстояние D (м)" value={dist} onChange={setDist} />
        <InputField label="Угол наклона ν (°)" value={angle} onChange={setAngle} />
        <InputField label="Высота прибора i (м)" value={instrH} onChange={setInstrH} />
        <InputField label="Высота визирования l (м)" value={targetH} onChange={setTargetH} />
        <InputField label="Отметка станции H₀ (м)" value={stationH} onChange={setStationH} />
      </div>

      <div className="p-4 bg-black/20 rounded-lg border border-white/10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
            <p className="text-xs text-orange-300">Превышение h</p>
            <p className="text-lg font-bold text-white mt-1">{h.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <p className="text-xs text-blue-300">Отметка точки</p>
            <p className="text-lg font-bold text-white mt-1">{targetElev.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <p className="text-xs text-green-300">Гориз. пролож.</p>
            <p className="text-lg font-bold text-white mt-1">{horizDist.toFixed(4)}</p>
            <p className="text-xs text-gray-500">м</p>
          </div>
          <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <p className="text-xs text-purple-300">Уклон i</p>
            <p className="text-lg font-bold text-white mt-1">
              {distVal > 0 ? ((h / horizDist) * 1000).toFixed(2) : '0'}
            </p>
            <p className="text-xs text-gray-500">‰</p>
          </div>
        </div>

        <div className="mt-3 p-3 bg-black/20 rounded-lg">
          <p className="text-xs text-gray-400">Формула:</p>
          <p className="text-xs font-mono text-gray-300 mt-1">
            h = D·tg(ν) + i - l = {distVal}·tg({angleVal}°) + {instrHVal} - {targetHVal} = {h.toFixed(4)} м
          </p>
          <p className="text-xs font-mono text-gray-300 mt-1">
            H_точки = H₀ + h = {stationHVal} + {h.toFixed(4)} = {targetElev.toFixed(4)} м
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white text-sm focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        step="any"
      />
    </div>
  );
}
