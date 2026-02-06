# Lumina - AI-Powered Assistant with Tool Calling

![Lumina](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

A modern, AI-powered chat assistant built with Next.js that integrates real-world tools to fetch live weather data, F1 race schedules, and stock prices through natural conversation.

## Features

- ** OAuth Authentication** - Secure login with Google & GitHub
- ** AI Chat Interface** - Streaming responses with Vercel AI SDK
- ** Tool Calling** - Real-time data fetching:
  - **Weather**: Live weather data for any location
  - **F1 Schedules**: Upcoming Formula 1 races
  - **Stock Prices**: Real-time stock market data
- ** Chat History** - Persistent conversation storage
- ** Dark Mode** - Beautiful dark/light theme support
- ** Responsive Design** - Works on all devices

##  Tech Stack

- **Frontend**: Next.js 15 (App Router) with TypeScript
- **Database**: Drizzle ORM + Neon DB
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js v5
- **AI Integration**: Vercel AI SDK
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

##  Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A GitHub account
- A Google Cloud Console account
- API keys for the following services:
  - OpenAI / Anthropic / Gemini (AI provider)
  - OpenWeatherMap (weather data)
  - Alpha Vantage (stock data)
  - Neon DB (database)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/lumina.git
cd lumina
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-key-here"  # Generate with: openssl rand -base64 32

# OAuth Providers
# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# AI Provider (choose one)
OPENAI_API_KEY="your-openai-api-key"
# OR
ANTHROPIC_API_KEY="your-anthropic-api-key"
# OR
GEMINI_API_KEY="your-gemini-api-key"

# Tool APIs
OPENWEATHER_API_KEY="your-openweather-api-key"
ALPHA_VANTAGE_API_KEY="your-alpha-vantage-api-key"
```

### 4. Get API Keys

#### 🔹 Neon DB (Database)

1. Go to [Neon Console](https://console.neon.tech)
2. Create a new project
3. Copy the connection string
4. Add to `DATABASE_URL`

#### 🔹 Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)
6. Copy Client ID and Client Secret

#### 🔹 GitHub OAuth

1. Go to [GitHub Settings → Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate Client Secret

#### 🔹 OpenAI API

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create new secret key
3. Copy and add to `.env.local`

#### 🔹 OpenWeatherMap

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for free account
3. Get API key from dashboard
4. Free tier: 1,000 calls/day

#### 🔹 Alpha Vantage (Stock Data)

1. Go to [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
2. Get free API key
3. Free tier: 25 calls/day

### 5. Database Setup

Run database migrations:

```bash
npm run db:push
# or
npx drizzle-kit push
```

Generate database client:

```bash
npm run db:generate
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚢 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/lumina)

### Manual Deployment

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure project settings

3. **Add Environment Variables**

   In Vercel Dashboard → Project → Settings → Environment Variables, add:

   ```
   DATABASE_URL
   NEXTAUTH_URL (https://your-app.vercel.app)
   NEXTAUTH_SECRET
   GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET
   GITHUB_CLIENT_ID
   GITHUB_CLIENT_SECRET
   OPENAI_API_KEY (or ANTHROPIC_API_KEY or GEMINI_API_KEY)
   OPENWEATHER_API_KEY
   ALPHA_VANTAGE_API_KEY
   ```

4. **Update OAuth Redirect URIs**

   Add production URLs to OAuth providers:
   - **Google**: `https://your-app.vercel.app/api/auth/callback/google`
   - **GitHub**: `https://your-app.vercel.app/api/auth/callback/github`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

## 📁 Project Structure

```
lumina/
├── app/
│   ├── (auth)/
│   │   └── login/              # Login page
│   ├── (protected)/
│   │   └── chat/               # Protected chat interface
│   ├── api/
│   │   ├── auth/               # NextAuth routes
│   │   └── chat/               # Chat API endpoint
│   ├── layout.tsx
│   └── page.tsx                # Landing page
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── chat/                   # Chat-specific components
│   └── mode-toggle.tsx         # Dark mode toggle
├── lib/
│   ├── db/
│   │   ├── schema.ts           # Database schema
│   │   └── index.ts            # Database client
│   ├── auth.ts                 # NextAuth configuration
│   └── tools/                  # AI tool definitions
├── public/
├── .env.local                  # Environment variables (DO NOT COMMIT)
├── drizzle.config.ts           # Drizzle ORM config
├── next.config.js
├── package.json
└── tailwind.config.ts
```

