# API Documentation

## Services API Reference

### AuthService

Location: `src/services/authService.ts`

#### Methods

##### `signInWithGoogle(): Promise<User>`
Authenticates user with Google Sign-In.

**Returns:** Promise resolving to authenticated User object

**Throws:** Error if authentication fails

**Example:**
```typescript
try {
  const user = await authService.signInWithGoogle();
  console.log('Signed in as:', user.email);
} catch (error) {
  console.error('Google sign-in failed:', error);
}
```

##### `signInWithEmail(email: string, password: string): Promise<User>`
Authenticates user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Promise resolving to authenticated User object

**Example:**
```typescript
const user = await authService.signInWithEmail('user@example.com', 'password123');
```

##### `signUpWithEmail(email: string, password: string): Promise<User>`
Creates new user account with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password (min 6 characters)

**Returns:** Promise resolving to newly created User object

##### `signOut(): Promise<void>`
Signs out current user from all providers.

**Returns:** Promise resolving when sign-out is complete

##### `getCurrentUser(): User | null`
Gets currently authenticated user synchronously.

**Returns:** User object or null if not authenticated

##### `onAuthStateChanged(callback: (user: User | null) => void): () => void`
Listens for authentication state changes.

**Parameters:**
- `callback`: Function called when auth state changes

**Returns:** Unsubscribe function

**Example:**
```typescript
const unsubscribe = authService.onAuthStateChanged((user) => {
  if (user) {
    console.log('User logged in:', user.email);
  } else {
    console.log('User logged out');
  }
});

// Later, to stop listening:
unsubscribe();
```

---

### DatabaseService

Location: `src/services/databaseService.ts`

#### Methods

##### `createUser(user: User): Promise<void>`
Creates or updates user document in Firestore.

**Parameters:**
- `user` (User): User object to save

**Returns:** Promise resolving when operation completes

##### `getUser(userId: string): Promise<User | null>`
Retrieves user document from Firestore.

**Parameters:**
- `userId` (string): Unique user identifier

**Returns:** Promise resolving to User object or null

##### `createChatSession(userId: string): Promise<ChatSession>`
Creates new chat session for user.

**Parameters:**
- `userId` (string): User's unique identifier

**Returns:** Promise resolving to new ChatSession object

**Example:**
```typescript
const session = await databaseService.createChatSession(user.id);
console.log('Created session:', session.id);
```

##### `getChatSessions(userId: string): Promise<ChatSession[]>`
Retrieves all chat sessions for user, sorted by most recent.

**Parameters:**
- `userId` (string): User's unique identifier

**Returns:** Promise resolving to array of ChatSession objects

##### `addMessage(sessionId: string, message: Message): Promise<void>`
Adds message to chat session.

**Parameters:**
- `sessionId` (string): Chat session identifier
- `message` (Message): Message object to add

**Returns:** Promise resolving when message is saved

**Example:**
```typescript
const message = {
  id: Date.now().toString(),
  text: 'Hello, AI!',
  sender: 'user',
  timestamp: Date.now(),
};
await databaseService.addMessage(sessionId, message);
```

##### `getChatSession(sessionId: string): Promise<ChatSession | null>`
Retrieves specific chat session.

**Parameters:**
- `sessionId` (string): Chat session identifier

**Returns:** Promise resolving to ChatSession or null

##### `trackAdImpression(userId: string): Promise<void>`
Tracks advertisement impression for user.

**Parameters:**
- `userId` (string): User's unique identifier

**Returns:** Promise resolving when tracked

##### `trackAdClick(userId: string): Promise<void>`
Tracks advertisement click for user.

**Parameters:**
- `userId` (string): User's unique identifier

**Returns:** Promise resolving when tracked

---

### ModelService

Location: `src/services/modelService.ts`

#### Methods

##### `initialize(): Promise<void>`
Initializes model service and creates necessary directories.

**Returns:** Promise resolving when initialization completes

**Example:**
```typescript
await modelService.initialize();
```

##### `getAvailableModels(): Promise<AIModel[]>`
Gets list of available AI models.

**Returns:** Promise resolving to array of AIModel objects

##### `downloadModel(model: AIModel, onProgress?: (progress: number) => void): Promise<AIModel>`
Downloads AI model to device.

**Parameters:**
- `model` (AIModel): Model to download
- `onProgress` (optional): Callback function receiving download progress (0-100)

**Returns:** Promise resolving to updated AIModel with local path

**Example:**
```typescript
const updatedModel = await modelService.downloadModel(
  model,
  (progress) => console.log(`Download: ${progress}%`)
);
console.log('Model saved to:', updatedModel.localPath);
```

##### `deleteModel(modelId: string): Promise<void>`
Deletes model from device storage.

**Parameters:**
- `modelId` (string): Model identifier

**Returns:** Promise resolving when deletion completes

##### `getModelPath(modelId: string): Promise<string | null>`
Gets local file path for downloaded model.

**Parameters:**
- `modelId` (string): Model identifier

**Returns:** Promise resolving to file path or null

