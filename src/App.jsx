import { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { courseStyles, courses } from "./data/courses";
import { deepCourses } from "./data/deepCourses";
import { dict, dictLinks } from "./data/dict";
import { exam } from "./data/exam";
import { mock } from "./data/mock";
import { problems } from "./data/problems";
import { tagStyle, tagLabel, levelColor } from "./utils/helpers";
import { Viz } from "./components/Visualizations";

export default function App() {
  const [view, setView] = useState("home");
  const [openDict, setOpenDict] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [openStage, setOpenStage] = useState(null);
  const [showAns, setShowAns] = useState(false);
  const [openChapter, setOpenChapter] = useState(0);
  const [shownEx, setShownEx] = useState({});
  const [selectedMock, setSelectedMock] = useState(null);
  const [mockSteps, setMockSteps] = useState(0);
  const [selectedQ, setSelectedQ] = useState(null);
  const [qSteps, setQSteps] = useState(0);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [openConcept, setOpenConcept] = useState(null);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [completed, setCompleted] = useLocalStorage("angolmath_completed", {});
  const [bookmarks, setBookmarks] = useLocalStorage("angolmath_bookmarks", []);

  const toggleChapter = (courseId, ci) => {
    const current = completed[courseId] || [];
    setCompleted({
      ...completed,
      [courseId]: current.includes(ci)
        ? current.filter((i) => i !== ci)
        : [...current, ci],
    });
  };
  const toggleBookmark = (dictId) => {
    setBookmarks((prev) =>
      prev.includes(dictId) ? prev.filter((id) => id !== dictId) : [...prev, dictId]
    );
  };

  const jumpToDict = (id) => {
    setOpenDict(id);
    setView("dictionary");
    setSelectedQ(null);
    setSelectedProblem(null);
  };
  const goQ = (q) => {
    setSelectedQ(q);
    setQSteps(0);
  };
  const goProblem = (p) => {
    setSelectedProblem(p);
    setOpenConcept(null);
    setRevealedSteps(0);
  };

  const Header = () => (
    <header className="bg-emerald-700 text-white">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={() => {
            setView("home");
            setSelectedQ(null);
            setSelectedProblem(null);
          }}
          className="flex items-center gap-2 font-bold"
        >
          <span className="text-xl">🌱</span> 안골마을학교 수학
        </button>
        <nav className="flex gap-1 text-xs sm:text-sm flex-wrap">
          {[
            ["concepts", "개념서"],
            ["dictionary", "개념사전"],
            ["suneung", "수능"],
            ["mock", "고1 모의고사"],
            ["problems", "연습"],
          ].map(([v, label]) => (
            <button
              key={v}
              onClick={() => {
                setView(v);
                setSelectedQ(null);
                setSelectedProblem(null);
              }}
              className={`px-3 py-1.5 rounded-full transition ${
                view === v ? "bg-white text-emerald-700 font-semibold" : "hover:bg-emerald-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );

  // ── 홈 ──
  if (view === "home") {
    return (
      <div className="min-h-screen bg-emerald-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <div className="text-5xl mb-4">🌱</div>
            <h1 className="text-3xl font-bold text-emerald-900 mb-3">문제에서 개념으로</h1>
            <p className="text-emerald-800 leading-relaxed max-w-xl mx-auto">
              수능 문제를 만나면 묻습니다.{" "}
              <span className="font-semibold">"이걸 풀려면 무엇을 알아야 할까?"</span>
              <br />
              초등의 분수와 홀짝부터 고등의 미적분까지 — 개념의 사슬을 거꾸로 따라갑니다.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <button onClick={() => setView("concepts")} className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-amber-300">
              <div className="text-3xl mb-2">📖</div>
              <h2 className="font-bold text-stone-800 mb-1">개념서</h2>
              <p className="text-sm text-stone-600 leading-relaxed">기준·비율·도형·함수·번역·벡터 — 핵심 개념을 초등부터 수능까지 장·절로 깊이 있게 쌓는 교과서</p>
            </button>
            <button onClick={() => setView("dictionary")} className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-teal-300">
              <div className="text-3xl mb-2">📑</div>
              <h2 className="font-bold text-stone-800 mb-1">개념사전</h2>
              <p className="text-sm text-stone-600 leading-relaxed">개별 개념을 빠르게 찾아보는 사전 — 개념서의 장, 수능 문제와 서로 연결됩니다</p>
            </button>
            <button onClick={() => setView("suneung")} className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-emerald-300">
              <div className="text-3xl mb-2">🔬</div>
              <h2 className="font-bold text-stone-800 mb-1">2025 수능 문제</h2>
              <p className="text-sm text-stone-600 leading-relaxed">공통 22문제 전문 + 문제마다 초등→고등 개념 사슬 + 단계별 풀이</p>
            </button>
            <button onClick={() => setView("mock")} className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-sky-300">
              <div className="text-3xl mb-2">📝</div>
              <h2 className="font-bold text-stone-800 mb-1">고1 모의고사</h2>
              <p className="text-sm text-stone-600 leading-relaxed">"이 개념이 어떻게 떠올랐을까?" 🔑 트리거 중심으로 읽는 기출 분석</p>
            </button>
            <button onClick={() => setView("problems")} className="bg-white rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-rose-300">
              <div className="text-3xl mb-2">🧭</div>
              <h2 className="font-bold text-stone-800 mb-1">연습 문제</h2>
              <p className="text-sm text-stone-600 leading-relaxed">수능의 핵심 아이디어만 떼어 연습하는 문제들</p>
            </button>
          </div>
          <div className="mt-8 bg-emerald-100 rounded-2xl p-5 text-sm text-emerald-900 leading-relaxed">
            💡 <strong>학습 흐름</strong> — ① <strong>개념서</strong>에서 핵심 개념을 뿌리부터 깊이 읽고 → ② 모르는 용어는 <strong>개념사전</strong>에서 찾아 코스·수능과 연결하고 → ③ <strong>수능 문제</strong>에서 개념 사슬을 확인한 뒤 → ④ <strong>연습</strong>으로 손에 익히세요.
          </div>
        </main>
      </div>
    );
  }

  // ── 교과서 수준 상세판 ──
  if (view === "course" && selectedCourse && deepCourses[selectedCourse.id]) {
    const c = selectedCourse;
    const deep = deepCourses[c.id];
    const cs = courseStyles[c.color];
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setView("concepts")} className="text-sm text-emerald-700 mb-4 hover:underline">← 개념서로</button>
          <div className={`rounded-2xl border-2 p-6 mb-6 ${cs.head}`}>
            <div className="text-4xl mb-2">{c.emoji}</div>
            <h1 className="text-2xl font-bold text-stone-800">{c.title}</h1>
            <p className="text-sm text-stone-600 mt-1 mb-3">{c.tagline}</p>
            <p className="text-sm text-stone-700 leading-relaxed bg-white rounded-xl p-4">{c.why}</p>
            <p className="text-xs text-stone-500 mt-3">
              📚 교과서 수준 상세판 · {deep.chapters.length}개 장 · {deep.chapters.reduce((n, ch) => n + ch.sections.length, 0)}개 절
              {(completed[c.id] || []).length > 0 && (
                <span className="ml-2 text-emerald-600 font-semibold">· ✅ {(completed[c.id] || []).length}/{deep.chapters.length}장 완료</span>
              )}
            </p>
          </div>
          <div className="space-y-3">
            {deep.chapters.map((ch, ci) => {
              const opened = openChapter === ci;
              return (
                <div key={ci} className={`rounded-2xl border-2 bg-white transition ${opened ? "border-emerald-400" : "border-stone-200 hover:border-emerald-300"}`}>
                  <button onClick={() => setOpenChapter(opened ? null : ci)} className="w-full text-left p-4 flex items-center justify-between gap-2">
                    <span className="font-bold text-stone-800 text-sm sm:text-base flex items-center gap-2">
                      {(completed[c.id] || []).includes(ci) && <span className="text-emerald-500 text-base leading-none">✅</span>}
                      {ch.title}
                    </span>
                    <span className="text-stone-400 shrink-0">{opened ? "−" : "+"}</span>
                  </button>
                  {opened && (
                    <div className="px-4 pb-5">
                      <p className="text-sm text-stone-600 leading-relaxed bg-stone-50 rounded-xl p-4 mb-4">{ch.intro}</p>
                      <div className="space-y-5">
                        {ch.sections.map((sec, si) => (
                          <div key={si} className="border-l-4 border-emerald-200 pl-4">
                            <h3 className={`font-bold text-sm mb-2 inline-block px-2 py-1 rounded-lg ${cs.head}`}>{sec.title}</h3>
                            {sec.viz && <Viz id={sec.viz} />}
                            <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-line mb-3">{sec.body}</p>
                            <div className="space-y-2">
                              {sec.examples.map((ex, ei) => {
                                const key = `${c.id}-${ci}-${si}-${ei}`;
                                const shown = !!shownEx[key];
                                return (
                                  <div key={ei} className="bg-stone-50 border border-stone-200 rounded-xl p-3.5">
                                    <p className="text-sm text-stone-800 leading-relaxed"><strong>✏️ 예제 {ei + 1} · </strong>{ex.q}</p>
                                    {shown ? (
                                      <div>
                                        <p className="mt-2 text-sm text-emerald-900 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2 leading-relaxed"><strong>풀이 · </strong>{ex.a}</p>
                                        <button onClick={() => setShownEx({ ...shownEx, [key]: false })} className="mt-1.5 text-xs text-stone-400 hover:underline">가리기</button>
                                      </div>
                                    ) : (
                                      <button onClick={() => setShownEx({ ...shownEx, [key]: true })} className="mt-2 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-full hover:bg-emerald-700 transition">풀이 보기</button>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-5 flex flex-col gap-2">
                        <button
                          onClick={() => toggleChapter(c.id, ci)}
                          className={`w-full text-sm font-semibold py-2.5 rounded-xl transition ${
                            (completed[c.id] || []).includes(ci)
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          {(completed[c.id] || []).includes(ci) ? "✅ 완료됨 — 취소하기" : "✅ 이 장 다 읽었어요"}
                        </button>
                        {ci < deep.chapters.length - 1 && (
                          <button onClick={() => setOpenChapter(ci + 1)} className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm font-semibold py-2.5 rounded-xl transition">다음 장으로 →</button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className={`mt-6 rounded-2xl border-2 p-4 text-sm text-stone-800 leading-relaxed ${cs.head}`}>
            🎯 <strong>전체 정리 · </strong>{deep.finale}
          </div>
          <button onClick={() => setView("suneung")} className="mt-6 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-xl transition">수능 문제에서 이 개념 확인하기 →</button>
        </main>
      </div>
    );
  }

  // ── 개념서 ──
  if (view === "concepts") {
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">📖 개념서</h1>
          <p className="text-stone-600 mb-6 leading-relaxed">
            수학을 관통하는 핵심 개념들을 <strong>초등 첫걸음부터 수능까지</strong> 장·절 구조로 깊이 있게 다룹니다. 각 코스는 하나의 큰 생각이 학년을 따라 어떻게 확장되는지를 보여줘요.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 mb-8">
            {courses.map((c) => {
              const cs = courseStyles[c.color];
              const isDeep = !!deepCourses[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCourse(c);
                    setOpenStage(0);
                    setOpenChapter(0);
                    setShowAns(false);
                    setView("course");
                  }}
                  className={`text-left bg-white rounded-2xl border-2 border-stone-200 p-5 shadow-sm hover:shadow-md transition ${cs.hover} relative`}
                >
                  {isDeep && <span className="absolute top-3 right-3 text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">상세판</span>}
                  <div className="text-3xl mb-2">{c.emoji}</div>
                  <h3 className="font-bold text-stone-800">{c.title}</h3>
                  <p className="text-sm text-stone-600 mt-1 leading-relaxed">{c.tagline}</p>
                  <p className="text-xs text-emerald-700 font-semibold mt-3">
                    {isDeep ? `📚 교과서 상세판 · ${deepCourses[c.id].chapters.length}개 장 →` : "단계별 코스 (상세판 준비 중) →"}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-sm text-amber-900 leading-relaxed">
            💡 <strong>읽는 법</strong> — 각 코스는 한 장(章)씩 펼쳐 읽어요. 본문을 읽고 예제를 <strong>먼저 스스로 풀어본 뒤</strong> '풀이 보기'를 누르면 더 깊이 남습니다. 모르는 용어가 나오면 <strong>개념사전</strong>에서 빠르게 찾아보세요.
          </div>
        </main>
      </div>
    );
  }

  // ── 개념사전 ──
  if (view === "dictionary") {
    const openCourseChapter = (courseId, chapterKeyword) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return;
      setSelectedCourse(course);
      const deep = deepCourses[courseId];
      let chIdx = 0;
      if (deep && chapterKeyword) {
        const found = deep.chapters.findIndex((ch) => ch.title.includes(chapterKeyword));
        if (found >= 0) chIdx = found;
      }
      setOpenChapter(chIdx);
      setOpenStage(0);
      setShowAns(false);
      setView("course");
    };
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">📑 개념사전</h1>
          <p className="text-stone-600 mb-2 leading-relaxed">
            개별 개념을 빠르게 찾아보는 사전이에요. 각 항목은 정의·수능 활용과 함께, <strong>어느 개념서 코스에서 깊이 배우는지</strong>와 <strong>어느 수능 문제에 쓰였는지</strong>로 연결됩니다.
          </p>
          <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
            <p className="text-xs text-stone-400">📖 = 개념서 코스로 이동 · 🔬 = 수능 문제로 이동</p>
            <button
              onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
              className={`text-xs px-3 py-1.5 rounded-full font-semibold transition shrink-0 ${
                showBookmarksOnly
                  ? "bg-amber-400 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              ⭐ 북마크{bookmarks.length > 0 ? ` (${bookmarks.length})` : ""}
            </button>
          </div>
          <div className="space-y-6">
            {dict.map((group) => {
              const items = group.items.filter((c) => !showBookmarksOnly || bookmarks.includes(c.id));
              if (items.length === 0) return null;
              return (
              <div key={group.area}>
                <h3 className="font-semibold text-teal-800 mb-2 text-sm tracking-wide">{group.area}</h3>
                <div className="space-y-2">
                  {items.map((c) => {
                    const opened = openDict === c.id;
                    const link = dictLinks[c.id] || {};
                    const linkedCourse = link.course ? courses.find((x) => x.id === link.course) : null;
                    const isBookmarked = bookmarks.includes(c.id);
                    return (
                      <div key={c.id} className={`rounded-xl border-2 bg-white transition ${opened ? "border-teal-400" : "border-stone-200 hover:border-teal-300"}`}>
                        <div className="flex items-center">
                          <button onClick={() => setOpenDict(opened ? null : c.id)} className="flex-1 text-left p-3.5 flex items-center gap-2 min-w-0">
                            <span className="flex items-center gap-2 flex-wrap flex-1 min-w-0">
                              <span className="font-semibold text-stone-800 text-sm">{c.name}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor(c.level)}`}>{c.level}</span>
                              {c.thread && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagStyle(c.thread)}`}>{tagLabel(c.thread)}</span>}
                            </span>
                            <span className="text-stone-400 shrink-0">{opened ? "−" : "+"}</span>
                          </button>
                          <button
                            onClick={() => toggleBookmark(c.id)}
                            className="px-3 py-3 text-base hover:scale-125 transition-transform shrink-0"
                            title={isBookmarked ? "북마크 해제" : "북마크 추가"}
                          >
                            {isBookmarked ? "⭐" : "☆"}
                          </button>
                        </div>
                        {opened && (
                          <div className="px-3.5 pb-3.5 space-y-2 text-sm">
                            <p className="text-stone-700 leading-relaxed"><strong>정의 · </strong>{c.def}</p>
                            <p className="bg-teal-50 border border-teal-200 rounded-lg px-3 py-2 text-teal-900 leading-relaxed"><strong>🎯 수능에서 · </strong>{c.use}</p>
                            {c.tip && <p className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-900 leading-relaxed"><strong>⚡ 함정 · </strong>{c.tip}</p>}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {linkedCourse && (
                                <button onClick={() => openCourseChapter(link.course, link.chapter)} className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-full hover:bg-amber-100 transition font-medium">📖 {linkedCourse.emoji} {linkedCourse.title}에서 배우기</button>
                              )}
                              {(link.exams || []).map((no) => (
                                <button key={no} onClick={() => { goQ(exam[no - 1]); setView("suneung"); }} className="text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full hover:bg-emerald-100 transition font-medium">🔬 수능 {no}번</button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // ── 수능 문제 상세 ──
  if (view === "suneung" && selectedQ) {
    const q = selectedQ;
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setSelectedQ(null)} className="text-sm text-emerald-700 mb-4 hover:underline">← 수능 문제 목록으로</button>
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">{q.no}</span>
              <span className="font-bold text-stone-800">{q.topic}</span>
              <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">[{q.pts}점]</span>
            </div>
            <p className="text-stone-800 leading-relaxed bg-stone-50 rounded-xl p-4 border border-stone-200 whitespace-pre-line">{q.text}</p>
            <p className="mt-2 text-xs text-stone-400">출처: 2025학년도 대학수학능력시험 수학 (한국교육과정평가원)</p>
          </div>
          <div className="mb-6">
            <h2 className="font-bold text-stone-800 mb-1">🔗 개념 사슬 — 초등부터 고등까지</h2>
            <p className="text-sm text-stone-500 mb-3">이 문제 하나를 풀기 위해 쌓여 있어야 하는 개념들. ↗는 개념사전으로 이동.</p>
            <div className="space-y-2">
              {q.chain.map((c, i) => (
                <div key={i} className="bg-white rounded-xl border border-stone-200 p-3.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-emerald-700 font-bold text-sm">{i + 1}</span>
                    <span className="font-semibold text-stone-800 text-sm">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor(c.level)}`}>{c.level}</span>
                    {c.dictId && <button onClick={() => jumpToDict(c.dictId)} className="text-xs text-teal-700 border border-teal-200 bg-teal-50 px-2 py-0.5 rounded-full hover:bg-teal-100">개념사전 ↗</button>}
                  </div>
                  <p className="mt-1.5 text-sm text-stone-600 leading-relaxed pl-5">{c.why}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-stone-800 mb-1">🪜 단계별 풀이</h2>
            <p className="text-sm text-stone-500 mb-4">한 단계씩 열며 다음을 스스로 예상해보세요.</p>
            <div className="space-y-3">
              {q.steps.map((s, i) => {
                const shown = i < qSteps;
                return (
                  <div key={i} className={`rounded-xl border p-4 ${shown ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-stone-50"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${shown ? "bg-emerald-600 text-white" : "bg-stone-300 text-white"}`}>{i + 1}</span>
                      <span className="font-semibold text-stone-800 text-sm">{shown ? s.title : "???"}</span>
                    </div>
                    {shown && <p className="mt-2 text-sm text-stone-700 leading-relaxed pl-8">{s.body}</p>}
                  </div>
                );
              })}
            </div>
            {qSteps < q.steps.length ? (
              <button onClick={() => setQSteps(qSteps + 1)} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition">{qSteps === 0 ? "풀이 시작하기" : "다음 단계"} ({qSteps}/{q.steps.length})</button>
            ) : (
              <div className="mt-4">
                <div className="bg-emerald-600 text-white rounded-xl p-4 text-center font-bold">정답: {q.answer}</div>
                <div className="text-center mt-2"><button onClick={() => setQSteps(0)} className="text-sm text-stone-500 hover:underline">풀이 다시 가리기</button></div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-6">
            {q.no > 1 ? <button onClick={() => goQ(exam[q.no - 2])} className="text-sm text-emerald-700 hover:underline">← {q.no - 1}번</button> : <span />}
            {q.no < 22 && <button onClick={() => goQ(exam[q.no])} className="text-sm text-emerald-700 hover:underline">{q.no + 1}번 →</button>}
          </div>
        </main>
      </div>
    );
  }

  // ── 수능 문제 목록 ──
  if (view === "suneung") {
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">🔬 2025 수능 수학 — 공통 22문제</h1>
          <p className="text-stone-600 mb-2 leading-relaxed">문제를 누르면 <strong>전문 + 초등→고등 개념 사슬 + 단계별 풀이</strong>가 펼쳐집니다.</p>
          <p className="text-xs text-stone-400 mb-6">출처: 2025학년도 대학수학능력시험 (한국교육과정평가원) · 학교 학습용</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {exam.map((q) => (
              <button key={q.no} onClick={() => goQ(q)} className="text-left bg-white rounded-xl border-2 border-stone-200 hover:border-emerald-400 p-3.5 transition">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-bold">{q.no}</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-stone-800 text-sm truncate">{q.topic}</div>
                    <div className="text-xs text-stone-500">[{q.pts}점] · 개념 사슬 {q.chain.length}개</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-sm text-amber-900 leading-relaxed">
            🔍 <strong>관찰 포인트</strong> — 22문제의 개념 사슬을 모아보면, 초등의 분수·홀짝·짝짓기 덧셈과 중등의 인수분해·기울기가 거의 모든 문제의 아래층에 깔려 있어요. <strong>고등 개념이 어렵게 느껴진다면, 무너진 건 보통 아래층입니다.</strong>
          </div>
        </main>
      </div>
    );
  }

  // ── 고1 모의고사 상세 ──
  if (view === "mock" && selectedMock) {
    const q = selectedMock;
    const idx = mock.findIndex((m) => m.no === q.no);
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setSelectedMock(null)} className="text-sm text-emerald-700 mb-4 hover:underline">← 고1 모의고사 목록으로</button>
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">{q.no}</span>
              <span className="font-bold text-stone-800">{q.topic}</span>
              <span className="text-xs bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">[{q.pts}점]</span>
            </div>
            <p className="text-stone-800 leading-relaxed bg-stone-50 rounded-xl p-4 border border-stone-200">{q.text}</p>
            <p className="mt-2 text-xs text-stone-400">출처: 2026학년도 3월 고1 전국연합학력평가 (교육청)</p>
          </div>
          {q.trigger && (
            <div className="mb-6">
              <h2 className="font-bold text-stone-800 mb-1">🔑 트리거 — 이 도구는 어떻게 떠오르나</h2>
              <p className="text-sm text-stone-500 mb-3">문제의 어떤 신호가 어떤 도구를 부르는지, 떠올린 사람과 못 떠올린 사람의 차이를 풀어봅니다.</p>
              <div className="space-y-2">
                <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-rose-700 mb-1">📡 신호 (문제에서 보이는 것)</p>
                  <p className="text-sm text-rose-950 leading-relaxed">{q.trigger.signal}</p>
                </div>
                <div className="bg-rose-50 border-2 border-rose-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-rose-700 mb-1">🛠️ 도구 (꺼내야 할 것)</p>
                  <p className="text-sm text-rose-950 leading-relaxed">{q.trigger.tool}</p>
                </div>
                <div className="bg-white border border-stone-200 rounded-xl p-4">
                  <p className="text-xs font-bold text-stone-500 mb-1">🤔 왜 그 신호가 그 도구를 부르나</p>
                  <p className="text-sm text-stone-700 leading-relaxed">{q.trigger.why}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-stone-400 mb-1">❌ 못 떠올리면</p>
                    <p className="text-sm text-stone-600 leading-relaxed">{q.trigger.miss}</p>
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-emerald-700 mb-1">✅ 떠올린 사람은</p>
                    <p className="text-sm text-emerald-900 leading-relaxed">{q.trigger.see}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {q.bigIdea && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
              <p className="text-sm text-amber-900 leading-relaxed">💡 <strong>한 줄 핵심 · </strong>{q.bigIdea}</p>
            </div>
          )}
          <div className="mb-6">
            <h2 className="font-bold text-stone-800 mb-1">🔗 개념 사슬 — 이 도구는 어디서 왔나</h2>
            <p className="text-sm text-stone-500 mb-3">각 개념이 '왜 여기서 떠올라야 하는지'를 함께 적었어요.</p>
            <div className="space-y-2">
              {q.chain.map((c, i) => (
                <div key={i} className="bg-white rounded-xl border border-stone-200 p-3.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sky-700 font-bold text-sm">{i + 1}</span>
                    <span className="font-semibold text-stone-800 text-sm">{c.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${levelColor(c.level)}`}>{c.level}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-stone-600 leading-relaxed pl-5">{c.why}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-stone-800 mb-1">🪜 단계별 풀이</h2>
            <p className="text-sm text-stone-500 mb-4">한 단계씩 열며 다음을 스스로 예상해보세요.</p>
            <div className="space-y-3">
              {q.steps.map((s, i) => {
                const shown = i < mockSteps;
                return (
                  <div key={i} className={`rounded-xl border p-4 ${shown ? "border-sky-200 bg-sky-50" : "border-stone-200 bg-stone-50"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${shown ? "bg-sky-600 text-white" : "bg-stone-300 text-white"}`}>{i + 1}</span>
                      <span className="font-semibold text-stone-800 text-sm">{shown ? s.title : "???"}</span>
                    </div>
                    {shown && <p className="mt-2 text-sm text-stone-700 leading-relaxed pl-8">{s.body}</p>}
                  </div>
                );
              })}
            </div>
            {mockSteps < q.steps.length ? (
              <button onClick={() => setMockSteps(mockSteps + 1)} className="mt-4 w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-xl transition">{mockSteps === 0 ? "풀이 시작하기" : "다음 단계"} ({mockSteps}/{q.steps.length})</button>
            ) : (
              <div className="mt-4">
                <div className="bg-sky-600 text-white rounded-xl p-4 text-center font-bold">정답: {q.answer}</div>
                <div className="text-center mt-2"><button onClick={() => setMockSteps(0)} className="text-sm text-stone-500 hover:underline">풀이 다시 가리기</button></div>
              </div>
            )}
          </div>
          <div className="flex justify-between mt-6">
            {idx > 0 ? <button onClick={() => { setSelectedMock(mock[idx - 1]); setMockSteps(0); }} className="text-sm text-sky-700 hover:underline">← {mock[idx - 1].no}번</button> : <span />}
            {idx < mock.length - 1 && <button onClick={() => { setSelectedMock(mock[idx + 1]); setMockSteps(0); }} className="text-sm text-sky-700 hover:underline">{mock[idx + 1].no}번 →</button>}
          </div>
        </main>
      </div>
    );
  }

  // ── 고1 모의고사 목록 ──
  if (view === "mock") {
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">📝 고1 모의고사 — 트리거로 읽기</h1>
          <p className="text-stone-600 mb-2 leading-relaxed">핵심 질문: <strong>"이 개념이 어떻게 떠올랐을까?"</strong> 차이는 <strong>문제의 어떤 신호가 어떤 도구를 부르는지</strong> 아느냐예요. 각 문제의 <span className="text-rose-700 font-semibold">🔑 트리거</span>에 그 방아쇠를 적었습니다.</p>
          <p className="text-xs text-stone-400 mb-6">출처: 2026학년도 3월 고1 전국연합학력평가 (교육청) · 대표 문항 선별 · 학교 학습용</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {mock.map((q) => (
              <button key={q.no} onClick={() => { setSelectedMock(q); setMockSteps(0); }} className="text-left bg-white rounded-xl border-2 border-stone-200 hover:border-sky-400 p-3.5 transition">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 shrink-0 rounded-full bg-sky-600 text-white flex items-center justify-center text-sm font-bold">{q.no}</span>
                  <div className="min-w-0">
                    <div className="font-semibold text-stone-800 text-sm truncate">{q.topic}</div>
                    <div className="text-xs text-stone-500">[{q.pts}점] · 🔑 트리거 분석</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-6 bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-sm text-rose-900 leading-relaxed">
            🔑 <strong>트리거 사고법</strong> — 문제를 읽을 때 '무엇을 구하나'보다 '어떤 단어·구조가 보이나'를 먼저 보세요. <strong>'평행' → 기울기 같음, '수선의 발' → 직각삼각형, '~의 근이다' → 대입, '최솟값/범위' → 부등식, '내심/외심' → 같은 거리.</strong> 이 사전이 두꺼워질수록 문제가 짧아집니다.
          </div>
        </main>
      </div>
    );
  }

  // ── 연습 문제 상세 ──
  if (view === "problems" && selectedProblem) {
    const p = selectedProblem;
    return (
      <div className="min-h-screen bg-stone-50 font-sans">
        <Header />
        <main className="max-w-3xl mx-auto px-4 py-8">
          <button onClick={() => setSelectedProblem(null)} className="text-sm text-emerald-700 mb-4 hover:underline">← 연습 문제 목록으로</button>
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.levelColor}`}>{p.level}</span>
              <span className="text-xs text-stone-500">{p.area}</span>
            </div>
            <h1 className="font-bold text-lg text-stone-800 mb-3">{p.title}</h1>
            <p className="text-stone-800 leading-relaxed bg-stone-50 rounded-xl p-4 border border-stone-200">{p.question}</p>
            <p className="mt-3 text-sm text-emerald-800 bg-emerald-50 rounded-lg px-3 py-2">🤔 <strong>먼저 생각해보기:</strong> {p.thinkPrompt}</p>
          </div>
          <div className="mb-6">
            <h2 className="font-bold text-stone-800 mb-1">🗺️ 개념 지도</h2>
            <div className="grid gap-3 sm:grid-cols-2 mt-3">
              {p.concepts.map((c, i) => {
                const opened = openConcept === i;
                return (
                  <div key={i} className={`rounded-xl border-2 transition ${opened ? "border-emerald-400 bg-emerald-50 sm:col-span-2" : "border-stone-200 bg-white hover:border-emerald-300"}`}>
                    <button onClick={() => setOpenConcept(opened ? null : i)} className="w-full text-left p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-stone-800">{c.name}</span>
                        <span className="flex items-center gap-1.5">
                          {c.tag && <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagStyle(c.tag)}`}>{tagLabel(c.tag)}</span>}
                          <span className="text-stone-400">{opened ? "−" : "+"}</span>
                        </span>
                      </div>
                      {opened && (
                        <div className="mt-3 space-y-2 text-sm">
                          <p className="text-stone-700 leading-relaxed">{c.detail}</p>
                          <p className="bg-white rounded-lg px-3 py-2 text-emerald-900 border border-emerald-200">🔗 {c.usage}</p>
                        </div>
                      )}
                    </button>
                    {opened && c.dictId && (
                      <div className="px-4 pb-3">
                        <button onClick={() => jumpToDict(c.dictId)} className="text-xs text-teal-700 font-semibold hover:underline">📑 개념사전에서 찾아보기 ↗</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-bold text-stone-800 mb-4">🪜 단계별 풀이</h2>
            <div className="space-y-3">
              {p.steps.map((s, i) => {
                const shown = i < revealedSteps;
                return (
                  <div key={i} className={`rounded-xl border p-4 ${shown ? "border-emerald-200 bg-emerald-50" : "border-stone-200 bg-stone-50"}`}>
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${shown ? "bg-emerald-600 text-white" : "bg-stone-300 text-white"}`}>{i + 1}</span>
                      <span className="font-semibold text-stone-800 text-sm">{shown ? s.title : "???"}</span>
                    </div>
                    {shown && <p className="mt-2 text-sm text-stone-700 leading-relaxed pl-8">{s.body}</p>}
                  </div>
                );
              })}
            </div>
            {revealedSteps < p.steps.length ? (
              <button onClick={() => setRevealedSteps(revealedSteps + 1)} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-xl transition">{revealedSteps === 0 ? "풀이 시작하기" : "다음 단계"} ({revealedSteps}/{p.steps.length})</button>
            ) : (
              <div className="mt-4 text-center">
                <p className="text-emerald-700 font-semibold mb-2">🎉 풀이 완료!</p>
                <button onClick={() => setRevealedSteps(0)} className="text-sm text-stone-500 hover:underline">풀이 다시 가리기</button>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ── 연습 문제 목록 ──
  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">🧭 연습 문제</h1>
        <p className="text-stone-600 mb-6">수능 문제의 핵심 아이디어만 떼어 가볍게 연습해보세요. (계속 추가됩니다)</p>
        <div className="space-y-4">
          {problems.map((p) => (
            <button key={p.id} onClick={() => goProblem(p)} className="w-full text-left bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition border-2 border-transparent hover:border-emerald-300">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.levelColor}`}>{p.level}</span>
                <span className="text-xs text-stone-500">{p.area}</span>
              </div>
              <h2 className="font-bold text-stone-800 mb-1">{p.title}</h2>
              <p className="text-sm text-stone-600 line-clamp-2">{p.question}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}