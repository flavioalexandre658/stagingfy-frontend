import { ApiError, ApiResponse, AppError } from '@/interfaces/api-response.interface';

export function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    success: true
  };
}

export function createErrorResponse(error: Error | ApiError | unknown): ApiResponse<never> {
  let apiError: ApiError;

  if (error instanceof AppError) {
    apiError = {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details
    };
  } else if (error instanceof Error) {
    apiError = {
      message: error.message,
      code: 'UNKNOWN_ERROR'
    };
  } else {
    apiError = {
      message: 'An unexpected error occurred',
      code: 'UNKNOWN_ERROR'
    };
  }

  return {
    error: apiError,
    success: false
  };
}

export function handleApiError(error: unknown): never {
  if (error instanceof Response) {
    throw new AppError(
      'API request failed',
      'API_ERROR',
      error.status
    );
  }

  if (error instanceof Error) {
    throw new AppError(
      error.message,
      'INTERNAL_ERROR',
      500
    );
  }

  throw new AppError(
    'An unexpected error occurred',
    'UNKNOWN_ERROR',
    500
  );
} 