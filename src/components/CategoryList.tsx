import { Text } from "@chakra-ui/react";
import useCategories, { Category } from "../hooks/useCategories";

const CategoryList = () => {
  const { data, isLoading, error } = useCategories();

  return (
    <>
      {isLoading && <Text>{isLoading}</Text>}
      {error && <Text>{error}</Text>}
      <ul>
        {data?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </>
  );
};
export default CategoryList;
