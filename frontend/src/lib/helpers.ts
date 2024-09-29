import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
/**
 * Type guard to check if the given error is a `FetchBaseQueryError`.
 * @param error - The error object to check.
 * @returns `true` if the error is a `FetchBaseQueryError`, otherwise `false`.
 */
export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type guard to check if the given error is a custom API error.
 * @param error - The error object to check.
 * @returns `true` if the error is an object that matches the expected shape of a custom API error, otherwise `false`.
 */
export function isApiError(
  error: unknown,
): error is { data: { error: string; message: string; statusCode: number } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "object" &&
    (error as { data: { statusCode?: unknown } }).data?.statusCode !==
      undefined &&
    typeof (error as { data: { statusCode?: unknown } }).data?.statusCode ===
      "number"
  );
}

// this function (extractErrorMessage) could have more descriptive name

/**
 * Extracts a user-friendly error message from various error types (RTK Query errors or custom API errors).
 * @param error - The error object to extract a message from.
 * @returns A string containing a descriptive error message.
 */
export function extractErrorMessage(error: unknown) {
  // this function could have more descriptive name
  let errorMessage = "Something went wrong. Please try again.";

  if (isApiError(error)) {
    errorMessage = error.data.message;
  } else if (isFetchBaseQueryError(error)) {
    errorMessage = `Server error: ${error.status}`;
  }

  return errorMessage;
}
