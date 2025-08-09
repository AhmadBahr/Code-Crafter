# Code-Crafter - Online Code Editor

A modern, feature-rich online code editor with multi-language support, real-time execution, and collaborative features.

![Next.js](https://badge.io/badge/Next.js/14.1.0/black?logo=next.js)
![React](https://badge.io/badge/React/18.2.0/61DAFB?logo=react)
![TypeScript](https://badge.io/badge/TypeScript/5.0/blue?logo=typescript)
![Convex](https://badge.io/badge/Convex/1.17.4/00D4AA?logo=convex)
![Clerk](https://badge.io/badge/Clerk/Auth/6C47FF?logo=clerk)
![Tailwind CSS](https://badge.io/badge/Tailwind_CSS/3.4.1/38B2AC?logo=tailwind-css)
![Monaco Editor](https://badge.io/badge/Monaco_Editor/0.52.2/007ACC?logo=monaco-editor)

![Demo App](/public/screenshot-for-readme.png)

## ✨ Features

- 💻 **Multi-Language Support** - Write and execute code in 10+ programming languages
- 🎨 **Customizable Themes** - Choose from 5 popular VS Code themes
- ⚡ **Real-Time Execution** - Run code instantly with Piston API integration
- 👤 **User Authentication** - Secure login with Clerk authentication
- 📊 **Code Analytics** - Track execution history and statistics
- 🔗 **Code Sharing** - Share and discover code snippets with the community
- ⭐ **Star System** - Like and save your favorite code snippets
- 💬 **Comments** - Discuss and collaborate on code snippets
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎯 **Pro Features** - Advanced languages and features for premium users

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or yarn
- Convex account
- Clerk account

### Environment Setup
Create a `.env.local` file in your project root:
```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Convex Backend
CONVEX_DEPLOYMENT=your_convex_deployment_url
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Webhook Secrets (in Convex Dashboard)
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
LEMON_SQUEEZY_WEBHOOK_SECRET=your_lemon_squeezy_webhook_secret
```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Code-Crafter

# Install dependencies
npm install

# Start the development server
npm run dev

# In another terminal, start Convex
npx convex dev
```

Visit `http://localhost:3000` to see the application.

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14.1.0 - React framework with App Router
- React 18.2.0 - UI library
- TypeScript 5.0 - Type safety
- Tailwind CSS 3.4.1 - Utility-first CSS framework
- Monaco Editor 0.52.2 - Code editor component
- Framer Motion 11.15.0 - Animation library
- Zustand 5.0.2 - State management
- Lucide React 0.469.0 - Icon library

**Backend:**
- Convex 1.17.4 - Serverless backend platform
- Clerk 6.9.6 - Authentication and user management
- Piston API - Code execution engine
- Lemon Squeezy - Subscription management

**Development:**
- ESLint - Code linting
- PostCSS - CSS processing
- React Hot Toast - Notifications

## 📁 Project Structure

```
Code-Crafter/
├── convex/                    # Convex backend functions
│   ├── codeExecutions.ts     # Code execution logic
│   ├── snippets.ts           # Snippet management
│   ├── users.ts              # User management
│   ├── schema.ts             # Database schema
│   └── http.ts               # Webhook handlers
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (root)/           # Main editor page
│   │   ├── pricing/          # Pricing page
│   │   ├── profile/          # User profile
│   │   └── snippets/         # Snippet pages
│   ├── components/           # Shared components
│   ├── hooks/                # Custom React hooks
│   ├── store/                # Zustand state management
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
└── scripts/                  # Build and utility scripts
```

## 🔧 Configuration

### Supported Languages
- **JavaScript** (18.15.0) - Free tier
- **TypeScript** (5.0.3) - Pro tier
- **Python** (3.10.0) - Pro tier
- **Java** (15.0.2) - Pro tier
- **Go** (1.16.2) - Pro tier
- **Rust** (1.68.2) - Pro tier
- **C++** (10.2.0) - Pro tier
- **C#** (6.12.0) - Pro tier
- **Ruby** (3.0.1) - Pro tier
- **Swift** (5.3.3) - Pro tier

### Available Themes
- VS Dark (default)
- VS Light
- GitHub Dark
- Monokai
- Solarized Dark

## 📚 API Endpoints

**Code Execution:**
- `POST /api/execute` - Execute code in various languages

**Snippets:**
- `GET /api/snippets` - Get all public snippets
- `POST /api/snippets` - Create new snippet
- `GET /api/snippets/[id]` - Get specific snippet
- `DELETE /api/snippets/[id]` - Delete snippet
- `POST /api/snippets/[id]/star` - Star/unstar snippet
- `POST /api/snippets/[id]/comments` - Add comment

**User Management:**
- `GET /api/users/[id]` - Get user profile
- `GET /api/users/[id]/executions` - Get user's code executions
- `GET /api/users/[id]/stats` - Get user statistics

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

### Backend (Convex)
```bash
# Deploy Convex functions
npx convex deploy
```

### Environment Variables
Make sure to set all required environment variables in your deployment platform.

## 💡 Usage Examples

### Basic Code Execution
```javascript
// JavaScript example
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(n => n * n);
console.log('Squared numbers:', squares);
```

### Creating a Snippet
1. Write your code in the editor
2. Select your preferred language
3. Click "Share" to create a public snippet
4. Add a title and description
5. Share the generated link with others

### Customizing the Editor
- Use the theme selector to change the editor appearance
- Adjust font size using the controls
- Switch between different programming languages
- Use keyboard shortcuts for common actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor component
- [Piston API](https://piston.readthedocs.io/) - Code execution engine
- [Clerk](https://clerk.com/) - Authentication platform
- [Convex](https://convex.dev/) - Backend platform
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

---

**Built with ❤️ using Next.js, Convex, and TypeScript**
