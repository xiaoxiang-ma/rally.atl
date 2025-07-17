'use client'

import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function CreateSessionPage() {
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
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Create Tennis Session</h1>
        <p className="text-muted-foreground">
          Set up a new tennis session for others to join.
        </p>
      </div>

      <div className="max-w-2xl">
        <div className="bg-white rounded-lg border p-6">
          <form className="space-y-6">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Session Title *
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-md"
                placeholder="e.g., Morning hitting session at Piedmont Park"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full p-3 border rounded-md"
                rows={3}
                placeholder="Tell others about your session..."
              />
            </div>

            {/* Session Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Session Type *
                </label>
                <select className="w-full p-3 border rounded-md" required>
                  <option value="">Select type</option>
                  <option value="hitting_partner">Hitting Partner</option>
                  <option value="drills">Drills</option>
                  <option value="practice_match">Practice Match</option>
                  <option value="ranked_match">Ranked Match</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Max Participants *
                </label>
                <select className="w-full p-3 border rounded-md" required>
                  <option value="">Select number</option>
                  <option value="1">1 player</option>
                  <option value="2">2 players</option>
                  <option value="3">3 players</option>
                  <option value="4">4 players</option>
                </select>
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Start Time *
                </label>
                <input
                  type="time"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Duration (hours) *
                </label>
                <select className="w-full p-3 border rounded-md" required>
                  <option value="">Select duration</option>
                  <option value="1">1 hour</option>
                  <option value="1.5">1.5 hours</option>
                  <option value="2">2 hours</option>
                  <option value="2.5">2.5 hours</option>
                  <option value="3">3 hours</option>
                </select>
              </div>
            </div>

            {/* Skill Level */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Skill Level *
                </label>
                <select className="w-full p-3 border rounded-md" required>
                  <option value="">Select level</option>
                  <option value="1.0">1.0 - Beginner</option>
                  <option value="1.5">1.5 - Beginner</option>
                  <option value="2.0">2.0 - Beginner</option>
                  <option value="2.5">2.5 - Beginner</option>
                  <option value="3.0">3.0 - Intermediate</option>
                  <option value="3.5">3.5 - Intermediate</option>
                  <option value="4.0">4.0 - Intermediate</option>
                  <option value="4.5">4.5 - Advanced</option>
                  <option value="5.0">5.0 - Advanced</option>
                  <option value="5.5">5.5 - Advanced</option>
                  <option value="6.0">6.0 - Professional</option>
                  <option value="7.0">7.0 - Professional</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Maximum Skill Level *
                </label>
                <select className="w-full p-3 border rounded-md" required>
                  <option value="">Select level</option>
                  <option value="1.0">1.0 - Beginner</option>
                  <option value="1.5">1.5 - Beginner</option>
                  <option value="2.0">2.0 - Beginner</option>
                  <option value="2.5">2.5 - Beginner</option>
                  <option value="3.0">3.0 - Intermediate</option>
                  <option value="3.5">3.5 - Intermediate</option>
                  <option value="4.0">4.0 - Intermediate</option>
                  <option value="4.5">4.5 - Advanced</option>
                  <option value="5.0">5.0 - Advanced</option>
                  <option value="5.5">5.5 - Advanced</option>
                  <option value="6.0">6.0 - Professional</option>
                  <option value="7.0">7.0 - Professional</option>
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Court/Venue Name *
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-md"
                placeholder="e.g., Piedmont Park Tennis Center"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Address *
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-md"
                placeholder="e.g., 400 Park Dr NE, Atlanta, GA 30306"
                required
              />
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Court Cost (per person)
              </label>
              <input
                type="number"
                className="w-full p-3 border rounded-md"
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Create Session
              </Button>
              <Button type="button" variant="outline">
                Save Draft
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 