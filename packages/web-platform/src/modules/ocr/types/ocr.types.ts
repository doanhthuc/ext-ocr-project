/**
 * OCR API Types
 */

// Import common types that OCR depends on

// ============================================================================
// OCR DTOs (Request Types)
// ============================================================================

export type ProcessDocumentDto = {
  filePath: string;
  target_language?: string;
  fields_pairs?: string;
};

// ============================================================================
// OCR Responses
// ============================================================================

export type ProcessDocumentResponse = {
  success: boolean;
  documentId: string;
  jobId: string;
  message: string;
  scanType: string;
  status: string;
};

export type BoundingBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
};

export type ScanResult = {
  id: string;
  extractedText: string;
  translatedText?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
  confidence: number;
  boundingBoxes?: Array<BoundingBox>;
  extractedFields?: Record<string, string>;
  createdAt: string;
};

export type Document = {
  id: string;
  originalName: string;
  filePath: string;
  scanType: string;
  status: string;
  progress: number;
  createdAt: string;
  completedAt?: string;
  failedAt?: string;
  errorMessage?: string;
  scanResult?: ScanResult;
};

export type QueueStats = {
  waiting: number;
  active: number;
  completed: number;
  failed: number;
  delayed: number;
  total: number;
};

export type JobStatus = {
  id: string;
  status: string;
  progress: number;
  data: Record<string, unknown>;
  returnvalue?: unknown;
  failedReason?: string;
};

export type UserStats = {
  total: number;
  completed: number;
  processing: number;
  failed: number;
};

export type SupportedLanguage = {
  code: string;
  name: string;
};

export type ProcessingEvent = {
  documentId: string;
  progress: number;
  status: string;
  message: string;
};
