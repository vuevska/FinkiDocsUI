import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CategoryList from "./components/CategoryList";
import DocumentsGrid from "./components/DocumentsGrid";

function App() {
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
          <CategoryList />
        </GridItem>
      </Show>

      <GridItem area="main">
        <DocumentsGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
