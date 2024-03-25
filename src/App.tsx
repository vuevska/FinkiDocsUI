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
  Spinner,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import NavBar from "./layout/NavBar";
import CategoryList from "./layout/CategoryList";
import { Category } from "./hooks/useCategories";
import { HamburgerIcon } from "@chakra-ui/icons";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import DocumentList from "./layout/DocumentList";
import Footer from "./layout/Footer";
import { useEffect, useState } from "react";
import glavnaFunkcija from "./services/glavnaFunkcija";
import { Document } from "./hooks/useDocuments";

export interface DocumentFilters {
  filterCategory: Category | null;
  filterText: string;
}

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [documents, setDocuments] = useState<Document[]>([]);
  const [isFavoritesSelected, setIsFavoritesSelected] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [documentFilters, setDocumentFilters] = useState<DocumentFilters>({
    filterCategory: null,
    filterText: "",
  });

  const refreshDokumenti = async (
    isFavoritesSelected: boolean,
    documentFilters: DocumentFilters
  ) => {
    try {
      const rezultat = await glavnaFunkcija(
        isFavoritesSelected,
        documentFilters
      );

      console.log("podatoci", rezultat?.data);

      setDocuments(rezultat?.data ?? []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshDokumenti(isFavoritesSelected, documentFilters);
  }, [isFavoritesSelected, documentFilters]);

  if (isLoading) return <Spinner />;
  if (error) return <Text>{error}</Text>;

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
                      isFavoritesSelected={isFavoritesSelected}
                      setIsFavoritesSelected={setIsFavoritesSelected}
                      selectedCategory={documentFilters.filterCategory}
                      onSelectCategory={(category) =>
                        setDocumentFilters({
                          ...documentFilters,
                          filterCategory: category,
                        })
                      }
                    ></CategoryList>
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </Show>

            <NavBar
              onSearch={(searchText) =>
                setDocumentFilters({
                  ...documentFilters,
                  filterText: searchText,
                })
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
              isFavoritesSelected={isFavoritesSelected}
              setIsFavoritesSelected={setIsFavoritesSelected}
              selectedCategory={documentFilters.filterCategory}
              onSelectCategory={(category) =>
                setDocumentFilters({
                  ...documentFilters,
                  filterCategory: category,
                })
              }
            />
          </GridItem>
        </Show>

        <GridItem area="main" margin={5} borderRadius={10}>
          <DocumentList
            documents={documents}
            setDocuments={setDocuments}
            isFavoritesSelected={isFavoritesSelected}
            documentFilters={documentFilters}
            onSearch={(filter) =>
              setDocumentFilters({
                ...documentFilters,
                filterText: filter,
              })
            }
          />
        </GridItem>

        <GridItem area="footer" textAlign="center">
          <Footer />
        </GridItem>
      </Grid>
    </Router>
  );
}

export default App;
