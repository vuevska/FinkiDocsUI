import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import DocumentsTable from "./components/DocumentsTable";
import { useState } from "react";
import { Category } from "./hooks/useCategories";

function App() {
  // it is initially null, meaning no category is selected
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav nav" "aside main main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "350px 1fr",
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <CategoryList
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </GridItem>
      </Show>

      <GridItem area="main">
        <DocumentsTable selectedCategory={selectedCategory} />
      </GridItem>
    </Grid>
  );
}

export default App;
