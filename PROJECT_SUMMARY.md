# IMB360 — Project Overview

---

## 1. Project Summary

IMB360 is a React Native CLI application (NOT Expo) for a brand-creator influencer platform. It enables two user roles: **BRAND** (companies seeking creators) and **CREATOR** (influencers seeking brand partnerships). The application features a complete frontend with authentication flow, onboarding, role selection, and a profile-driven dashboard with navigation tabs.

**Current Status**: Feature-complete frontend awaiting backend integration. The app runs successfully on Android devices.

**Tech Stack**: React Native 0.85.3, TypeScript 5.8.3, Redux Toolkit, React Navigation, Reanimated 4

---

## 2. Tech Stack

### Core Frameworks & Languages
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native` | 0.85.3 | Core framework (CLI-based, NOT Expo) |
| `typescript` | 5.8.3 | Type safety |
| `react` | 19.2.3 | UI rendering |
| `node` | >= 22.11.0 | Required engine |

### State Management
| Package | Version | Purpose |
|---------|---------|---------|
| `@reduxjs/toolkit` | 2.11.2 | State management |
| `react-redux` | 9.2.0 | React bindings |

### Navigation
| Package | Version | Purpose |
|---------|---------|---------|
| `@react-navigation/native` | 7.2.4 | Navigation container |
| `@react-navigation/native-stack` | 7.15.1 | Stack navigator |
| `@react-navigation/bottom-tabs` | 7.16.1 | Tab navigator |

### UI & Animation
| Package | Version | Purpose |
|---------|---------|---------|
| `react-native-reanimated` | 4.3.1 | Animations |
| `react-native-worklets` | 0.8.3 | Worklets support |
| `react-native-linear-gradient` | 2.8.3 | Gradient backgrounds |
| `react-native-svg` | 15.15.5 | SVG support |
| `react-native-vector-icons` | 10.3.0 | Icon library |
| `react-native-size-matters` | 0.4.2 | Responsive scaling |

### Data & Validation
| Package | Version | Purpose |
|---------|---------|---------|
| `axios` | 1.16.1 | HTTP client |
| `zod` | 4.4.3 | Validation |
| `react-hook-form` | 7.75.0 | Form handling |
| `@hookform/resolvers` | 5.2.2 | Zod resolver |

### Storage & Security
| Package | Version | Purpose |
|---------|---------|---------|
| `@react-native-async-storage/async-storage` | 1.23.1 | Local storage |
| `react-native-keychain` | 10.0.0 | Secure credential storage |

### Platform-Specific
| Target | Version |
|--------|---------|
| Android minSdk | 24 |
| Android compileSdk | 36 |
| Android targetSdk | 36 |
| Android Gradle | 9.3.1 |
| iOS Deployment Target | 15.1 |

### Testing & Linting
| Package | Version |
|---------|---------|
| `jest` | 29.6.3 |
| `eslint` | 8.57.1 |
| `prettier` | 2.8.8 |
| `husky` | 9.1.7 |

---

## 3. Folder Architecture

```
IMB360/
├── android/                          # Android build configuration
│   ├── app/src/main/                 # Android source & resources
│   ├── build.gradle                  # Gradle config (9.3.1)
│   └── settings.gradle               # Project settings
├── ios/                              # iOS configuration
│   ├── IMB360/                       # Xcode project files
│   └── Podfile                       # CocoaPods dependencies
├── src/
│   ├── api/                          # API services
│   │   ├── client.ts                 # Axios instance
│   │   ├── endpoints.ts              # API endpoints (pending)
│   │   └── interceptors.ts           # Request/response interceptors
│   ├── assets/
│   │   ├── fonts/                    # Poppins font family (18 variants)
│   │   └── images/                   # App images & icons
│   ├── components/                   # Reusable components
│   │   ├── auth/
│   │   │   ├── CountryPhoneInput.tsx
│   │   │   └── OtpModalSheet.tsx     # 6-digit OTP verification modal
│   │   └── common/                   # Shared components
│   │       ├── Card/
│   │       ├── FloatingInput/        # Reusable form input
│   │       └── layout/
│   ├── config/                       # Configuration files
│   │   ├── constants.ts              # App-wide constants
│   │   ├── env.ts                    # Environment variables
│   │   └── theme.ts                  # Theme configuration
│   ├── features/                     # Feature modules
│   │   ├── auth/store/
│   │   │   └── authSlice.ts          # Auth state management
│   │   └── dashboard/store/
│   │       └── dashboardSlice.ts     # Dashboard state
│   ├── hooks/                        # Custom React hooks
│   │   ├── useDebounce.ts
│   │   ├── useScale.ts
│   │   ├── useToast.ts               # Toast notification hook
│   │   └── redux.ts                  # Typed hooks (useAppSelector, useAppDispatch)
│   ├── navigation/                   # Navigation setup
│   │   ├── RootNavigator.tsx         # Root navigator (Auth/App switch)
│   │   ├── AuthNavigator.tsx         # Auth stack navigator
│   │   └── AppNavigator.tsx          # App tab navigator
│   ├── screens/                      # Screen components
│   │   ├── auth/
│   │   │   ├── entry-point/          # Role-based entry
│   │   │   ├── role-selection/       # Brand/Creator selection
│   │   │   ├── login/                # Login screen
│   │   │   ├── register/             # Registration screen
│   │   │   ├── forgot-password/      # Password recovery
│   │   │   └── verify/               # OTP verification
│   │   ├── onboarding/               # 3-slide onboarding flow
│   │   ├── splash/                   # Animated splash screen
│   │   ├── home/                     # Main profile home
│   │   ├── overview/                 # Platform overview
│   │   ├── content/                  # Content management
│   │   ├── pricing/                  # Pricing rates
│   │   └── MyEarnings/               # Payment history
│   ├── store/                        # Redux store
│   │   ├── index.ts                  # Store configuration
│   │   └── rootReducer.ts            # Root reducer
│   ├── styles/                       # Global styles
│   │   ├── globalStyles.ts
│   │   ├── spacing.ts
│   │   └── typography.ts
│   ├── types/                        # TypeScript types
│   │   ├── api.ts                    # API types
│   │   ├── global.ts                 # Global types
│   │   └── navigation.ts             # Navigation param lists
│   └── utils/                        # Utility functions
│       ├── countries.ts              # 70+ countries data
│       ├── helpers.ts
│       ├── logger.ts
│       ├── scaling.ts                # DP scaling utilities
│       └── validators.ts
├── App.tsx                           # Main React component
├── index.js                          # App entry point
├── app.json                          # App metadata
├── package.json                      # Dependencies
├── babel.config.js                   # Babel configuration
├── metro.config.js                   # Metro bundler config
├── jest.config.js                    # Jest configuration
└── handoff.md                        # Project handoff notes
```

---

## 4. Key Entry Points

| File | Purpose |
|------|---------|
| `App.tsx` | Main React component wrapping Provider, NavigationContainer, SafeAreaProvider |
| `index.js` | AppRegistry registration, entry point for React Native |
| `src/navigation/RootNavigator.tsx` | Root navigator controlling Auth/App flow based on `isAuthenticated` state |
| `src/navigation/AuthNavigator.tsx` | Stack navigator for authentication screens (Splash → Onboarding → RoleSelection → AuthEntryPoint → Register/Login) |
| `src/navigation/AppNavigator.tsx` | Bottom tab navigator for authenticated users (Profile/Campaigns/Explore/Analytics/Assets) |
| `android/app/src/main/java/com/imb360/MainActivity.kt` | Android entry point |
| `ios/IMB360/AppDelegate.swift` | iOS entry point |
| `src/store/index.ts` | Redux store initialization with authReducer |
| `src/features/auth/store/authSlice.ts` | Auth state management (login/logout) |

---

## 5. Primary Data Structures

### Navigation Type Definitions (`src/types/navigation.ts`)

```typescript
// Auth Stack Navigation Parameters
AuthStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  RoleSelection: undefined;
  AuthEntryPoint: { role: 'BRAND' | 'CREATOR' };
  Register: { role: 'BRAND' | 'CREATOR' };
  Login: undefined;
  ForgotPassword: undefined;
  ResetPassword: { verifiedEmail: string };
  Verification: { destination: string; flow: 'password_reset' | 'registration' };
}

