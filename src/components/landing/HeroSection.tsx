import { Button } from '@/components/ui/button'

interface HeroSectionProps {
  title: string
  subtitle: string
  onGetStarted: () => void
}

export default function HeroSection({ title, subtitle, onGetStarted }: HeroSectionProps) {
  return (
    <div className="flex items-center justify-center px-4 pt-24">
      <div className="text-center mx-auto">
        <h1 className="text-7xl leading-[1.2] md:leading-[1.15] tracking-tight font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 text-transparent bg-clip-text inline-block overflow-visible pt-1 pb-2 md:pb-3">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto px-6">
          {subtitle}
        </p>
        <Button onClick={onGetStarted} size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
          Get Started
        </Button>
      </div>
    </div>
  )
}
