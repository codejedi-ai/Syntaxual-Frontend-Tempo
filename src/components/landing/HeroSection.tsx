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
