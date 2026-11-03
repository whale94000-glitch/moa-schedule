import { useState } from 'react'
import { Sparkles, Code2, Zap, Layers, CheckCircle2, ArrowRight } from 'lucide-react'

export default function App() {
  const [count, setCount] = useState(0)

  const techStack = [
    { name: 'React 19', desc: '최신 React 기능 및 훅 지원', icon: Code2, color: 'text-cyan-500' },
    { name: 'Vite 8', desc: '초고속 번들링 및 Lightning-fast HMR', icon: Zap, color: 'text-amber-500' },
    { name: 'TypeScript', desc: '안전한 정적 타입 검사 및 자동 완성', icon: Layers, color: 'text-blue-500' },
    { name: 'Tailwind CSS v4', desc: '모던 유틸리티 퍼스트 CSS 프레임워크', icon: Sparkles, color: 'text-teal-500' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      <main className="relative z-10 max-w-3xl w-full text-center space-y-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium tracking-wide">
          <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          <span>React + Vite + TypeScript + Tailwind CSS 설정 완료</span>
        </div>

        {/* Title & Description */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            프로젝트 환경이 준비되었습니다!
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            이제 원하는 컴포넌트를 자유롭게 추가하고 개발을 시작하세요.
          </p>
        </div>

        {/* Interactive Counter Card */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-sm max-w-md mx-auto space-y-4">
          <p className="text-sm text-slate-400 font-medium">컴포넌트 인터랙션 테스트</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="cursor-pointer px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 transition-all font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              카운트 증가 <ArrowRight className="w-4 h-4" />
            </button>
            <div className="px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 font-mono text-xl font-bold text-indigo-300">
              {count}
            </div>
          </div>
          <p className="text-xs text-slate-500">
            <code className="text-indigo-400">src/App.tsx</code>를 수정하면 즉시 실시간 반영(HMR)됩니다.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          {techStack.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="p-5 rounded-xl bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all flex items-start gap-4 group"
              >
                <div className={`p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/50 ${item.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-200 text-sm">{item.name}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer info */}
        <div className="pt-6 border-t border-slate-900 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI TEST Project Workspace</span>
          <span>개발 서버 실행: <code className="bg-slate-900 px-2 py-0.5 rounded text-slate-400">npm run dev</code></span>
        </div>
      </main>
    </div>
  )
}
