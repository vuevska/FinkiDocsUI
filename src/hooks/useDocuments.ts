import { DocumentQuery } from "../App";
import { Category } from "./useCategories";
import useData from "./useData";

export interface Document {
    id: number;
    name: string;
    description: string;
}

const useDocuments = (documentQuery : DocumentQuery) => {
    const url = documentQuery.category?.id ? `/documents/${documentQuery.category?.id}` : "/documents";
    return useData<Document>(
        url,
        {
            params: {
//                category: documentQuery.category?.id,
                searchText: documentQuery.searchText
            }
        },
        [documentQuery]
    );
  };

export default useDocuments;