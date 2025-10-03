import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useNavigate } from 'react-router-dom'
import LoadingScreen from '@/components/LoadingScreen'
import { LogIn } from 'lucide-react'

export default function SyntaxTual() {
  const navigate = useNavigate()
  const { user, loading, loginWithRedirect } = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleLogin = async () => {
    await loginWithRedirect()
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
      <Card className="w-full max-w-md bg-gray-800/50 border-gray-700 backdrop-blur-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 text-transparent bg-clip-text">
            SyntaxTual
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Sign in with Auth0 to access your AI agents
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-6"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In with Auth0
          </Button>
          <p className="text-xs text-center text-gray-500">
            Secure authentication powered by Auth0
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
