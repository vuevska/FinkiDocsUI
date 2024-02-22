import {
  List,
  ListItem,
  Text,
  Divider,
  Spinner,
  Button,
  VStack,
} from "@chakra-ui/react";
import useCategories, { Category } from "../hooks/useCategories";

interface Props {
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category | null;
}

const CategoryList = ({ onSelectCategory, selectedCategory }: Props) => {
  const { data, isLoading, error } = useCategories();

  if (isLoading) return <Spinner />;
  if (error) return null;

  return (
    <>
      <VStack>
        <Text px="4" fontSize={20} textAlign="center">
          Категории
        </Text>
        <Divider />
        <List spacing={3} paddingY={5}>
          {data?.map((category) => (
            <ListItem fontSize="lg" key={category.id}>
              <Button
                whiteSpace="normal"
                textAlign="left"
                variant="link"
                onClick={() => onSelectCategory(category)}
                fontWeight={
                  category.id === selectedCategory?.id ? "bold" : "normal"
                }
              >
                {category.name}
              </Button>
            </ListItem>
          ))}
        </List>
      </VStack>
    </>
  );
};
export default CategoryList;
