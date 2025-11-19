"use client";

type NProgressCallback = () => void;

interface NProgressState {
  isStarted: boolean;
  progress: number;
  callbacks: {
    start: NProgressCallback[];
    complete: NProgressCallback[];
    progress: ((progress: number) => void)[];
  };
}

class NProgressManager {
  private state: NProgressState = {
    isStarted: false,
    progress: 0,
    callbacks: {
      start: [],
      complete: [],
      progress: [],
    },
  };

  private timer: NodeJS.Timeout | null = null;
  private completeTimer: NodeJS.Timeout | null = null;

  start = () => {
    if (this.state.isStarted) return this;

    this.state.isStarted = true;
    this.state.progress = 0;

    // Notifica callbacks de start
    this.state.callbacks.start.forEach(callback => callback());

    // Simula progresso incremental
    this.incrementProgress();

    return this;
  };

  complete = () => {
    if (!this.state.isStarted) return this;

    // Limpa timers existentes
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    // Seta progresso para 100%
    this.state.progress = 100;
    this.state.callbacks.progress.forEach(callback => callback(100));

    // Depois de um delay, marca como completado
    this.completeTimer = setTimeout(() => {
      this.state.isStarted = false;
      this.state.progress = 0;
      this.state.callbacks.complete.forEach(callback => callback());
    }, 200);

    return this;
  };

  private incrementProgress = () => {
    if (!this.state.isStarted) return;

    // Incrementa progresso de forma não linear (mais rápido no início)
    const increment = Math.random() * 15 + 5;
    this.state.progress = Math.min(this.state.progress + increment, 95);

    // Notifica callbacks de progresso
    this.state.callbacks.progress.forEach(callback => callback(this.state.progress));

    // Continue incrementando até 95%
    if (this.state.progress < 95) {
      const delay = Math.random() * 200 + 100;
      this.timer = setTimeout(this.incrementProgress, delay);
    }
  };

  // Métodos para registrar callbacks
  onStart = (callback: NProgressCallback) => {
    this.state.callbacks.start.push(callback);
    return () => {
      const index = this.state.callbacks.start.indexOf(callback);
      if (index > -1) {
        this.state.callbacks.start.splice(index, 1);
      }
    };
  };

  onComplete = (callback: NProgressCallback) => {
    this.state.callbacks.complete.push(callback);
    return () => {
      const index = this.state.callbacks.complete.indexOf(callback);
      if (index > -1) {
        this.state.callbacks.complete.splice(index, 1);
      }
    };
  };

  onProgress = (callback: (progress: number) => void) => {
    this.state.callbacks.progress.push(callback);
    return () => {
      const index = this.state.callbacks.progress.indexOf(callback);
      if (index > -1) {
        this.state.callbacks.progress.splice(index, 1);
      }
    };
  };

  // Getters para estado atual
  get isStarted() {
    return this.state.isStarted;
  }

  get progress() {
    return this.state.progress;
  }

  // Cleanup
  destroy = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.completeTimer) {
      clearTimeout(this.completeTimer);
      this.completeTimer = null;
    }
    this.state.isStarted = false;
    this.state.progress = 0;
    this.state.callbacks = {
      start: [],
      complete: [],
      progress: [],
    };
  };
}

// Instância global
export const nprogress = new NProgressManager(); 