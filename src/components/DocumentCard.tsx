import { Card, CardBody, Heading, Text } from "@chakra-ui/react";
import { Document } from "../hooks/useDocuments";

interface Props {
  document: Document;
  name: string;
  description: string;
}

const DocumentCard = ({ document }: Props) => {
  return (
    <>
      <Text fontSize="1xl">{document.name}</Text>
    </>
  );
};

export default DocumentCard;