// App Stack Navigation Parameters
AppStackParamList = {
  Home: undefined;
  Overview: undefined;
  Content: undefined;
  Pricing: undefined;
  MyEarnings: undefined;
}
```

### Auth State (`src/features/auth/store/authSlice.ts`)

```typescript
type AuthState = {
  isAuthenticated: boolean;
  user: null | {
    id: string;
    email: string;
  };
}

// Actions
login({ id: string, email: string })  // Sets isAuthenticated = true
logout()                               // Sets isAuthenticated = false
```

### Country Data (`src/utils/countries.ts`)

```typescript
interface Country {
  code: string;          // 2-letter ISO code
  flag: string;          // Emoji flag
  name: string;          // Full country name
  callingCode: string;   // e.g., "+1", "+91"
}

// Contains 70+ countries with calling codes for phone input
```

### Theme Configuration (`src/config/theme.ts`)

**Primary Colors:**
- Primary Teal: `#00b9c0`
- Primary Lime: `#b6d82c`
- Background Black: `#000000`

**Surface Colors:**
- Dark Surface: `#0D0D0D`, `#1C1C1E`

**Text Colors:**
- Primary: `#FFFFFF`
- Secondary: `#9A9A9A`, `#888888`
- Muted: `#666666`

---

## 6. Main Application Workflows

