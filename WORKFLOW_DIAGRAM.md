graph TD
    %% Base Styles & Configuration
    classDef entry fill:#4338ca,stroke:#312e81,stroke-width:2px,color:#fff;
    classDef nav fill:#1e3a8a,stroke:#1d4ed8,stroke-width:2px,color:#fff;
    classDef authScreen fill:#065f46,stroke:#047857,stroke-width:2px,color:#fff;
    classDef appScreen fill:#7c2d12,stroke:#b45309,stroke-width:2px,color:#fff;
    classDef store fill:#581c87,stroke:#6b21a8,stroke-width:2px,color:#fff;
    classDef api fill:#991b1b,stroke:#b91c1c,stroke-width:2px,color:#fff;
    classDef storage fill:#374151,stroke:#4b5563,stroke-width:2px,color:#fff;
    
    %% 1. ENTRY POINT & ROOT NAVIGATION
    subgraph Initialization ["1 & 2. Entry Point & Root Navigation"]
        App["App.tsx"] ::: entry
        Provider["Redux Provider<br/>(store/index.ts)"] ::: store
        SAP["SafeAreaProvider"]
        NavContainer["NavigationContainer"]
        RootNav{"RootNavigator<br/>(useAppSelector)"} ::: nav
        
        App --> Provider
        Provider --> SAP
        SAP --> NavContainer
        NavContainer --> RootNav
    end

    %% 2. AUTH NAVIGATION FLOW
    subgraph AuthFlow ["3. Auth Navigator (Unauthenticated)"]
        AuthNav["AuthNavigator<br/>(NativeStack)"] ::: nav
        Splash["SplashScreen<br/>(Checks AsyncStorage/Keychain)"] ::: authScreen
        Onboarding["OnboardingScreen<br/>(3 Slides)"] ::: authScreen
        RoleSel["RoleSelectionScreen<br/>(BRAND / CREATOR)"] ::: authScreen
        AuthEntry["AuthEntryPointScreen<br/>(Join / Login)"] ::: authScreen
        Register["RegisterScreen<br/>(CountryPhoneInput, OtpModalSheet)"] ::: authScreen
        Verify["VerificationScreen<br/>(6-digit OTP)"] ::: authScreen
        Login["LoginScreen<br/>(Email/Password)"] ::: authScreen
        ForgotPW["ForgotPasswordScreen"] ::: authScreen
        ResetPW["ResetPassword<br/>(Placeholder)"] ::: authScreen

        RootNav -- "isAuthenticated == false" --> AuthNav
        AuthNav --> Splash
        
        Splash -- "Tokens Found" --> RoleSel
        Splash -- "No Tokens" --> Onboarding
        Onboarding -- "Get Started / Skip" --> RoleSel
        RoleSel -- "Continue (Pass Role)" --> AuthEntry
        AuthEntry -- "Join" --> Register
        AuthEntry -- "Login" --> Login
        Register -- "POST /auth/register" --> Verify
        Verify -- "Success" --> Login
        Login -- "Forgot PW" --> ForgotPW
        ForgotPW -- "POST /auth/forgot-password" --> ResetPW
    end

    %% 3. APP NAVIGATION FLOW
    subgraph AppFlow ["4. App Navigator (Authenticated)"]
        AppNav["AppNavigator<br/>(NativeStack)"] ::: nav
        MainTabs["MainTabs<br/>(BottomTabNavigator)"] ::: nav
        
        %% Tabs
        HomeTab["Home / Profile / Campaign<br/>Explore / Analytics / Assets<br/>(Stubbed to HomeScreen)"] ::: appScreen
        
        %% Sub-screens
        Overview["OverviewScreen"] ::: appScreen
        ContentGroup["Content Stack<br/>(Content / Add / Edit)"] ::: appScreen
        PricingGroup["Pricing Stack<br/>(Pricing / Add / Edit)"] ::: appScreen
        CampaignGroup["Campaign Stack<br/>(Queue / URL)"] ::: appScreen
        Earnings["MyEarningsScreen"] ::: appScreen
        Settings["SettingsScreen"] ::: appScreen

        RootNav -- "isAuthenticated == true" --> AppNav
        AppNav --> MainTabs
        MainTabs --> HomeTab
        
        HomeTab --> Overview
        HomeTab --> ContentGroup
        HomeTab --> PricingGroup
        HomeTab --> CampaignGroup
        HomeTab --> Earnings
        HomeTab --> Settings
    end

    %% 4. REDUX STATE MANAGEMENT
    subgraph StateMgmt ["5. State Management & Side Effects"]
        AuthSlice["authSlice.ts<br/>State: isAuthenticated, user, tokens, loading"] ::: store
        
        loginSuccess["loginSuccess()"]
        logout["logout()"]
        updateUser["updateUser()"]
        
        AuthSlice --> loginSuccess
        AuthSlice --> logout
        AuthSlice --> updateUser
    end

    %% 5. API LAYER & TOKEN LIFECYCLE
    subgraph NetworkLayer ["6 & 9. API Layer & Token Lifecycle"]
        AxiosClient["Axios Instance<br/>(Config BaseURL)"] ::: api
        Interceptors["interceptors.ts<br/>(Auth Injection / 401 Refresh)"] ::: api
        EndPoints["endpoints.ts<br/>(AUTH, USER, CAMPAIGNS, EARNINGS, CONTENT)"] ::: api
        
        AsyncStorage[("@react-native-async-storage<br/>[accessToken]")] ::: storage
        Keychain[("react-native-keychain<br/>[refreshToken]")] ::: storage

        AxiosClient --> Interceptors
        Interceptors --> EndPoints
    end

    %% Key Inter-Module Data Flows
    Login -- "1. Dispatch tokens" --> loginSuccess
    loginSuccess -- "2. Set State True" --> RootNav
    loginSuccess -- "3. Save Token" --> AsyncStorage
    loginSuccess -- "4. Save Secure Token" --> Keychain
    
    Splash -. "Read Local Tokens" .-> AsyncStorage
    Splash -. "Read Secure Credentials" .-> Keychain
    
    Verify -. "POST /auth/verify-otp" .-> EndPoints
    Register -. "POST /auth/register" .-> EndPoints
    Login -. "POST /auth/login" .-> EndPoints