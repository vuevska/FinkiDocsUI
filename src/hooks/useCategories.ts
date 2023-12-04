import useData from "./useData";

export interface Category {
    id: number;
    name: string;
    description: string;
  }

const useCategories = () => useData<Category>("/categories");

export default useCategories;