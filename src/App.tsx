export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative">
        {/* Background glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-20 animate-pulse pointer-events-none" />

        <h1 className="relative text-6xl sm:text-8xl md:text-9xl font-black tracking-tight bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
          Hello You
        </h1>
      </div>

      <p className="mt-8 text-slate-400 text-base sm:text-xl font-medium tracking-wide">
        React + TypeScript + Tailwind CSS
      </p>
    </div>
  )
}
