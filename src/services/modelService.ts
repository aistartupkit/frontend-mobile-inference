import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { AIModel } from '../types';

class ModelService {
  private readonly MODELS_KEY = '@ai_models';
  private readonly MODELS_DIR = `${RNFS.DocumentDirectoryPath}/models`;

  // Available models for download
  private availableModels: AIModel[] = [
    {
      id: 'phi-2',
      name: 'Phi-2',
      description: 'Lightweight AI model optimized for mobile inference',
      size: 2700000000, // ~2.7GB
      downloadUrl: 'https://example.com/models/phi-2.onnx',
      isDownloaded: false,
    },
    {
      id: 'tinyllama',
      name: 'TinyLlama',
      description: 'Ultra-compact language model for on-device AI',
      size: 1100000000, // ~1.1GB
      downloadUrl: 'https://example.com/models/tinyllama.onnx',
      isDownloaded: false,
    },
  ];

  async initialize(): Promise<void> {
    try {
      // Create models directory if it doesn't exist
      const dirExists = await RNFS.exists(this.MODELS_DIR);
      if (!dirExists) {
        await RNFS.mkdir(this.MODELS_DIR);
      }
    } catch (error) {
      console.error('Error initializing model service:', error);
    }
  }

  async getAvailableModels(): Promise<AIModel[]> {
    try {
      // Load cached model info
      const cachedModels = await AsyncStorage.getItem(this.MODELS_KEY);
      if (cachedModels) {
        return JSON.parse(cachedModels);
      }
      return this.availableModels;
    } catch (error) {
      console.error('Error getting available models:', error);
      return this.availableModels;
    }
  }

  async downloadModel(
    model: AIModel,
    onProgress?: (progress: number) => void
  ): Promise<AIModel> {
    try {
      const localPath = `${this.MODELS_DIR}/${model.id}.onnx`;
      
      // Download the model
      const downloadResult = await RNFS.downloadFile({
        fromUrl: model.downloadUrl,
        toFile: localPath,
        progress: (res) => {
          const progress = (res.bytesWritten / res.contentLength) * 100;
          onProgress?.(progress);
        },
      }).promise;

      if (downloadResult.statusCode === 200) {
        const updatedModel: AIModel = {
          ...model,
          localPath,
          isDownloaded: true,
          downloadProgress: 100,
        };

        // Update cache
        await this.saveModelInfo(updatedModel);
        
        return updatedModel;
      } else {
        throw new Error(`Download failed with status ${downloadResult.statusCode}`);
      }
    } catch (error) {
      console.error('Error downloading model:', error);
      throw error;
    }
  }

  async deleteModel(modelId: string): Promise<void> {
    try {
      const localPath = `${this.MODELS_DIR}/${modelId}.onnx`;
      const exists = await RNFS.exists(localPath);
      
      if (exists) {
        await RNFS.unlink(localPath);
      }

      // Update cache
      const models = await this.getAvailableModels();
      const updatedModels = models.map(m => 
        m.id === modelId 
          ? { ...m, isDownloaded: false, localPath: undefined } 
          : m
      );
      await AsyncStorage.setItem(this.MODELS_KEY, JSON.stringify(updatedModels));
    } catch (error) {
      console.error('Error deleting model:', error);
      throw error;
    }
  }

  async getModelPath(modelId: string): Promise<string | null> {
    try {
      const models = await this.getAvailableModels();
      const model = models.find(m => m.id === modelId);
      return model?.localPath || null;
    } catch (error) {
      console.error('Error getting model path:', error);
      return null;
    }
  }

  private async saveModelInfo(model: AIModel): Promise<void> {
    try {
      const models = await this.getAvailableModels();
      const updatedModels = models.map(m => 
        m.id === model.id ? model : m
      );
      await AsyncStorage.setItem(this.MODELS_KEY, JSON.stringify(updatedModels));
    } catch (error) {
      console.error('Error saving model info:', error);
    }
  }
}

export default new ModelService();
