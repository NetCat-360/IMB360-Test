# IMB360 — App Architecture & Workflow

## 1. Entry Point

```
App.tsx
  │
  ├── <Provider store={store}>          ← Redux store (src/store/index.ts)
  │     │
  │     └── <SafeAreaProvider>          ← react-native-safe-area-context
  │           │
  │           └── <NavigationContainer> ← @react-navigation/native
  │                 │
  │                 └── <RootNavigator> ← src/navigation/RootNavigator.tsx
```

---

## 2. Root Navigation — Auth vs App Split

```
RootNavigator (src/navigation/RootNavigator.tsx)
  │
  │  Checks: useAppSelector(state => state.auth.isAuthenticated)
  │
  ├── if NOT authenticated → <AuthNavigator>
  │
  └── if authenticated     → <AppNavigator>
```

---

## 3. Auth Flow (unauthenticated)

```
AuthNavigator (src/navigation/AuthNavigator.tsx)
  NativeStack — initialRouteName: "Splash"
  │
  ├── Splash               → src/screens/splash/SplashScreen.tsx
  │     │
  │     │  Checks login state / tokens from AsyncStorage & Keychain
  │     │
  │     ├── if logged in  → navigate("RoleSelection")  (skip auth)
  │     └── if not logged → navigate("Onboarding")
  │
  ├── Onboarding           → src/screens/onboarding/OnboardingScreen.tsx
  │     │                      3 swipeable slides, "Skip" & "Get Started"
  │     │
  │     └── "Get Started" → navigate("RoleSelection")
  │
  ├── RoleSelection        → src/screens/auth/role-selection/RoleSelectionScreen.tsx
  │     │                      Two cards: BRAND / CREATOR
  │     │
  │     └── "Continue"    → navigate("AuthEntryPoint", { role })
  │
  ├── AuthEntryPoint       → src/screens/auth/entry-point/AuthEntryPointScreen.tsx
  │     │                      Role-specific description + Join/Login buttons
  │     │
  │     ├── "Join"        → navigate("Register", { role })
  │     └── "Login"       → navigate("Login")
  │
  ├── Register             → src/screens/auth/register/RegisterScreen.tsx
  │     │                      Email, username, password, country, phone
  │     │                      Uses: CountryPhoneInput, OtpModalSheet, FloatingInput, Button
  │     │
  │     ├── Submit        → POST /auth/register  (src/api/endpoints.ts AUTH.REGISTER)
  │     └── Success       → navigate("Verification")
  │
  ├── Verification         → src/screens/auth/verify/VerificationScreen.tsx
  │     │                      6-digit OTP input
  │     │                      Uses: OtpModalSheet
  │     │
  │     ├── Verify OTP    → POST /auth/verify-otp  (AUTH.VERIFY_OTP)
  │     └── Success       → navigate("Login")
  │
  ├── Login                → src/screens/auth/login/LoginScreen.tsx
  │     │                      Email + password form
  │     │
  │     ├── Submit        → POST /auth/login  (AUTH.LOGIN)
  │     │                      └── dispatch(loginSuccess({ user, tokens }))
  │     │                      └── tokens saved to AsyncStorage + Keychain
  │     │
  │     ├── "Forgot PW"   → navigate("ForgotPassword")
  │     └── Success       → user becomes authenticated → RootNavigator switches to AppNavigator
  │
  ├── ForgotPassword       → src/screens/auth/forgot-password/ForgotPasswordScreen.tsx
  │     │                      Email input + validation
  │     │
  │     └── "Send Code"   → POST /auth/forgot-password  (AUTH.FORGOT_PASSWORD)
  │                          └── navigate("ResetPassword")
  │
  └── ResetPassword        → (placeholder — "Coming Soon")
```

---

## 4. App Flow (authenticated)

```
AppNavigator (src/navigation/AppNavigator.tsx)
  NativeStack — initialRouteName: "MainTabs"
  │
  ├── MainTabs  (BottomTabNavigator)
  │     │  5 tabs, all currently route to HomeScreen (stubbed)
  │     │
  │     ├── Profile     → src/screens/home/HomeScreen.tsx
  │     ├── Campaign    → src/screens/home/HomeScreen.tsx
  │     ├── Explore     → src/screens/home/HomeScreen.tsx
  │     ├── Analytics   → src/screens/home/HomeScreen.tsx
  │     └── Assets      → src/screens/home/HomeScreen.tsx
  │
  ├── Home              → src/screens/home/HomeScreen.tsx
  │     │                  Profile card, stats, menu items
  │     │
  │     ├── "Overview"        → navigate("Overview")
  │     ├── "Content"         → navigate("Content")
  │     ├── "Pricing"         → navigate("Pricing")
  │     ├── "Campaign Queue"  → navigate("CampaignQueue")
  │     └── "My Earnings"     → navigate("MyEarnings")
  │
  ├── Overview          → src/screens/overview/OverviewScreen.tsx
  ├── Content           → src/screens/content/ContentScreen.tsx
  ├── AddContent        → src/screens/content/AddContentScreen.tsx
  ├── EditContent       → src/screens/content/EditContentScreen.tsx
  ├── Pricing           → src/screens/pricing/PricingScreen.tsx
  ├── AddPricing        → src/screens/pricing/AddPricingScreen.tsx
  ├── EditPricing       → src/screens/pricing/EditPricingScreen.tsx
  ├── CampaignQueue     → src/screens/CampaignQueue/CampaignQueueScreen.tsx
  ├── CampaignURL       → src/screens/CampaignQueue/CampaignURLScreen.tsx
  ├── MyEarnings        → src/screens/MyEarnings/MyEarnings.tsx
  └── Settings          → src/screens/settings/SettingsScreen.tsx
```

