import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  title: string
  subtitle: string
  onGetStarted: () => void
}

export default function HeroSection({ title, subtitle, onGetStarted }: HeroSectionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto">
          {subtitle}
        </p>
        <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          Get Started
        </Button>
      </div>
    </div>
  )
}
