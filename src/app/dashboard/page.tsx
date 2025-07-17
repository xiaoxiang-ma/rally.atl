'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {
  const { isSignedIn, isLoaded } = useUser()

  if (isLoaded && !isSignedIn) {
    redirect('/')
  }

  if (!isLoaded) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-muted-foreground">
          Manage your tennis sessions and profile.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/sessions/create">
              <Button className="w-full justify-start">
                Create New Session
              </Button>
            </Link>
            <Link href="/sessions">
              <Button variant="outline" className="w-full justify-start">
                Find Sessions
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="w-full justify-start">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-tennis-green">0</div>
              <div className="text-sm text-muted-foreground">Sessions Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tennis-green">0</div>
              <div className="text-sm text-muted-foreground">Sessions Joined</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tennis-green">-</div>
              <div className="text-sm text-muted-foreground">Skill Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-tennis-green">1200</div>
              <div className="text-sm text-muted-foreground">Elo Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="text-center py-8 text-muted-foreground">
          <p>No recent activity yet.</p>
          <p className="text-sm">Start by creating or joining a session!</p>
        </div>
      </div>
    </div>
  )
} 