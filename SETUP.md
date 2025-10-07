# Setup Guide

This guide will help you set up the AI Inference App with all required services.

## Prerequisites

- Node.js >= 20
- React Native development environment
- For iOS: macOS with Xcode and CocoaPods
- For Android: Android Studio with Android SDK

## Step 1: Install Dependencies

```bash
npm install
```

For iOS, also install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

## Step 2: Firebase Setup

### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Add an iOS app and/or Android app

### Configure Authentication

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable the following providers:
   - Email/Password
   - Google
   - Facebook (requires Facebook App ID)
   - GitHub (requires GitHub OAuth App)
   - Microsoft (requires Microsoft App ID)

### Configure Firestore

1. In Firebase Console, go to Firestore Database
2. Create a database (start in test mode for development)
3. Create the following collections (they will be auto-created by the app):
   - `users`
   - `chatSessions`
   - `adMetrics`

### Download Configuration Files

#### For iOS:
1. Download `GoogleService-Info.plist`
2. Place it in the `ios/` directory

#### For Android:
1. Download `google-services.json`
2. Place it in the `android/app/` directory

### Update Firebase Config

Update `src/config/firebase.ts` with your Firebase configuration from the console.

## Step 3: Google Sign-In Setup

### iOS Setup

1. Open `ios/AIInferenceApp.xcworkspace` in Xcode
2. Add the `GoogleService-Info.plist` to your project
3. Add URL scheme from the plist to Info.plist

### Android Setup

1. The `google-services.json` file should be in `android/app/`
2. Make sure the `google-services` plugin is applied in `android/app/build.gradle`

### Configure Web Client ID

Update the `webClientId` in `src/services/authService.ts`:
- Find it in your Firebase Console > Project Settings > General
- Look for "Web client ID" under "Your apps"

## Step 4: AdMob Setup

### Create AdMob Account

1. Go to [AdMob](https://admob.google.com)
2. Create an account and app

### Get Ad Unit IDs

1. Create ad units in AdMob console
2. Update `src/services/adService.ts` with your ad unit IDs

### Configure App IDs

#### For iOS:
Add to `ios/AIInferenceApp/Info.plist`:
```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-xxxxxxxxxxxxx~yyyyyyyyyy</string>
```

#### For Android:
Add to `android/app/src/main/AndroidManifest.xml`:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-xxxxxxxxxxxxx~yyyyyyyyyy"/>
```

## Step 5: AI Model Setup

The app includes mock AI inference. For production:

### Option 1: ONNX Runtime

1. Install ONNX Runtime for React Native:
```bash
npm install onnxruntime-react-native
```

2. Convert your model to ONNX format
3. Update `src/services/inferenceService.ts` to use ONNX Runtime
4. Host your model files and update URLs in `src/services/modelService.ts`

### Option 2: TensorFlow Lite

1. Install TensorFlow Lite for React Native
2. Convert your model to TFLite format
3. Update inference service accordingly

## Step 6: Additional Configuration

### iOS Vector Icons

Run this to link icons:
```bash
npx react-native-asset
```

Or manually add fonts to Info.plist.

### Android Permissions

The app requires the following permissions (already in AndroidManifest.xml):
- INTERNET
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE

## Step 7: Build and Run

### iOS

```bash
npm run ios
```

Or open in Xcode and build from there.

### Android

```bash
npm run android
```

## Troubleshooting

### Firebase Connection Issues

- Ensure config files are in the correct locations
- Check that package names match in Firebase Console
- Verify SHA-1 fingerprints for Android

### Google Sign-In Issues

- Verify Web Client ID is correct
- Check that OAuth consent screen is configured in Google Cloud Console
- Ensure GoogleService files are properly added to projects

### Build Errors

For iOS:
```bash
cd ios && pod deintegrate && pod install && cd ..
```

For Android:
```bash
cd android && ./gradlew clean && cd ..
```

## Development Notes

- Use `__DEV__` constant to check if in development mode
- Test ads use TestIds from `react-native-google-mobile-ads`
- Firebase Auth requires proper configuration for production apps
- Model inference is currently mocked - implement actual ONNX/TFLite for production

## Production Checklist

- [ ] Update all API keys and secrets
- [ ] Configure proper Firebase security rules
- [ ] Replace test ad unit IDs with production IDs
- [ ] Implement actual AI model inference
- [ ] Add error tracking (e.g., Sentry)
- [ ] Add analytics (e.g., Firebase Analytics)
- [ ] Test all authentication providers
- [ ] Test on physical devices
- [ ] Configure app signing for release builds
- [ ] Prepare app store listings
