import { useEffect, useState } from "react";
import axios from "../services/axios";
import { AxiosRequestConfig, CanceledError } from "axios";


const useData = <T>(endpoint: string, requestConfig?: AxiosRequestConfig, dependencies?: any[]) => {
    const [data, setData] = useState<T[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const controller = new AbortController();
      const fetchData = async () => {

        await axios
          .get<T[]>(endpoint, { signal: controller.signal, ...requestConfig })
          .then((response) => setData(response.data))
          .catch((error) => {
            if (error instanceof CanceledError) return;
            setError(error.message)})
          .finally(() => setIsLoading(false));
      };
  
      fetchData();
      return () => controller.abort();
    }, dependencies ? [...dependencies] : []);

    return { data, isLoading, error };
}

export default useData;