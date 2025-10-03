import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Button } from '../components/ui/button'
import { Calendar, ExternalLink } from 'lucide-react'
import Layout from '../components/Layout'

export default function NewsPage() {
  const news = [
    {
      id: 1,
      title: 'Team Clinches Top Position at FAST-NUCES National Hackathon',
      description: 'Our team achieved first place at the prestigious FAST-NUCES National Hackathon, showcasing innovative solutions in AI and software development.',
      date: 'December 2024',
      category: 'Achievement',
      link: 'https://www.linkedin.com/posts/bilal-khan1548_thrilled-to-share-that-my-team-clinched-the-activity-7275562148670418944-nmTe/',
      featured: true,
    },
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-transparent bg-clip-text">
              Recent News
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Stay updated with our latest achievements and milestones
            </p>
          </div>

          <div className="space-y-6">
            {news.map((item) => (
              <Card
                key={item.id}
                className={`bg-gray-800/50 border-gray-700 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20 ${
                  item.featured ? 'border-cyan-500/30' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30"
                        >
                          {item.category}
                        </Badge>
                        {item.featured && (
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          >
                            Featured
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl text-white mb-2">
                        {item.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-base mb-6 leading-relaxed">
                    {item.description}
                  </CardDescription>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Read More on LinkedIn
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {news.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No news available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