---

## 5. State Management (Redux)

```
src/store/index.ts
  │
  └── configureStore({ reducer: { auth: authReducer } })
        │
        └── src/features/auth/store/authSlice.ts
              │
              ├── State: { isAuthenticated, user, accessToken, refreshToken, loading }
              │
              ├── loginSuccess(payload)   → set user + tokens + authenticated
              ├── logout()                → clear all state
              ├── setAuthLoading(bool)    → toggle loading flag
              └── updateUser(partial)     → merge into existing user
```

---

## 6. API Layer

```
src/api/client.ts
  │
  ├── axios.create({ baseURL, timeout, headers })
  │     baseURL = Config.API_BASE_URL || 'http://10.0.2.2:5000'
  │
  └── src/api/endpoints.ts  (endpoint path constants)
        │
        ├── AUTH        → /auth/login, /auth/register, /auth/logout, /auth/refresh,
        │                 /auth/forgot-password, /auth/reset-password,
        │                 /auth/verify-email, /auth/send-otp, /auth/verify-otp
        │
        ├── USER        → /user/profile, /user/avatar
        ├── CAMPAIGNS   → /campaigns, /campaigns/:id, /campaigns/:id/apply
        ├── EARNINGS    → /earnings/summary, /earnings, /earnings/withdraw
        ├── CONTENT     → /content, /content/:id
        └── ANALYTICS   → /analytics/overview, /analytics/platforms

  src/api/interceptors.ts  (empty — ready for auth token injection)
```

---

## 7. Shared Components

```
src/components/
  │
  ├── ScreenHeader.tsx              ← Reusable header with back button
  │
  ├── auth/
  │   ├── CountryPhoneInput.tsx     ← Country selector + phone input (register form)
  │   └── OtpModalSheet.tsx         ← 6-digit OTP modal (verification screen)
  │
  ├── common/
  │   ├── Button/
  │   │   └── Button.tsx            ← Variant: primary/secondary/outline/ghost, loading state
  │   ├── Card/
  │   │   ├── Card.tsx              ← Base card container
  │   │   └── styles.ts
  │   └── FloatingInput/
  │       └── FloatingInput.tsx     ← Input with floating label (forms)
  │
  ├── layout/ScreenContainer/
  │   ├── ScreenContainer.tsx       ← Wrapper with safe area + padding
  │   └── styles.ts
  │
  ├── loaders/
  │   └── DashboardSkeleton.tsx     ← Loading placeholder for dashboard
  │
  └── security/
      └── ProtectedRoute.tsx        ← Route guard (checks isAuthenticated)
```

---

## 8. Utilities & Config

```
src/config/
  ├── theme.ts        ← Colors, Spacing, Radius (design tokens)
  ├── constants.ts    ← App constants
  └── env.ts          ← Environment config

src/utils/
  ├── countries.ts    ← Country list with dial codes
  ├── scaling.ts      ← Re-exports: scale, verticalScale, moderateScale
  ├── helpers.ts      ← (empty stub)
  ├── validators.ts   ← (empty stub)
  └── logger.ts       ← (empty stub)

src/security/
  ├── sanitize.ts     ← sanitizeText, sanitizeEmail, sanitizePhone,
  │                     containsFourByteUnicode, safeDatabaseText
  └── permissions.ts  ← DEFAULT_PERMISSIONS, getPermissionsByRole, hasPermission

src/context/
  └── ToastContext.tsx ← Global toast provider (useGlobalToast hook)

src/hooks/
  ├── redux.ts        ← useAppSelector, useAppDispatch (typed Redux hooks)
  ├── useToast.ts     ← useGlobalToast wrapper
  ├── useDebounce.ts  ← (empty stub)
  └── useScale.ts     ← (empty stub)

src/types/
  ├── global.ts       ← User, UserRole, UserPermissions, AuthTokens
  ├── api.ts          ← API response types
  └── navigation.ts   ← AuthStackParamList, BottomTabParamList, AppStackParamList
```

---

## 9. Auth Token Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│  Login Flow                                                      │
│                                                                  │
│  LoginScreen ──POST /auth/login──► Server                       │
│                                      │                           │
│  ◄────── { user, accessToken, refreshToken } ────────────────────│
│                                                                  │
│  dispatch(loginSuccess(payload))                                 │
│  AsyncStorage.setItem('accessToken')                             │
│  Keychain.setGenericPassword(refreshToken)                       │
│                                                                  │
│  RootNavigator re-renders → AuthNavigator → AppNavigator         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Token Refresh (future — interceptors.ts is ready)               │
│                                                                  │
│  401 response ──► POST /auth/refresh ──► new tokens             │
│                                     └──► retry original request  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  Logout Flow                                                     │
│                                                                  │
│  dispatch(logout())                                              │
│  AsyncStorage.removeItem('accessToken')                          │
│  Keychain.resetGenericPassword()                                 │
│                                                                  │
│  RootNavigator re-renders → AppNavigator → AuthNavigator         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 10. Key Dependencies

| Category        | Packages |
|-----------------|----------|
| UI Framework    | React Native 0.85.3, React 19.1.0 |
| Navigation      | @react-navigation/native, native-stack, bottom-tabs |
| State           | @reduxjs/toolkit, react-redux |
| HTTP            | axios |
| Storage         | @react-native-async-storage/async-storage, react-native-keychain |
| Animation       | react-native-reanimated 4.3.1, react-native-gesture-handler |
| UI Components   | react-native-vector-icons, react-native-linear-gradient, react-native-svg |
| Scaling         | react-native-size-matters |
| Device Info     | react-native-device-info, react-native-config |
| Language        | TypeScript 5.8.3 |
