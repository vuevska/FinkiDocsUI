import { Text } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";

const CategoryGrid = () => {
  const { categories, isLoading, error } = useCategories();

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
