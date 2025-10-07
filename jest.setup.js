// Mock Firebase
jest.mock('@react-native-firebase/app', () => ({
  default: jest.fn(),
}));

jest.mock('@react-native-firebase/auth', () => {
  const authMock = jest.fn(() => ({
    signInWithCredential: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(() => jest.fn()),
    currentUser: null,
  }));
  authMock.GoogleAuthProvider = {
    credential: jest.fn(),
  };
  return authMock;
});

jest.mock('@react-native-firebase/firestore', () => {
  const firestoreMock = jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        set: jest.fn(),
        get: jest.fn(() => Promise.resolve({ exists: false, data: () => null })),
        update: jest.fn(),
      })),
      add: jest.fn(() => Promise.resolve({ id: 'test-id', get: jest.fn() })),
      where: jest.fn(() => ({
        orderBy: jest.fn(() => ({
          get: jest.fn(() => Promise.resolve({ docs: [] })),
        })),
      })),
    })),
  }));
  firestoreMock.FieldValue = {
    serverTimestamp: jest.fn(),
    increment: jest.fn(),
    arrayUnion: jest.fn(),
  };
  return firestoreMock;
});

// Mock Google Sign-In
jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    isSignedIn: jest.fn(),
  },
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
}));

// Mock react-native-fs
jest.mock('react-native-fs', () => ({
  DocumentDirectoryPath: '/mock/path',
  exists: jest.fn(),
  mkdir: jest.fn(),
  unlink: jest.fn(),
  downloadFile: jest.fn(() => ({
    promise: Promise.resolve({ statusCode: 200 }),
  })),
}));

// Mock react-native-google-mobile-ads
jest.mock('react-native-google-mobile-ads', () => ({
  default: jest.fn(() => ({
    initialize: jest.fn(),
  })),
  InterstitialAd: {
    createForAdRequest: jest.fn(() => ({
      addAdEventListener: jest.fn(),
      load: jest.fn(),
      show: jest.fn(),
      loaded: true,
    })),
  },
  AdEventType: {
    LOADED: 'loaded',
    CLOSED: 'closed',
    CLICKED: 'clicked',
  },
  TestIds: {
    INTERSTITIAL: 'test-interstitial',
  },
}));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

// Mock NavigationContainer
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: ({ children }: any) => children,
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}));
