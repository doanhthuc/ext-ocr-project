/**
 * OCR Hooks
 * TanStack Query hooks for OCR operations
 */

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type { MessageResponse } from '~/auth/types';
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
import type { ApiError } from '~shared/api/client/api-client';

import { ocrApiService } from '~/ocr/services/ocr-api.service';
import { QUERY_KEYS } from '~shared/api/constants/query-keys';

/**
 * Get My Documents Query
 */
export function useMyDocuments(
  limit?: number,
  options?: UseQueryOptions<Array<Document>, ApiError>
) {
  return useQuery<Array<Document>, ApiError>({
    queryKey: QUERY_KEYS.OCR.MY(limit),
    queryFn: () => ocrApiService.getMyDocuments(limit),
    ...options,
  });
}

/**
 * Get My Document Query
 */
export function useMyDocument(
  id: string,
  options?: UseQueryOptions<Document, ApiError>
) {
  return useQuery<Document, ApiError>({
    queryKey: QUERY_KEYS.OCR.BY_ID(id),
    queryFn: () => ocrApiService.getMyDocument(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Get Document Result Query
 */
export function useDocumentResult(
  id: string,
  options?: UseQueryOptions<ScanResult, ApiError>
) {
  return useQuery<ScanResult, ApiError>({
    queryKey: QUERY_KEYS.OCR.RESULT(id),
    queryFn: () => ocrApiService.getDocumentResult(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Get Document Scan History Query
 */
export function useDocumentScanHistory(
  id: string,
  options?: UseQueryOptions<Array<ScanResult>, ApiError>
) {
  return useQuery<Array<ScanResult>, ApiError>({
    queryKey: QUERY_KEYS.OCR.HISTORY(id),
    queryFn: () => ocrApiService.getDocumentScanHistory(id),
    enabled: !!id,
    ...options,
  });
}

/**
 * Get Scan Result By ID Query
 */
export function useScanResultById(
  id: string,
  resultId: string,
  options?: UseQueryOptions<ScanResult, ApiError>
) {
  return useQuery<ScanResult, ApiError>({
    queryKey: QUERY_KEYS.OCR.RESULT_BY_ID(id, resultId),
    queryFn: () => ocrApiService.getScanResultById(id, resultId),
    enabled: !!id && !!resultId,
    ...options,
  });
}

/**
 * Get Queue Stats Query
 */
export function useQueueStats(options?: UseQueryOptions<QueueStats, ApiError>) {
  return useQuery<QueueStats, ApiError>({
    queryKey: QUERY_KEYS.OCR.QUEUE_STATS,
    queryFn: ocrApiService.getQueueStats,
    ...options,
  });
}

/**
 * Get Job Status Query
 */
export function useJobStatus(
  jobId: string,
  options?: UseQueryOptions<JobStatus, ApiError>
) {
  return useQuery<JobStatus, ApiError>({
    queryKey: QUERY_KEYS.OCR.JOB_STATUS(jobId),
    queryFn: () => ocrApiService.getJobStatus(jobId),
    enabled: !!jobId,
    ...options,
  });
}

/**
 * Get User Stats Query
 */
export function useUserStats(options?: UseQueryOptions<UserStats, ApiError>) {
  return useQuery<UserStats, ApiError>({
    queryKey: QUERY_KEYS.OCR.MY_STATS,
    queryFn: ocrApiService.getUserStats,
    ...options,
  });
}

/**
 * Get Supported Languages Query
 */
export function useSupportedLanguages(
  options?: UseQueryOptions<Array<SupportedLanguage>, ApiError>
) {
  return useQuery<Array<SupportedLanguage>, ApiError>({
    queryKey: QUERY_KEYS.OCR.SUPPORTED_LANGUAGES,
    queryFn: ocrApiService.getSupportedLanguages,
    ...options,
  });
}

/**
 * Process Document Mutation
 */
export function useProcessDocument(
  options?: UseMutationOptions<
    ProcessDocumentResponse,
    ApiError,
    ProcessDocumentDto
  >
) {
  const queryClient = useQueryClient();

  return useMutation<ProcessDocumentResponse, ApiError, ProcessDocumentDto>({
    mutationFn: ocrApiService.processDocument,
    onSuccess: () => {
      // Invalidate documents and stats queries
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OCR.ALL });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OCR.MY_STATS });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUBSCRIPTIONS.CREDITS,
      });
    },
    ...options,
  });
}

/**
 * Delete Document Mutation
 */
export function useDeleteDocument(
  options?: UseMutationOptions<MessageResponse, ApiError, string>
) {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, ApiError, string>({
    mutationFn: ocrApiService.deleteDocument,
    onSuccess: () => {
      // Invalidate documents query
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.OCR.ALL });
    },
    ...options,
  });
}
