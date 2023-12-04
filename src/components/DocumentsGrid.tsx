import { Text } from "@chakra-ui/react";
import useDocuments from "../hooks/useDocuments";

const DocumentsGrid = () => {
  const { documents, isLoading, error } = useDocuments();

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