---

### InferenceService

Location: `src/services/inferenceService.ts`

#### Methods

##### `initialize(modelPath: string): Promise<void>`
Initializes inference engine with specific model.

**Parameters:**
- `modelPath` (string): Local file path to model

**Returns:** Promise resolving when model is loaded

**Example:**
```typescript
await inferenceService.initialize('/path/to/model.onnx');
```

##### `generateResponse(prompt: string, context?: Message[]): Promise<string>`
Generates AI response for given prompt.

**Parameters:**
- `prompt` (string): User's input text
- `context` (optional): Array of previous messages for context

**Returns:** Promise resolving to generated response text

**Example:**
```typescript
const response = await inferenceService.generateResponse(
  'What is machine learning?',
  previousMessages
);
console.log('AI:', response);
```

##### `clearContext(): void`
Clears conversation context.

**Returns:** void

##### `getContext(): Message[]`
Gets current conversation context.

**Returns:** Array of Message objects

---

### AdService

Location: `src/services/adService.ts`

#### Methods

##### `initialize(userId: string): Promise<void>`
Initializes advertisement service.

**Parameters:**
- `userId` (string): Current user's identifier

**Returns:** Promise resolving when initialization completes

**Example:**
```typescript
await adService.initialize(user.id);
```

##### `showInterstitialAd(): Promise<boolean>`
Shows interstitial advertisement if available and timing allows.

**Returns:** Promise resolving to boolean indicating if ad was shown

**Example:**
```typescript
const shown = await adService.showInterstitialAd();
if (shown) {
  console.log('Ad displayed');
}
```

##### `shouldShowAd(): boolean`
Checks if enough time has passed to show another ad.

**Returns:** Boolean indicating if ad should be shown

##### `setAdFrequency(minutes: number): void`
Sets minimum time between ads.

**Parameters:**
- `minutes` (number): Minutes between ad displays

**Returns:** void

**Example:**
```typescript
adService.setAdFrequency(10); // Show ads at most every 10 minutes
```

---

## Type Definitions

Location: `src/types/index.ts`

### User
```typescript
interface User {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  provider: 'google' | 'facebook' | 'github' | 'microsoft' | 'email';
}
```

### Message
```typescript
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
}
```

### ChatSession
```typescript
interface ChatSession {
  id: string;
  userId: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}
```

### AIModel
```typescript
interface AIModel {
  id: string;
  name: string;
  description: string;
  size: number;              // Size in bytes
  downloadUrl: string;
  localPath?: string;
  isDownloaded: boolean;
  downloadProgress?: number; // 0-100
}
```

### AdMetrics
```typescript
interface AdMetrics {
  impressions: number;
  clicks: number;
  revenue: number;
  lastShown?: number;
}
```

### AppState
```typescript
interface AppState {
  user: User | null;
  currentModel: AIModel | null;
  chatSessions: ChatSession[];
  adMetrics: AdMetrics;
}
```

---

## Navigation

### Route Parameters

#### Auth Stack
- `Login`: No parameters
- `Register`: No parameters

#### Main Tab
- `Chat`: No parameters
- `Models`: No parameters
- `Profile`: No parameters

### Navigation Example

```typescript
import { useNavigation } from '@react-navigation/native';

function MyComponent() {
  const navigation = useNavigation();
  
  // Navigate to Register
  navigation.navigate('Register');
  
  // Go back
  navigation.goBack();
}
```

---

## Error Handling

All service methods may throw errors. Always wrap calls in try-catch:

```typescript
try {
  const result = await someService.someMethod();
  // Handle success
} catch (error) {
  console.error('Operation failed:', error);
  // Handle error
}
```

Common error types:
- Authentication errors: Invalid credentials, network issues
- Database errors: Permission denied, network timeout
- Model errors: Download failed, insufficient storage
- Inference errors: Model not loaded, invalid input

---

## Best Practices

### Authentication
- Always check user state before accessing protected resources
- Handle token expiration gracefully
- Provide clear error messages to users

### Database
- Use optimistic updates for better UX
- Implement offline persistence
- Handle network failures gracefully

### Models
- Check available storage before downloads
- Show progress during long operations
- Allow cancellation of downloads

### Inference
- Limit context window size
- Run inference on background thread
- Handle model initialization failures

### Advertisements
- Respect user experience with frequency limits
- Handle ad load failures gracefully
- Track metrics for optimization

---

## Rate Limits & Quotas

### Firebase
- Free tier: 50,000 reads/day, 20,000 writes/day
- Authentication: No hard limits on free tier
- Storage: 1GB free

### AdMob
- No request limits
- Revenue depends on impressions and clicks
- Different rates for different regions

### Model Downloads
- Limited by device storage
- Recommend WiFi for large downloads
- Implement resume capability

---

## Support

For issues or questions:
1. Check SETUP.md for configuration help
2. Review ARCHITECTURE.md for design decisions
3. Check logs for error messages
4. Search existing issues on GitHub
5. Create new issue with reproduction steps
