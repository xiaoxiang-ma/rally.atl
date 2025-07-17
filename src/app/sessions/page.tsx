'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function SessionsPage() {
  const [sessions] = useState([]) // Will be populated with real data later

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Tennis Sessions</h1>
        <p className="text-muted-foreground">
          Discover and join tennis sessions in Atlanta.
        </p>
      </div>

      {/* Filters - Placeholder for now */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <select className="w-full p-2 border rounded-md">
              <option>Any Date</option>
              <option>Today</option>
              <option>Tomorrow</option>
              <option>This Week</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Session Type</label>
            <select className="w-full p-2 border rounded-md">
              <option>All Types</option>
              <option>Hitting Partner</option>
              <option>Drills</option>
              <option>Practice Match</option>
              <option>Ranked Match</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Skill Level</label>
            <select className="w-full p-2 border rounded-md">
              <option>Any Level</option>
              <option>Beginner (1.0-2.5)</option>
              <option>Intermediate (3.0-4.0)</option>
              <option>Advanced (4.5+)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <select className="w-full p-2 border rounded-md">
              <option>Anywhere in Atlanta</option>
              <option>Within 5 miles</option>
              <option>Within 10 miles</option>
              <option>Within 25 miles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-6">
        {sessions.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center">
            <div className="text-6xl mb-4">🎾</div>
            <h3 className="text-xl font-semibold mb-2">No sessions found</h3>
            <p className="text-muted-foreground mb-6">
              There are no tennis sessions available right now.
            </p>
            <Link href="/sessions/create">
              <Button>Create the First Session</Button>
            </Link>
          </div>
        ) : (
          sessions.map((session: any) => (
            <div key={session.id} className="bg-white rounded-lg border p-6">
              {/* Session card content will go here */}
            </div>
          ))
        )}
      </div>
    </div>
  )
} 