import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  Icon,
  Show,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import DocumentsTable from "./components/DocumentsTable";
import { useState } from "react";
import { Category } from "./hooks/useCategories";
import DocumentHeading from "./components/DocumentHeading";
import { HamburgerIcon } from "@chakra-ui/icons";

export interface DocumentQuery {
  category: Category | null;
  searchText: string;
}

function App() {
  const [documentQuery, setDocumentQuery] = useState<DocumentQuery>(
    {} as DocumentQuery
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"nav nav nav"
             "aside main main"
             "footer footer footer"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <GridItem area="nav" marginTop={3}>
        <HStack>
          <Show below="lg">
            <Icon as={HamburgerIcon} onClick={onOpen} marginLeft={5} />
            <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody paddingTop={5}>
                  <CategoryList
                    selectedCategory={documentQuery.category}
                    onSelectCategory={(category) =>
                      setDocumentQuery({ ...documentQuery, category })
                    }
                  ></CategoryList>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Show>

          <NavBar
            onSearch={(searchText) =>
              setDocumentQuery({ ...documentQuery, searchText })
            }
          ></NavBar>
        </HStack>
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          margin={5}
          padding={10}
          border={1}
          borderRadius={10}
          borderColor="black.300"
        >
          <CategoryList
            selectedCategory={documentQuery.category}
            onSelectCategory={(category) =>
              setDocumentQuery({ ...documentQuery, category })
            }
          />
        </GridItem>
      </Show>

      <GridItem area="main" margin={5} borderRadius={10}>
        <DocumentHeading documentQuery={documentQuery}></DocumentHeading>
        <DocumentsTable documentQuery={documentQuery} />
      </GridItem>

      <GridItem area="footer" textAlign="center">
        Footer
      </GridItem>
    </Grid>
  );
}

export default App;
