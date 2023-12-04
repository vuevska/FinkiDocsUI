import { useState, useEffect } from "react";
import axios from "../services/axios";
import { Text } from "@chakra-ui/react";

interface Document {
  id: number;
  name: string;
}

interface FecthDocumentsResponse {
  count: number;
  results: Document[];
}

const DocumentsGrid = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      await axios
        .get<Document[]>("/documents")
        .then((response) => setDocuments(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    };

    fetchDocuments();
  }, []);

  return (
    <>
      {isLoading && <Text>{isLoading}</Text>}
      {error && <Text>{error}</Text>}
      <h2>Документи</h2>
      <ul>
        {documents?.map((document) => (
          <li key={document.id}>{document.name}</li>
        ))}
      </ul>
    </>
  );
};

export default DocumentsGrid;