### User Journey Flow

```
┌─────────────┐
│   Splash    │ (3 seconds animation with lava-lamp blobs)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Onboarding  │ (3-slide informational flow)
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│ RoleSelection    │ (Brand vs Creator selection)
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ AuthEntryPoint   │ (Role-based entry screen)
└────────┬─────────┘
         │
         ├─► Register (new user)
         │   └─► OTP Verification
         │       └─► Home
         │
         └─► Login (existing user)
             └─► Home
```

### Role Selection Flow

```
RoleSelectionScreen
├─ User selects BRAND or CREATOR
├─ Animated card scale/border/brightness changes
└─ navigation.navigate('AuthEntryPoint', { role })
```

### AuthEntryPoint Flow

```
AuthEntryPointScreen
├─ Accepts role from route.params
├─ Shows role-specific illustration and text
└─ Two paths:
   ├─ "Join" → RegisterScreen with role pre-filled
   └─ "Login" → LoginScreen
```

### Authentication Flow

**New User Registration:**
1. `RegisterScreen` collects: name, email, phone (with country code), password
2. Validates email format and password requirements
3. Sends signup data payload (TODO: real API call)
4. Redirects to verification (if email verification enabled)
5. `dispatch(login())` on successful registration

**Existing User Login:**
1. `LoginScreen` collects: email, password
2. Validates email format
3. Calls `dispatch(login({ id, email }))`
4. Redux sets `isAuthenticated = true`
5. `RootNavigator` automatically switches to `AppNavigator`

### Tab Navigation (Authenticated Users)

```
AppNavigator (Bottom Tabs)
├─ ProfileTab (Stack Navigator)
│  ├─ HomeScreen (main profile dashboard)
│  ├─ OverviewScreen (analytics cards)
│  ├─ ContentScreen (platform grid)
│  ├─ PricingScreen (rate table)
│  └─ MyEarnings (payment history)
├─ CampaignsTab (placeholder)
├─ ExploreTab (placeholder)
├─ AnalyticsTab (placeholder)
└─ AssetsTab (placeholder)
```

### State Management Flow

```
┌─────────────────────────────────────────────────────┐
│                  RootNavigator                      │
│  Watches: state.auth.isAuthenticated                │
│                                                     │
│  If true  ─────► AppNavigator (app screens)        │
│  If false ─────► AuthNavigator (auth screens)      │
└─────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  authSlice      │
                    │  ─────────────  │
                    │  isAuthenticated│
                    │  user           │
                    └─────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
            dispatch(login())   dispatch(logout())
```

---

