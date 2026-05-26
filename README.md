# IMB360

**Mobile Influencer-Brand Matching Platform**

[![React Native](https://img.shields.io/badge/React%20Native-0.85.3-blue)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://typescriptlang.org)
[![Redux](https://img.shields.io/badge/Redux-Toolkit-brightgreen)](https://redux-toolkit.js.org)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

IMB360 is a full-stack React Native application that connects content creators with brands for collaboration campaigns. Built with TypeScript and Redux, it provides a seamless experience for managing influencer relationships, campaigns, and earnings.

---

## 🚀 Tech Stack

### Core Frameworks
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.85.3 | Mobile framework |
| **TypeScript** | 5.8.3 | Type-safe development |
| **React** | 19.2.3 | UI library |
| **Node.js** | >=22.11.0 | Runtime |

### State & Navigation
| Technology | Version | Purpose |
|------------|---------|---------|
| **Redux Toolkit** | 2.11.2 | State management |
| **React Navigation** | 7.x | Screen navigation |
| **Zod** | 4.4.3 | Runtime validation |
| **React Hook Form** | 7.75.0 | Form handling |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native Reanimated** | 4.3.1 | Smooth animations |
| **React Native Gesture Handler** | 2.31.2 | Native gestures |
| **React Native Linear Gradient** | 2.8.3 | Gradient effects |
| **React Native SVG** | 15.15.5 | Vector graphics |
| **React Native Vector Icons** | 10.3.0 | Icon library |

### Networking & Storage
| Technology | Version | Purpose |
|------------|---------|---------|
| **Axios** | 1.16.1 | HTTP client |
| **Async Storage** | 1.23.1 | Local persistence |
| **Keychain** | 10.0.0 | Secure credential storage |

### Build & Testing
| Technology | Version | Purpose |
|------------|---------|---------|
| **Jest** | 29.6.3 | Testing framework |
| **ESLint** | 8.57.1 | Code linting |
| **Prettier** | 2.8.8 | Code formatting |
| **Husky** | 9.1.7 | Git hooks |

---

## 📱 Features

### For Creators
- Manage social media profiles (Instagram, YouTube, Facebook, Twitter)
- Create and edit content posts
- Set platform-specific pricing for collaborations
- Track campaign queues (ongoing, upcoming, bidding)
- Monitor earnings and process withdrawals
- View analytics and follower segmentation

### For Brands
- Discover and search influencers by niche
- Create and manage marketing campaigns
- Process payments securely
- Track campaign analytics and ROI

### Platform Capabilities
- Role-based authentication (Creator/Brand/Admin)
- JWT with refresh token rotation
- Real-time notifications via Toast context
- Secure credential storage with Keychain
- Dark theme with custom design system

---

## 🛠️ Installation

### Prerequisites
- Node.js >= 22.11.0
- npm or Yarn
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd IMB360-Test

# Install dependencies
npm install
# or
yarn install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### Environment Setup

Create a `.env` file in the project root:

```env
API_BASE_URL=http://10.0.2.2:5000
```

> **Note for Android Emulator**: Use `http://10.0.2.2:5000` to reference your host machine's localhost. For iOS Simulator, use `http://localhost:5000`.

---

## 🏃 Running the App

### Development Server

```bash
# Start Metro bundler
npm start
# or
yarn start
```

### Android

```bash
npm run android
# or
yarn android
```

### iOS

```bash
npm run ios
# or
yarn ios
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

---

## 📂 Project Structure

```
src/
├── api/                      # API layer
│   ├── client.ts            # Axios instance with interceptors
│   ├── endpoints.ts         # API endpoint constants
│   └── interceptors.ts      # Request/response interceptors
├── assets/                   # Static assets
│   ├── fonts/               # Poppins font family
│   └── images/              # App icons, illustrations
├── components/               # Reusable UI components
│   ├── auth/                # Authentication-specific
│   ├── common/              # Button, Card, FloatingInput
│   ├── layout/              # ScreenContainer
│   └── security/            # ProtectedRoute
├── config/                   # Configuration
│   ├── theme.ts             # Design tokens (colors, spacing, radius)
│   ├── constants.ts
│   └── env.ts
├── context/                  # React Context providers
│   └── ToastContext.tsx     # Global toast notifications
├── features/                 # Feature modules
│   ├── auth/                # Authentication slice
│   └── dashboard/           # Dashboard slice
├── hooks/                    # Custom hooks
│   ├── useDebounce.ts
│   ├── useToast.ts
│   ├── useScale.ts
│   └── redux.ts
├── navigation/               # Navigation setup
│   ├── RootNavigator.tsx    # Auth vs App switch
│   ├── AppNavigator.tsx     # Main app flow
│   └── AuthNavigator.tsx    # Auth flow
├── screens/                  # Screen components
│   ├── auth/                # Login, Register, Onboarding
│   ├── home/                # Main dashboard
│   ├── overview/            # Analytics
│   ├── content/             # Content management
│   ├── pricing/             # Pricing configuration
│   ├── CampaignQueue/       # Campaign management
│   ├── MyEarnings/          # Payment tracking
│   └── settings/            # Account settings
├── security/                 # Security utilities
│   ├── permissions.ts       # Role-based permissions
│   └── sanitize.ts          # Input sanitization
├── store/                    # Redux configuration
│   └── index.ts
├── styles/                   # Global styles
│   ├── typography.ts
│   ├── globalStyles.ts
│   └── spacing.ts
├── types/                    # TypeScript definitions
│   ├── api.ts
│   ├── navigation.ts
│   └── global.ts
└── utils/                    # Helper functions
    ├── scaling.ts
    ├── countries.ts
    └── validators.ts
```

---

## 🎨 Design System

### Color Palette (Dark Theme)

```typescript
Colors = {
  // Brand colors
  teal: '#00b9c0',      // Primary
  cyan: '#00D5FF',      // Accent
  lime: '#b6d82c',      // Secondary

  // Backgrounds
  bgBlack: '#000000',   // App background
  bgSurface: '#0A0A0A', // Surface
  bgCard: '#0D0D0D',    // Cards

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  textMuted: '#888888',

  // Status
  success: '#22C55E',
  error: '#FF3B30',
  pending: '#FF4D4D',

  // Social platforms
  instagram: '#E1306C',
  youtube: '#FF0000',
  twitter: '#1DA1F2',
  facebook: '#1877F2'
}
```

### Spacing Scale
- `xs`: 4px
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- `xl`: 20px
- `xxl`: 24px

### Border Radius
- `sm`: 8px
- `md`: 10px
- `lg`: 12px
- `xl`: 18px
- `xxl`: 20px

---

## 🔐 Authentication Flow

1. **Splash Screen** → Animated brand logo intro
2. **Onboarding** → App introduction slides
3. **Role Selection** → Choose between Creator or Brand
4. **Auth Entry** → Login or Register choice
5. **Registration/Login** → Email/password authentication
6. **OTP Verification** → Two-factor confirmation
7. **Dashboard** → Main app interface

### State Management

```typescript
AuthState = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: {
    id: string;
    email: string;
    role: 'ADMIN' | 'CREATOR' | 'BRAND';
    permissions: UserPermissions;
  } | null;
}
```

---

## 🌐 API Integration

### Default Backend
```
http://10.0.2.2:5000
```

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | User login |
| POST | `/auth/logout` | User logout |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/user/profile` | Get user profile |
| PUT | `/user/profile` | Update user profile |
| GET | `/user/avatar` | Get user avatar |
| GET | `/campaigns` | List campaigns |
| POST | `/campaigns/{id}/apply` | Apply to campaign |
| GET | `/earnings/summary` | Earnings summary |
| GET | `/earnings` | Earnings history |
| POST | `/earnings/withdraw` | Withdraw earnings |
| GET | `/content` | List content posts |
| POST | `/content` | Create content |
| PUT | `/content/{id}` | Update content |
| GET | `/analytics/overview` | Analytics overview |
| GET | `/analytics/platforms` | Connected platforms |

---

## 📦 Deployment

### Android

```bash
# Build release APK
cd android && ./gradlew assembleRelease

# Build AAB for Google Play Store
cd android && ./gradlew bundleRelease
```

### iOS

```bash
# Archive for App Store
xcodebuild -archive -scheme IMB360 -configuration Release

# Or use Fastlane for automated deployment
bundle exec fastlane ios release
```

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

---

## 🤝 Contributing

1. Create a feature branch from `main`
2. Make your changes following the code style
3. Run `npm test` and `npm run lint`
4. Submit a pull request with a clear description

---

## 📄 License

This project is proprietary and confidential. Unauthorized copying and distribution is prohibited.

---

## 📞 Support

For issues or questions, please contact the development team or create an issue in the repository.

---

## 📅 Changelog

### Version 0.0.1 (Current)
- Initial release
- Full authentication flow with OTP
- Creator/Brand role selection
- Home dashboard with profile stats
- Content management (add, edit, list)
- Pricing configuration
- Campaign queue management
- Earnings tracking
- Settings with sub-screens
- Dark theme design system

---

*Version: 0.0.1 | Last Updated: May 2026*
