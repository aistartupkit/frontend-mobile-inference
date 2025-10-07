import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AIModel } from '../types';
import modelService from '../services/modelService';
import inferenceService from '../services/inferenceService';

export default function ModelsScreen() {
  const [models, setModels] = useState<AIModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [downloadingModel, setDownloadingModel] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    loadModels();
    modelService.initialize();
  }, []);

  const loadModels = async () => {
    setLoading(true);
    try {
      const availableModels = await modelService.getAvailableModels();
      setModels(availableModels);
    } catch (error) {
      console.error('Error loading models:', error);
      Alert.alert('Error', 'Failed to load models');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (model: AIModel) => {
    Alert.alert(
      'Download Model',
      `Download ${model.name} (${formatSize(model.size)})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Download',
          onPress: async () => {
            setDownloadingModel(model.id);
            try {
              const updatedModel = await modelService.downloadModel(
                model,
                (progress) => {
                  setDownloadProgress(prev => ({
                    ...prev,
                    [model.id]: progress,
                  }));
                }
              );

              // Update models list
              setModels(prev =>
                prev.map(m => (m.id === model.id ? updatedModel : m))
              );

              Alert.alert('Success', 'Model downloaded successfully!');
            } catch (error) {
              console.error('Error downloading model:', error);
              Alert.alert('Error', 'Failed to download model');
            } finally {
              setDownloadingModel(null);
              setDownloadProgress(prev => {
                const newProgress = { ...prev };
                delete newProgress[model.id];
                return newProgress;
              });
            }
          },
        },
      ]
    );
  };

  const handleDelete = async (model: AIModel) => {
    Alert.alert(
      'Delete Model',
      `Delete ${model.name} from your device?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await modelService.deleteModel(model.id);
              setModels(prev =>
                prev.map(m =>
                  m.id === model.id
                    ? { ...m, isDownloaded: false, localPath: undefined }
                    : m
                )
              );
              Alert.alert('Success', 'Model deleted successfully!');
            } catch (error) {
              console.error('Error deleting model:', error);
              Alert.alert('Error', 'Failed to delete model');
            }
          },
        },
      ]
    );
  };

  const handleLoadModel = async (model: AIModel) => {
    if (!model.localPath) return;

    try {
      await inferenceService.initialize(model.localPath);
      Alert.alert('Success', `${model.name} is now active for inference!`);
    } catch (error) {
      console.error('Error loading model:', error);
      Alert.alert('Error', 'Failed to load model for inference');
    }
  };

  const formatSize = (bytes: number): string => {
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(2)} GB`;
  };

  const renderModel = ({ item }: { item: AIModel }) => {
    const isDownloading = downloadingModel === item.id;
    const progress = downloadProgress[item.id];

    return (
      <View style={styles.modelCard}>
        <View style={styles.modelHeader}>
          <Icon
            name={item.isDownloaded ? 'checkmark-circle' : 'cloud-download-outline'}
            size={32}
            color={item.isDownloaded ? '#4CAF50' : '#007AFF'}
          />
          <View style={styles.modelInfo}>
            <Text style={styles.modelName}>{item.name}</Text>
            <Text style={styles.modelDescription}>{item.description}</Text>
            <Text style={styles.modelSize}>{formatSize(item.size)}</Text>
          </View>
        </View>

        {isDownloading && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress || 0}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{Math.round(progress || 0)}%</Text>
          </View>
        )}

        <View style={styles.modelActions}>
          {item.isDownloaded ? (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.useButton]}
                onPress={() => handleLoadModel(item)}
              >
                <Text style={styles.actionButtonText}>Use Model</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleDelete(item)}
              >
                <Text style={styles.actionButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[styles.actionButton, styles.downloadButton]}
              onPress={() => handleDownload(item)}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.actionButtonText}>Download</Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading models...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Models</Text>
        <TouchableOpacity onPress={loadModels}>
          <Icon name="refresh-outline" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={models}
        keyExtractor={item => item.id}
        renderItem={renderModel}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="download-outline" size={64} color="#ccc" />
            <Text style={styles.emptyStateText}>No models available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
  modelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modelHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  modelInfo: {
    flex: 1,
    marginLeft: 12,
  },
  modelName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modelDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  modelSize: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  modelActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
  },
  useButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
});
