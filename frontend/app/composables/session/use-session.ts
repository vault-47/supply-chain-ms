const useSession = () => {
  const setSessionStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(key, value);
    }
  };

  const getSessionStorage = (key: string): string | null => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem(key);
    }
    return null;
  };

  const removeSessionStorage = (key: string) => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(key);
    }
  };
  return { setSessionStorage, getSessionStorage, removeSessionStorage };
};

export default useSession;
