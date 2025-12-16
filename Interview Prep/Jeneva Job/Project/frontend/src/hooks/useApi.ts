import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(apiFunction: () => Promise<T>, dependencies: any[] = []) {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const result = await apiFunction();
      setState({ data: result, loading: false, error: null });
    } catch (error: any) {
      setState({ data: null, loading: false, error: error.message || 'An error occurred' });
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
