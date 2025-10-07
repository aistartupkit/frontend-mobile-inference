import firestore from '@react-native-firebase/firestore';
import { ChatSession, Message, User } from '../types';

class DatabaseService {
  private db = firestore();

  // User operations
  async createUser(user: User): Promise<void> {
    try {
      await this.db.collection('users').doc(user.id).set({
        email: user.email,
        displayName: user.displayName || null,
        photoURL: user.photoURL || null,
        provider: user.provider,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getUser(userId: string): Promise<User | null> {
    try {
      const doc = await this.db.collection('users').doc(userId).get();
      if (!doc.exists) return null;
      
      const data = doc.data();
      return {
        id: doc.id,
        email: data?.email || '',
        displayName: data?.displayName,
        photoURL: data?.photoURL,
        provider: data?.provider || 'email',
      };
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  // Chat session operations
  async createChatSession(userId: string): Promise<ChatSession> {
    try {
      const docRef = await this.db.collection('chatSessions').add({
        userId,
        messages: [],
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      const doc = await docRef.get();
      const data = doc.data();
      
      return {
        id: doc.id,
        userId,
        messages: [],
        createdAt: data?.createdAt?.toMillis() || Date.now(),
        updatedAt: data?.updatedAt?.toMillis() || Date.now(),
      };
    } catch (error) {
      console.error('Error creating chat session:', error);
      throw error;
    }
  }

  async getChatSessions(userId: string): Promise<ChatSession[]> {
    try {
      const snapshot = await this.db
        .collection('chatSessions')
        .where('userId', '==', userId)
        .orderBy('updatedAt', 'desc')
        .get();

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          messages: data.messages || [],
          createdAt: data.createdAt?.toMillis() || Date.now(),
          updatedAt: data.updatedAt?.toMillis() || Date.now(),
        };
      });
    } catch (error) {
      console.error('Error getting chat sessions:', error);
      throw error;
    }
  }

  async addMessage(sessionId: string, message: Message): Promise<void> {
    try {
      await this.db.collection('chatSessions').doc(sessionId).update({
        messages: firestore.FieldValue.arrayUnion(message),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding message:', error);
      throw error;
    }
  }

  async getChatSession(sessionId: string): Promise<ChatSession | null> {
    try {
      const doc = await this.db.collection('chatSessions').doc(sessionId).get();
      if (!doc.exists) return null;

      const data = doc.data();
      return {
        id: doc.id,
        userId: data?.userId || '',
        messages: data?.messages || [],
        createdAt: data?.createdAt?.toMillis() || Date.now(),
        updatedAt: data?.updatedAt?.toMillis() || Date.now(),
      };
    } catch (error) {
      console.error('Error getting chat session:', error);
      throw error;
    }
  }

  // Ad metrics operations
  async trackAdImpression(userId: string): Promise<void> {
    try {
      await this.db.collection('adMetrics').doc(userId).set({
        impressions: firestore.FieldValue.increment(1),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Error tracking ad impression:', error);
    }
  }

  async trackAdClick(userId: string): Promise<void> {
    try {
      await this.db.collection('adMetrics').doc(userId).set({
        clicks: firestore.FieldValue.increment(1),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Error tracking ad click:', error);
    }
  }
}

export default new DatabaseService();
