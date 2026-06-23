# We Are Daraja Africa

A React application for anonymous emotional expression with Supabase backend integration.

**Development Setup:**

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies: `npm install`
4. Create an `.env.local` file with Supabase credentials:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Run the app: `npm run dev`

**Scripts:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint

**Features:**
- The Pit: Share anonymous entries that others can read
- The Void: Private cathartic release (entries are not saved)
- Emotion wheel for categorizing feelings
- Witness mode for reading shared entries