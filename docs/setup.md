# Development Setup Guide

This guide provides step-by-step instructions for setting up the Budgeting App development environment.

## Prerequisites

### System Requirements
- **Node.js**: Version 18 or higher
- **npm**: Latest stable version (comes with Node.js)
- **Git**: For version control
- **Modern Web Browser**: Chrome 90+, Firefox 88+, Safari 14+, or Edge 90+

### Recommended Tools
- **Visual Studio Code**: For editing and debugging
- **Git Bash or Terminal**: For command line operations
- **Postman**: For testing API endpoints (future use)

## 📦 Quick Start

### 1. Clone and Navigate
```bash
git clone [repository-url]
cd budgeting-app
```

### 2. Install Dependencies
```bash
# Install all required packages
npm install
```

Expected output:
```
added 255 packages, and audited 256 packages in X.Xs
```

### 3. Start Development Server
```bash
npm run dev
```

Expected output:
```
▲ Next.js 14.2.16
- Local:        http://localhost:3000
✓ Starting...
✓ Ready in 1908ms
```

### 4. Verify Installation
Open [http://localhost:3000](http://localhost:3000) in your browser. You should see:
- A dark-themed dashboard
- Budget overview cards showing sample data
- Recent transactions with currency conversion
- Budget progress bars

## 🔧 Detailed Setup Process

### Environment Configuration

Create a `.env.local` file in the root directory (optional for basic functionality):

```env
# Required environment variables (when using real APIs)
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret

# Development-specific settings
NODE_ENV=development
NEXT_PUBLIC_APP_ENV=development
```

### Project Structure Overview

After installation, your project structure should look like this:

```
budgeting-app/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout (dark theme)
│   ├── page.tsx             # Dashboard homepage
│   └── globals.css          # Styling with Tailwind CSS
├── components/               # React components (initially empty)
├── hooks/                    # Custom React hooks
│   ├── use-currency.ts      # Currency conversion logic
│   ├── use-budget.ts        # Budget management
│   ├── use-transactions.ts  # Transaction operations
│   └── use-savings.ts       # Savings goals
├── lib/                     # Utility functions
│   ├── utils.ts            # Helper functions
│   ├── validations.ts      # Zod validation schemas
│   └── mock-data.ts        # Sample data for development
├── types/                   # TypeScript interfaces
│   ├── transaction.ts      # Transaction types
│   ├── budget.ts           # Budget types
│   ├── savings.ts          # Savings goal types
│   └── account.ts          # Account types
├── .spec-workflow/         # Specification documents
└── [config files]          # Package.json, tsconfig.json, etc.
```

## 🚀 Available Scripts

```bash
# Development
npm run dev              # Start development server on localhost:3000
npm run build            # Build production-ready files
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint for code quality checks
npm run lint:fix         # Auto-fix ESLint issues

# Type Checking
npm run type-check       # Run TypeScript type checking

# All-in-one development setup
npm run dev              # Handles hot reloading, type checking, and linting
```

## 🔍 Verification Steps

### 1. Check Development Server
```bash
# Terminal should show:
▲ Next.js 14.2.16
- Local:        http://localhost:3000
✓ Starting...
✓ Ready in 1908ms
```

### 2. Check Browser Console
Open browser dev tools → Console tab. Should see no errors.

### 3. Verify Features
- [ ] Dark theme loads correctly
- [ ] Dashboard shows budget overview
- [ ] Currency conversion loads (with mock data)
- [ ] Responsive design works on different screen sizes

## 🐛 Troubleshooting

### Common Issues

**Issue**: `npm install` fails with permission errors
```bash
# Solution: Try with --force flag or check permissions
npm install --force
# Or ensure you have write permissions to the project directory
```

**Issue**: Development server fails to start on port 3000
```bash
# Solution: Kill process using port 3000 or change port
netstat -ano | findstr :3000
taskkill /PID <PID> /F
# Or run on different port: npm run dev -- -p 3001
```

**Issue**: TypeScript compilation errors
```bash
# Solution: Clear cache and restart
rm -rf .next node_modules
npm install
npm run dev
```

**Issue**: Tailwind CSS not compiling styles
```bash
# Solution: Check globals.css imports and Tailwind configuration
# Ensure postcss.config.mjs is correctly configured
```

### Performance Tips

1. **Hot Reloading**: The development server supports hot module replacement for instant changes
2. **Type Checking**: Errors will appear in both terminal and browser console
3. **Build Performance**: Use `npm run dev` for optimal development performance
4. **Memory Usage**: Restart the development server if it becomes slow or unstable

## 🔒 Security Notes

- The app uses mock data for development - no real financial data is processed
- All form validations use Zod schemas for input sanitization
- No external API calls by default (uses fallback exchange rate)
- TypeScript provides compile-time type safety

## 📚 Next Steps

After successful setup:

1. **Explore the Dashboard**: View the pre-built dashboard with mock data
2. **Review Code Structure**: Understand the organization in each directory
3. **Test Hooks**: Examine the custom hooks for data management
4. **Add New Features**: Begin implementing additional functionality
5. **Integrate Components**: Copy and adapt Vercel V0 components as needed

## 📞 Support

For issues not covered in this guide:

1. Check the README.md file for feature documentation
2. Review the specification documents in `.spec-workflow/specs/vercel-ui-integration/`
3. Ensure all prerequisites are correctly installed
4. Verify file structure matches the documentation

The development environment is now ready for coding! 🎉