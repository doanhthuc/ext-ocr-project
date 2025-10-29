/**
 * OCR API Service
 * All OCR-related API calls
 */

import type {
  Document,
  JobStatus,
  ProcessDocumentDto,
  ProcessDocumentResponse,
  QueueStats,
  ScanResult,
  SupportedLanguage,
  UserStats,
} from '~/ocr/types';

import { apiClient } from '~shared/api/client/api-client';
import { API_PATHS } from '~shared/api/constants/api-paths';

export const ocrApiService = {
  /**
   * Process document with OCR (unified API for both new and reprocess)
   */
  processDocument: async (
    data: ProcessDocumentDto
  ): Promise<ProcessDocumentResponse> => {
    const response = await apiClient.post<ProcessDocumentResponse>(
      API_PATHS.OCR.PROCESS,
      data
    );
    return response.data;
  },

  /**
   * Get current user documents
   */
  getMyDocuments: async (limit?: number): Promise<Array<Document>> => {
    const response = await apiClient.get<Array<Document>>(API_PATHS.OCR.MY, {
      params: { limit },
    });
    return response.data;
  },

  /**
   * Get specific document by ID
   */
  getMyDocument: async (id: string): Promise<Document> => {
    const response = await apiClient.get<Document>(API_PATHS.OCR.MY_BY_ID(id));
    return response.data;
  },

  /**
   * Get latest scan result for specific document
   */
  getDocumentResult: async (id: string): Promise<ScanResult> => {
    const response = await apiClient.get<ScanResult>(API_PATHS.OCR.RESULT(id));
    return response.data;
  },

  /**
   * Get all scan results history for a document
   */
  getDocumentScanHistory: async (id: string): Promise<Array<ScanResult>> => {
    const response = await apiClient.get<Array<ScanResult>>(
      API_PATHS.OCR.HISTORY(id)
    );
    return response.data;
  },

  /**
   * Get specific scan result by ID
   */
  getScanResultById: async (
    id: string,
    resultId: string
  ): Promise<ScanResult> => {
    const response = await apiClient.get<ScanResult>(
      API_PATHS.OCR.RESULT_BY_ID(id, resultId)
    );
    return response.data;
  },

  /**
   * Delete document and its scan result
   */
  deleteDocument: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(
      API_PATHS.OCR.MY_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Get AI processing queue statistics
   */
  getQueueStats: async (): Promise<QueueStats> => {
    const response = await apiClient.get<QueueStats>(API_PATHS.OCR.QUEUE_STATS);
    return response.data;
  },

  /**
   * Get specific job status
   */
  getJobStatus: async (jobId: string): Promise<JobStatus> => {
    const response = await apiClient.get<JobStatus>(
      API_PATHS.OCR.JOB_STATUS(jobId)
    );
    return response.data;
  },

  /**
   * Get user processing statistics
   */
  getUserStats: async (): Promise<UserStats> => {
    const response = await apiClient.get<UserStats>(API_PATHS.OCR.MY_STATS);
    return response.data;
  },

  /**
   * Get supported languages for translation
   */
  getSupportedLanguages: async (): Promise<Array<SupportedLanguage>> => {
    const response = await apiClient.get<Array<SupportedLanguage>>(
      API_PATHS.OCR.SUPPORTED_LANGUAGES
    );
    return response.data;
  },
};
