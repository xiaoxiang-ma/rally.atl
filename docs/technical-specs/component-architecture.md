# Component Architecture

## Overview
This document defines the component architecture for Rally.ATL using Next.js 14 with App Router, TypeScript, and Tailwind CSS.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth group routes
│   │   ├── login/
│   │   ├── register/
│   │   └── profile/
│   ├── (dashboard)/       # Dashboard group routes
│   │   ├── sessions/
│   │   ├── matches/
│   │   ├── messages/
│   │   └── settings/
│   ├── api/               # API routes
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── forms/            # Form components
│   ├── layout/           # Layout components
│   ├── sessions/         # Session-related components
│   ├── users/            # User-related components
│   └── shared/           # Shared components
├── lib/                  # Utilities and configurations
│   ├── supabase/
│   ├── clerk/
│   ├── utils/
│   └── types/
├── hooks/                # Custom React hooks
├── stores/               # State management
└── styles/               # Additional styles
```

## Core Components

### Layout Components

#### RootLayout
```typescript
// app/layout.tsx
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <SupabaseProvider>
            <ThemeProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </ThemeProvider>
          </SupabaseProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
```

#### Header
```typescript
// components/layout/Header.tsx
interface HeaderProps {
  user?: User;
}

export default function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo />
          <Navigation user={user} />
          <UserMenu user={user} />
        </div>
      </nav>
    </header>
  );
}
```

### Session Components

#### SessionCard
```typescript
// components/sessions/SessionCard.tsx
interface SessionCardProps {
  session: Session;
  onJoin?: (sessionId: string) => void;
  onView?: (sessionId: string) => void;
}

export default function SessionCard({ session, onJoin, onView }: SessionCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
          <p className="text-sm text-gray-600">{session.session_type}</p>
        </div>
        <SessionTypeBadge type={session.session_type} />
      </div>
      
      <div className="space-y-2 mb-4">
        <SessionInfo icon="calendar" text={formatDate(session.date)} />
        <SessionInfo icon="clock" text={`${session.start_time} - ${session.end_time}`} />
        <SessionInfo icon="map-pin" text={session.location_name} />
        <SessionInfo icon="users" text={`${session.current_participants}/${session.max_participants}`} />
      </div>
      
      <div className="flex items-center justify-between">
        <SkillLevelRange min={session.skill_level_min} max={session.skill_level_max} />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => onView?.(session.id)}>
            View
          </Button>
          <Button onClick={() => onJoin?.(session.id)}>
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
```

#### SessionForm
```typescript
// components/sessions/SessionForm.tsx
interface SessionFormProps {
  onSubmit: (data: CreateSessionData) => void;
  initialData?: Partial<Session>;
  isLoading?: boolean;
}

export default function SessionForm({ onSubmit, initialData, isLoading }: SessionFormProps) {
  const form = useForm<CreateSessionData>({
    resolver: zodResolver(createSessionSchema),
    defaultValues: initialData,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Title</FormLabel>
              <FormControl>
                <Input placeholder="Morning hitting session" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="session_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Session Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hitting_partner">Hitting Partner</SelectItem>
                    <SelectItem value="drills">Drills</SelectItem>
                    <SelectItem value="practice_match">Practice Match</SelectItem>
                    <SelectItem value="ranked_match">Ranked Match</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <LocationPicker
          onLocationSelect={(location) => {
            form.setValue('location_name', location.name);
            form.setValue('location_address', location.address);
            form.setValue('location_lat', location.lat);
            form.setValue('location_lng', location.lng);
          }}
        />
        
        <SkillLevelRangePicker
          onRangeChange={(range) => {
            form.setValue('skill_level_min', range.min);
            form.setValue('skill_level_max', range.max);
          }}
        />
        
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Spinner /> : 'Create Session'}
        </Button>
      </form>
    </Form>
  );
}
```

### User Components

#### UserProfile
```typescript
// components/users/UserProfile.tsx
interface UserProfileProps {
  user: User;
  showStats?: boolean;
  showActions?: boolean;
}

export default function UserProfile({ user, showStats = true, showActions = true }: UserProfileProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar user={user} size="lg" />
        <div>
          <h2 className="text-xl font-semibold">{user.first_name} {user.last_name}</h2>
          <p className="text-gray-600">{user.city}, {user.state}</p>
          <div className="flex items-center space-x-2 mt-1">
            <SkillLevelBadge level={user.skill_level} />
            <EloRating rating={user.elo_rating} />
          </div>
        </div>
      </div>
      
      {user.bio && (
        <p className="text-gray-700 mb-4">{user.bio}</p>
      )}
      
      {showStats && (
        <UserStats userId={user.id} />
      )}
      
      {showActions && (
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm">
            View Profile
          </Button>
          <Button size="sm">
            Message
          </Button>
        </div>
      )}
    </div>
  );
}
```

### Form Components

#### SkillLevelRangePicker
```typescript
// components/forms/SkillLevelRangePicker.tsx
interface SkillLevelRangePickerProps {
  min?: number;
  max?: number;
  onRangeChange: (range: { min: number; max: number }) => void;
}