## 7. API & External Integration Status

### API Infrastructure (`src/api/`)

**client.ts** - Axios Instance
```typescript
import axios from 'axios';

// Instance configured but endpoints pending
// TODO: Add base URL configuration
```

**interceptors.ts** - Request/Response Interceptors
```typescript
// Request interceptor: Add auth token to headers
// Response interceptor: Handle 401/403 errors
// TODO: Implement token refresh logic
```

**endpoints.ts** - API Endpoint Constants
```typescript
// All endpoints defined but empty (placeholder)
// TODO: Add actual endpoint URLs
```

**Current Status:**
- API layer is structurally complete and ready for backend integration
- Interceptors configured for token management
- Zod schemas prepared for validation
- TODO: Backend API connection required

### Platform Integrations

| Platform | Status | Notes |
|----------|--------|-------|
| Android | ✅ Complete | Gradle 9.3.1, ADB deployment working |
| iOS | ⚠️ Configured | Xcode project ready, CocoaPods setup |
| Firebase | ❌ Not integrated | Planned for future phase |
| Push Notifications | ❌ Not integrated | Planned for future phase |

### Third-Party Services

| Service | Status |
|---------|--------|
| Google Play Services | ✅ Automatic (via Gradle) |
| Apple App Store | ✅ Configuration ready |
| Social Login (Google/Apple) | ⚠️ UI ready, integration pending |
| Stripe/Payments | ❌ Not integrated |

---

## 8. Screen Components by Feature

### Splash Screen (`src/screens/splash/SplashScreen.tsx`)
- Animated lava-lamp blobs (Reanimated)
- Animated logo fade-in/scale
- 3-second timer → Onboarding
- White background with teal/lime gradients

### Onboarding Screen (`src/screens/onboarding/OnboardingScreen.tsx`)
- 3 informational slides with illustrations
- Back/Next navigation
- Skip button on first slide
- Reanimated transitions (FadeInRight/FadeOutLeft)

### Role Selection Screen (`src/screens/auth/role-selection/RoleSelectionScreen.tsx`)
- Animated Brand/Creator cards
- Dynamic scale, border glow, brightness changes
- `selectedRole` state → navigation to AuthEntryPoint

### AuthEntryPoint Screen (`src/screens/auth/entry-point/AuthEntryPointScreen.tsx`)
- Role-based illustration and messaging
- "Join As Brand/Creator" CTA
- Login redirect link

### Register Screen (`src/screens/auth/register/RegisterScreen.tsx`)
- Fields: Name, Email, Phone (with country picker), Password
- Country code modal with search
- Email verification button
- Checkbox for terms acceptance
- Social login row (Google, Apple)

### Login Screen (`src/screens/auth/login/LoginScreen.tsx`)
- Fields: Email, Password (show/hide toggle)
- Remember Me checkbox
- Forgot Password redirect
- Social login row
- `dispatch(login())` on submit

### OtpModalSheet Component (`src/components/auth/OtpModalSheet.tsx`)
- 6-digit OTP input (individual text inputs)
- Resend countdown timer
- Keyboard handling
- Modal overlay with backdrop

### Home Screen (`src/screens/home/HomeScreen.tsx`)
- Top bar with logo and utility icons (chat, settings)
- Profile section with avatar, name, username
- Bio section with website link
- Action buttons (Edit Profile, Points, Add Assets)
- Stats row (Following, Followers, Engagement, Rating)
- Menu cards (Overview, Content, Pricing, MyEarnings)

### Overview Screen (`src/screens/overview/OverviewScreen.tsx`)
- Platform cards (Instagram, TikTok, YouTube)
- Chart/Analytics placeholders
- Stats summary

### Content Screen (`src/screens/content/ContentScreen.tsx`)
- Platform grid
- Filter buttons
- Content type tabs

### Pricing Screen (`src/screens/pricing/PricingScreen.tsx`)
- Rate table
- Package filters
- Pricing details

### MyEarnings Screen (`src/screens/MyEarnings/MyEarnings.tsx`)
- Payment history
- Earnings summary
- Withdrawal functionality

---

