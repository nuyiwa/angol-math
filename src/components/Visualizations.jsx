import { useState } from "react";

export function VizNumberLine() {
  const [n, setN] = useState(3);
  const W = 320, cx = 30, unit = 26, y = 50;
  const tipX = cx + n * unit;
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3">
      <svg viewBox="0 0 320 90" className="w-full">
        <line x1={cx} y1={y} x2={W - 10} y2={y} stroke="#94a3b8" strokeWidth="1.5" />
        {Array.from({ length: 11 }, (_, i) => (
          <g key={i}>
            <line x1={cx + i * unit} y1={y - 4} x2={cx + i * unit} y2={y + 4} stroke="#94a3b8" strokeWidth="1" />
            <text x={cx + i * unit} y={y + 18} fontSize="9" fill="#64748b" textAnchor="middle">{i}</text>
          </g>
        ))}
        <line x1={cx} y1={y - 18} x2={tipX} y2={y - 18} stroke="#4f46e5" strokeWidth="3.5" />
        <polygon points={`${tipX},${y - 18} ${tipX - 8},${y - 22} ${tipX - 8},${y - 14}`} fill="#4f46e5" />
        <circle cx={cx} cy={y - 18} r="3" fill="#4f46e5" />
        <text x={(cx + tipX) / 2} y={y - 26} fontSize="11" fill="#4f46e5" textAnchor="middle" fontWeight="bold">크기 {n}</text>
      </svg>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-indigo-700 font-medium shrink-0">화살표 크기</span>
        <input type="range" min="0" max="10" value={n} onChange={(e) => setN(+e.target.value)} className="w-full accent-indigo-600" />
        <span className="text-sm font-bold text-indigo-700 w-6 text-center">{n}</span>
      </div>
    </div>
  );
}

export function VizNegativeFlip() {
  const [pos, setPos] = useState(true);
  const cx = 160, unit = 22, y = 50, mag = 3;
  const tipX = cx + (pos ? 1 : -1) * mag * unit;
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3">
      <svg viewBox="0 0 320 90" className="w-full">
        <line x1="20" y1={y} x2="300" y2={y} stroke="#94a3b8" strokeWidth="1.5" />
        {Array.from({ length: 13 }, (_, i) => {
          const v = i - 6;
          return (
            <g key={i}>
              <line x1={cx + v * unit} y1={y - 4} x2={cx + v * unit} y2={y + 4} stroke="#94a3b8" strokeWidth="1" />
              <text x={cx + v * unit} y={y + 18} fontSize="8" fill="#64748b" textAnchor="middle">{v}</text>
            </g>
          );
        })}
        <line x1={cx} y1={y - 18} x2={tipX} y2={y - 18} stroke={pos ? "#4f46e5" : "#dc2626"} strokeWidth="3.5" style={{ transition: "all 0.4s" }} />
        <polygon points={`${tipX},${y - 18} ${tipX + (pos ? -8 : 8)},${y - 22} ${tipX + (pos ? -8 : 8)},${y - 14}`} fill={pos ? "#4f46e5" : "#dc2626"} style={{ transition: "all 0.4s" }} />
        <circle cx={cx} cy={y - 18} r="3" fill="#1e293b" />
        <text x={cx} y={y - 28} fontSize="9" fill="#1e293b" textAnchor="middle">기준 0</text>
        <text x={tipX} y={y + 32} fontSize="11" fill={pos ? "#4f46e5" : "#dc2626"} textAnchor="middle" fontWeight="bold" style={{ transition: "all 0.4s" }}>{pos ? "+3" : "−3"}</text>
      </svg>
      <button onClick={() => setPos(!pos)} className="mt-1 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2 rounded-lg transition">
        ↺ 부호 뒤집기 (180° 반전)
      </button>
    </div>
  );
}

export function VizMultiplyArea() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const cell = 22, ox = 40, oy = 12;
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3">
      <svg viewBox="0 0 320 160" className="w-full">
        {Array.from({ length: b }, (_, j) =>
          Array.from({ length: a }, (_, i) => (
            <rect key={`${i}-${j}`} x={ox + i * cell} y={oy + j * cell} width={cell - 2} height={cell - 2} fill="#a5b4fc" stroke="#4f46e5" strokeWidth="0.5" rx="2" />
          ))
        )}
        <text x={ox + (a * cell) / 2} y={oy + b * cell + 16} fontSize="11" fill="#4f46e5" textAnchor="middle" fontWeight="bold">가로 {a}</text>
        <text x={ox - 10} y={oy + (b * cell) / 2} fontSize="11" fill="#4f46e5" textAnchor="middle" fontWeight="bold" transform={`rotate(-90 ${ox - 10} ${oy + (b * cell) / 2})`}>세로 {b}</text>
        <text x={ox + a * cell + 24} y={oy + (b * cell) / 2} fontSize="14" fill="#1e293b" textAnchor="middle" fontWeight="bold">= {a * b}</text>
      </svg>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-indigo-700 font-medium shrink-0 w-8">가로</span>
        <input type="range" min="1" max="8" value={a} onChange={(e) => setA(+e.target.value)} className="w-full accent-indigo-600" />
        <span className="text-sm font-bold text-indigo-700 w-5">{a}</span>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-indigo-700 font-medium shrink-0 w-8">세로</span>
        <input type="range" min="1" max="6" value={b} onChange={(e) => setB(+e.target.value)} className="w-full accent-indigo-600" />
        <span className="text-sm font-bold text-indigo-700 w-5">{b}</span>
      </div>
    </div>
  );
}