export default function SkillLevelRangePicker({ min = 1.0, max = 7.0, onRangeChange }: SkillLevelRangePickerProps) {
  const [range, setRange] = useState({ min, max });

  const handleMinChange = (value: number) => {
    const newRange = { ...range, min: value };
    setRange(newRange);
    onRangeChange(newRange);
  };

  const handleMaxChange = (value: number) => {
    const newRange = { ...range, max: value };
    setRange(newRange);
    onRangeChange(newRange);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Skill Level Range</Label>
        <span className="text-sm text-gray-600">
          {range.min} - {range.max}
        </span>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Label>Minimum</Label>
          <Select value={range.min.toString()} onValueChange={(v) => handleMinChange(parseFloat(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {skillLevels.map(level => (
                <SelectItem key={level} value={level.toString()}>
                  {level} - {getSkillLevelDescription(level)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <Label>Maximum</Label>
          <Select value={range.max.toString()} onValueChange={(v) => handleMaxChange(parseFloat(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {skillLevels.map(level => (
                <SelectItem key={level} value={level.toString()}>
                  {level} - {getSkillLevelDescription(level)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
```

### UI Components

#### Button
```typescript
// components/ui/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'default', 
  size = 'md', 
  loading = false,
  children, 
  ...props 
}: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
  };
  
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 py-2",
    lg: "h-12 px-8 text-lg"
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size])}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Spinner className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
}
```

## State Management

### Zustand Store
```typescript
// stores/sessionStore.ts
interface SessionStore {
  sessions: Session[];
  currentSession: Session | null;
  filters: SessionFilters;
  isLoading: boolean;
  
  // Actions
  fetchSessions: (filters?: SessionFilters) => Promise<void>;
  createSession: (data: CreateSessionData) => Promise<void>;
  joinSession: (sessionId: string) => Promise<void>;
  setCurrentSession: (session: Session | null) => void;
  updateFilters: (filters: Partial<SessionFilters>) => void;
}

export const useSessionStore = create<SessionStore>((set, get) => ({
  sessions: [],
  currentSession: null,
  filters: {
    date: null,
    sessionType: null,
    skillLevelMin: null,
    skillLevelMax: null,
    location: null,
    radius: 25,
  },
  isLoading: false,

  fetchSessions: async (filters) => {
    set({ isLoading: true });
    try {
      const response = await fetch('/api/sessions?' + new URLSearchParams(filters));
      const data = await response.json();
      set({ sessions: data.sessions, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  createSession: async (data) => {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const session = await response.json();
    set(state => ({ sessions: [session, ...state.sessions] }));
  },

  joinSession: async (sessionId) => {
    await fetch(`/api/sessions/${sessionId}/join`, { method: 'POST' });
    // Update session in store
  },

  setCurrentSession: (session) => set({ currentSession: session }),
  
  updateFilters: (filters) => set(state => ({ 
    filters: { ...state.filters, ...filters } 
  })),
}));
```

## Custom Hooks

### useSessions
```typescript
// hooks/useSessions.ts
export function useSessions(filters?: SessionFilters) {
  const { sessions, isLoading, fetchSessions } = useSessionStore();
  
  useEffect(() => {
    fetchSessions(filters);
  }, [filters]);

  return { sessions, isLoading, refetch: () => fetchSessions(filters) };
}
```

### useRealTime
```typescript
// hooks/useRealTime.ts
export function useRealTime<T>(channel: string, event: string) {
  const [data, setData] = useState<T | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    const subscription = supabase
      .channel(channel)
      .on('postgres_changes', { event: '*', schema: 'public', table: event }, (payload) => {
        setData(payload.new as T);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [channel, event, supabase]);

  return data;
}
```

## Styling Strategy

### Tailwind Configuration
```typescript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        tennis: {
          green: '#2d5016',
          yellow: '#fbbf24',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
```

### CSS Variables
```css
/* app/globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

## Performance Optimizations

### Code Splitting
- Use dynamic imports for heavy components
- Implement route-based code splitting
- Lazy load images and maps

### Memoization
```typescript
// Optimize expensive components
const SessionCard = memo(function SessionCard({ session, onJoin, onView }: SessionCardProps) {
  // Component logic
});

// Memoize expensive calculations
const filteredSessions = useMemo(() => {
  return sessions.filter(session => {
    // Filter logic
  });
}, [sessions, filters]);
```

### Virtual Scrolling
```typescript
// For large lists of sessions
import { FixedSizeList as List } from 'react-window';

function SessionList({ sessions }: { sessions: Session[] }) {
  return (
    <List
      height={600}
      itemCount={sessions.length}
      itemSize={200}
      itemData={sessions}
    >
      {SessionRow}
    </List>
  );
}
``` 