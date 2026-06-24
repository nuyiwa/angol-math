export const problems = [
  {
    id: "p4",
    level: "수능핵심",
    area: "도형 · 수능 14번의 마지막 한 수",
    title: "원 위의 점과 삼각형 넓이의 최댓값",
    levelColor: "bg-rose-100 text-rose-700",
    question:
      "삼각형 ABC에서 BC = 6이고, 점 A에서 직선 BC까지의 거리는 4이다. 점 A를 중심으로 하는 반지름 2인 원 위의 점 P에 대하여, 삼각형 PBC의 넓이의 최댓값을 구하시오.",
    thinkPrompt: "밑변 BC는 고정 → 넓이를 키우려면? P가 '원 위의 점'이라는 건 무슨 뜻일까?",
    concepts: [
      { name: "삼각형의 넓이", dictId: null, tag: null, detail: "넓이 = ½ × 밑변 × 높이. 밑변이 고정이면 '높이 최대화' 문제로 번역된다.", usage: "목표가 'P에서 BC까지 거리 최대'로 바뀜" },
      { name: "원의 정의 = 중심이라는 기준", dictId: "circle-def", tag: "기준 개념", detail: "P는 중심 A에서 거리 2인 점. 어떤 직선까지의 거리는 '중심에서의 거리 ± 반지름' 사이.", usage: "최대 거리 = 4 + 2 = 6" },
      { name: "점과 직선 사이의 거리", dictId: "pythagoras", tag: "도형 개념", detail: "수선의 발까지의 거리(가장 짧은 길). 수선 긋기 = 직각 만들기.", usage: "A에서 BC까지 4가 기준 거리" },
    ],
    steps: [
      { title: "목표 번역", body: "넓이 = ½ × 6 × (P에서 BC까지 거리) → 거리 최대화 문제" },
      { title: "원의 정의", body: "최대 거리 = 4 + 2 = 6. 📍 원 = 중심 기준 같은 거리!" },
      { title: "계산", body: "최대 넓이 = ½ × 6 × 6 = 18" },
      { title: "수능 연결", body: "수능 14번의 마지막 단계가 정확히 이 구조." },
    ],
  },
  {
    id: "p2",
    level: "고2",
    area: "도형 · 삼각함수",
    title: "삼각형의 변과 외접원",
    levelColor: "bg-blue-100 text-blue-700",
    question:
      "삼각형 ABC에서 AB = 4, AC = 6, ∠A = 60°이다. 변 BC의 길이와, 이 삼각형의 외접원의 반지름 R를 구하시오.",
    thinkPrompt: "두 변과 끼인각 → 나머지 변은? '외접원'이 보이면 떠올릴 법칙은?",
    concepts: [
      { name: "삼각비", dictId: "trig-ratio", tag: "비율 개념", detail: "cos 60° = 1/2은 '각이 60°면 변의 비율이 정해진다'는 비율 선언.", usage: "cos60° = 1/2, sin60° = √3/2 사용" },
      { name: "코사인법칙", dictId: "cos-law", tag: "도형 개념", detail: "두 변과 끼인각 → 나머지 변. 피타고라스의 확장판.", usage: "BC² = 16 + 36 − 2·4·6·cos60°" },
      { name: "사인법칙", dictId: "sine-law", tag: "비율 개념", detail: "a/sinA = 2R — 변·각·외접원을 하나로 묶는 비율 법칙.", usage: "BC / sinA = 2R로 R 계산" },
      { name: "외접원", dictId: "circumcircle", tag: "기준 개념", detail: "세 꼭짓점에서 같은 거리에 있는 기준점이 중심.", usage: "사인법칙이 외접원과 삼각형을 잇는 다리" },
    ],
    steps: [
      { title: "코사인법칙", body: "BC² = 16 + 36 − 24 = 28 → BC = 2√7" },
      { title: "사인법칙 소환", body: "'외접원 반지름' → BC/sinA = 2R" },
      { title: "R 계산", body: "2R = 2√7 ÷ (√3/2) → R = 2√21/3" },
      { title: "정리", body: "BC = 2√7, R = 2√21/3" },
    ],
  },
];

