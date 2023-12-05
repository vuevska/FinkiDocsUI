import {
  List,
  ListItem,
  Text,
  Box,
  Divider,
  Spinner,
  Button,
} from "@chakra-ui/react";
import useCategories, { Category } from "../hooks/useCategories";

interface Props {
  onSelectCategory: (category: Category) => void;
}

const CategoryList = ({ onSelectCategory }: Props) => {
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
              <Button variant="link" onClick={() => onSelectCategory(category)}>
                {category.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};
export default CategoryList;
