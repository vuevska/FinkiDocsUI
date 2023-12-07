import { Heading } from "@chakra-ui/react";
import { DocumentQuery } from "../App";

interface Props {
  documentQuery: DocumentQuery;
}

const DocumentHeading = ({ documentQuery }: Props) => {
  //const heading `${documentQuery.}`
  return <Heading as="h1"></Heading>;
};

export default DocumentHeading;
