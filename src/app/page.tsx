import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-tennis-green to-tennis-court py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Rally.ATL
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Find tennis partners and join sessions in Atlanta. 
            From casual hitting to competitive matches.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sessions">
              <Button size="lg" className="bg-white text-tennis-green hover:bg-gray-100">
                Find Sessions
              </Button>
            </Link>
            <Link href="/sessions/create">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-tennis-green">
                Create Session
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Rally.ATL?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-tennis-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎾</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill-Based Matching</h3>
              <p className="text-gray-600">
                Find players at your skill level for the best tennis experience.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-tennis-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Courts</h3>
              <p className="text-gray-600">
                Discover tennis courts and venues near you in Atlanta.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-tennis-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Players</h3>
              <p className="text-gray-600">
                Connect with reliable players through our rating system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Play?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the Atlanta tennis community today.
          </p>
          <Link href="/sign-up">
            <Button size="lg" className="bg-tennis-green hover:bg-tennis-green/90">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
} 