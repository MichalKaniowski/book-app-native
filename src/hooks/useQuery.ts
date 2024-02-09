import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useQuery<T>(
  url: string,
  initialState: T
): {
  data: T;
  isLoading: boolean;
  error: Error | null;
  refetch: (url: string) => void;
} {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(
    async (url: string) => {
      setError(null);
      setIsLoading(true);

      try {
        const res = await axios({ url: url, method: "GET" });
        setData(res.data);
      } catch (error) {
        console.log(error);
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
}
