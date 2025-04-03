// Types for the worker
interface EvaluationRequest {
  code: string;
  language: string;
}

interface EvaluationResponse {
  issues: Array<{
    type: string;
    message: string;
    line?: number | null;
  }>;
  error?: string;
}

// Mock API endpoint (replace with actual API endpoint later)
const API_ENDPOINT = 'https://api.example.com/evaluate';

// Mock evaluation logic (replace with actual API call later)
const mockEvaluateCode = async (code: string, language: string): Promise<EvaluationResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock response based on language
  switch (language) {
    case 'javascript':
      return {
        issues: [
          {
            type: "Style",
            message: "Consider using const instead of let",
            line: 1
          },
          {
            type: "Grammar",
            message: "Missing semicolons",
            line: 3
          },
          {
            type: "Best Practice",
            message: "Remove unused variable",
            line: 8
          }
        ]
      };
    case 'python':
      return {
        issues: [
          {
            type: "Style",
            message: "Use snake_case for variable names",
            line: 1
          },
          {
            type: "Grammar",
            message: "Missing type hints",
            line: 1
          }
        ]
      };
    case 'cpp':
      return {
        issues: [
          {
            type: "Style",
            message: "Use constexpr for compile-time constants",
            line: 1
          },
          {
            type: "Best Practice",
            message: "Consider using std::accumulate",
            line: 3
          }
        ]
      };
    default:
      return {
        issues: [
          {
            type: "Style",
            message: "Code formatting could be improved",
            line: 1
          }
        ]
      };
  }
};

// Handle messages from the main thread
self.onmessage = async (event: MessageEvent<EvaluationRequest>) => {
  const { code, language } = event.data;

  try {
    // In the future, replace this with actual API call
    const result = await mockEvaluateCode(code, language);
    self.postMessage({ type: 'success', data: result });
  } catch (error) {
    self.postMessage({
      type: 'error',
      data: {
        error: error instanceof Error ? error.message : 'An unknown error occurred'
      }
    });
  }
};

// Export for TypeScript
export {}; 