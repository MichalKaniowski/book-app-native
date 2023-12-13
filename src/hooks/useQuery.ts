import axios from "axios";
import { useEffect, useState } from "react";

export default function useQuery<T>(
  url: string,
  initialState: T
): { data: T; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetch() {
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
    }

    fetch();
  }, []);

  return { data, isLoading, error };
}
