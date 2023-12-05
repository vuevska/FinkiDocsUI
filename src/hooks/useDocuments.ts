import { Category } from "./useCategories";
import useData from "./useData";

export interface Document {
    id: number;
    name: string;
    description: string;
}

const useDocuments = (categoryId: Category | null) => {
    const url = categoryId ? `/documents/${categoryId.id}` : "/documents";
    return useData<Document[]>(
        url,
        {},
        [categoryId?.id]
    );
  };

export default useDocuments;