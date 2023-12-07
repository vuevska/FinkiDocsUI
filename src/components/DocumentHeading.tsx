import { Divider, Heading } from "@chakra-ui/react";
import { DocumentQuery } from "../App";

interface Props {
  documentQuery: DocumentQuery;
}

const DocumentHeading = ({ documentQuery }: Props) => {
  let heading: string = "Документи";
  if (documentQuery.category?.name) {
    heading = `Документи за ${documentQuery.category?.name || ""}`;
  }
  return (
    <Heading fontSize={25} marginTop={10} marginLeft={10}>
      {heading}
    </Heading>
  );
};

export default DocumentHeading;
