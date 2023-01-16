class LocalStorageMock implements Storage {
  private store: {};

  constructor() {
    this.store = {};
  }

  [name: string]: any;

  length: number = 0;

  key(index: number): string | null {
    throw new Error('Method not implemented.');
  }

  clear(): void {
    this.store = {};
  }

  getItem(key: string): string | null {
    return this.store[key] || null;
  }

  setItem(key: string, value: string | number): void {
    this.store[key] = String(value);
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}

export default LocalStorageMock;
