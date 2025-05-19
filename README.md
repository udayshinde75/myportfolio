# Uday Shinde's Portfolio Website

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. This portfolio showcases professional work, skills, and contact information with a beautiful and interactive user interface.

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15 with App Router
  - TypeScript for type safety
  - Tailwind CSS for styling
  - Framer Motion for animations
  - Three.js for 3D graphics

- **Responsive Design**
  - Mobile-first approach
  - Adaptive layouts for all devices
  - Custom navigation for mobile and desktop
  - Smooth animations and transitions

- **Theme Support**
  - Light/Dark mode
  - Theme persistence
  - Cross-tab synchronization
  - Backdrop blur effects

- **Authentication**
  - NextAuth.js integration
  - JWT-based authentication
  - Secure password handling with bcrypt
  - Protected routes

- **Interactive Components**
  - Animated navigation
  - 3D graphics with Three.js
  - Type animations
  - Markdown support
  - Custom UI components with Radix UI

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js
- Radix UI Components

### Backend
- Next.js API Routes
- MongoDB with Mongoose
- NextAuth.js
- JWT Authentication

### Development Tools
- ESLint
- PostCSS
- Turbopack
- TypeScript

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the following variables:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
portfolio/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── custom/         # Custom components
│   └── ui/            # Reusable UI components
├── lib/                # Utility functions and configurations
├── models/             # MongoDB models
├── public/             # Static assets
├── schemas/            # Zod validation schemas
├── styles/             # Global styles
└── utils/              # Helper functions
```

## 🚀 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔒 Security Features

- JWT-based authentication
- Secure password hashing with bcrypt
- Protected API routes
- Environment variable protection
- CORS configuration
- Rate limiting

## 🎨 UI Components

The project uses a combination of custom components and Radix UI primitives:

- Navigation bar with mobile/desktop layouts
- Theme toggle
- Responsive layouts
- Custom animations
- 3D graphics integration
- Form components
- Modal dialogs
- Accordion components
- Tabs

## 📱 Responsive Design

The website is fully responsive with:
- Mobile-first approach
- Custom navigation for mobile devices
- Adaptive layouts
- Touch-friendly interactions
- Optimized images and assets

## 🔄 State Management

- React Context for theme management
- Next.js built-in state management
- Form state with React Hook Form
- Authentication state with NextAuth.js

## 🚀 Performance Optimizations

- Image optimization
- Code splitting
- Lazy loading
- Turbopack for faster development
- Optimized builds
- Caching strategies

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For any questions or concerns, please reach out through the contact form on the website or create an issue in the repository.
