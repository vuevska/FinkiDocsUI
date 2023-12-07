import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import DocumentsTable from "./components/DocumentsTable";
import { useState } from "react";
import { Category } from "./hooks/useCategories";
import DocumentHeading from "./components/DocumentHeading";

export interface DocumentQuery {
  category: Category | null;
  searchText: string;
}

function App() {
  const [documentQuery, setDocumentQuery] = useState<DocumentQuery>(
    {} as DocumentQuery
  );

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"nav nav nav" "aside main main" "footer footer footer"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "300px 1fr",
      }}
    >
      <GridItem area="nav" marginTop={3}>
        <NavBar
          onSearch={(searchText) =>
            setDocumentQuery({ ...documentQuery, searchText })
          }
        ></NavBar>
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
