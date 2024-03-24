import { DocumentFilters } from "../App";
import useData from "./useData";

export interface Document {
  id: number;
  name: string;
  description: string;
  categoryId: number;
}

const useDocuments = (documentQuery: DocumentFilters) => {
  const url = documentQuery.filterCategory?.id
    ? `/documents/${documentQuery.filterCategory?.id}`
    : "/documents";
  return useData<Document>(
    url,
    {
      params: {
        // category: documentQuery.category?.id,
        searchText: documentQuery.filterText,
      },
    },
    [documentQuery]
  );
};

export default useDocuments;