## 9. Custom Hooks (`src/hooks/`)

| Hook | Purpose |
|------|---------|
| `useDebounce` | Debounce input values |
| `useScale` | Scale value with device size |
| `useToast` | Toast notification state management |
| `useAppSelector` | Typed Redux selector |
| `useAppDispatch` | Typed Redux dispatch |

---

## 10. Utility Functions (`src/utils/`)

| Function | Purpose |
|----------|---------|
| `scale(value)` | Horizontal scaling based on screen width |
| `verticalScale(value)` | Vertical scaling based on screen height |
| `moderateScale(value)` | Scale with friction for fonts/spacing |
| `isEmailValid(text)` | Email format validation |
| `logger(message)` | Console logging with prefix |
| `countries.ts` | 70+ countries with codes, flags, calling codes |

---

## 11. Build & Deployment

### Android Build
```bash
npm run android
# or
npx react-native run-android
```

### iOS Build
```bash
bundle install  # First time
bundle exec pod install  # After dependency changes
npm run ios
```

### Development Server
```bash
npm start  # Metro bundler
```

### Testing
```bash
npm test  # Jest
npm run lint  # ESLint
```

### Environment Setup
- React Native CLI environment (NOT Expo)
- Metro bundler for JavaScript bundling
- Hermes JS Engine (enabled by default)
- New Architecture enabled

---

## 12. Known Limitations & TODOs

### Backend Integration
- API endpoints configured but not connected
- Interceptors prepared for token management
- TODO: Add base URL configuration
- TODO: Implement authentication interceptor
- TODO: Add request/response transformation

### Pending Features
- Push notifications setup
- Firebase integration
- Stripe/payment processing
- Real-time features
- Advanced analytics

### Code Quality
- Some `any` types in navigation props (type safety work in progress)
- Toast message system needs centralization
- Loading states not fully implemented across screens

---

## 13. Future Roadmap (from handoff.md)

### Phase 1 (Current)
- [x] React Native CLI foundation
- [x] Reusable project architecture
- [x] Redux state management
- [x] Adaptive DP scaling
- [x] Reusable screen/component structure
- [x] Authentication flow (UI complete)
- [x] Animated splash screen

### Phase 2 (Next)
- [ ] Backend API integration
- [ ] Firebase setup
- [ ] Push notifications
- [ ] Real user authentication
- [ ] Profile management
- [ ] Content management

### Phase 3 (Future)
- [ ] Campaign management
- [ ] Analytics dashboard
- [ ] Payment processing
- [ ] Advanced search/filter
- [ ] Real-time notifications

---

## 14. Configuration Files

| File | Purpose |
|------|---------|
| `babel.config.js` | Babel presets (React Native, env) |
| `metro.config.js` | Metro bundler configuration |
| `.eslintrc.js` | ESLint rules |
| `.prettierrc.js` | Prettier formatting rules |
| `jest.config.js` | Jest test configuration |
| `app.json` | React Native app metadata |
| `android/build.gradle` | Gradle configuration |
| `android/app/build.gradle` | App-level Gradle config |
| `ios/IMB360/Info.plist` | iOS configuration |
| `ios/Podfile` | iOS dependencies |

---

## 15. Getting Started for New Developers

### Prerequisites
- Node.js >= 22.11.0
- React Native CLI
- Android SDK / Xcode (for platform-specific development)

### Installation
```bash
npm install  # Install dependencies
npx react-native start  # Start Metro bundler
npx react-native run-android  # Run on Android
npx react-native run-ios      # Run on iOS
```

### Key Commands
| Command | Purpose |
|---------|---------|
| `npm run android` | Run on Android device/emulator |
| `npm run ios` | Run on iOS simulator |
| `npm start` | Start Metro bundler |
| `npm test` | Run Jest tests |
| `npm run lint` | Run ESLint |

---

## 16. Contact & Support

For questions about this codebase, refer to:
- `handoff.md` - Project handoff notes
- `CLAUDE.md` - Project documentation
- Git history - Feature-specific commits

---

*Last Updated: 2026-05-18*
*Generated from comprehensive codebase scan*
