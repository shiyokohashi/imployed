const CONNECTION_ERROR_CODES = new Set([
  "ECONNREFUSED",
  "ECONNRESET",
  "ETIMEDOUT",
  "ENOTFOUND",
  "EAI_AGAIN",
]);

export function isDbConnectionError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const code =
    "code" in error && typeof error.code === "string" ? error.code : undefined;

  if (code && (CONNECTION_ERROR_CODES.has(code) || code === "P1017")) {
    return true;
  }

  const message =
    "message" in error && typeof error.message === "string" ? error.message : "";

  return (
    message.includes("ECONNREFUSED") ||
    message.includes("Can't reach database server") ||
    message.includes("Connection terminated") ||
    message.includes("connection timeout") ||
    message.includes("ConnectionClosed") ||
    message.includes("Server has closed the connection")
  );
}

export async function withDbRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (!isDbConnectionError(error) || attempt === retries - 1) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }

  throw lastError;
}
