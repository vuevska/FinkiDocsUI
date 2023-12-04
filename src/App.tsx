import { Button, ButtonGroup, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import CategoryGrid from "./components/CategoryGrid";
import DocumentsGrid from "./components/DocumentsGrid";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav nav" "aside main main"`,
      }}
    >
      <GridItem area="nav">
        <NavBar></NavBar>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
          <CategoryGrid />
        </GridItem>
      </Show>

      <GridItem area="main">
        <DocumentsGrid />
      </GridItem>
    </Grid>
  );
}

export default App;