## 🔨 Development Workflow

### Recommended Commit Strategy

Follow this commit pattern for clean history:

```bash
# 1. Initial setup
git commit -m "chore: initialize Next.js project with TypeScript"
git commit -m "feat: add shadcn/ui and configure Tailwind CSS"

# 2. Authentication
git commit -m "feat: configure NextAuth.js with OAuth providers"
git commit -m "feat: add Google OAuth integration"
git commit -m "feat: add GitHub OAuth integration"
git commit -m "feat: create protected route middleware"

# 3. Database
git commit -m "feat: setup Drizzle ORM with Neon DB"
git commit -m "feat: create database schema for chat history"
git commit -m "feat: add database migrations"

# 4. AI Integration
git commit -m "feat: integrate Vercel AI SDK"
git commit -m "feat: implement streaming chat responses"
git commit -m "feat: add weather tool with OpenWeatherMap API"
git commit -m "feat: add F1 schedules tool with Ergast API"
git commit -m "feat: add stock price tool with Alpha Vantage API"

# 5. UI/UX
git commit -m "feat: create landing page with hero section"
git commit -m "feat: build chat interface with message history"
git commit -m "feat: add dark mode support"
git commit -m "style: implement responsive design"

# 6. Features
git commit -m "feat: implement chat history persistence"
git commit -m "feat: add server actions for database operations"

# 7. Polish
git commit -m "docs: add comprehensive README"
git commit -m "chore: configure environment variables"
git commit -m "fix: resolve authentication edge cases"
git commit -m "perf: optimize API response caching"
```

### Code Quality Checklist

Before committing, ensure:

- [ ] Code is properly formatted (use `npm run format`)
- [ ] No console.logs in production code
- [ ] TypeScript has no errors (`npm run type-check`)
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] Loading states are handled
- [ ] Responsive design is tested

## Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Format code
npm run format
```

## Common Issues & Solutions

### Issue: OAuth redirect URI mismatch

**Solution**: Ensure redirect URIs in OAuth providers match exactly with your app URLs (including http/https)

### Issue: Database connection fails

**Solution**:

1. Check `DATABASE_URL` format
2. Ensure Neon DB is not paused
3. Verify SSL mode is set correctly

### Issue: API rate limits

**Solution**:

- OpenWeatherMap: Implement caching
- Alpha Vantage: Use free tier wisely (25 calls/day)
- Consider upgrading to paid tiers for production

### Issue: NextAuth session not persisting

**Solution**:

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Clear browser cookies and try again

## Key Features Explained

### Server Actions

Used for database operations to maintain security and reduce client-side code:

- Save chat messages
- Retrieve chat history
- User session management

### Tool Calling

AI automatically decides when to call tools based on user queries:

```typescript
// Example: User asks "What's the weather in London?"
// AI recognizes this needs weather tool and calls it automatically
```

### SSR + CSR Mix

- **SSR**: Landing page, authentication pages (SEO, fast initial load)
- **CSR**: Chat interface (real-time updates, dynamic content)

## Performance Optimizations

- **Streaming Responses**: AI responses stream in real-time
- **Database Indexing**: Optimized queries for chat history
- **API Caching**: Reduce redundant API calls
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic with Next.js App Router

## Security Best Practices

- ✅ Environment variables never committed
- ✅ Server-side API key validation
- ✅ Protected routes with middleware
- ✅ CSRF protection with NextAuth
- ✅ SQL injection prevention with Drizzle ORM
- ✅ Rate limiting on API endpoints (recommended)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

**Suhag S Shetty**

- GitHub: [@suhagshetty](https://github.com/Suhagshetty)
- LinkedIn: [suhagshetty](https://www.linkedin.com/in/suhagshetty07/)

## 🙏 Acknowledgments

- [Asymmetri](https://www.asymmetri.in/) for the assignment
- [Vercel](https://vercel.com) for hosting
- [shadcn/ui](https://ui.shadcn.com) for beautiful components
- [Next.js](https://nextjs.org) team for the amazing framework

---

**Made with ❤️ by Suhag S Shetty © 2026**

**⭐ If you found this project helpful, please give it a star!**
