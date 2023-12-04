import { useEffect, useState } from "react";
import axios from "../services/axios";
import { CanceledError } from "axios";

interface Category {
    id: number;
    name: string;
    description: string;
  }
  
  interface FetchCategoriessResponse {
    count: number;
    results: Category[];
  }

const useCategories = () => {
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const controller = new AbortController();
      const fetchDocuments = async () => {

        await axios
          .get<Category[]>("/categories", {signal: controller.signal})
          .then((response) => setCategories(response.data))
          .catch((error) => {
            if (error instanceof CanceledError) return;
            setError(error.message)})
          .finally(() => setIsLoading(false));
      };
  
      fetchDocuments();
      return () => controller.abort();
    }, []);

    return {categories, isLoading, error};
}

export default useCategories;