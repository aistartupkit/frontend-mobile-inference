# Quick Start Guide

Get up and running with the AI Inference App in minutes!

## 🚀 Quick Setup (Development Mode)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Metro Bundler

```bash
npm start
```

### 3. Run the App

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

That's it! The app will launch with mock data and test authentication.

## 📱 What You'll See

1. **Login Screen**: Multiple authentication options (mock mode for development)
2. **Chat Interface**: AI chat with mock responses
3. **Models Screen**: View available AI models (mock downloads)
4. **Profile Screen**: User profile and settings

## 🧪 Development Mode Features

- **Mock Authentication**: Sign in without real credentials
- **Mock AI Responses**: Instant responses without real models
- **Test Ads**: AdMob test ads only
- **No Backend Required**: Works without Firebase setup

## 📋 Next Steps

### For Production Setup

See [SETUP.md](SETUP.md) for:
- Firebase configuration
- Authentication provider setup
- AdMob integration
- Real AI model integration

### For Development

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Development workflow
- Coding standards
- Testing guidelines
- PR process

### For Understanding

See [ARCHITECTURE.md](ARCHITECTURE.md) for:
- System design
- Data flow
- Service architecture
- Performance considerations

See [API.md](API.md) for:
- Service APIs
- Type definitions
- Usage examples

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Start Metro bundler
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run tests
npm test

# Run linter
npm run lint

# Fix lint issues
npm run lint -- --fix
```

## 🐛 Troubleshooting

### Build Errors

**Clear cache and reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**iOS pod issues:**
```bash
cd ios
pod deintegrate
pod install
cd ..
```

**Android build issues:**
```bash
cd android
./gradlew clean
cd ..
```

### Metro Bundler Issues

**Reset cache:**
```bash
npm start -- --reset-cache
```

### App Crashes

1. Check Metro bundler logs
2. Check Xcode/Android Studio logs
3. Ensure all dependencies are installed
4. Try on a different device/simulator

## 📚 Learning Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [React Navigation](https://reactnavigation.org/docs/getting-started)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)

## 💬 Getting Help

- Check existing [GitHub Issues](https://github.com/aistartupkit/frontend-mobile-inference/issues)
- Read the full documentation in this repo
- Create a new issue with reproduction steps

## ✨ Features Overview

### Authentication
- ✅ Email/Password
- ✅ Google Sign-In
- ✅ Facebook Login
- ✅ GitHub OAuth
- ✅ Microsoft Login

### AI Features
- ✅ Local model management
- ✅ Model download with progress
- ✅ Chat interface with context
- ✅ Message history

### Backend
- ✅ Firestore database
- ✅ User management
- ✅ Chat session persistence
- ✅ Real-time sync

### Monetization
- ✅ AdMob integration
- ✅ Interstitial ads
- ✅ Impression tracking
- ✅ Click tracking

## 🎯 What's Next?

1. **Try the app** - Explore all features in development mode
2. **Read the docs** - Understand the architecture
3. **Set up Firebase** - Connect to real backend
4. **Add real models** - Integrate ONNX or TFLite
5. **Customize** - Make it your own!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Ready to build? Start with `npm install` and you're good to go! 🚀
