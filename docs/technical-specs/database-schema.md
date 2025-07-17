# Database Schema

## Overview
This document defines the database schema for Rally.ATL using Supabase (PostgreSQL).

## Tables

### users
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  skill_level DECIMAL(3,1) CHECK (skill_level >= 1.0 AND skill_level <= 7.0),
  elo_rating INTEGER DEFAULT 1200,
  profile_image_url TEXT,
  bio TEXT,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  city VARCHAR(100),
  state VARCHAR(50),
  zip_code VARCHAR(10),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### sessions
```sql
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  session_type VARCHAR(50) NOT NULL CHECK (session_type IN ('hitting_partner', 'drills', 'practice_match', 'ranked_match')),
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_hours INTEGER CHECK (duration_hours >= 1 AND duration_hours <= 4),
  max_participants INTEGER DEFAULT 2 CHECK (max_participants >= 1 AND max_participants <= 4),
  current_participants INTEGER DEFAULT 1,
  skill_level_min DECIMAL(3,1) CHECK (skill_level_min >= 1.0 AND skill_level_min <= 7.0),
  skill_level_max DECIMAL(3,1) CHECK (skill_level_max >= 1.0 AND skill_level_max <= 7.0),
  location_name VARCHAR(200) NOT NULL,
  location_address TEXT NOT NULL,
  location_lat DECIMAL(10, 8),
  location_lng DECIMAL(11, 8),
  court_cost DECIMAL(10, 2) DEFAULT 0,
  equipment_needed TEXT[],
  weather_contingency TEXT,
  status VARCHAR(20) DEFAULT 'open' CHECK (status IN ('open', 'full', 'cancelled', 'completed')),
  is_public BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### session_participants
```sql
CREATE TABLE session_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  message TEXT,
  UNIQUE(session_id, user_id)
);
```

### session_requests
```sql
CREATE TABLE session_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  requester_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'cancelled')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  responded_at TIMESTAMP WITH TIME ZONE,
  response_message TEXT,
  UNIQUE(session_id, requester_id)
);
```

### match_results
```sql
CREATE TABLE match_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  winner_id UUID REFERENCES users(id),
  loser_id UUID REFERENCES users(id),
  sets_winner INTEGER DEFAULT 0,
  sets_loser INTEGER DEFAULT 0,
  games_winner INTEGER DEFAULT 0,
  games_loser INTEGER DEFAULT 0,
  match_duration_minutes INTEGER,
  is_confirmed BOOLEAN DEFAULT FALSE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### ratings
```sql
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  rater_id UUID REFERENCES users(id) ON DELETE CASCADE,
  rated_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
  skill_match_rating INTEGER CHECK (skill_match_rating >= 1 AND skill_match_rating <= 5),
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  sportsmanship_rating INTEGER CHECK (sportsmanship_rating >= 1 AND sportsmanship_rating <= 5),
  feedback_text TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, rater_id, rated_user_id)
);
```

### elo_history
```sql
CREATE TABLE elo_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  old_rating INTEGER NOT NULL,
  new_rating INTEGER NOT NULL,
  match_id UUID REFERENCES match_results(id),
  reason VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### messages
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### notifications
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Indexes

```sql
-- Performance indexes
CREATE INDEX idx_sessions_date ON sessions(date);
CREATE INDEX idx_sessions_location ON sessions(location_lat, location_lng);
CREATE INDEX idx_sessions_skill_level ON sessions(skill_level_min, skill_level_max);
CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_session_participants_session ON session_participants(session_id);
CREATE INDEX idx_session_participants_user ON session_participants(user_id);
CREATE INDEX idx_ratings_rated_user ON ratings(rated_user_id);
CREATE INDEX idx_elo_history_user ON elo_history(user_id);
CREATE INDEX idx_messages_session ON messages(session_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
```

## Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE elo_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Example RLS policies (to be implemented)
-- Users can only see their own data
-- Sessions are public but participants are limited
-- Messages are visible to session participants only
```

## Triggers

```sql
-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sessions_updated_at BEFORE UPDATE ON sessions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Views

```sql
-- Active sessions view
CREATE VIEW active_sessions AS
SELECT s.*, u.first_name as creator_first_name, u.last_name as creator_last_name, u.skill_level as creator_skill_level
FROM sessions s
JOIN users u ON s.creator_id = u.id
WHERE s.status = 'open' AND s.date >= CURRENT_DATE;

-- User statistics view
CREATE VIEW user_stats AS
SELECT 
  u.id,
  u.first_name,
  u.last_name,
  u.skill_level,
  u.elo_rating,
  COUNT(DISTINCT sp.session_id) as total_sessions,
  COUNT(DISTINCT mr.id) as total_matches,
  COUNT(DISTINCT CASE WHEN mr.winner_id = u.id THEN mr.id END) as wins,
  COUNT(DISTINCT CASE WHEN mr.loser_id = u.id THEN mr.id END) as losses
FROM users u
LEFT JOIN session_participants sp ON u.id = sp.user_id AND sp.status = 'accepted'
LEFT JOIN match_results mr ON sp.session_id = mr.session_id
GROUP BY u.id, u.first_name, u.last_name, u.skill_level, u.elo_rating;
``` 