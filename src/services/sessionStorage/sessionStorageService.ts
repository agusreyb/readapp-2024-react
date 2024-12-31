export const sessionStorageService = {
    setItem: (key: string, value: string) => {
      sessionStorage.setItem(key, value);
    },
  
    getItem: (key: string): string | null => {
      return sessionStorage.getItem(key);
    },
  
    removeItem: (key: string) => {
      sessionStorage.removeItem(key);
    }
  };
  