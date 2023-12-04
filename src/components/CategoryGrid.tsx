import { useEffect, useState } from "react";
import axios from "../services/axios";
import { CanceledError } from "axios";
import { Text } from "@chakra-ui/react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface FetchCategoriessResponse {
  count: number;
  results: Category[];
}

const CategoryGrid = () => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      await axios
        .get<Category[]>("/categories")
        .then((response) => setCategories(response.data))
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    };

    fetchDocuments();
  }, []);

  return (
    <>
      {isLoading && <Text>{isLoading}</Text>}
      {error && <Text>{error}</Text>}
      <h2>Категории</h2>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
};
export default CategoryGrid;
