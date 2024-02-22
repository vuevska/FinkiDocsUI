import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Grid,
  GridItem,
  HStack,
  Icon,
  Show,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import NavBar from "./layout/NavBar";
import CategoryList from "./layout/CategoryList";
import { useState } from "react";
import { Category } from "./hooks/useCategories";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DocumentList from "./layout/DocumentList";

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
    <Router>
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
            />
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
          <Routes>
            <Route
              path="/"
              element={<DocumentList documentQuery={documentQuery} />}
            />
            <Route
              path="/favourites"
              element={
                <DocumentList documentQuery={documentQuery} isFavorites />
              }
            />
          </Routes>
          <HStack marginLeft={10}>
            <Link
              to="/"
              style={{
                textDecoration: "underline",
                marginRight: "10px",
              }}
            >
              Сите
            </Link>
            <div>|</div>
            <Link
              to="/favourites"
              style={{
                textDecoration: "underline",
                marginLeft: "10px",
              }}
            >
              Омилени
            </Link>
          </HStack>
        </GridItem>

        <GridItem area="footer" textAlign="center">
          Footer
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
