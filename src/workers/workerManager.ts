// Worker types
export interface WorkerMessage<T = any> {
  type: 'success' | 'error';
  data: T;
}

export interface EvaluationRequest {
  code: string;
  language: string;
}

export interface EvaluationResponse {
  issues: Array<{
    type: string;
    message: string;
    line?: number | null;
  }>;
  error?: string;
}

class WorkerManager {
  private workers: Map<string, Worker> = new Map();

  constructor() {
    // Initialize workers
    this.initializeWorkers();
  }

  private initializeWorkers() {
    // Create evaluation worker
    const evaluationWorker = new Worker(
      new URL('./evaluation.worker.ts', import.meta.url),
      { type: 'module' }
    );
    this.workers.set('evaluation', evaluationWorker);
  }

  public async evaluateCode(code: string, language: string): Promise<EvaluationResponse> {
    return new Promise((resolve, reject) => {
      const worker = this.workers.get('evaluation');
      if (!worker) {
        reject(new Error('Evaluation worker not initialized'));
        return;
      }

      const messageHandler = (event: MessageEvent<WorkerMessage<EvaluationResponse>>) => {
        const { type, data } = event.data;
        
        if (type === 'success') {
          resolve(data);
        } else {
          reject(new Error(data.error || 'Evaluation failed'));
        }

        // Clean up
        worker.removeEventListener('message', messageHandler);
      };

      worker.addEventListener('message', messageHandler);
      worker.postMessage({ code, language });
    });
  }

  public terminate() {
    // Terminate all workers
    this.workers.forEach(worker => worker.terminate());
    this.workers.clear();
  }
}

// Create singleton instance
export const workerManager = new WorkerManager(); 