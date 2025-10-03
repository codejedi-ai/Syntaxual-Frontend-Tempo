import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

interface HeroSectionProps {
  onGetStarted: () => void
}

export default function HeroSection({ onGetStarted }: HeroSectionProps) {
  const [currentPhase, setCurrentPhase] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPhase(1)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full opacity-20"
        style={{ zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="dnaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#60a5fa', stopOpacity: 0.8 }} />
            <stop offset="50%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0.8 }} />
          </linearGradient>
          <linearGradient id="dnaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.6 }} />
            <stop offset="50%" style={{ stopColor: '#d946ef', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>

        {[0, 1, 2].map((helixIndex) => {
          const xOffset = 200 + helixIndex * 400;
          const points1 = [];
          const points2 = [];
          const connections = [];

          for (let i = 0; i <= 100; i++) {
            const y = (i / 100) * 120;
            const angle = (i / 100) * Math.PI * 8;
            const x1 = Math.sin(angle) * 60;
            const x2 = Math.sin(angle + Math.PI) * 60;
            points1.push({ x: xOffset + x1, y: y + '%', i });
            points2.push({ x: xOffset + x2, y: y + '%', i });

            if (i % 8 === 0) {
              connections.push({
                x1: xOffset + x1,
                y1: y + '%',
                x2: xOffset + x2,
                y2: y + '%',
                i
              });
            }
          }

          return (
            <g key={helixIndex}>
              <path
                d={`M ${points1.map((p, idx) => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="url(#dnaGradient1)"
                strokeWidth="4"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,-20; 0,20; 0,-20"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              <path
                d={`M ${points2.map((p, idx) => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke="url(#dnaGradient2)"
                strokeWidth="4"
                strokeLinecap="round"
              >
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,-20; 0,20; 0,-20"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              {connections.map((conn, idx) => (
                <line
                  key={idx}
                  x1={conn.x1}
                  y1={conn.y1}
                  x2={conn.x2}
                  y2={conn.y2}
                  stroke="url(#dnaGradient1)"
                  strokeWidth="2"
                  opacity="0.4"
                >
                  <animateTransform
                    attributeName="transform"
                    type="translate"
                    values="0,-20; 0,20; 0,-20"
                    dur="4s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.2;0.6;0.2"
                    dur="2s"
                    begin={`${idx * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none z-10"></div>

      <div className="text-center mx-auto relative z-20">
        <div className="mb-8 relative">
          <h1
            className={`text-8xl md:text-9xl leading-[1.1] tracking-tight font-bold transition-all duration-1000 ${
              currentPhase === 0
                ? 'opacity-100 scale-100 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400'
                : 'opacity-0 scale-95 bg-gradient-to-r from-blue-400 to-cyan-400'
            } text-transparent bg-clip-text inline-block`}
          >
            Agents as Code
          </h1>

          <h1
            className={`text-8xl md:text-9xl leading-[1.1] tracking-tight font-bold absolute inset-0 transition-all duration-1000 ${
              currentPhase === 1
                ? 'opacity-100 scale-100 bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400'
                : 'opacity-0 scale-105 bg-gradient-to-r from-purple-400 to-cyan-400'
            } text-transparent bg-clip-text inline-block`}
          >
            AI Genetics
          </h1>
        </div>

        <p className={`text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto px-6 transition-opacity duration-1000 ${
          currentPhase === 1 ? 'opacity-100' : 'opacity-0'
        }`}>
          Where code becomes DNA and agents evolve through self-replication
        </p>

        <Button
          onClick={onGetStarted}
          size="lg"
          className={`bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-500 ${
            currentPhase === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Enter the Ecosystem
        </Button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}
