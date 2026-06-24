export const tagStyle = (t) =>
  t === "기준" || t === "기준 개념"
    ? "bg-amber-100 text-amber-800"
    : t === "비율" || t === "비율 개념"
    ? "bg-teal-100 text-teal-800"
    : "bg-violet-100 text-violet-800";
export const tagLabel = (t) =>
  t === "기준" || t === "기준 개념" ? "📍 기준" : t === "비율" || t === "비율 개념" ? "⚖️ 비율" : "📐 도형";

export const levelColor = (lv) =>
  lv.includes("초")
    ? "bg-yellow-100 text-yellow-800"
    : lv.includes("중")
    ? "bg-sky-100 text-sky-800"
    : "bg-indigo-100 text-indigo-800";

// ─────────────────────────────────────────────
// 인터랙티브 시각화 (벡터 코스)
// ─────────────────────────────────────────────
