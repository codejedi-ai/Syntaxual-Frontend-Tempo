import { Code, Sparkles, GitBranch } from 'lucide-react'

interface Feature {
  icon: string
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  className?: string
}

export default function FeatureGrid({ features, className }: FeatureGridProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ai':
        return <Sparkles className="w-8 h-8 text-cyan-400" />
      case 'code':
        return <Code className="w-8 h-8 text-blue-400" />
      case 'git':
        return <GitBranch className="w-8 h-8 text-teal-400" />
      default:
        return <Sparkles className="w-8 h-8 text-cyan-400" />
    }
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-cyan-500/50 transition-all"
        >
          <div className="mb-4">{getIcon(feature.icon)}</div>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-white/70">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
