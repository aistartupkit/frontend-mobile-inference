import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { User } from '../types';

class AuthService {
  constructor() {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: 'YOUR_WEB_CLIENT_ID', // From Firebase Console
    });
  }

  async signInWithGoogle(): Promise<User> {
    try {
      // Check if device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      
      // Get user's ID token
      const { idToken } = await GoogleSignin.signIn();
      
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      
      // Sign in with credential
      const userCredential = await auth().signInWithCredential(googleCredential);
      
      return this.mapFirebaseUser(userCredential.user, 'google');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  async signInWithFacebook(): Promise<User> {
    // Facebook authentication would be implemented here
    // Requires react-native-fbsdk-next setup
    throw new Error('Facebook auth not fully configured');
  }

  async signInWithGitHub(): Promise<User> {
    // GitHub authentication would use Firebase's GitHub provider
    // Or a custom OAuth flow
    throw new Error('GitHub auth not fully configured');
  }

  async signInWithMicrosoft(): Promise<User> {
    // Microsoft authentication would use Firebase's Microsoft provider
    // Or a custom OAuth flow
    throw new Error('Microsoft auth not fully configured');
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return this.mapFirebaseUser(userCredential.user, 'email');
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      throw error;
    }
  }

  async signUpWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      return this.mapFirebaseUser(userCredential.user, 'email');
    } catch (error) {
      console.error('Email Sign-Up Error:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      // Sign out from Google if signed in
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.signOut();
      }
      
      // Sign out from Firebase
      await auth().signOut();
    } catch (error) {
      console.error('Sign-Out Error:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    const firebaseUser = auth().currentUser;
    if (!firebaseUser) return null;
    
    return this.mapFirebaseUser(firebaseUser, 'email');
  }

  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        callback(this.mapFirebaseUser(firebaseUser, 'email'));
      } else {
        callback(null);
      }
    });
  }

  private mapFirebaseUser(firebaseUser: any, provider: User['provider']): User {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      provider,
    };
  }
}

export default new AuthService();
