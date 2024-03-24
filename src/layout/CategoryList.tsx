import {
  List,
  ListItem,
  Text,
  Divider,
  Spinner,
  Button,
  VStack,
  HStack,
  Box,
  useColorMode,
  Switch,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import useCategories, { Category } from "../hooks/useCategories";
import { BiFilterAlt } from "react-icons/bi";

interface Props {
  onSelectCategory: (category: Category | null) => void;
  selectedCategory: Category | null;
  isFavoritesSelected: boolean;
  setIsFavoritesSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryList = ({
  onSelectCategory,
  selectedCategory,
  isFavoritesSelected,
  setIsFavoritesSelected,
}: Props) => {
  const { data, isLoading, error } = useCategories();
  const { colorMode } = useColorMode();
  if (isLoading) return <Spinner />;
  if (error) return null;

  const favoritesSwitchToggleButton = () => {
    setIsFavoritesSelected(!isFavoritesSelected);
  };

  return (
    <Box
      bg={colorMode === "dark" ? "gray.700" : "blue.100"}
      p={4}
      marginTop={-5}
    >
      {" "}
      <VStack>
        <HStack>
          <BiFilterAlt />
          <Text
            fontSize={18}
            fontWeight={"bold"}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Категории
          </Text>
        </HStack>
        <Divider color={"black"} />
        <List spacing={3} paddingY={5}>
          <ListItem fontSize={"lg"}>
            <Button
              whiteSpace="normal"
              textAlign="left"
              variant="link"
              textDecor={"none"}
              onClick={() => onSelectCategory(null)}
              fontWeight={"normal"}
              backgroundColor={
                colorMode == "light" && !selectedCategory
                  ? "blue.500"
                  : "" || (colorMode == "dark" && !selectedCategory)
                  ? "gray.500"
                  : ""
              }
              color={
                colorMode == "dark" && selectedCategory
                  ? "white"
                  : "black" || (colorMode == "light" && !selectedCategory)
                  ? "black"
                  : "white"
              }
              padding={2}
            >
              Сите документи
            </Button>
          </ListItem>
          {data?.map((category) => (
            <ListItem fontSize="lg" key={category.id}>
              <Button
                whiteSpace="normal"
                textAlign="left"
                variant="link"
                textDecor={"none"}
                onClick={() => onSelectCategory(category)}
                fontWeight={"normal"}
                backgroundColor={
                  colorMode == "light" && category.id === selectedCategory?.id
                    ? "blue.500"
                    : "" ||
                      (colorMode == "dark" &&
                        category.id === selectedCategory?.id)
                    ? "gray.500"
                    : ""
                }
                color={
                  colorMode == "dark" && category.id !== selectedCategory?.id
                    ? "white"
                    : "black" ||
                      (colorMode == "light" &&
                        category.id === selectedCategory?.id)
                    ? "black"
                    : "white"
                }
                padding={2}
              >
                {category.name}
              </Button>
            </ListItem>
          ))}
        </List>
        <HStack marginTop={5}>
          <BiFilterAlt />
          <Text
            fontSize={18}
            fontWeight={"bold"}
            color={colorMode === "dark" ? "white" : "black"}
          >
            Омилени
          </Text>
        </HStack>
        <Divider color={"black"} />
        <HStack spacing={3} paddingY={5}>
          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Прикажи</FormLabel>
            <Switch colorScheme="red" onChange={favoritesSwitchToggleButton} />
          </FormControl>
        </HStack>
      </VStack>
    </Box>
  );
};
export default CategoryList;
