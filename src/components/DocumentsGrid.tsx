import { SimpleGrid, Text } from "@chakra-ui/react";
import useDocuments from "../hooks/useDocuments";
import DocumentCard from "./DocumentCard";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {
  MdPreview,
  MdEdit,
  MdOutlineDownloadForOffline,
  MdOutlineStarBorder,
  MdDelete,
} from "react-icons/md";

const DocumentsGrid = () => {
  const { data, isLoading, error } = useDocuments();

  return (
    <>
      {isLoading && <Text>{isLoading}</Text>}
      {error && <Text>{error}</Text>}

      <TableContainer padding={10}>
        <Table variant="striped" colorScheme="blue">
          <TableCaption>Документи според категорија</TableCaption>
          <Thead>
            <Tr>
              <Th>Име на документ</Th>
              <Th>Опис</Th>
              <Th colSpan={5} textAlign="center">
                Акции
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((document) => (
              <Tr key={document.id}>
                <Td>
                  <DocumentCard
                    document={document}
                    name={""}
                    description={""}
                  />
                </Td>
                <Td>{document.description}</Td>
                <Td>
                  <MdPreview fontSize={20} />
                </Td>
                <Td>
                  <MdEdit fontSize={20} />
                </Td>
                <Td>
                  <MdOutlineDownloadForOffline fontSize={20} />
                </Td>
                <Td>
                  <MdOutlineStarBorder fontSize={20} />
                </Td>
                <Td>
                  <MdDelete fontSize={20} />
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Име на документ</Th>
              <Th>Опис</Th>
              <Th colSpan={5} textAlign="center">
                Акции
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default DocumentsGrid;
