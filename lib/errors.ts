/**
 * Error Types and Handling
 * 
 * Centralized error definitions and handling utilities.
 * Provides structured error codes and user-friendly messages.
 * 
 * @layer Infrastructure
 */

/**
 * Error codes for different error types
 */
export enum ErrorCode {
  // Validation Errors (1000-1999)
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  REQUIRED_FIELD = 'REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  DUPLICATE_ENTRY = 'DUPLICATE_ENTRY',
  
  // Storage Errors (2000-2999)
  STORAGE_ERROR = 'STORAGE_ERROR',
  STORAGE_QUOTA_EXCEEDED = 'STORAGE_QUOTA_EXCEEDED',
  STORAGE_NOT_AVAILABLE = 'STORAGE_NOT_AVAILABLE',
  
  // Data Errors (3000-3999)
  NOT_FOUND = 'NOT_FOUND',
  DATA_CORRUPTION = 'DATA_CORRUPTION',
  PARSE_ERROR = 'PARSE_ERROR',
  
  // Business Logic Errors (4000-4999)
  BUSINESS_RULE_VIOLATION = 'BUSINESS_RULE_VIOLATION',
  INVALID_STATE = 'INVALID_STATE',
  OPERATION_NOT_ALLOWED = 'OPERATION_NOT_ALLOWED',
  
  // System Errors (5000-5999)
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
}

/**
 * Severity levels for errors
 */
export enum ErrorSeverity {
  LOW = 'LOW',       // Minor issues, user can continue
  MEDIUM = 'MEDIUM', // Important issues, some functionality affected
  HIGH = 'HIGH',     // Critical issues, major functionality broken
  CRITICAL = 'CRITICAL', // System-breaking issues
}

/**
 * Custom application error class
 */
export class AppError extends Error {
  public readonly code: ErrorCode
  public readonly severity: ErrorSeverity
  public readonly userMessage: string
  public readonly technicalDetails?: any
  public readonly timestamp: string

  constructor(
    code: ErrorCode,
    message: string,
    userMessage: string,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    technicalDetails?: any
  ) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.severity = severity
    this.userMessage = userMessage
    this.technicalDetails = technicalDetails
    this.timestamp = new Date().toISOString()

    // Maintains proper stack trace for where error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }

  /**
   * Convert error to JSON for logging
   */
  toJSON() {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      userMessage: this.userMessage,
      severity: this.severity,
      timestamp: this.timestamp,
      technicalDetails: this.technicalDetails,
      stack: this.stack,
    }
  }
}

/**
 * Validation error
 */
export class ValidationError extends AppError {
  constructor(message: string, field?: string) {
    super(
      ErrorCode.VALIDATION_ERROR,
      message,
      message, // User message same as technical message for validation
      ErrorSeverity.LOW,
      { field }
    )
    this.name = 'ValidationError'
  }
}

/**
 * Not found error
 */
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id 
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`
    
    super(
      ErrorCode.NOT_FOUND,
      message,
      `The requested ${resource.toLowerCase()} could not be found.`,
      ErrorSeverity.MEDIUM,
      { resource, id }
    )
    this.name = 'NotFoundError'
  }
}

/**
 * Storage error
 */
export class StorageError extends AppError {
  constructor(operation: string, details?: any) {
    super(
      ErrorCode.STORAGE_ERROR,
      `Storage operation failed: ${operation}`,
      'Unable to save your data. Please try again.',
      ErrorSeverity.HIGH,
      { operation, ...details }
    )
    this.name = 'StorageError'
  }
}

/**
 * Error handler utility
 */
export const errorHandler = {
  /**
   * Handle and format error for user display
   */
  getUserMessage: (error: unknown): string => {
    if (error instanceof AppError) {
      return error.userMessage
    }
    
    if (error instanceof Error) {
      return error.message
    }
    
    return 'An unexpected error occurred. Please try again.'
  },

  /**
   * Check if error is a specific type
   */
  isErrorCode: (error: unknown, code: ErrorCode): boolean => {
    return error instanceof AppError && error.code === code
  },

  /**
   * Convert unknown error to AppError
   */
  normalize: (error: unknown): AppError => {
    if (error instanceof AppError) {
      return error
    }
    
    if (error instanceof Error) {
      return new AppError(
        ErrorCode.UNKNOWN_ERROR,
        error.message,
        'An unexpected error occurred.',
        ErrorSeverity.MEDIUM,
        { originalError: error.name }
      )
    }
    
    return new AppError(
      ErrorCode.UNKNOWN_ERROR,
      String(error),
      'An unexpected error occurred.',
      ErrorSeverity.MEDIUM
    )
  },
}

