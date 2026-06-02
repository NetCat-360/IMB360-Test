# IMB360

**Mobile Influencer-Brand Matching Platform**

[![React Native](https://img.shields.io/badge/React%20Native-0.85.3-blue)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)](https://typescriptlang.org)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-brightgreen)](https://redux-toolkit.js.org)

React Native app connecting content creators with brands. Manages onboarding, auth (OTP), content/pricing, campaign queues, earnings, and settings — all backed by a REST API.

---

## Tech Stack

| Category | Tech |
|----------|------|
| **Framework** | React Native 0.85.3 |
| **Language** | TypeScript 5.8.3 |
| **Navigation** | React Navigation 7 (native-stack + bottom-tabs) |
| **State** | Redux Toolkit 2.11 + react-redux 9 |
| **HTTP** | Axios 1.16 |
| **Animations** | react-native-reanimated 4, gesture-handler 2 |
| **UI** | linear-gradient, SVG, vector-icons, element-dropdown, date-picker |
| **Responsive** | react-native-size-matters |
| **Config** | react-native-config (env vars) |
| **Storage** | AsyncStorage |
| **Testing** | Jest + Testing Library RN |
| **Lint** | ESLint, Prettier, Husky |

---

## Features

- **Onboarding & Auth** — Splash, onboarding slides, role selection (Creator/Brand), register/login with OTP, forgot/reset password
- **Home Dashboard** — Profile stats, menu navigation to all sections
- **Content Management** — Add/edit/list content (Image, Reel, Story, Post, Video) per platform
- **Pricing** — Set per-platform rates for collaboration types
- **Campaign Queue** — Ongoing, upcoming, and bidding campaign tracking
- **Earnings** — Payment history and summary
- **Overview & Analytics** — Connected platforms, follower segmentation, engagement
- **Settings** — Manage account, bio, social media profiles, additional info, change password

---

## Setup

```bash
git clone <repo>
cd IMB360-Test
npm install
```

**iOS only:**
```bash
cd ios && pod install && cd ..
```

**Environment:**
```bash
# .env
API_BASE_URL=http://10.0.2.2:5000
```

---

## Run

```bash
npm start        # Metro
npm run android  # Android
npm run ios      # iOS
npm test         # Tests
npm run lint     # Lint
```

---

## Project Layout

```
src/
├── api/              # Axios client + endpoints
├── components/       # Reusable UI (Button, Card, Input, Skeleton, Header, etc.)
├── config/           # Theme tokens + constants
├── context/          # ToastContext
├── hooks/            # useDebounce, useToast, useScale, redux hooks
├── navigation/       # Root, Auth, App navigators
├── screens/          # All screens (auth, home, content, pricing, campaign, earnings, settings, etc.)
├── security/         # Input sanitization + permissions
├── store/            # Redux store (auth slice)
├── styles/           # Typography, spacing, global styles
├── types/            # Navigation param lists, API types, globals
└── utils/            # Scaling, countries list, validators
```

---

## Design

- **Dark theme** — black backgrounds, teal (`#00b9c0`) + lime (`#b6d82c`) brand colors
- **Typography** — Poppins font family with tokenized styles
- **Responsive** — `react-native-size-matters` for scaling across devices
- **Animations** — `react-native-reanimated` for smooth transitions

---

## API

Base: `http://10.0.2.2:5000` (configurable via `API_BASE_URL` env var)

| Endpoint | Method |
|----------|--------|
| `/auth/login`, `/register`, `/logout`, `/refresh` | POST |
| `/auth/forgot-password`, `/reset-password`, `/verify-email` | POST |
| `/auth/send-otp`, `/verify-otp` | POST |
| `/user/profile` | GET / PUT |
| `/user/avatar` | GET |
| `/campaigns` | GET |
| `/campaigns/:id/apply` | POST |
| `/earnings/summary`, `/earnings` | GET |
| `/earnings/withdraw` | POST |
| `/content` | GET |
| `/content/:id` | GET |
| `/analytics/overview`, `/analytics/platforms` | GET |

---

*Version: 0.0.1*
