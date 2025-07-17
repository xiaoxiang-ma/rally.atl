# API Endpoints

## Overview
This document defines the REST API endpoints for Rally.ATL using Next.js API routes.

## Authentication
All endpoints require authentication via Clerk. User ID is extracted from the JWT token.

## Base URL
```
https://rally-atl.vercel.app/api
```

## Endpoints

### Authentication & Users

#### GET /api/auth/user
Get current user profile
```typescript
Response: {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  skill_level: number;
  elo_rating: number;
  profile_image_url?: string;
  bio?: string;
  location_lat?: number;
  location_lng?: number;
  city?: string;
  state?: string;
  zip_code?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}
```

#### PUT /api/auth/user
Update user profile
```typescript
Request: {
  first_name?: string;
  last_name?: string;
  phone?: string;
  date_of_birth?: string;
  skill_level?: number;
  bio?: string;
  location_lat?: number;
  location_lng?: number;
  city?: string;
  state?: string;
  zip_code?: string;
}

Response: Updated user object
```

#### GET /api/users/[id]
Get user profile by ID
```typescript
Response: {
  id: string;
  first_name: string;
  last_name: string;
  skill_level: number;
  elo_rating: number;
  profile_image_url?: string;
  bio?: string;
  city?: string;
  state?: string;
  total_sessions: number;
  total_matches: number;
  wins: number;
  losses: number;
  created_at: string;
}
```

### Sessions

#### GET /api/sessions
Get sessions with filters
```typescript
Query Parameters: {
  date?: string; // YYYY-MM-DD
  session_type?: 'hitting_partner' | 'drills' | 'practice_match' | 'ranked_match';
  skill_level_min?: number;
  skill_level_max?: number;
  location_lat?: number;
  location_lng?: number;
  radius?: number; // miles
  status?: 'open' | 'full' | 'cancelled' | 'completed';
  limit?: number;
  offset?: number;
}

Response: {
  sessions: Session[];
  total: number;
  has_more: boolean;
}
```

#### POST /api/sessions
Create new session
```typescript
Request: {
  title: string;
  description?: string;
  session_type: 'hitting_partner' | 'drills' | 'practice_match' | 'ranked_match';
  date: string; // YYYY-MM-DD
  start_time: string; // HH:MM
  end_time: string; // HH:MM
  duration_hours: number;
  max_participants: number;
  skill_level_min: number;
  skill_level_max: number;
  location_name: string;
  location_address: string;
  location_lat?: number;
  location_lng?: number;
  court_cost?: number;
  equipment_needed?: string[];
  weather_contingency?: string;
}

Response: Created session object
```

#### GET /api/sessions/[id]
Get session details
```typescript
Response: {
  id: string;
  creator: User;
  title: string;
  description?: string;
  session_type: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_hours: number;
  max_participants: number;
  current_participants: number;
  skill_level_min: number;
  skill_level_max: number;
  location_name: string;
  location_address: string;
  location_lat?: number;
  location_lng?: number;
  court_cost: number;
  equipment_needed?: string[];
  weather_contingency?: string;
  status: string;
  participants: SessionParticipant[];
  created_at: string;
  updated_at: string;
}
```

#### PUT /api/sessions/[id]
Update session (creator only)
```typescript
Request: {
  title?: string;
  description?: string;
  date?: string;
  start_time?: string;
  end_time?: string;
  duration_hours?: number;
  max_participants?: number;
  skill_level_min?: number;
  skill_level_max?: number;
  location_name?: string;
  location_address?: string;
  location_lat?: number;
  location_lng?: number;
  court_cost?: number;
  equipment_needed?: string[];
  weather_contingency?: string;
  status?: string;
}

Response: Updated session object
```

#### DELETE /api/sessions/[id]
Cancel session (creator only)
```typescript
Response: { success: boolean }
```

### Session Participation

#### POST /api/sessions/[id]/join
Request to join session
```typescript
Request: {
  message?: string;
}

Response: { success: boolean; request_id: string }
```

#### PUT /api/sessions/[id]/join
Accept/decline join request (creator only)
```typescript
Request: {
  user_id: string;
  status: 'accepted' | 'declined';
  response_message?: string;
}

Response: { success: boolean }
```

#### DELETE /api/sessions/[id]/join
Leave session
```typescript
Response: { success: boolean }
```

#### GET /api/sessions/[id]/participants
Get session participants
```typescript
Response: {
  participants: SessionParticipant[];
}
```

### Match Results

