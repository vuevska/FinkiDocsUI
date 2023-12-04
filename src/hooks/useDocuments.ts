import { useEffect, useState } from "react";
import axios from "../services/axios";
import { CanceledError } from "axios";

interface Document {
    id: number;
    name: string;
}
  
interface FecthDocumentsResponse {
    count: number;
    results: Document[];
}

const useDocuments = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const controller = new AbortController();

      const fetchDocuments = async () => {
        await axios
          .get<Document[]>("/documents", {signal: controller.signal})
          .then((response) => setDocuments(response.data))
          .catch((error) => {
            if (error instanceof CanceledError) return;
            setError(error.message)})
          .finally(() => setIsLoading(false));
      };
  
      fetchDocuments();
      return () => controller.abort();
    }, []);

    return { documents, isLoading, error };
}

export default useDocuments;