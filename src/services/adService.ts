import mobileAds, {
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';
import databaseService from './databaseService';

class AdService {
  private interstitialAd: InterstitialAd | null = null;
  private adUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyy';
  private lastAdShown: number = 0;
  private adFrequencyMinutes = 5; // Show ad every 5 minutes
  private userId: string | null = null;

  async initialize(userId: string): Promise<void> {
    try {
      this.userId = userId;
      
      // Initialize Mobile Ads SDK
      await mobileAds().initialize();
      
      // Create and load interstitial ad
      this.loadInterstitialAd();
      
      console.log('Ad service initialized');
    } catch (error) {
      console.error('Error initializing ads:', error);
    }
  }

  private loadInterstitialAd(): void {
    try {
      this.interstitialAd = InterstitialAd.createForAdRequest(this.adUnitId, {
        requestNonPersonalizedAdsOnly: true,
      });

      // Event listeners
      this.interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
        console.log('Interstitial ad loaded');
      });

      this.interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
        console.log('Interstitial ad closed');
        // Load next ad
        this.loadInterstitialAd();
      });

      this.interstitialAd.addAdEventListener(AdEventType.CLICKED, () => {
        console.log('Interstitial ad clicked');
        if (this.userId) {
          databaseService.trackAdClick(this.userId);
        }
      });

      // Load the ad
      this.interstitialAd.load();
    } catch (error) {
      console.error('Error loading interstitial ad:', error);
    }
  }

  async showInterstitialAd(): Promise<boolean> {
    try {
      // Check if enough time has passed since last ad
      const now = Date.now();
      const timeSinceLastAd = now - this.lastAdShown;
      const minTimeBetweenAds = this.adFrequencyMinutes * 60 * 1000;

      if (timeSinceLastAd < minTimeBetweenAds) {
        console.log('Not showing ad - too soon since last ad');
        return false;
      }

      if (!this.interstitialAd) {
        console.log('No interstitial ad available');
        return false;
      }

      const loaded = this.interstitialAd.loaded;
      if (!loaded) {
        console.log('Interstitial ad not loaded yet');
        return false;
      }

      // Show the ad
      await this.interstitialAd.show();
      this.lastAdShown = now;

      // Track impression
      if (this.userId) {
        await databaseService.trackAdImpression(this.userId);
      }

      return true;
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      return false;
    }
  }

  shouldShowAd(): boolean {
    const now = Date.now();
    const timeSinceLastAd = now - this.lastAdShown;
    const minTimeBetweenAds = this.adFrequencyMinutes * 60 * 1000;
    return timeSinceLastAd >= minTimeBetweenAds;
  }

  setAdFrequency(minutes: number): void {
    this.adFrequencyMinutes = minutes;
  }
}

export default new AdService();