export function VizTrigShadow() {
  const [deg, setDeg] = useState(30);
  const cx = 60, cy = 130, R = 100;
  const rad = (deg * Math.PI) / 180;
  const tx = cx + R * Math.cos(rad);
  const ty = cy - R * Math.sin(rad);
  const sin = Math.sin(rad).toFixed(2);
  const cos = Math.cos(rad).toFixed(2);
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3">
      <svg viewBox="0 0 280 150" className="w-full">
        <line x1={cx} y1={cy} x2={cx + R + 20} y2={cy} stroke="#94a3b8" strokeWidth="1" />
        <line x1={cx} y1={cy} x2={cx} y2={cy - R - 20} stroke="#94a3b8" strokeWidth="1" />
        <path d={`M ${cx + 100} ${cy} A 100 100 0 0 0 ${tx} ${ty}`} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
        {/* 그림자 (cos) */}
        <line x1={cx} y1={cy} x2={tx} y2={cy} stroke="#f59e0b" strokeWidth="3" />
        {/* 높이 (sin) */}
        <line x1={tx} y1={cy} x2={tx} y2={ty} stroke="#10b981" strokeWidth="3" />
        {/* 화살표 */}
        <line x1={cx} y1={cy} x2={tx} y2={ty} stroke="#4f46e5" strokeWidth="3" />
        <circle cx={tx} cy={ty} r="4" fill="#4f46e5" />
        <text x={tx + 8} y={ty} fontSize="9" fill="#64748b">크기 1</text>
        <text x={(cx + tx) / 2} y={cy + 14} fontSize="10" fill="#d97706" textAnchor="middle" fontWeight="bold">cos {cos}</text>
        <text x={tx + 6} y={(cy + ty) / 2} fontSize="10" fill="#059669" fontWeight="bold">sin {sin}</text>
      </svg>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-indigo-700 font-medium shrink-0">각도 θ</span>
        <input type="range" min="0" max="90" value={deg} onChange={(e) => setDeg(+e.target.value)} className="w-full accent-indigo-600" />
        <span className="text-sm font-bold text-indigo-700 w-10 text-center">{deg}°</span>
      </div>
      <p className="text-xs text-indigo-600 mt-1 text-center">🟧 그림자=cos · 🟩 높이=sin · 🟦 화살표(크기 1)</p>
    </div>
  );
}

export function VizCircleCenter() {
  const [cx, setCx] = useState(140);
  const [r, setR] = useState(40);
  const cy = 70;
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-3">
      <svg viewBox="0 0 280 150" className="w-full">
        <line x1="10" y1={cy} x2="270" y2={cy} stroke="#e2e8f0" strokeWidth="1" />
        <line x1={140} y1="10" x2={140} y2="140" stroke="#e2e8f0" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="rgba(165,180,252,0.3)" stroke="#4f46e5" strokeWidth="2" />
        <line x1={cx} y1={cy} x2={cx + r} y2={cy} stroke="#4f46e5" strokeWidth="2" />
        <text x={cx + r / 2} y={cy - 4} fontSize="10" fill="#4f46e5" textAnchor="middle" fontWeight="bold">r={Math.round(r / 10)}</text>
        <circle cx={cx} cy={cy} r="3" fill="#dc2626" />
        <text x={cx} y={cy + 16} fontSize="9" fill="#dc2626" textAnchor="middle">기준점</text>
      </svg>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-indigo-700 font-medium shrink-0 w-12">중심 이동</span>
        <input type="range" min="60" max="220" value={cx} onChange={(e) => setCx(+e.target.value)} className="w-full accent-indigo-600" />
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-indigo-700 font-medium shrink-0 w-12">반지름 r</span>
        <input type="range" min="15" max="60" value={r} onChange={(e) => setR(+e.target.value)} className="w-full accent-indigo-600" />
      </div>
    </div>
  );
}

export function Viz({ id }) {
  if (id === "number-line") return <VizNumberLine />;
  if (id === "negative-flip") return <VizNegativeFlip />;
  if (id === "multiply-area") return <VizMultiplyArea />;
  if (id === "trig-shadow") return <VizTrigShadow />;
  if (id === "circle-center") return <VizCircleCenter />;
  return null;
}

