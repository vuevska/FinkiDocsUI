import { List, ListItem, Text, Box, Divider, Spinner } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";

const CategoryList = () => {
  const { data, isLoading, error } = useCategories();

  if (isLoading) return <Spinner />;
  if (error) return null;

  return (
    <>
      <Box padding="10">
        <Text px="4" fontSize={20} textAlign="center">
          Категории
        </Text>
        <Divider />
        <List spacing={3} paddingY={5}>
          {data?.map((category) => (
            <ListItem fontSize="lg" key={category.id}>
              {category.name}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
export default CategoryList;
