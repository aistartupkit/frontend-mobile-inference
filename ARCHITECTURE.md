# Architecture Documentation

## Overview

This is a React Native mobile application that provides local AI inference capabilities with a comprehensive feature set including multi-provider authentication, cloud database integration, and advertisement monetization.

## Technology Stack

### Core
- **React Native 0.81.4** - Cross-platform mobile framework
- **TypeScript 5.8.3** - Type-safe JavaScript
- **React Navigation** - Navigation and routing

### Authentication
- **Firebase Authentication** - Multi-provider auth backend
- **Google Sign-In** - Native Google authentication
- **Facebook SDK** - Facebook login integration
- Support for GitHub and Microsoft OAuth

### Database
- **Firebase Firestore** - NoSQL cloud database
- **AsyncStorage** - Local key-value storage
- **React Native FS** - File system access for model storage

### AI/ML
- **ONNX Runtime** (placeholder) - For local AI inference
- **TensorFlow Lite** (alternative option)
- Custom inference service with context management

### Monetization
- **Google Mobile Ads (AdMob)** - Interstitial advertisements
- Ad tracking and analytics

### UI/UX
- **React Native Vector Icons** - Icon library
- **React Native Safe Area Context** - Safe area handling
- Custom styled components

## Project Structure

```
/src
  /components          # Reusable UI components (future expansion)
  /screens            # Screen components
    - LoginScreen.tsx          # Authentication entry point
    - RegisterScreen.tsx       # User registration
    - ChatScreen.tsx          # AI chat interface
    - ModelsScreen.tsx        # Model management
    - ProfileScreen.tsx       # User profile and settings
  
  /navigation         # Navigation configuration
    - AppNavigator.tsx        # Main navigation structure
  
  /services          # Business logic and API integrations
    - authService.ts          # Authentication service
    - databaseService.ts      # Firestore operations
    - modelService.ts         # AI model management
    - inferenceService.ts     # Local AI inference
    - adService.ts           # Advertisement management
  
  /store            # State management (future expansion)
  /types            # TypeScript type definitions
    - index.ts               # Core type definitions
  
  /utils            # Utility functions (future expansion)
  /models           # AI model assets (future expansion)
  /ads              # Ad configurations (future expansion)
  /config           # App configuration
    - firebase.ts            # Firebase config

/android           # Android native code and config
/ios              # iOS native code and config
/__tests__        # Jest test files
```

## Data Flow

### Authentication Flow
1. User launches app → Auth state listener checks for existing session
2. If not authenticated → Show Login/Register screens
3. User selects auth method (Email, Google, Facebook, etc.)
4. Auth service handles provider-specific flow
5. On success → Firebase Auth creates/updates user session
6. Database service creates/updates user document in Firestore
7. App navigates to main interface

### Chat Flow
1. User opens Chat screen → Create new chat session in Firestore
2. User types message → Message added to local state and Firestore
3. Inference service processes message with context
4. AI generates response using local model
5. Response displayed and saved to Firestore
6. Every 5 messages → Ad service shows interstitial ad
7. Ad impressions/clicks tracked in Firestore

### Model Management Flow
1. User opens Models screen → Load available models from service
2. User selects download → Model service initiates download
3. Progress tracked and displayed in real-time
4. Model saved to device filesystem (Documents directory)
5. Model metadata stored in AsyncStorage
6. User can activate model → Inference service initializes model
7. Model ready for chat interface

## Services Architecture

### AuthService
- Singleton service managing authentication state
- Wraps Firebase Auth and provider SDKs
- Provides unified interface for all auth methods
- Handles token refresh and session management

### DatabaseService
- Abstracts Firestore operations
- Provides ORM-like interface for data models
- Handles real-time updates and queries
- Manages data consistency

### ModelService
- Manages AI model lifecycle
- Handles downloads with progress tracking
- Persists models to filesystem
- Maintains model metadata in AsyncStorage

### InferenceService
- Interfaces with ONNX Runtime (or similar)
- Manages inference sessions
- Handles context window for conversations
- Optimizes for mobile performance

### AdService
- Manages ad lifecycle and timing
- Tracks impressions and clicks
- Implements frequency capping
- Reports metrics to backend

## State Management

Currently using React hooks and local state. Future considerations:
- Redux Toolkit for global state
- React Query for server state
- Context API for auth state (already partially implemented)

## Security Considerations

### Authentication
- OAuth tokens stored securely by platform keychain
- Firebase handles token refresh automatically
- Session persistence with secure storage

### Data Storage
- Sensitive data encrypted by AsyncStorage (platform-dependent)
- AI models stored in app-specific Documents directory
- User data synced with Firestore Security Rules

### API Keys
- Firebase config should be in environment variables
- AdMob IDs separate for dev/prod
- Never commit actual API keys to version control

## Performance Optimizations

### AI Inference
- Models loaded once and reused
- Context window limited to prevent memory issues
- Async operations prevent UI blocking

### UI Rendering
- FlatList for efficient list rendering
- Memoization for expensive computations
- Lazy loading for navigation screens

### Network
- Firestore offline persistence enabled
- Model downloads resumable
- Optimistic UI updates

## Testing Strategy

### Unit Tests
- Service layer logic
- Utility functions
- State management

### Integration Tests
- Authentication flows
- Database operations
- Navigation flows

### E2E Tests (future)
- Complete user journeys
- Cross-platform testing
- Performance testing

## Deployment

### iOS
1. Update bundle ID and team in Xcode
2. Add GoogleService-Info.plist
3. Configure capabilities (Sign in with Apple, etc.)
4. Archive and submit to App Store

### Android
1. Update package name in AndroidManifest.xml
2. Add google-services.json
3. Generate release keystore
4. Build signed APK/AAB
5. Submit to Google Play

## Future Enhancements

### Features
- [ ] Offline mode with full functionality
- [ ] Voice input/output
- [ ] Multi-language support
- [ ] Theme customization
- [ ] Chat history export
- [ ] Model marketplace
- [ ] Premium subscription tier

### Technical
- [ ] Performance monitoring (Firebase Performance)
- [ ] Crash reporting (Crashlytics)
- [ ] Analytics (Firebase Analytics)
- [ ] Push notifications
- [ ] Deep linking
- [ ] Code splitting
- [ ] Continuous deployment

## Troubleshooting

### Common Issues

**Build Failures**
- Clear derived data (iOS) or clean build (Android)
- Ensure all dependencies installed (`npm install`, `pod install`)
- Check minimum platform versions

**Authentication Errors**
- Verify Firebase configuration
- Check OAuth credentials in cloud console
- Ensure bundle ID/package name matches

**Model Download Issues**
- Check network connectivity
- Verify storage permissions
- Ensure sufficient device storage

**Ad Display Problems**
- Verify AdMob setup
- Check ad unit IDs
- Review ad frequency settings

## Contributing

When contributing to this project:
1. Follow TypeScript best practices
2. Write tests for new features
3. Update documentation
4. Use conventional commits
5. Test on both platforms
6. Consider accessibility

## Resources

- [React Native Docs](https://reactnative.dev/)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [ONNX Runtime Mobile](https://onnxruntime.ai/docs/tutorials/mobile/)
- [AdMob](https://developers.google.com/admob)
