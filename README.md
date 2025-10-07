# frontend-mobile-inference

Create a React Native Mobile Front-End SPA for IOS & Android that provides local AI Inference.

## Features
- User Registration including into Google, Facebook, GitHub, Microsoft.
- User Authentication into Google, Facebook, GitHub, Microsoft.
- Flexible Backend Database Architecture with NoSQL and ORM.
- Local AI Model Download and On-Device Persistence
- Local Inference of AI Model with Chat Interface and context retention
- Advertisements that interrupts and tracks clicks/views for revenue model

## Setup

### Prerequisites
- Node.js >= 20
- React Native development environment setup
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

```bash
npm install
```

### Running the App

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Project Structure

```
/src
  /components     # Reusable UI components
  /screens        # Screen components
  /navigation     # Navigation configuration
  /services       # API and service layers
  /store          # State management
  /types          # TypeScript type definitions
  /utils          # Utility functions
  /models         # AI model management
  /ads            # Advertisement integration
```

## Technologies Used

- React Native
- TypeScript
- React Navigation
- Firebase (Auth & Database)
- ONNX Runtime for React Native (AI Inference)
- AdMob (Advertisements)
- AsyncStorage (Local Persistence)