#### POST /api/sessions/[id]/results
Record match results (for ranked matches)
```typescript
Request: {
  winner_id: string;
  loser_id: string;
  sets_winner: number;
  sets_loser: number;
  games_winner: number;
  games_loser: number;
  match_duration_minutes?: number;
}

Response: { success: boolean; match_id: string }
```

#### PUT /api/matches/[id]/confirm
Confirm match results
```typescript
Response: { success: boolean }
```

#### GET /api/matches/[id]
Get match details
```typescript
Response: {
  id: string;
  session: Session;
  winner: User;
  loser: User;
  sets_winner: number;
  sets_loser: number;
  games_winner: number;
  games_loser: number;
  match_duration_minutes?: number;
  is_confirmed: boolean;
  confirmed_at?: string;
  created_at: string;
}
```

### Ratings & Feedback

#### POST /api/sessions/[id]/rate
Rate session participants
```typescript
Request: {
  rated_user_id: string;
  overall_rating: number;
  skill_match_rating: number;
  communication_rating: number;
  punctuality_rating: number;
  sportsmanship_rating: number;
  feedback_text?: string;
  is_public?: boolean;
}

Response: { success: boolean; rating_id: string }
```

#### GET /api/users/[id]/ratings
Get user ratings
```typescript
Query Parameters: {
  limit?: number;
  offset?: number;
}

Response: {
  ratings: Rating[];
  total: number;
  average_rating: number;
}
```

### Messaging

#### GET /api/sessions/[id]/messages
Get session messages
```typescript
Query Parameters: {
  limit?: number;
  offset?: number;
}

Response: {
  messages: Message[];
  total: number;
}
```

#### POST /api/sessions/[id]/messages
Send message to session
```typescript
Request: {
  content: string;
  message_type?: 'text' | 'image' | 'location';
}

Response: { success: boolean; message_id: string }
```

### Notifications

#### GET /api/notifications
Get user notifications
```typescript
Query Parameters: {
  unread_only?: boolean;
  limit?: number;
  offset?: number;
}

Response: {
  notifications: Notification[];
  total: number;
  unread_count: number;
}
```

#### PUT /api/notifications/[id]/read
Mark notification as read
```typescript
Response: { success: boolean }
```

#### PUT /api/notifications/read-all
Mark all notifications as read
```typescript
Response: { success: boolean }
```

### Search & Discovery

#### GET /api/search/sessions
Search sessions with advanced filters
```typescript
Query Parameters: {
  q?: string; // search query
  date_from?: string;
  date_to?: string;
  session_types?: string[]; // comma-separated
  skill_levels?: string[]; // comma-separated
  locations?: string[]; // comma-separated
  sort_by?: 'date' | 'distance' | 'skill_match' | 'creator_rating';
  sort_order?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

Response: {
  sessions: Session[];
  total: number;
  has_more: boolean;
}
```

#### GET /api/search/users
Search users by skill level and location
```typescript
Query Parameters: {
  skill_level_min?: number;
  skill_level_max?: number;
  location_lat?: number;
  location_lng?: number;
  radius?: number;
  limit?: number;
  offset?: number;
}

Response: {
  users: User[];
  total: number;
  has_more: boolean;
}
```

### Statistics & Analytics

#### GET /api/stats/user
Get user statistics
```typescript
Response: {
  total_sessions: number;
  total_matches: number;
  wins: number;
  losses: number;
  win_rate: number;
  average_rating: number;
  rating_history: EloHistory[];
  recent_activity: Activity[];
}
```

#### GET /api/stats/leaderboard
Get leaderboard
```typescript
Query Parameters: {
  type?: 'elo' | 'sessions' | 'wins';
  location?: string;
  limit?: number;
}

Response: {
  leaderboard: LeaderboardEntry[];
}
```

## Error Responses

All endpoints return consistent error responses:

```typescript
Error Response: {
  error: {
    code: string;
    message: string;
    details?: any;
  }
}
```

Common error codes:
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `NOT_FOUND`: Resource not found
- `VALIDATION_ERROR`: Invalid request data
- `CONFLICT`: Resource conflict
- `INTERNAL_ERROR`: Server error

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per hour per user
- Special limits for session creation (10 per day)

## WebSocket Events

For real-time features:

```typescript
// Session updates
'session:updated': { session_id: string; session: Session }
'session:cancelled': { session_id: string }

// Join requests
'join:requested': { session_id: string; user: User }
'join:accepted': { session_id: string; user_id: string }
'join:declined': { session_id: string; user_id: string }

// Messages
'message:new': { session_id: string; message: Message }

// Notifications
'notification:new': { notification: Notification }
``` 